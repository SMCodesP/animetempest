import styled from 'styled-components'

export const VideoPreLoading = styled.div<{
  backgroundColorHoverButtonError: string
  colorHoverButtonError: string
  colorButtonError: string
  backgroundColorButtonError: string
  colorTitle: string
  colorSubTitle: string
  colorIcon: string
  show: any
  showError: boolean
}>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  z-index: ${(props) => (props.show ? 2 : 0)};
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.show ? 1 : 0)};

  header {
    display: flex;
    color: ${({ theme }) => theme.text};
    align-items: center;

    h1 {
      color: ${(props) => props.colorTitle};
      font-size: 1.5em;
      font-weight: bold;
    }

    h2 {
      color: ${(props) => props.colorSubTitle};
      font-size: 1.1em;
    }

    svg {
      color: ${(props) => props.colorIcon};
      opacity: 0.5;
      margin-left: auto;
      font-size: 4em;
      padding: 10px;
      cursor: pointer;
      transition: transform 0.2s linear, opacity 0.2s linear;

      &:hover {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  }

  section {
    text-align: center;
    color: #ddd;
    margin: auto;
    transition: all 0.2s ease;
    opacity: ${(props) => (props.showError ? 1 : 0)};

    .links-error {
      display: inline-flex;
      margin: auto;

      div {
        color: ${(props) => props.colorButtonError};
        background: ${(props) => props.backgroundColorButtonError};
        display: flex;
        align-items: center;
        margin: 0 5px;
        padding: 10px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.2s ease;

        &:hover {
          background: ${(props) => props.backgroundColorHoverButtonError};
          color: ${(props) => props.colorHoverButtonError};
        }
      }
    }

    h1 {
      font-size: 2em;
    }

    p {
      font-size: 1.5em;
      margin: 20px;
    }
  }
`
