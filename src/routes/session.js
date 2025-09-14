import { Router } from "express";
import prisma from "../services/prisma";
const router = Router();
router.post("/", async (req, res) => {
    const { courseName, teacher } = req.body;
    if (!courseName || !teacher)
        return res.status(400).json({ error: "Missing fields" });
    const session = await prisma.session.create({
        data: { courseName, teacher },
    });
    res.json({ nonce: session.qrNonce, id: session.id });
});
export default router;
