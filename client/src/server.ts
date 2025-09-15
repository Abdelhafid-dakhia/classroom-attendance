import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import sessionRoutes from './routes/session';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// API routes
app.use('/api/sessions', sessionRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Port from environment or default to 10000
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
