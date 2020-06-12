import React, { useState } from 'react'
import {
  ChatButton,
  ChatWindow,
  ChatWindowHeader,
  ChatWindowBody,
  ChatWrapper,
  ChatMessagesContainer,
  ChatUsersContainer,
} from 'chat-react-client'
import { BsChatDotsFill, BsXCircleFill } from 'react-icons/bs'
import { Button } from 'reactstrap'

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [showMessages, setShowMessages] = useState(true)

  return (
    <div>
      <ChatWrapper>
        <ChatButton
          onClick={(e) => {
            if (e.shiftKey) {
              setDisabled(!disabled)
              setOpen(false)
              return
            }
            setOpen(!open)
          }}
          disabled={disabled}>
          {open ? (
            <BsXCircleFill size="20px" />
          ) : (
            <BsChatDotsFill size="20px" />
          )}
        </ChatButton>
        {open && (
          <ChatWindow>
            <ChatWindowHeader
              style={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              Chat Window
              <Button
                color="secondary"
                onClick={() => {
                  setShowMessages(!showMessages)
                }}>
                {showMessages ? 'Show Users' : 'Show Messages'}
              </Button>
            </ChatWindowHeader>
            <ChatWindowBody>
              {showMessages ? (
                <ChatMessagesContainer
                  messages={[
                    {
                      text: 'mensagem1',
                      timestamp: '10000000',
                      userId: '1',
                      userName: 'Ciclano',
                    },
                    {
                      text: 'mensagem2',
                      timestamp: '20000000',
                      userId: '2',
                      userName: 'Fulano',
                    },
                  ]}
                />
              ) : (
                <ChatUsersContainer
                  users={[{ userId: '1', name: 'Ciclano' }]}
                  onClickUser={(user) => {
                    return user
                  }}
                />
              )}
            </ChatWindowBody>
          </ChatWindow>
        )}
      </ChatWrapper>
    </div>
  )
}

export default Chat
