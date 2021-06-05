import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import Category from "../entities/Category"

export type GetStaticPropsContextWithData<
  D = unknown
> = GetStaticPropsContext & {
  data: D
}

export async function defaultGetStaticProps(
  ctx: GetStaticPropsContextWithData
) {
  return {
    props: ctx.data,
  }
}

export interface GetAllStaticDataParams<
  D = Category
> {
  /** Returns a list of data */
  getData(): Promise<D[]>
  /**
   * Which property should be used as a key
   * (This will be returned from `getStaticPaths` as the param)
   * */
  /**
   * File name
   * @todo Check if this can be extracted
   */
  name: string
  /**
   * By default,
   * the `props` return property will equal to the data,
   * and `revalidate is set to `1`.
   * You can override this function as you like.
   * It is exactly like a `getStaticProps` function, only with `context.data`
   * set to the data returned from `getStaticPaths` with a matching path.
   * See `key`
   * */
  getStaticPropsWithData?: any
  /** Fallback value for `getStaticPaths`. */
  fallback?: GetStaticPathsResult["fallback"]

  getStaticPropsRevalidate?: any
}

export default function getAllStaticData<
  D = Category,
>({
  getData,
  name,
  getStaticPropsWithData = defaultGetStaticProps,
  fallback = false,
  getStaticPropsRevalidate
}: GetAllStaticDataParams<D>) {
  const getStaticPaths: (fs: typeof import("fs")) => GetStaticPaths = (
    fs
  ) => async (): Promise<GetStaticPathsResult> => {
    const result = await getData()
    await fs.promises.writeFile(".cache", JSON.stringify(result), "utf8")
    return {
      fallback,
      paths: (result as any[]).map((element: Category) => ({
        params: { [name]: String(element.id) },
      })) as any[],
    }
  }

  const getStaticProps: (fs: typeof import("fs")) => GetStaticProps = (
    fs
  ) => async (ctx) => {
    try {
      const result = await fs.promises.readFile(".cache", "utf8")
      const slug = ctx.params?.[name as any] as string
      const parsedResult = JSON.parse(result) as D[]

      const data = (parsedResult as any).find((element: Category) => String(element.id) === slug) as D

      if (!data) throw new Error('No data')

      return await getStaticPropsWithData({ ...ctx, data: {data} }, slug)
    } catch (error) {
      return await getStaticPropsRevalidate(ctx.params?.[name as any])
    }
  }

  return { getStaticPaths, getStaticProps }
}
