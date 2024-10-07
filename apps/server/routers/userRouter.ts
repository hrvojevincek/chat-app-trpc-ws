import { t } from "../trpc";
import { z } from "zod";
import { addUser, getUser, getUsers } from "../db/users";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export const userRouter = t.router({
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

  getUsers: t.procedure.query(() => {
    return getUsers();
  }),

  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return getUser(input.id);
    }),
});
