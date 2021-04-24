import React from 'react'
import { Alert } from 'react-bootstrap'

interface Props {
  variant: string
  message: string
  title: string
}
const Message: React.FC<Props> = ({ variant, title, message }) => {
  return (
    <Alert variant={variant || 'info'}>
      <Alert.Heading>{title}</Alert.Heading>
      {message}
    </Alert>
  )
}

export default Message
