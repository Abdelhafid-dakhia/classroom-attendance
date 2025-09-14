import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
  // your logic here
  res.json({ message: 'Session created', data: req.body });
});

export default router;
