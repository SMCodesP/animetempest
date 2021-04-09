import styled from 'styled-components';

export const ContainerText = styled.div`
  background: ${({theme}) => theme.secundaryBackground};
  box-shadow: 0 0 15px ${({theme}) => theme.tertiary + '33'};
  padding: 15px;
  width: 75%;
  margin: 0 auto;
  border-radius: 10px;

  & * {
    margin: 5px 0;
  }

  & ul, & ol {
    padding-left: 15px;
    margin: 15px 0;
    list-style-position: inside;
  }

  & p {
    padding-left: 10px;
    text-indent: .75em;
  }

  & a {
    color: ${({theme}) => theme.tertiary};
    font-weight: bold;
    transition: filter .2s;
  }

  & a:hover {
    filter: brightness(130%);
  }
`;
