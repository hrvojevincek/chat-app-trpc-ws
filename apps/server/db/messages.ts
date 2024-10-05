let messages: {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
}[] = [];

export function addMessage(message: { userId: string; message: string }) {
  const newMessage = { userId: message.userId, message: message.message };
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
