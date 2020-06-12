import React, { useState } from 'react'
import { ChatButton, ChatWindow, ChatWrapper } from 'chat-react-client'
import { BsChatDotsFill, BsXCircleFill } from 'react-icons/bs'

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)

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
        {open && <ChatWindow>CHAT</ChatWindow>}
      </ChatWrapper>
    </div>
  )
}

export default Chat
