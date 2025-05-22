"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { useChat } from "@/context/ChatContext"

const InputArea = () => {
  const [input, setInput] = useState("")
  const { sendMessage, loading } = useChat()
  const inputRef = useRef(null)
  const [showCommands, setShowCommands] = useState(false)
  const [commandFilter, setCommandFilter] = useState("")

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (input.startsWith("/") && input.length <= 10) {
      setShowCommands(true)
      setCommandFilter(input.substring(1).toLowerCase())
    } else {
      setShowCommands(false)
    }
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !loading) {
      sendMessage(input)
      setInput("")
    }
  }

  const commands = [
    { name: "weather", description: "Get weather for a city", example: "/weather Paris" },
    { name: "calc", description: "Calculate expressions", example: "/calc 5 * (10 + 2)" },
    { name: "define", description: "Look up word definitions", example: "/define serendipity" },
  ]

  const filteredCommands = commands.filter((cmd) => cmd.name.toLowerCase().includes(commandFilter))

  const insertCommand = (command) => {
    setInput(`/${command} `)
    setShowCommands(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message or use /command..."
          className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          disabled={loading}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          disabled={!input.trim() || loading}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      {showCommands && filteredCommands.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-10">
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.name}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => insertCommand(cmd.name)}
            >
              <div className="font-medium text-gray-800 dark:text-gray-200">/{cmd.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{cmd.description}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1">{cmd.example}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputArea
