import { observable } from "@trpc/server/observable";
import { t } from "../trpc";
import { z } from "zod";
import EventEmitter from "events";
import { addUser, getUser, getUsers } from "../db/users";
import { addMessage, removeLastMessageFromAuthor } from "../db/messages";

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
    .input(
      z.object({
        author: z.string(),
        message: z.string(),
        isItalic: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
      // Emit a 'newMessage' event
      addMessage(input);
      eventEmitter.emit("newMessage", input);
      return { success: true };
    }),

  onNewMessage: t.procedure.subscription(() => {
    return observable<{
      id: string;
      author: string;
      message: string;
      isItalic?: boolean;
      timestamp: Date;
    }>((emit) => {
      const onNewMessage = (data: {
        id: string;
        author: string;
        message: string;
        isItalic?: boolean;
        timestamp: Date;
      }) => {
        emit.next(data);
      };
      eventEmitter.on("newMessage", onNewMessage);
      return () => {
        eventEmitter.off("newMessage", onNewMessage);
      };
    });
  }),

  removeLastMessage: t.procedure
    .input(z.object({ author: z.string() }))
    .mutation(({ input }) => {
      const removedMessage = removeLastMessageFromAuthor(input.author);
      if (removedMessage) {
        eventEmitter.emit("messageRemoved", removedMessage);
        return { success: true, removedMessage };
      }
      return { success: false, removedMessage: null };
    }),

  onMessageRemoved: t.procedure.subscription(() => {
    return observable<{
      id: string;
      author: string;
      message: string;
      isItalic?: boolean;
      timestamp: Date;
    }>((emit) => {
      const onMessageRemoved = (data: {
        id: string;
        author: string;
        message: string;
        isItalic?: boolean;
        timestamp: Date;
      }) => {
        emit.next(data);
      };
      eventEmitter.on("messageRemoved", onMessageRemoved);
      return () => {
        eventEmitter.off("messageRemoved", onMessageRemoved);
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
  // TODO: TITLE
  changeTitle: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      eventEmitter.emit("titleChanged", input.title);
      return { success: true };
    }),

  onTitleChanged: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      const onTitleChanged = (title: string) => {
        emit.next(title);
      };
      eventEmitter.on("titleChanged", onTitleChanged);
      return () => {
        eventEmitter.off("titleChanged", onTitleChanged);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
