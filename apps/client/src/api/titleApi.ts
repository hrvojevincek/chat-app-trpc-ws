import { trpc } from "./trpcClient";

export async function changeTitle(title: string) {
  return trpc.title.changeTitle.mutate({ title });
}

export function subscribeToTitleChanges(
  onTitleChanged: (title: string) => void
) {
  return trpc.title.onTitleChanged.subscribe(undefined, {
    onData: onTitleChanged,
  });
}
