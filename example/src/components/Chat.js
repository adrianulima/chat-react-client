import React, { useState, useEffect } from 'react'
import {
  ChatButton,
  ChatWindow,
  ChatWindowRow,
  ChatWindowBody,
  ChatTextField,
  ChatWrapper,
  ChatMessagesContainer,
  ChatMessagesItem,
  ChatUsersContainer,
  ChatBadge,
  ChatApiHandler,
  apiErrorHandler,
} from 'chat-react-client'
import { BsChatDotsFill, BsXCircleFill, BsFillPeopleFill } from 'react-icons/bs'
import { Button, ButtonGroup } from 'reactstrap'
import { map, find } from 'lodash'

const chatApi = ChatApiHandler()

const Chat = ({ roomId }) => {
  const [open, setOpen] = useState(false)
  const [showMessages, setShowMessages] = useState(true)
  const [valueTextField, setValueTextField] = useState('')
  const [roomUsers, setRoomUsers] = useState([])

  useEffect(() => {
    if (open) {
      chatApi
        .getRoomUsers(roomId)
        .then((users) => {
          setRoomUsers(users.list)
        })
        .catch(apiErrorHandler)
    }
  }, [roomId, open])

  const messages = [
    {
      messageId: 1,
      text: 'mensagem1',
      timestamp: '1592117000',
      user: { userId: 1, userName: 'Ciclano' },
    },
    {
      messageId: 2,
      text: 'mensagem2',
      timestamp: '1592227000',
      user: { userId: 2, userName: 'Fulano' },
      mine: true,
      quick: true,
    },
    {
      messageId: 3,
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa vbbbbbbbbbbbb',
      timestamp: '1592337000',
      user: { userId: 3, userName: 'Tetranho' },
    },
    {
      messageId: 4,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut pretium enim, et faucibus ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      timestamp: '1592547000',
      user: { userId: 4, userName: 'Quadrano' },
    },
    {
      messageId: 5,
      text:
        'Vivamus eros tortor, pellentesque et erat vitae, malesuada tristique nulla. Sed in nulla ante. Nunc quis magna in velit imperdiet sollicitudin.',
      timestamp: '1592647000',
      user: { userId: 4, userName: 'Fulano' },
      mine: true,
    },
    {
      messageId: 6,
      text:
        'Integer dapibus mi a urna vulputate commodo. Vestibulum ut feugiat mauris. Donec consequat tempor ex, ac convallis mauris imperdiet eget.',
      timestamp: '1592747000',
      user: { userId: 4, userName: 'Quadrano' },
    },
    {
      messageId: 7,
      text:
        'Aliquam eu tristique nisl, in tincidunt nisi. Etiam id metus arcu. Maecenas ac orci fringilla, tincidunt dui eget, ullamcorper nisl. Etiam ultricies tincidunt faucibus',
      timestamp: '1592847000',
      user: { userId: 4, userName: 'Quadrano' },
      quick: true,
    },
  ]

  const getUserClickCallback = (userId) => {
    const u = find(roomUsers, (user) => user.userId === userId)

    if (u)
      return (user) => {
        console.log(user.userName)
      }
  }

  const sendMessageText = () => {
    // TODO: Send message to API

    setValueTextField('')
  }

  return (
    <ChatWrapper>
      <ChatButton onClick={() => setOpen(!open)}>
        {!open && <ChatBadge count="99" />}
        {open ? <BsXCircleFill size="20px" /> : <BsChatDotsFill size="20px" />}
      </ChatButton>
      {open && (
        <ChatWindow>
          <ChatWindowRow>
            Room: #{roomId}
            <ButtonGroup size="sm">
              <Button
                disabled={showMessages}
                onClick={() => setShowMessages(true)}
              >
                <BsChatDotsFill />
              </Button>
              <Button
                disabled={!showMessages}
                onClick={() => setShowMessages(false)}
              >
                <BsFillPeopleFill />
              </Button>
            </ButtonGroup>
          </ChatWindowRow>
          <ChatWindowBody>
            {showMessages ? (
              <ChatMessagesContainer>
                {map(messages, (message) => (
                  <ChatMessagesItem
                    key={message.messageId}
                    timestamp={message.timestamp}
                    userName={message.user.userName}
                    text={message.text}
                    mine={message.mine}
                    quick={message.quick}
                    onClickUser={getUserClickCallback(message.user.userId)}
                  />
                ))}
              </ChatMessagesContainer>
            ) : (
              <ChatUsersContainer
                users={roomUsers}
                onClickUser={(user) => user}
              />
            )}
          </ChatWindowBody>
          <ChatWindowRow>
            <ChatTextField
              value={valueTextField}
              placeholder="Send a message"
              onPressEnter={sendMessageText}
              onChange={setValueTextField}
            />
            <Button
              onClick={sendMessageText}
              size="sm"
              style={{ fontSize: 12, height: 30, marginLeft: 8 }}
            >
              Send
            </Button>
          </ChatWindowRow>
        </ChatWindow>
      )}
    </ChatWrapper>
  )
}

export default Chat
