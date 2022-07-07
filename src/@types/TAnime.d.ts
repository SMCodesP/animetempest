interface TAnime {
  id: number;
  idAni: number;
  bannerImage?: string;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    portuguese?: string;
  };
  seasonYear?: number;
  duration?: number;
  score?: number;
  coverImage?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    color?: string;
  };
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
  description?: string;
  staff?: TStaff[];
  episodes?: TEpisode[];
}
