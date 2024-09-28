import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import type { AppRouter } from "../../server/routers/router";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink({
        client: createWSClient({
          url: "ws://localhost:8080/trpc",
        }),
      }),
      false: httpBatchLink({
        url: "http://localhost:8080/trpc",
      }),
    }),
  ],
});

export async function main() {
  const result = await trpc.hello.query();
  console.log(result);
  return result;
}
