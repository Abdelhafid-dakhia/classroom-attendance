import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import sessionRoutes from './routes/session'; // make sure your route file uses export default

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api/sessions', sessionRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`API + Client ready at http://localhost:${PORT}`);
});
``
