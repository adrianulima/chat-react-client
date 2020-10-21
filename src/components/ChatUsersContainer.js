import React from 'react'
import styles from '../styles.css'

const ChatUsersContainer = ({
  users = [],
  onClickUser = () => {},
  ...props
}) => (
  <div className={styles['chat-users-container']} {...props}>
    {users.map((user) => (
      <div key={user.userId} className={styles['chat-users-item']}>
        <span
          className={styles['chat-users-item-text']}
          onClick={() => onClickUser(user)}
        >
          {user.userName}
        </span>
      </div>
    ))}
  </div>
)

export default ChatUsersContainer
