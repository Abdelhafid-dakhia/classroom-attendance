"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const crypto_1 = require("crypto");
const router = (0, express_1.Router)();
/**
 * Create a new session
 */
router.post('/', async (req, res) => {
    try {
        const { courseName, teacher } = req.body;
        const session = await prisma_1.default.session.create({
            data: {
                courseName,
                teacher,
                qrNonce: (0, crypto_1.randomBytes)(8).toString('hex'), // generate unique nonce
            },
        });
        res.json({
            message: 'Session created',
            data: {
                id: session.id,
                qrNonce: session.qrNonce,
                courseName: session.courseName,
                teacher: session.teacher,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * List all sessions
 */
router.get('/', async (_req, res) => {
    try {
        const sessions = await prisma_1.default.session.findMany({
            select: {
                id: true,
                qrNonce: true,
                courseName: true,
                teacher: true,
            },
            orderBy: {
                createdAt: 'desc', // ordering by existing field
            },
        });
        res.json(sessions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * Get a session by QR nonce
 */
router.get('/:nonce', async (req, res) => {
    try {
        const session = await prisma_1.default.session.findUnique({
            where: { qrNonce: req.params.nonce },
            select: {
                id: true,
                qrNonce: true,
                courseName: true,
                teacher: true,
            },
        });
        if (!session)
            return res.status(404).json({ error: 'Session not found' });
        res.json(session);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * Submit attendance for a session
 */
router.post('/:nonce/attendance', async (req, res) => {
    try {
        const session = await prisma_1.default.session.findUnique({
            where: { qrNonce: req.params.nonce },
        });
        if (!session)
            return res.status(404).json({ error: 'Session not found' });
        const { fullName, studentId, email } = req.body;
        const attendance = await prisma_1.default.attendance.create({
            data: {
                sessionId: session.id,
                fullName,
                studentId,
                email,
            },
        });
        res.json({
            message: 'Attendance recorded',
            data: {
                id: attendance.id,
                sessionId: attendance.sessionId,
                fullName: attendance.fullName,
                studentId: attendance.studentId,
                email: attendance.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * Get all attendances for a session by ID
 */
router.get('/:id/attendances', async (req, res) => {
    try {
        const attendances = await prisma_1.default.attendance.findMany({
            where: { sessionId: Number(req.params.id) }, // convert string to number
            orderBy: { createdAt: 'asc' }, // must be an existing field
        });
        res.json(attendances);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
