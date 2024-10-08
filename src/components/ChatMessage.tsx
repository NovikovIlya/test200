import React from 'react'

interface Message {
  id: number
  text: string
  isCat: boolean
}

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-3/4 break-words">
      {message.isCat ? (
        <img src={message.text} alt="Cat" className="w-full h-auto rounded-lg" />
      ) : (
        <p className="text-xl">{message.text}</p>
      )}
    </div>
  )
}

export default ChatMessage