"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@trpc/server/adapters/express");
const express_2 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./routers/router");
const app = (0, express_2.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use("/trpc", (0, express_1.createExpressMiddleware)({
    router: router_1.appRouter,
    createContext: ({ req, res }) => {
        return {};
    },
}));
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
