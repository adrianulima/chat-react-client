import React from 'react'
import { ExampleComponent } from 'chat-react-client'
import 'chat-react-client/dist/index.css'

const App = () => {
  const text = 'Data from Example'
  return <ExampleComponent text={text} />
}

export default App
