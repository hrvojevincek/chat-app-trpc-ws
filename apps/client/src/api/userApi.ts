import { trpc } from "./trpcClient";

export async function createUser(name: string) {
  return trpc.users.addUser.mutate({ name });
}

export async function getUsers() {
  return trpc.users.getUsers.query();
}

export async function getCurrentUser(id: string) {
  return trpc.users.getUser.query({ id });
}

export function subscribeToNewUsers(
  onNewUser: (user: { id: string; name: string }) => void
) {
  return trpc.users.onNewUser.subscribe(undefined, {
    onData: onNewUser,
  });
}
