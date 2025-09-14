import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
// Remplacer '/*' par une regex
app.get(/^\/.*$/, (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.listen(PORT, () => {
    console.log(`API ready at http://localhost:${PORT}`);
});
