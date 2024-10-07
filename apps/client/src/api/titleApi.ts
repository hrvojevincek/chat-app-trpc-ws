import { trpc } from "./trpcClient";

export async function changeTitle(title: string) {
  return trpc.changeTitle.mutate({ title });
}

export function subscribeToTitleChanges(
  onTitleChanged: (title: string) => void
) {
  return trpc.onTitleChanged.subscribe(undefined, {
    onData: onTitleChanged,
  });
}
