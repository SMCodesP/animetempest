import styled from 'styled-components';

export const ContainerProvider = styled.div`
  padding: 5px 0;
  display: grid;
  width: 70%;
  align-self: center;
  grid-template-columns: repeat(3, 1fr);

  & div button {
    background: ${({ theme }) => theme.background};
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background .2s;
  }

  & div button:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    font-size: 18px;
    font-weight: bold;
  }
`;
