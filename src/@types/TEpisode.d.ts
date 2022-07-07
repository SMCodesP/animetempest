interface TEpisode {
  id: number;
  title_alternative: string;
  title: string;
  date_release: number;
  thumbnail: string;
  anime_id: number;
  anime?: TAnime;
}
