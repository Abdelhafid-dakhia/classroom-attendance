"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 10000;
// API routes
app.use("/api/sessions", require("./routes/session"));
// Serve React build
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/dist/index.html"));
});
app.listen(PORT, () => {
    console.log(`API + Client ready at http://localhost:${PORT}`);
});
