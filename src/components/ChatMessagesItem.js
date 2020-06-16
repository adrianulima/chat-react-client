import React from 'react'
import styles from '../styles.css'
import { getDateFormat } from '../helpers'

const ChatMessagesItem = ({
  onClickUser,
  timestamp,
  userName,
  text = '',
  fontSize,
  mine,
  quick,
  ...props
}) => {
  const getClassName = (className, clickable) => {
    const cn = [styles[className]]
    if (mine) cn.push(styles.mine)
    if (quick) cn.push(styles.quick)
    if (onClickUser && clickable) cn.push(styles.clickable)
    return cn.join(' ')
  }

  return (
    <div
      className={getClassName('chat-messages-item')}
      style={{ fontSize: fontSize }}
      {...props}
    >
      {timestamp && (
        <span className={getClassName('chat-messages-item-date')}>
          {getDateFormat(timestamp)}
        </span>
      )}
      {userName && (
        <span
          className={getClassName('chat-messages-item-username', true)}
          onClick={onClickUser}
        >
          {userName}:
        </span>
      )}
      <span className={getClassName('chat-messages-item-text')}>{text}</span>
    </div>
  )
}

export default ChatMessagesItem
