import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import Cors from "cors";
import path from "path";
import { router } from "./routes";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(Cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  })
);
app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Server is running")
);
