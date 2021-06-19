import Category from './Category';

export default interface Video {
  video_id: string;
  category_id: string;
  category_image: string;
  title: string;
  anime?: Category;
}
