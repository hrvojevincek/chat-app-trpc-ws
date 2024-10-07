import { trpc } from "./trpcClient";

export async function sendMessage(
  author: string,
  message: string,
  isItalic?: boolean
) {
  return trpc.sendMessage.mutate({ author, message, isItalic });
}

export function subscribeToNewMessages(
  onNewMessage: (data: {
    id: string;
    author: string;
    message: string;
    isItalic?: boolean;
  }) => void
) {
  return trpc.onNewMessage.subscribe(undefined, {
    onData: onNewMessage,
  });
}

export async function removeLastMessage(author: string) {
  const result = await trpc.removeLastMessage.mutate({ author });
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
  return trpc.onMessageRemoved.subscribe(undefined, {
    onData: (data) => {
      onMessageRemoved(data);
    },
  });
}
