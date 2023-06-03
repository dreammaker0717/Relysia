
import { useEffect, useRef, useState } from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'

import { Button } from './Button'
import { ChatLine, LoadingChatLine } from './ChatLine'
import { COOKIE_NAME, initialMessages } from './config'



export function Chat({ fpHash }) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [applyField, setApplyField] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const messagesEndRef = useRef(null);

  const sendMessage = async (message) => {
    setLoading(true)

    const newMessages = [...messages, { message: message, who: 'user' }]
    setMessages(newMessages)


    const last10messages = newMessages.slice(-10)

    const data = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        user: fpHash,
      }),
    }).then(data => data.json())
    console.log(data, "this is darta")
    // strip out white spaces from the bot message
    const botNewMessage = data.text.trim()

    setMessages([...newMessages, { message: botNewMessage, who: 'bot' }])

    setLoading(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({ top: messagesEndRef?.current?.scrollHeight, behavior: 'smooth' })
  }
  useEffect(() => {
    if (messagesEndRef?.current) {
      scrollToBottom()
    }
  }, [messagesEndRef])

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <div
      className={`rounded-2xl`}
    >
      <div ref={messagesEndRef} className='flex flex-col  h-[50vh] overflow-y-scroll'>
        {messages.map(({ message, who }, index) => (
          <ChatLine key={index} who={who} message={message} />
        ))}

        {loading && <LoadingChatLine />}

        {messages.length < 2 && (
          <span className="mx-auto flex flex-grow text-gray-600 clear-both">
            Type a message to start the conversation
          </span>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
          setInput('')
        }}
        className="mt-6 flex  items-center sticky bottom-0 space-x-2">
        <div className="w-full text-black">
          {' '}
          <InputwithIcon

            className="bg-gray-200"
            onChange={(e) => {
              setInput(e.target.value)
            }}
            hideLabel
            name="New Email"
            type="text"
            value={input}
            required
          />
        </div>
        <MaterialUiCustomButtom
          type="submit"
          disabled={loading}
          background="linear-gradient(135deg, rgba(61,184,245,1) 0%, rgba(31,66,239,1) 97%)"
          label="Post"
          disablefullWidth
        />
      </form>
    </div>
  )
}
