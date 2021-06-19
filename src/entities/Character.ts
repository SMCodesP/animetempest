import Category from './Category';

export default interface Character {
  anilist?: {
    anime: Category;
    image: {
      large: string;
      medium: string;
    };
  };
  anime: string;
  character: string;
  quote: string;
}
