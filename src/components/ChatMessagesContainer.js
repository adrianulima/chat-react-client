import React from 'react'
import styles from '../styles.css'

const ChatMessagesContainer = ({ messages = [], ...props }) => {
  return (
    <div className={styles['chat-messages-container']} {...props}>
      {messages.map((message) => {
        return (
          <div
            key={`${message.userId}_${message.timestamp}`}
            className={styles['chat-messages-item']}>
            {`${message.timestamp} ${message.userName}: ${message.text}`}
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessagesContainer
