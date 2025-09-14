"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 10000;
// Parse JSON bodies
app.use(express_1.default.json());
// API routes
app.use("/api/sessions", require("./routes/sessions"));
// Serve React build
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
// Catch-all route to serve index.html for client-side routing
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
});
// Start server
app.listen(PORT, () => {
    console.log(`API + Client ready at http://localhost:${PORT}`);
});
``;
