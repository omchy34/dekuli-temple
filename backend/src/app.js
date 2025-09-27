import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Define CORS options
const allowedOrigins = [
  process.env.FRONTEND_CORS_ORIGIN,
  process.env.ADMIN_CORS_ORIGIN,
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Allow requests with no origin (like Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS')); // Respond with error if origin is not allowed
    }
  },
  methods: "POST, GET, DELETE, PATCH, HEAD, PUT", // Allow these HTTP methods
}));


app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import uploadRoutes from "./routes/docs.routes.js";

// Routes declaration
app.use("/api/v1", uploadRoutes);


export { app };