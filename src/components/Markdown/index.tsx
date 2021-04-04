import CodeBlock from './CodeBlock'
import InlineCode from './InlineCode'
import { Container } from './styles'

const Markdown: React.FC<{
  text: string
}> = ({ text }) => {
  return (
    <Container
      children={text}
      renderers={{ code: CodeBlock, inlineCode: InlineCode }}
    />
  )
}

export default Markdown
