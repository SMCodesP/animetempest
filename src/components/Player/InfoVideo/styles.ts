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
    padding-top: 100px;
    padding-left: 100px;

    h3 {
      color: ${({ theme }) => theme.text};
      font-size: 1.1em;
      margin-bottom: 5px;
    }

    h1 {
      font-weight: bold;
      font-size: 3em;
      color: ${(props) => props.primaryColor};
      margin: 10px 0;
    }

    h2 {
      color: ${(props) => props.secundaryColor};
      font-size: 20px;
      margin-top: -5px;
      font-weight: bold;
    }
  }

  footer {
    margin-top: auto;
    margin-bottom: 50px;
    margin-left: auto;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text};
  }
`
