import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { postRouter } from "./routes/postsRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { commentRouter } from "./routes/commentsRouts.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./config/env.js";

const app = express(); 

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: env.SWAGGER_SERVER_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(
  cors({
    origin: 'https://effervescent-florentine-67b4f3.netlify.app',
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use((req, res, next) => {
  console.log("Hello From the Middleware");
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", authMiddleware, postRouter);
app.use("/api/comments", authMiddleware, commentRouter);

export default app;
