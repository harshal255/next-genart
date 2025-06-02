import express from "express";
import config from "./config/index.js";
import cors from 'cors'
import connectMongoose from "./config/mongoose.js";
import ErrorHandler from "./middlewares/errorHandler.js";
import responseMiddleware from "./middlewares/responseMiddleware.js";
import userRouter from "./routes/userRoutes.js"
import imageRouter from './routes/imageRoutes.js'

const app = express();


const port = config.port ?? "9001";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(responseMiddleware);


app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);



async function startServer() {
  try {
    await connectMongoose();
    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();