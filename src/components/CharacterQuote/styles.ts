import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  float: left;
  flex-direction: column;
  gap: 70px;
  position: relative;
  width: 600px;
  min-height: 350px;
  box-shadow: 0 0 5px ${({ theme }) => theme.text};
  background: #191622;
  background-repeat: no-repeat;
  background-position-x: right;
  background-size: 280px 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const TextTip = styled.q`
  font-style: italic;
  text-shadow: 0 0 5px #191622;
  color: ${({ theme }) => theme.purple};
  display: block;
  padding: 50px 50px 0 25px;
  text-indent: 0.5em;
  font-size: 18px;
`;

export const CharacterAuthor = styled.p`
  margin-top: auto;
  padding-bottom: 50px;
  padding-left: 20px;
  color: ${({ theme }) => theme.blue_light};
  font-size: 1em;
  font-family: 'Noto Sans', sans-serif;
  font-weight: bold;

  & span {
    font-size: 1.25em;
    font-family: sans-serif;
    font-weight: 900;
    color: ${({ theme }) => theme.green};
  }
`;

export const CharacterImage = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 92px;
  border-radius: 10px;
  filter: brightness(60%);
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
`;
