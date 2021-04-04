import { ContainerInlineCode } from './styles'

const InlineCode: React.FC<{
  value: string
}> = ({ value }) => {
  return <ContainerInlineCode>{value}</ContainerInlineCode>
}

export default InlineCode
