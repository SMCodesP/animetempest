import styled from 'styled-components'

export const StandyByInfo = styled.div<{
  primaryColor: string
  secundaryColor: string
  show: boolean
}>`
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 50px;
  transition: all 0.5s ease-out;
  opacity: ${(props) => (props.show ? 1 : 0)};

  section {
    margin: auto 0;
    align-self: center;

    h1 {
      font-weight: bold;
      font-size: 3em;
      color: ${(props) => props.primaryColor};
      margin: 10px 0;
    }

    h3 {
      color: ${({ theme }) => theme.text};
      font-size: 1.1em;
      margin-bottom: 5px;
    }

    h2 {
      color: ${(props) => props.secundaryColor};
      font-size: 20px;
      margin-top: -5px;
      font-weight: bold;
    }

    @media(max-width: 730px) {
      h1 {
        font-size: 2.5em;
      }
      h2 {
        font-size: 17px;
      }
      h3 {
        font-size: 1em;
      }
    }

    @media(max-width: 630px) {
      h1 {
        font-size: 1.75em;
      }
    }

    @media(max-width: 580px) {
      h1 {
        font-size: 1.5em;
      }
    }
  }

  footer {
    align-self: flex-end;
    padding: 10px 0;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text};
  }
`
