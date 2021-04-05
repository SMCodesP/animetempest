import React, { useContext, useEffect, useState, useRef } from 'react'

import { ThemeContext } from 'styled-components'
import { DateTime } from 'luxon'

import { FiX } from 'react-icons/fi'

import firebaseInit from '../../../services/firebase'
import Comment from '../../../entities/Comment'

import {
  Container,
  ContainerInput,
  ContainerListComments,
  CommentsEmpty,
  InputComment,
  ContainerCommentBody,
  ContainerComment,
  Avatar,
  DateComponent,
  Name,
  Error as ErrorComponent,
  ContainerCommentDetail,
  Limit,
} from './styles'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import Markdown from '../../Markdown'

// Regex Verify HH:MM:SS: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/

const Comments: React.FC<{
  close: () => any
  videoId: string
}> = ({ close, videoId }) => {
  const theme = useContext(ThemeContext)
  const [session] = useSession()

  const { db } = firebaseInit()

  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState('')
  const [commenting, setCommenting] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const listComments = useRef<HTMLDivElement>(null)

  useEffect(() => {
    db.ref(`chats/${videoId}`).on('value', (snapshot) => {
      const list: any[] = []
      snapshot.forEach((snap) => {
        list.push(snap.val())
      })
      setComments(list)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (listComments && listComments.current) {
      listComments.current.scrollTop = listComments.current.scrollHeight
    }
  }, [listComments, comments])

  const handleSubmit = async () => {
    try {
      if (commenting) throw new Error('Espere para postar um novo comentário.')
      if (comment.length === 0) throw new Error('Nenhum comentário digitado.')

      setComment('')
      setCommenting(true)
      await axios.post(`/api/chat/${videoId}`, {
        content: comment,
      })
      setCommenting(false)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <header>
          <p>Comentários</p>
          <FiX size={24} color={theme.text} onClick={close} />
        </header>
        <ContainerCommentBody ref={listComments}>
          {comments?.length !== 0 ? (
            <ContainerListComments>
              {(comments as any[]).map((comment) => (
                <ContainerComment>
                  <Avatar src={comment.author.avatar} />
                  <div
                    style={{
                      padding: 5,
                      width: 'calc(100% - 43px)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Name>{comment.author.name}</Name>
                      <DateComponent>
                        {DateTime.fromMillis(comment.timestamp).toFormat(
                          'HH:mm - dd/mm/yy'
                        )}
                      </DateComponent>
                    </div>
                    <Markdown text={comment.content} />
                  </div>
                </ContainerComment>
              ))}
            </ContainerListComments>
          ) : (
            <CommentsEmpty>
              {loading ? 'Crregando...' : 'Nenhum comentário feito'}
            </CommentsEmpty>
          )}
        </ContainerCommentBody>
        {session && (
          <ContainerInput>
            <ContainerCommentDetail>
              {!!error && <ErrorComponent>{error}</ErrorComponent>}
              <Limit
                style={{
                  color:
                    comment.length === 512
                      ? theme.fifthText
                      : comment.length >= 512 / 3
                      ? theme.tertiaryText
                      : theme.primary,
                }}
              >
                {comment.length}/512
              </Limit>
            </ContainerCommentDetail>
            <InputComment
              name="comment"
              placeholder={
                commenting
                  ? 'Postando novo comentário...'
                  : 'Digite um novo comentário'
              }
              cols={30}
              rows={3}
              maxLength={512}
              value={comment}
              onChange={(e) => {
                setError('')
                setComment(e.target.value)
              }}
              onSubmit={handleSubmit}
              onKeyDown={handleKeydown}
            ></InputComment>
          </ContainerInput>
        )}
      </Container>
    </div>
  )
}

export default Comments
