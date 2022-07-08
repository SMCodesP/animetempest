import Image from 'next/image';
import styled from 'styled-components';

export const ContainerPageLogin = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContainerLogin = styled.div`
  align-self: center;
  margin: auto 0;
  background-color: ${({ theme }) => theme.background};
  width: 25%;
  height: 60vh;
  border-radius: 20px;
  box-shadow: 0 0 10px ${({ theme }) => theme.text}22;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

export const TitleLogin = styled.h1`
  font-family: 'Roboto';
  align-self: center;
  margin-top: 25px;
`;

export const SubTitleLogin = styled.h2`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  padding: 10px 15px;
  color: #aaa;
  align-self: center;
  margin-bottom: 25px 0;
`;

export const Logo = styled(Image)``;

export const ListOptionsLogin = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto 0;
  gap: 15px;
`;

interface OptionLogin {
  color: string;
}

export const OptionLogin = styled.li<OptionLogin>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  border-radius: 10px;
  gap: 15px;
  cursor: pointer;
  background: ${({ color }) => color};
  color: ${({ theme }) => theme.background};
  transition: filter 0.4s;

  &:hover {
    filter: opacity(0.75);
  }
`;
