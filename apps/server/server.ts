import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import express from "express";
import cors from "cors";
import { appRouter } from "./routers/router";
import ws from "ws";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {};
    },
  })
);

const server = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const wss = new WebSocketServer({
  server,
});
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: () => {
    return {};
  },
});

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
