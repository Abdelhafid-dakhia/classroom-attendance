import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoutes from './routes/session';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
// endpoint de santé
app.get('/health', (_, res) => res.send('OK'));
// routes métiers
app.use('/api/session', sessionRoutes);
app.listen(PORT, () => console.log(`API ready at http://localhost:${PORT}`));
