import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

export const Container = styled(ReactMarkdown)`
  width: 100%;
  padding-left: 5px;

  & ul,
  & ol {
    list-style-position: inside;
  }
`

export const ContainerCodeBlock = styled.div`
  box-shadow: 0 0 10px ${({ theme }) => theme.background};
  border-radius: 5px;

  & pre {
    border-radius: 5px;
    padding: 10px 15px !important;
  }
`

export const ContainerInlineCode = styled.code`
  background: ${({ theme }) => theme.secundaryText};
  padding: 5px;
  margin: 0 2px;
  border-radius: 5px;
  cursor: pointer;
  transition: filter 0.4s;
  &:hover {
    filter: brightness(65%);
  }
`
