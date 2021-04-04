export default interface Comment {
  timestamp: number
  content: string
  author: {
    name: string
    avatar: string
  }
}
