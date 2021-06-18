export default interface Category {
  id: number;
  category_name: string;
  category_image: string;
  anilist_id?: number;
  title_romaji?: string;
  title_english?: string;
  title_native?: string;
  title_userPreferred?: string;
  sinopse: string;
  type?: string;
  format?: string;
  genres: string[];
  bannerImage?: string;
  coverImage_extraLarge?: string;
  coverImage_large?: string;
  coverImage_medium?: string;
  coverImage_color?: string;
  animesRecommended?: Category[];
  error: boolean;
}
