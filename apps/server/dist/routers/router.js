"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.appRouter = trpc_1.t.router({
    greeting: trpc_1.t.procedure
        .input(zod_1.z.object({ name: zod_1.z.string() }))
        .query((requestObj) => {
        console.log(requestObj);
        return `Hello ${requestObj.input.name}`;
    }),
    errors: trpc_1.t.procedure.query(() => {
        throw new Error("This is an error message");
    }),
    hello: trpc_1.t.procedure.query(() => {
        return "Hello World AGAIN";
    }),
});
