interface TCharacter {
  anilist?: {
    anime: TCategory;
    image: {
      large: string;
      medium: string;
    };
  };
  anime: string;
  character: string;
  quote: string;
}
