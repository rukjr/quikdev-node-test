import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { options } from "./config/swaggerOptions";
import { AuthenticateToken } from "./middlewares/AuthenticateToken";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";
import HistoryRoutes from "./routes/HistoryRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

const specs = swaggerJsdoc(options);

app.use(
  cors({
    origin: "*"
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/uploads", express.static("uploads"));

app.use("/auth", AuthRoutes);

app.use("/user", AuthenticateToken, UserRoutes);
app.use("/post", AuthenticateToken, PostRoutes);
app.use("/comment", AuthenticateToken, CommentRoutes);
app.use("/history", AuthenticateToken, HistoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
