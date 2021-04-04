import SyntaxHighlighter from 'react-syntax-highlighter'

import { ContainerCodeBlock } from './styles'

import omni from '../../shared/syntaxes/omni'

const CodeBlock: React.FC<{
  value: string
  language: string
}> = ({ value, language }) => {
  return (
    <ContainerCodeBlock>
      <SyntaxHighlighter language={language} style={omni}>
        {value}
      </SyntaxHighlighter>
    </ContainerCodeBlock>
  )
}

export default CodeBlock
