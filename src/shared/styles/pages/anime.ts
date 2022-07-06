import Image from 'next/image';
import styled from 'styled-components';

export const ContainerInfomations = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 35px;
  margin: 15px 0;
  gap: 50px;
`;

export const CoverPoster = styled.div`
  width: 12% !important;
  height: auto;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000055;

  & img {
    border-radius: 10px;
    position: initial !important;
    height: auto !important;
    min-height: initial !important;
    max-height: initial !important;
  }

  & span {
    position: initial !important;
  }
`;

export const CardListInfos = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InformationText = styled.p`
  display: inline-block;
  position: relative;
  width: auto;
  font-size: 13px;
  line-height: 30px;
  letter-spacing: 4px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 0 2px #fff;
`;

export const Title = styled.h1`
  font-size: 3em;
`;

export const ListSummary = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 25px;
`;

export const Summary = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  height: 30px;

  & svg {
    margin: 0 10px;
    size: 22px;
  }

  & small {
    font-size: 12px;
    font-weight: 400;
    color: #888;
  }
`;

export const Sinopse = styled.div`
  width: 75%;
  margin-top: 25px;
`;

export const ContainerMainAnime = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 25px 70px;
`;

export const CategoryListTitle = styled.h2`
  display: flex;
  gap: 15px;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.25em;

  & button {
    cursor: pointer;
    background: none;
    border: 0;
  }
`;

export const StaffList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
  gap: 15px;
  padding: 15px 10px;
`;

export const StaffItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NameStaff = styled.p`
  display: inline-block;
  position: relative;
  width: auto;
  font-size: 13px;
  line-height: 30px;
  letter-spacing: 4px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
`;

export const AvatarStaff = styled.div<{
  url: string;
}>`
  border-radius: 12px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  grid-area: image;
  background-image: url(${({ url }) => url});
  width: 52px;
  height: 66px;
  box-shadow: 0 0 5px ${({ theme }) => theme.text}55;
  transition: filter 0.4s linear;

  &:hover {
    filter: brightness(85%);
  }
`;

export const Container = styled.div<{
  backgroundimage?: string;
}>`
  position: relative;

  & * {
    z-index: 9;
  }

  &::before {
    width: calc(125% + 10px);
    height: 30vw;
    content: '';
    position: fixed;
    overflow: hidden;
    top: -10px;
    left: -12.25%;
    z-index: 0 !important;
    background: linear-gradient(
        to top,
        ${({ theme }) => theme.cyan_light} 5%,
        ${({ theme }) => theme.cyan_light}55
      ),
      url(${({ backgroundimage }) => backgroundimage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
  }
`;
