import React from 'react'
import styles from '../styles.css'

const ChatWrapper = ({ alignX = 'left', alignY = 'top', ...props }) => {
  const className = [styles['chat-wrapper']]
  if (alignX === 'right' || alignX === 'left') className.push(styles[alignX])
  if (alignY === 'top' || alignY === 'bottom') className.push(styles[alignY])
  return <div className={className.join(' ')} {...props} />
}

export default ChatWrapper
