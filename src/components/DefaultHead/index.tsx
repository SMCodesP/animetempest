/* eslint-disable @next/next/no-title-in-document-head */
import { Head } from 'next/document';

const DefaultHead: React.FC<{
  title: string;
  description?: string;
}> = ({ title, description, children }) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={description} key="title" />
    <meta name="twitter:title" content={description} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="description" content={description} />
    <meta name="Description" content={description} />
    <meta name="twitter:description" content={description} />
    {children}
  </Head>
);

export default DefaultHead;
