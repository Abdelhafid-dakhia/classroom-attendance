import { Router } from 'express';
import prisma from '../services/prisma';
import { randomBytes } from 'crypto';

const router = Router();

/**
 * Create a new session
 */
router.post('/', async (req, res) => {
  try {
    const { courseName, teacher } = req.body;

    // qrNonce is required in schema
   const session = await prisma.session.create({
  data: {
    courseName,
    teacher,
    qrNonce: randomBytes(8).toString('hex'), // <-- required
  },
});

    res.json({
      message: 'Session created',
      data: {
        id: session.id,
        qrNonce: session.qrNonce,
        courseName: session.courseName,
        teacher: session.teacher,
        createdAt: session.createdAt,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * List all sessions
 */
router.get('/', async (_req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      select: {
        id: true,
        qrNonce: true,
        courseName: true,
        teacher: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc', // works because schema has createdAt
      },
    });

    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get a session by QR nonce
 */
router.get('/:nonce', async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { qrNonce: req.params.nonce },
      select: {
        id: true,
        qrNonce: true,
        courseName: true,
        teacher: true,
        createdAt: true,
      },
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Submit attendance for a session
 */
router.post('/:nonce/attendance', async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { qrNonce: req.params.nonce },
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const { fullName, studentId, email } = req.body;

    const attendance = await prisma.attendance.create({
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
        createdAt: attendance.createdAt,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get all attendances for a session by ID
 */
router.get('/:id/attendances', async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      where: { sessionId: Number(req.params.id) },
      orderBy: { createdAt: 'asc' }, // works because schema has createdAt
    });

    res.json(attendances);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
