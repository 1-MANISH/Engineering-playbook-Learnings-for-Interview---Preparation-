require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const launchRoutes = require("./routes/launches");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
        return res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/launches", launchRoutes);

app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = app;
