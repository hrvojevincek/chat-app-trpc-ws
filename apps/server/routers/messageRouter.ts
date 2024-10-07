import { t } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { addMessage, removeLastMessageFromAuthor } from "../db/messages";

const eventEmitter = new EventEmitter();

export const messageRouter = t.router({
  sendMessage: t.procedure
    .input(
      z.object({
        author: z.string(),
        message: z.string(),
        isItalic: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
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
});
