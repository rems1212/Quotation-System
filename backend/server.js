// server.js
const cors = require("cors");

app.use(cors({
  origin: "https://quotation-system-rho.vercel.app",  // <-- Vercel ka frontend link
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));