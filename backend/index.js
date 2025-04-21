import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
