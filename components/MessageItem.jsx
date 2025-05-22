"use client"

import { useState, useEffect } from "react"
import WeatherPlugin from "./plugins/WeatherPlugin"
import CalculatorPlugin from "./plugins/CalculatorPlugin"
import DictionaryPlugin from "./plugins/DictionaryPlugin"

const MessageItem = ({ message }) => {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const messageTime = new Date(message.timestamp)
      const diffInSeconds = Math.floor((now - messageTime) / 1000)

      if (diffInSeconds < 60) {
        setTimeAgo("just now")
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        setTimeAgo(`${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`)
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        setTimeAgo(`${hours} ${hours === 1 ? "hour" : "hours"} ago`)
      } else {
        const days = Math.floor(diffInSeconds / 86400)
        setTimeAgo(`${days} ${days === 1 ? "day" : "days"} ago`)
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000)
    return () => clearInterval(interval)
  }, [message.timestamp])

  const renderPluginContent = () => {
    if (message.type !== "plugin" || !message.pluginData) return null

    switch (message.pluginName) {
      case "weather":
        return <WeatherPlugin data={message.pluginData} />
      case "calc":
        return <CalculatorPlugin data={message.pluginData} />
      case "define":
        return <DictionaryPlugin data={message.pluginData} />
      default:
        return null
    }
  }

  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
        }`}
      >
        {message.type === "text" ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <>
            <p className="whitespace-pre-wrap mb-2">{message.content}</p>
            {renderPluginContent()}
          </>
        )}
        <div className={`text-xs mt-1 ${isUser ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>{timeAgo}</div>
      </div>
    </div>
  )
}

export default MessageItem
