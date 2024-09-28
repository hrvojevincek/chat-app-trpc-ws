import { observable } from "@trpc/server/observable";
import { t } from "../trpc";
import { z } from "zod";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query((requestObj) => {
      console.log(requestObj);
      eventEmitter.emit("update", requestObj.input.name);
      return `Hello ${requestObj.input.name}`;
    }),
  errors: t.procedure.query(() => {
    throw new Error("This is an error message");
  }),
  hello: t.procedure.query(() => {
    eventEmitter.emit("update", "Hello World AGAIN");
    return "Hello World AGAIN";
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
