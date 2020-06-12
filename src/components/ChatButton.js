import React from 'react'
import styles from '../styles.css'

const ChatButton = ({ onClick = () => {}, disabled, ...props }) => {
  const className = [styles['chat-button']]
  if (disabled) className.push(styles['disabled'])
  return (
    <div
      className={className.join(' ')}
      onClick={disabled || onClick}
      {...props}
    />
  )
}

export default ChatButton
