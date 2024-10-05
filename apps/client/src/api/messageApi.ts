import { trpc } from "./trpcClient";

export async function sendMessage(userId: string, message: string) {
  return trpc.sendMessage.mutate({ userId, message });
}

export function subscribeToNewMessages(
  onNewMessage: (data: { userId?: string; message: string }) => void
) {
  return trpc.onNewMessage.subscribe(undefined, {
    onData: onNewMessage,
  });
}
