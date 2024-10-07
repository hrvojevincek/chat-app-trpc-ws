import { trpc } from "./trpcClient";

export async function sendMessage(
  author: string,
  message: string,
  isItalic?: boolean
) {
  return trpc.messages.sendMessage.mutate({ author, message, isItalic });
}

export function subscribeToNewMessages(
  onNewMessage: (data: {
    id: string;
    author: string;
    message: string;
    isItalic?: boolean;
  }) => void
) {
  return trpc.messages.onNewMessage.subscribe(undefined, {
    onData: onNewMessage,
  });
}

export async function removeLastMessage(author: string) {
  const result = await trpc.messages.removeLastMessage.mutate({ author });
  return result;
}

export function subscribeToRemovedMessages(
  onMessageRemoved: (data: {
    id: string;
    author: string;
    message: string;
    isItalic?: boolean;
  }) => void
) {
  return trpc.messages.onMessageRemoved.subscribe(undefined, {
    onData: (data) => {
      onMessageRemoved(data);
    },
  });
}
