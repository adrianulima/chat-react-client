import React from 'react'
import styles from '../styles.css'

const ChatBadge = ({ count, alignX = 'right', alignY = 'top', ...props }) => {
  const className = [styles['chat-badge']]
  if (alignX === 'right' || alignX === 'left') className.push(styles[alignX])
  if (alignY === 'top' || alignY === 'bottom') className.push(styles[alignY])
  return (
    <div className={className.join(' ')} {...props}>
      {count}
    </div>
  )
}

export default ChatBadge
