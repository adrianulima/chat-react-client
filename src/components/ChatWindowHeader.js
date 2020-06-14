import React from 'react'
import styles from '../styles.css'

const ChatWindowHeader = (props) => {
  return (
    <div>
      <div className={styles['chat-window-header']} {...props} />
    </div>
  )
}

export default ChatWindowHeader
