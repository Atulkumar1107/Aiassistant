export const parseMessage = (message) => {
  // Check if the message starts with a slash command
  if (message.startsWith("/")) {
    const parts = message.substring(1).split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    return {
      isCommand: true,
      command,
      args,
    }
  }

  return {
    isCommand: false,
    command: null,
    args: [],
  }
}
