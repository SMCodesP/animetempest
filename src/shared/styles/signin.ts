import styled from 'styled-components';

export const ContainerProvider = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  gap: 10px;

  & div {
    width: 100%;
    max-width: 300px;
  }

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
