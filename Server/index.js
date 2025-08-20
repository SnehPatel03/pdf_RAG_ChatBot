import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hyy");
});

app.post("/upload/pdf", upload.single("pdf"), (req, res) => {
  res.json({ message: "Uploaded" });
});

app.listen(3000, () => {
  console.log("Server is Listening on PORT : 3000");
});
