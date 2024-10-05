import { observable } from "@trpc/server/observable";
import { t } from "../trpc";
import { z } from "zod";
import EventEmitter from "events";
import { addUser, getUser, getUsers } from "../db/users";
import { addMessage } from "../db/messages";

const eventEmitter = new EventEmitter();

export const appRouter = t.router({
  addUser: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const newUser = addUser(input);
      eventEmitter.emit("newUser", newUser);
      return { id: newUser.id, name: newUser.name };
    }),
  onNewUser: t.procedure.subscription(() => {
    return observable<{ id: string; name: string }>((emit) => {
      const onNewUser = (user: { id: string; name: string }) => {
        emit.next(user);
      };
      eventEmitter.on("newUser", onNewUser);
      return () => {
        eventEmitter.off("newUser", onNewUser);
      };
    });
  }),

  // Get all users
  getUsers: t.procedure.query(() => {
    return getUsers();
  }),

  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return getUser(input.id);
    }),

  sendMessage: t.procedure
    .input(z.object({ author: z.string(), message: z.string() }))
    .mutation(({ input }) => {
      // Emit a 'newMessage' event
      addMessage(input);
      eventEmitter.emit("newMessage", input);
      return { success: true };
    }),

  onNewMessage: t.procedure.subscription(() => {
    return observable<{ author: string; message: string }>((emit) => {
      const onNewMessage = (data: { author: string; message: string }) => {
        emit.next(data);
      };
      eventEmitter.on("newMessage", onNewMessage);
      return () => {
        eventEmitter.off("newMessage", onNewMessage);
      };
    });
  }),

  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
