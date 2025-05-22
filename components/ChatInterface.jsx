"use client"

import { useRef, useEffect } from "react"
import MessageList from "./MessageList"
import InputArea from "./InputArea"
import { useChat } from "@/context/ChatContext"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

const ChatInterface = () => {
  const { messages, loading } = useChat()
  const messagesEndRef = useRef(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">AI Chat Assistant</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-gray-100" /> : <Moon className="h-5 w-5 text-gray-800" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />

        {loading && (
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <InputArea />
      </div>
    </div>
  )
}

export default ChatInterface
