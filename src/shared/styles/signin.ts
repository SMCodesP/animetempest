import styled from 'styled-components';

export const ContainerProvider = styled.div`
  display: grid;
  width: 100%;
  align-self: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  gap: 10px;
  padding: 10px;

  & div button {
    width: 100%;
    background: ${({ theme }) => theme.background};
    padding: 10px 0;
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
