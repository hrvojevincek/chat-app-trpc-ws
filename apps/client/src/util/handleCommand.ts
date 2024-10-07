export function handleCommand(message: string) {
  const commandRegex = /^\/(\w+)\s?(.*)$/;
  const match = message.match(commandRegex);

  if (match) {
    const command = match[1];
    const messageContent = match[2];
    return { command, messageContent };
  }
  return { command: null, messageContent: message };
}
