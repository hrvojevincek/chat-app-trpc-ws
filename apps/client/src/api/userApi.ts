import { trpc } from "./trpcClient";

export async function createUser(name: string) {
  return trpc.addUser.mutate({ name });
}

export async function getUsers() {
  return trpc.getUsers.query();
}

export function subscribeToNewUsers(
  onNewUser: (user: { id: string; name: string }) => void
) {
  return trpc.onNewUser.subscribe(undefined, {
    onData: onNewUser,
  });
}
