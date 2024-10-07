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
  return trpc.removeLastMessage.mutate({ author });
}
