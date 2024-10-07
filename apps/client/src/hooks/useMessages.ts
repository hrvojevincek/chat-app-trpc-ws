import { useState, useEffect } from "react";
import {
  sendMessage,
  subscribeToNewMessages,
  subscribeToRemovedMessages,
  removeLastMessage,
} from "../api/messageApi";

export function useMessages() {
  const [messages, setMessages] = useState<
    { id: string; author: string; message: string; isItalic?: boolean }[]
  >([]);

  useEffect(() => {
    const newMessageSubscription = subscribeToNewMessages((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // const removedMessageSubscription = subscribeToRemovedMessages(
    //   (removedMessage) => {
    //     setMessages((prevMessages) =>
    //       prevMessages.filter((msg) => msg.id !== removedMessage.id)
    //     );
    //   }
    // );
    const removedMessageSubscription = subscribeToRemovedMessages(
      (removedMessage) => {
        console.log("Removed message received:", removedMessage);
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.filter(
            (msg) => msg.id !== removedMessage.id
          );
          console.log("Updated messages after removal:", updatedMessages);
          return updatedMessages;
        });
      }
    );

    return () => {
      newMessageSubscription.unsubscribe();
      removedMessageSubscription.unsubscribe();
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
        const lastMessageIndex = prevMessages.findLastIndex(
          (msg) => msg.author === author
        );

        if (lastMessageIndex !== -1) {
          return [
            ...prevMessages.slice(0, lastMessageIndex),
            ...prevMessages.slice(lastMessageIndex + 1),
          ];
        }

        return prevMessages;
      });
    }

    return result.success;
  };

  return { messages, sendNewMessage, removeLastMessageFromAuthor };
}
