require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
