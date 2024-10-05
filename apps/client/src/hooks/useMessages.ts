import { useState, useEffect } from "react";
import { sendMessage, subscribeToNewMessages } from "../api/messageApi";

export function useMessages() {
  const [messages, setMessages] = useState<
    { userId: string; message: string }[]
  >([]);

  useEffect(() => {
    const subscription = subscribeToNewMessages((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendNewMessage = async (userId: string, message: string) => {
    await sendMessage(userId, message);
  };

  return { messages, sendNewMessage };
}
