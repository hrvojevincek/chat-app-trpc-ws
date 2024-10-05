import { trpc } from "./trpcClient";

export async function sendMessage(author: string, message: string) {
  return trpc.sendMessage.mutate({ author, message });
}

export function subscribeToNewMessages(
  onNewMessage: (data: { author: string; message: string }) => void
) {
  return trpc.onNewMessage.subscribe(undefined, {
    onData: onNewMessage,
  });
}
