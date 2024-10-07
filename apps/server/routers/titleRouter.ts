import { t } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export const titleRouter = t.router({
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
