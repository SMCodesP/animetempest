/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Character from '@/entities/Character';

import {
  Container,
  ShadowCurtain,
  Quote,
  ContainerBackground,
  ContainerContent,
  Name,
  CharacterImage,
} from './styles';

const character: Character = {
  anilist: {
    anime: {
      id: 482,
      category_name: `CANAAN`,
      category_image: `f770b62bc8f42a0b66751fe636fc6eb0.jpg`,
      anilist_id: 5356,
      title_romaji: `Canaan`,
      title_native: `カナン`,
      title_userPreferred: `Canaan`,
      sinopse: `CANAAN é baseado em um cenário do jogo 428 ~Fuusasareta Shibuya de~ produzido pela TYPE-MOON. A trama principal do jogo é sobre um ataque terrorista que está prestes a acontecer em Shibuya e termina com o caso solucionado. O anime continua com a personagem Canaan perseguindo a mandante do crime. Alguns personagens do jogo também estarão presentes no anime.`,
      type: `ANIME`,
      format: `TV`,
      genres: [`ação`, `drama`, `seinen`],
      bannerImage: `https://s4.anilist.co/file/anilistcdn/media/anime/banner/5356-hTvupXsLtHDy.jpg`,
      coverImage_extraLarge: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5356-RRwXlRIIYe7g.png`,
      coverImage_large: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5356-RRwXlRIIYe7g.png`,
      coverImage_medium: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5356-RRwXlRIIYe7g.png`,
      coverImage_color: `#e4c9a1`,
      error: false,
    },
    image: {
      medium: `https://s4.anilist.co/file/anilistcdn/character/medium/22669.jpg`,
      large: `https://s4.anilist.co/file/anilistcdn/character/large/22669.jpg`,
    },
  },
  anime: `CANAAN`,
  character: `Maria Oosawa`,
  quote: `Eu acredito que há muitas coisas neste mundo que as pessoas ainda não viram. Se você realmente quer ver algo, não há nada que você não possa ver. Você não pode ver porque está fechando os olhos de propósito. Porque se você usar os olhos para ver, será doloroso e triste. É por isso que eles estão fechados em primeiro lugar. Acho que fotografia é como pegar emprestado os olhos de outra pessoa. Portanto, mesmo que seus olhos estejam fechados ... você pode pedir emprestado os de outra pessoa.`,
};

const Suggestions: React.FC = () => (
  <Container>
    <ContainerBackground>
      <ShadowCurtain />
      <img
        src={character.anilist?.anime.coverImage_extraLarge || ``}
        alt="Anime cover extra large"
      />
    </ContainerBackground>
    <ContainerContent>
      <Quote>&quot;{character.quote}&quot;</Quote>
      <Name>- {character.character}</Name>
      <CharacterImage
        src={character.anilist?.image.large || ``}
        alt="Character user"
      />
    </ContainerContent>
  </Container>
);

export default Suggestions;
