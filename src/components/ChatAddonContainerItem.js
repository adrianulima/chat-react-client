import React from 'react'
import styles from '../styles.css'

const ChatAddonContainerItem = ({ grid, ...props }) => {
  return (
    <div
      className={
        styles[
          grid ? 'chat-stickers-container' : 'chat-quick-messages-container'
        ]
      }
      {...props}
    />
  )
}

export default ChatAddonContainerItem
