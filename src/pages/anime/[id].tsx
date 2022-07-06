import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import Menu from '@/components/Menu';
import api from '@/services/api';

import { BsClockHistory } from 'react-icons/bs';
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';
import { IoMdContract, IoMdExpand } from 'react-icons/io';

import {
  AvatarStaff,
  CardListInfos,
  CategoryListTitle,
  Container,
  ContainerInfomations,
  ContainerMainAnime,
  InformationText,
  ListSummary,
  NameStaff,
  Sinopse,
  StaffItem,
  StaffList,
  Summary,
} from '@/shared/styles/pages/anime';
import { CoverPoster, Title } from '../../shared/styles/pages/anime';

const Anime: React.FC<{
  anime: TAnime;
}> = ({ anime }) => {
  const [staffExpanded, setStaffExpanded] = useState(false);

  return (
    anime && (
      <Container backgroundimage={anime.bannerImage}>
        <Menu page="" />

        <ContainerInfomations>
          <CoverPoster>
            <Image
              src={String(anime.coverImage?.extraLarge)}
              alt={String(anime?.title)}
              layout="fill"
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
        </ContainerMainAnime>
      </Container>
    )
  );
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  const anime = await api.getById();
  console.log(anime);
  return {
    props: {
      anime,
    },
  };
};

export default Anime;
