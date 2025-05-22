"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { parseMessage } from "@/utils/messageParser"
import { executePlugin } from "@/utils/pluginManager"

const ChatContext = createContext({})

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (error) {
        console.error("Failed to parse saved messages:", error)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  const sendMessage = async (content) => {
    // Create and add user message
    const userMessage = {
      id: uuidv4(),
      sender: "user",
      content,
      type: "text",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      // Parse the message to check for commands
      const { isCommand, command, args } = parseMessage(content)

      if (isCommand) {
        // Execute the plugin
        const pluginResult = await executePlugin(command, args)

        // Create assistant message with plugin data
        const assistantMessage = {
          id: uuidv4(),
          sender: "assistant",
          content: pluginResult.message,
          type: "plugin",
          pluginName: command,
          pluginData: pluginResult.data,
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } else {
        // Handle natural language processing
        // For this implementation, we'll use a simple keyword detection
        const lowerContent = content.toLowerCase()
        let pluginResponse = null

        if (lowerContent.includes("weather") && lowerContent.includes("in")) {
          // Extract location after "in"
          const parts = lowerContent.split("in")
          if (parts.length > 1) {
            const location = parts[1].trim().split(" ")[0]
            pluginResponse = await executePlugin("weather", [location])
          }
        } else if (
          lowerContent.includes("calculate") ||
          lowerContent.includes("what is") ||
          (lowerContent.includes("how much") && /[0-9+\-*/().]/.test(lowerContent))
        ) {
          // Extract math expression
          const expression = content.replace(/calculate|what is|how much is|equals/gi, "").trim()
          if (/[0-9+\-*/().]/.test(expression)) {
            pluginResponse = await executePlugin("calc", [expression])
          }
        } else if (
          lowerContent.includes("define") ||
          lowerContent.includes("meaning of") ||
          lowerContent.includes("what does") ||
          lowerContent.includes("definition of")
        ) {
          // Extract word to define
          let word = ""
          if (lowerContent.includes("define")) {
            word = content.replace(/define/gi, "").trim()
          } else if (lowerContent.includes("meaning of")) {
            word = content.replace(/meaning of/gi, "").trim()
          } else if (lowerContent.includes("what does") && lowerContent.includes("mean")) {
            word = content.replace(/what does|mean/gi, "").trim()
          } else if (lowerContent.includes("definition of")) {
            word = content.replace(/definition of/gi, "").trim()
          }

          if (word) {
            pluginResponse = await executePlugin("define", [word])
          }
        }

        if (pluginResponse) {
          // Create assistant message with plugin data
          const assistantMessage = {
            id: uuidv4(),
            sender: "assistant",
            content: pluginResponse.message,
            type: "plugin",
            pluginName: pluginResponse.plugin,
            pluginData: pluginResponse.data,
            timestamp: new Date().toISOString(),
          }

          setMessages((prev) => [...prev, assistantMessage])
        } else {
          // Default response for non-plugin queries
          setTimeout(() => {
            const assistantMessage = {
              id: uuidv4(),
              sender: "assistant",
              content: getDefaultResponse(content),
              type: "text",
              timestamp: new Date().toISOString(),
            }

            setMessages((prev) => [...prev, assistantMessage])
          }, 1000)
        }
      }
    } catch (error) {
      console.error("Error processing message:", error)

      // Error message
      const errorMessage = {
        id: uuidv4(),
        sender: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        type: "text",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const getDefaultResponse = (userMessage) => {
    const responses = [
      "I'm here to help! Try using one of my plugins with commands like /weather, /calc, or /define.",
      "You can ask me about the weather, calculate expressions, or look up definitions using commands or natural language.",
      "I'm your AI assistant. Try asking about the weather in a city, calculating a math expression, or defining a word.",
      "Need help? You can use slash commands like /weather Paris, /calc 5*10, or /define serendipity.",
    ]

    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      return "Hello! I'm your AI assistant. How can I help you today?"
    }

    if (userMessage.toLowerCase().includes("help")) {
      return "I can help with weather information, calculations, and word definitions. Try commands like /weather Paris, /calc 5*10, or /define serendipity."
    }

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const clearMessages = () => {
    setMessages([])
    localStorage.removeItem("chatMessages")
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, clearMessages }}>{children}</ChatContext.Provider>
  )
}
