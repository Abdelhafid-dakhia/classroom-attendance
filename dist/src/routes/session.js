"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const router = (0, express_1.Router)();
// POST /api/session  → créer une session, retourne le qrNonce
router.post('/', async (req, res) => {
    const { courseName, teacher } = req.body;
    if (!courseName || !teacher)
        return res.status(400).json({ error: 'Missing fields' });
    const session = await prisma_1.default.session.create({
        data: { courseName, teacher },
    });
    res.json({ nonce: session.qrNonce, id: session.id });
});
// GET /api/session/:nonce → vérifier la session
router.get('/:nonce', async (req, res) => {
    const s = await prisma_1.default.session.findUnique({ where: { qrNonce: req.params.nonce } });
    if (!s)
        return res.status(404).json({ error: 'Invalid or expired QR' });
    res.json({ courseName: s.courseName, teacher: s.teacher, id: s.id });
});
// POST /api/session/attendance → enregistrer la présence
router.post('/attendance', async (req, res) => {
    const { sessionId, fullName, studentId, email } = req.body;
    if (!sessionId || !fullName || !studentId)
        return res.status(400).json({ error: 'Missing fields' });
    await prisma_1.default.attendance.create({
        data: { sessionId, fullName, studentId, email },
    });
    res.json({ ok: true });
});
// GET /api/session/:id/report → liste des présents
router.get('/:id/report', async (req, res) => {
    const list = await prisma_1.default.attendance.findMany({
        where: { sessionId: req.params.id },
        orderBy: { submitted: 'asc' },
    });
    res.json(list);
});
exports.default = router;
