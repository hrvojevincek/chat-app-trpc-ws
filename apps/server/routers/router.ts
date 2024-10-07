import { t } from "../trpc";
import { userRouter } from "./userRouter";
import { titleRouter } from "./titleRouter";
import { messageRouter } from "./messageRouter";

export const appRouter = t.router({
  users: userRouter,
  title: titleRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
