import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { Queue } from "bullmq";
import path from "path";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyAArTUlZLhH7uD7IsVpMFDxd5Z7JBUoNj0");

//Config and Make a Queue
const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: "6379",
  },
});

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

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );

  res.json({ success: true, file: req.file });
});

app.get("/chat", async (req, res) => {
  const userQuery = req.query.message;

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: "AIzaSyAArTUlZLhH7uD7IsVpMFDxd5Z7JBUoNj0",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "pdf-ChatBot",
    }
  );

  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `You are a helpful AI assistant who answers user queries based on the context from the PDF file.
Context: ${JSON.stringify(result)}
`;

  // Create Gemini model instance
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate response
  const chatResult = await model.generateContent([
    SYSTEM_PROMPT,
    `User Question: ${userQuery}`,
  ]);

  return res.json({
    message: chatResult.response.text(),
    docs: result,
  });
});

app.listen(3000, () => {
  console.log("Server is Listening on PORT : 3000");
});
