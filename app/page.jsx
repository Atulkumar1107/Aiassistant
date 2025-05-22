"use client"
import ChatInterface from "@/components/ChatInterface"
import { ChatProvider } from "@/context/ChatContext"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl mx-auto h-screen py-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden h-full border border-gray-200 dark:border-gray-700">
          <ChatProvider>
            <ChatInterface />
          </ChatProvider>
        </div>
      </div>
    </main>
  )
}
