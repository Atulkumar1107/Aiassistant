import MessageItem from "./MessageItem"

const MessageList = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500 dark:text-gray-400">
        <h2 className="text-2xl font-bold mb-2">Welcome to AI Chat Assistant</h2>
        <p className="mb-6">Try these commands to get started:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <CommandCard command="/weather" description="Get weather information" example="/weather Paris" />
          <CommandCard command="/calc" description="Calculate expressions" example="/calc 5 * (10 + 2)" />
          <CommandCard command="/define" description="Look up definitions" example="/define serendipity" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}

const CommandCard = ({ command, description, example }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <div className="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">{command}</div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded">
        {example}
      </div>
    </div>
  )
}

export default MessageList
