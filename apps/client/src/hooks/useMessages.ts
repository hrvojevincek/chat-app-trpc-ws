import { useState, useEffect } from "react";
import { sendMessage, subscribeToNewMessages } from "../api/messageApi";

export function useMessages() {
  const [messages, setMessages] = useState<
    { author: string; message: string }[]
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

  const sendNewMessage = async (author: string, message: string) => {
    await sendMessage(author, message);
  };

  return { messages, sendNewMessage };
}
