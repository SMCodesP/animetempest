import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 350px;
  margin: 5px 0;
  flex: 999 0 33.333%;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export const ArticleContent = styled.article`
  position: relative;
  width: 98%;
  border-radius: 15px;
  box-shadow: 0 0 2px ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.text};
  padding: 40px 38px 45px;
  background-repeat: no-repeat;
  background-position-x: right;
  background-size: 75% 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  transition: transform 0.4s, box-shadow 0.4s, filter 0.4s;

  &:hover {
    filter: brightness(80%);
    box-shadow: 0 0 5px ${({ theme }) => theme.text};
    transform: translateY(-10px);
  }
`;

export const Title = styled.h2`
  font-size: 33px;
  font-family: 'Noto Sans', sans-serif;
  color: ${({ theme }) => lighten(0.065, theme.light)};
  line-height: 1.4;
  margin: 10px 0 30px;
  margin-right: 10%;
`;

export const Author = styled.p`
  font-size: 14px;
  opacity: 0.9;
  color: ${({ theme }) => theme.light};
  line-height: 1.4;

  & b {
    opacity: 1 !important;
  }
`;
