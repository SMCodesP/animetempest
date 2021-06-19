import Category from './Category';

export default interface Episode {
  titleAnilist: string | null;
  thumbnail: string | null;
  anime: Category | null;
  video_id: string;
  category_id: string;
  category_image: string;
  title: string;
}
