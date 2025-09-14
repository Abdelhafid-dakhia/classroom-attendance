import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// API routes
app.use("/api/sessions", require("./routes/session"));

// Serve React build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`API + Client ready at http://localhost:${PORT}`);
});
