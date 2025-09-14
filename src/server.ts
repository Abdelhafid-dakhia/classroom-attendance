import express = require('express');
import cors = require('cors');
import * as dotenv from 'dotenv';
import sessionRoutes from './routes/session';
import * as path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API routes
app.get('/health', (_, res) => res.send('OK'));
app.use('/api/session', sessionRoutes);

// servir le build React
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_: any, res: any) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.listen(PORT, () => console.log(`API ready at http://localhost:${PORT}`));