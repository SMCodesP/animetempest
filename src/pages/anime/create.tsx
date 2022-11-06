import { NextPage } from 'next';
import Image from 'next/legacy/image';

import { NextSeo } from 'next-seo';

import { useState, FormEvent } from 'react';
import { useTheme } from 'styled-components';

import Menu from '@/components/Menu';
import api from '@/services/api';

import { BsClockHistory } from 'react-icons/bs';
import {
  TiMediaPlay,
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';
import { MdOutlineOpenInNew } from 'react-icons/md';

import {
  AvatarStaff,
  CardEpisode,
  CardListInfos,
  CategoryListTitle,
  Container,
  ContainerInfomations,
  ContainerListEpisodes,
  ContainerMainAnime,
  ContainerTitleCategory,
  EpisodeThumbnail,
  EpisodeTitle,
  InformationText,
  ListSummary,
  NameStaff,
  Sinopse,
  StaffItem,
  StaffList,
  Summary,
} from '@/shared/styles/pages/anime';
import {
  CoverPoster,
  Title,
  ContainerThumbnail,
} from '../../shared/styles/pages/anime';
import {
  InputTitle,
  SinopseEdit,
  SummaryInput,
  ThumbnailUpload,
} from '@/shared/styles/pages/anime_create';
import { IoAdd } from 'react-icons/io5';

const Anime: NextPage = () => {
  const [anime, setAnime] = useState<TAnime>({
    id: 1,
    idAni: 1,
    bannerImage: ``,
    title: {
      romaji: `Nome do anime`,
      english: `Nome do anime`,
      native: `Nome do anime`,
    },
    coverImage: {
      extraLarge: ``,
      large: ``,
      medium: ``,
      color: ``,
    },
    seasonYear: 0,
    duration: 0,
    score: 0,
    trailer: {
      id: ``,
      site: ``,
      thumbnail: ``,
    },
    description: ``,
    staff: [],
    episodes: [],
  });
  const theme = useTheme();

  const setTitle = (title: string) =>
    setAnime((state) => ({
      ...state,
      title: {
        ...state.title,
        romaji: title,
      },
    }));

  const setYear = (year: number) =>
    setAnime((state) => ({
      ...state,
      seasonYear: year,
    }));

  const setDuration = (duration: number) =>
    setAnime((state) => ({
      ...state,
      duration,
    }));

  const setScore = (score: number) =>
    setAnime((state) => ({
      ...state,
      score,
    }));

  const setDescription = (description: string) =>
    setAnime((state) => ({
      ...state,
      description,
    }));

  const handleSearchAnime = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (anime.title.romaji) {
      console.log(`api`);
      try {
        const newAnime = await api.getAnimeByNameAnilist(anime.title.romaji);
        console.log(newAnime);
        setAnime(newAnime);
      } catch (error) {
        console.log(`Error busca`);
      }
    }
  };

  return (
    <>
      <NextSeo
        title={`${anime?.title?.romaji} - AnimeTempest`}
        description={`Venha assistir ${anime?.title?.romaji} completo em uma ótima qualidade.`}
        openGraph={{
          type: `website`,
          url: `https://animetempest.vercel.app/anime/${anime?.id}`,
          title: `${anime?.title?.romaji} - AnimeTempest`,
          description: `Venha assistir ${anime?.title?.romaji} completo em uma ótima qualidade.`,
        }}
      />
      <Container backgroundimage={anime.bannerImage}>
        <Menu page="" />

        <ContainerInfomations>
          <CoverPoster
            style={{
              boxShadow: `0 0 10px ${anime.coverImage?.color}ee`,
            }}
          >
            {anime.coverImage?.extraLarge?.length !== 0 ? (
              <Image
                src={String(anime.coverImage?.extraLarge)}
                alt={String(anime?.title)}
                layout="fill"
                placeholder="blur"
                blurDataURL={String(anime.coverImage?.medium)}
              />
            ) : (
              <ThumbnailUpload>
                <IoAdd size={42} color="#ccc" />
              </ThumbnailUpload>
            )}
          </CoverPoster>
          <CardListInfos>
            <InformationText>
              Assitir a {anime?.title?.english} online
            </InformationText>
            <form onSubmit={handleSearchAnime}>
              <InputTitle
                value={anime?.title?.romaji}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o titulo do anime"
              />
            </form>
            <ListSummary>
              <Summary>
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-calendar-date"
                  viewBox="0 0 16 16"
                  version="1.1"
                  id="svg133"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs id="defs137" />
                  <text
                    xmlSpace="preserve"
                    style={{
                      fontSize: 8,
                      fill: `#000`,
                    }}
                    x="4.0398436"
                    y="12.365625"
                    id="text301"
                  >
                    <tspan
                      id="tspan299"
                      x="4.0398436"
                      y="12.365625"
                      style={{
                        fontStyle: `normal`,
                        fontVariant: `normal`,
                        fontWeight: 500,
                        fontStretch: `normal`,
                        fontSize: 8,
                        fontFamily: `Roboto`,
                      }}
                    >
                      {String(anime.seasonYear).slice(-2)}
                    </tspan>
                  </text>
                  <path
                    d="M 3.5,0 A 0.5,0.5 0 0 1 4,0.5 V 1 h 8 V 0.5 a 0.5,0.5 0 0 1 1,0 V 1 h 1 a 2,2 0 0 1 2,2 v 11 a 2,2 0 0 1 -2,2 H 2 A 2,2 0 0 1 0,14 V 3 A 2,2 0 0 1 2,1 H 3 V 0.5 A 0.5,0.5 0 0 1 3.5,0 Z M 1,4 v 10 a 1,1 0 0 0 1,1 h 12 a 1,1 0 0 0 1,-1 V 4 Z"
                    id="path131"
                    style={{
                      display: `inline`,
                    }}
                  />
                </svg>
                <SummaryInput
                  style={{ width: `${anime.seasonYear?.toString().length}ch` }}
                  size={4}
                  value={anime?.seasonYear?.toString()}
                  onChange={(e) => setYear(Number(e.target.value))}
                  type="number"
                />
              </Summary>
              <Summary>
                <BsClockHistory size={22} />
                <SummaryInput
                  style={{
                    width: `${anime.duration?.toString().length}ch`,
                    marginRight: `1ch`,
                  }}
                  value={anime.duration?.toString()}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  type="number"
                />
                min
              </Summary>
              <Summary>
                {Number(anime.score) < 2.5 ? (
                  <TiStarOutline size={22} />
                ) : Number(anime.score) < 5 ? (
                  <TiStarHalfOutline size={22} />
                ) : (
                  <TiStarFullOutline size={22} />
                )}
                <SummaryInput
                  style={{
                    width: `calc(${anime.score?.toString().length || 0}ch - ${
                      anime.score?.toString().replace(`,`, `.`).includes(`.`)
                        ? 1
                        : 0
                    }ch)`,
                  }}
                  value={anime.score?.toString().replace(`,`, `.`)}
                  onChange={(e) => setScore(Number(e.target.value))}
                  type="number"
                  step="1"
                  min="0"
                  max="10"
                />
                <small>/10</small>
              </Summary>
              {anime.trailer?.site === `youtube` && (
                <a
                  href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Summary>
                    Trailer
                    <MdOutlineOpenInNew size={22} />
                  </Summary>
                </a>
              )}
            </ListSummary>
            <SinopseEdit
              value={String(anime.description)}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do anime."
            />
          </CardListInfos>
        </ContainerInfomations>

        <ContainerMainAnime>
          <CategoryListTitle>Staff</CategoryListTitle>
          <StaffList>
            {anime?.staff?.map((staff) => (
              <StaffItem key={staff.id}>
                <AvatarStaff url={String(staff.image?.large)} />
                <NameStaff>{staff.name}</NameStaff>
              </StaffItem>
            ))}
          </StaffList>
          <ContainerTitleCategory>
            <CategoryListTitle>Episódios</CategoryListTitle>
          </ContainerTitleCategory>
          <ContainerListEpisodes>
            {anime.episodes?.map((episode) => (
              <CardEpisode key={`espisode-${episode.id}`}>
                <ContainerThumbnail>
                  <EpisodeThumbnail
                    src={episode.thumbnail.large}
                    alt={episode.title}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={String(episode.thumbnail.tiny)}
                  />
                  <TiMediaPlay size={42} color={theme.background} />
                </ContainerThumbnail>
                <EpisodeTitle>
                  {episode.title.replace(/^(.{35}[^\s]*).*/, `$1`)}
                  {episode.title.length > 35 && `...`}
                </EpisodeTitle>
              </CardEpisode>
            ))}
          </ContainerListEpisodes>
        </ContainerMainAnime>
      </Container>
    </>
  );
};

export default Anime;
