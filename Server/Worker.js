import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    // console.log("job", job.data);
    const data = JSON.parse(job.data);
    //Load PDF
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 350,
    });

    const splitedDocs = await splitter.splitDocuments(docs);
    console.log("Chunked Docs", splitedDocs.length, "chunkes Created");

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

    await vectorStore.addDocuments(splitedDocs);
    console.log("All docs have been embedded & stored in Qdrant");
  },

  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: "6379",
    },
  }
);
