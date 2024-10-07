let messages: {
  id: string;
  author: string;
  message: string;
  isItalic?: boolean;
  timestamp: Date;
}[] = [];

export function addMessage(message: {
  author: string;
  message: string;
  isItalic?: boolean;
}) {
  const newMessage = { author: message.author, message: message.message };
  const id = crypto.randomUUID();
  const timestamp = new Date();
  messages.push({ id, timestamp, ...newMessage });
}

export function getMessages() {
  return messages;
}

export function editMessage(id: string, newMessage: string) {
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    message.message = newMessage;
  }
}

export function removeLastMessageFromAuthor(author: string) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].author === author) {
      const removedMessage = messages.splice(i, 1)[0];
      return removedMessage;
    }
  }
  return null;
}
