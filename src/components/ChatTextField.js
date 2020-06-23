import React from 'react'
import styles from '../styles.css'

const ChatTextField = ({
  onChange = () => {},
  onPressEnter = () => {},
  disabled,
  ...props
}) => (
  <input
    className={styles['chat-text-field']}
    onChange={onChange}
    onKeyPress={(event) =>
      onPressEnter &&
      event.key === 'Enter' &&
      onPressEnter(event.currentTarget.value)
    }
    {...props}
  />
)

export default ChatTextField
