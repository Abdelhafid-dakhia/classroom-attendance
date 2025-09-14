import express from "express";
import path from "path";

const app = express();

// 👉 utilise "build" pour CRA
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API ready at http://localhost:${PORT}`);
});
