import express from "express";
import * as path from "path";
import sessionRoutes from "./routes/session"; // 👈 ton router

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// ✅ Monte les routes de session
app.use("/api/session", sessionRoutes);

// servir le build React
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`API ready at http://localhost:${PORT}`);
});
