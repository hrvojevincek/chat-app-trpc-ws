import { useState, useEffect } from "react";
import {
  sendMessage,
  subscribeToNewMessages,
  removeLastMessage,
} from "../api/messageApi";

export function useMessages() {
  const [messages, setMessages] = useState<
    { author: string; message: string; isItalic?: boolean }[]
  >([]);

  useEffect(() => {
    const subscription = subscribeToNewMessages((newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, author: newMessage.author || "" },
      ]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendNewMessage = async (
    author: string,
    message: string,
    isItalic?: boolean
  ) => {
    await sendMessage(author, message, isItalic);
  };

  const removeLastMessageFromAuthor = async (author: string) => {
    const result = await removeLastMessage(author);
    if (result.success) {
      setMessages((prevMessages) => {
        const index = prevMessages.findIndex((msg) => msg.author === author);
        if (index !== -1) {
          return [
            ...prevMessages.slice(0, index),
            ...prevMessages.slice(index + 1),
          ];
        }
        return prevMessages;
      });
    }
    return result.success;
  };

  return { messages, sendNewMessage, removeLastMessageFromAuthor };
}
