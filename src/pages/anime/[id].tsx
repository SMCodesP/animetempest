import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { NextSeo } from 'next-seo';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';

import Menu from '@/components/Menu';
import api from '@/services/api';

import { BsClockHistory, BsFilter } from 'react-icons/bs';
import {
  TiMediaPlay,
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';
import { IoMdContract, IoMdExpand } from 'react-icons/io';
import { MdOutlineOpenInNew } from 'react-icons/md';

import {
  AvatarStaff,
  ButtonFilter,
  CardEpisode,
  CardListInfos,
  CategoryListTitle,
  Container,
  ContainerFilter,
  ContainerInfomations,
  ContainerListEpisodes,
  ContainerMainAnime,
  ContainerTitleCategory,
  EpisodeThumbnail,
  EpisodeTitle,
  Filter,
  InformationText,
  LineFilterSeparator,
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

const Anime: React.FC<{
  anime: TAnime;
}> = ({ anime }) => {
  const [staffExpanded, setStaffExpanded] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const filterRef = useRef<HTMLButtonElement>();
  const theme = useTheme();

  useEffect(() => {
    console.log(anime);
    const handler = (event: any) => {
      if (
        filterExpanded &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterExpanded(false);
      }
    };
    document.addEventListener(`mousedown`, handler);
    document.addEventListener(`touchstart`, handler);
    return () => {
      document.removeEventListener(`mousedown`, handler);
      document.removeEventListener(`touchstart`, handler);
    };
  }, [filterExpanded]);

  return (
    anime && (
      <>
        <NextSeo
          title={`${anime.title.romaji} - AnimeTempest`}
          description={`Venha assistir ${anime.title.romaji} completo em uma ótima qualidade.`}
          openGraph={{
            type: `website`,
            url: `https://animetempest.vercel.app/anime/${anime?.id}`,
            title: `${anime.title.romaji} - AnimeTempest`,
            description: `Venha assistir ${anime.title.romaji} completo em uma ótima qualidade.`,
            images: [
              {
                url: String(anime.coverImage?.extraLarge),
                width: 230,
                height: 360,
                alt: `${anime.title.romaji} poster`,
              },
            ],
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
              <Image
                src={String(anime.coverImage?.extraLarge)}
                alt={String(anime?.title)}
                layout="fill"
                placeholder="blur"
                blurDataURL={String(anime.coverImage?.medium)}
              />
            </CoverPoster>
            <CardListInfos>
              <InformationText>
                Assitir a {anime.title.english} online
              </InformationText>
              <Title>{anime.title.english}</Title>
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
                  {anime.seasonYear}
                </Summary>
                <Summary>
                  <BsClockHistory size={22} />
                  {anime.duration} min
                </Summary>
                <Summary>
                  {Number(anime.score) < 25 ? (
                    <TiStarOutline size={22} />
                  ) : Number(anime.score) < 50 ? (
                    <TiStarHalfOutline size={22} />
                  ) : (
                    <TiStarFullOutline size={22} />
                  )}
                  {Number(anime.score) / 10}
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
              <Sinopse
                dangerouslySetInnerHTML={{ __html: String(anime.description) }}
              />
            </CardListInfos>
          </ContainerInfomations>

          <ContainerMainAnime>
            <CategoryListTitle>
              Staff{` `}
              <button onClick={() => setStaffExpanded((state) => !state)}>
                {staffExpanded ? (
                  <IoMdContract size={22} />
                ) : (
                  <IoMdExpand size={22} />
                )}
              </button>
            </CategoryListTitle>
            <StaffList>
              {anime.staff
                ?.slice(0, staffExpanded ? anime.staff.length : 5)
                .map((staff) => (
                  <StaffItem key={staff.id}>
                    <AvatarStaff url={String(staff.image?.large)} />
                    <NameStaff>{staff.name}</NameStaff>
                  </StaffItem>
                ))}
            </StaffList>
            <ContainerTitleCategory>
              <CategoryListTitle>Episódios</CategoryListTitle>
              <ButtonFilter filterexpanded={filterExpanded.toString()}>
                <span
                  ref={filterRef as any}
                  onClick={() => setFilterExpanded((state) => !state)}
                >
                  <BsFilter size={26} color={theme.text} />
                  Filtro
                </span>
                <ContainerFilter>
                  <Filter>Mais Antigo</Filter>
                  <Filter>Mais Recentes</Filter>
                  <LineFilterSeparator />
                  <Filter>Assistidos</Filter>
                  <Filter>Não assistidos</Filter>
                </ContainerFilter>
              </ButtonFilter>
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
    )
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: `1` } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = () => {
  const anime = api.getById();
  return {
    props: {
      anime,
    },
  };
};

export default Anime;
