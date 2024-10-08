import React, { useState, useEffect } from 'react'
import { Send, Cat } from 'lucide-react'
import ChatMessage from './components/ChatMessage'
import CatImageModal from './components/CatImageModal'

interface Message {
  id: number
  text: string
  isCat: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [showCatModal, setShowCatModal] = useState(false)

  const sendMessage = (text: string, isCat: boolean = false) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isCat,
    }
    setMessages([...messages, newMessage])
    setInputText('')
  }

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText)
    }
  }

  const handleCatSend = (url: string) => {
    sendMessage(url, true)
    setShowCatModal(false)
  }

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 text-2xl font-bold text-center">
        Чат для пенсионеров
      </header>
      <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="bg-gray-800 p-4 flex items-center space-x-2">
        <button
          onClick={() => setShowCatModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          <Cat size={24} />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Введите сообщение..."
          className="flex-1 bg-gray-700 text-white text-xl p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          <Send size={24} />
        </button>
      </div>
      {showCatModal && (
        <CatImageModal onClose={() => setShowCatModal(false)} onSelect={handleCatSend} />
      )}
    </div>
  )
}

export default App