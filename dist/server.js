"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const session_1 = __importDefault(require("./routes/session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 10000;
// Middleware
app.use(express_1.default.json());
// ✅ Security headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false, // disable CSP unless you configure it
}));
app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    next();
});
// ✅ Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API routes
app.use('/api/sessions', session_1.default);
// ✅ Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path_1.default.join(__dirname, '../client/dist');
    app.use(express_1.default.static(clientDistPath));
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(clientDistPath, 'index.html'));
    });
}
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode at http://localhost:${PORT}`);
});
