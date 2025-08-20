import { Upload } from "lucide-react";
import * as React from "react";

const FileUpload: React.FC = () => {
  const handleFileUploadBtnClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");

    /* Listner */
    el.addEventListener("change",async (eve) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append("pdf", file);

          await fetch("http://localhost:3000/upload/pdf",{
            method:'POST',
            body:formData
          })

          console.log("File Uploade Successfully!!")
        }
      }
    });

    el.click();
  };

  return (
    <div>
      <div
        className="text-lg shadow-2xl flex justify-center items-center flex-col gap-3 border-2 py-7 px-10 rounded-2xl hover:bg-slate-700 duration-500"
        onClick={handleFileUploadBtnClick}
      >
        <h1 className="font-bold  text-xl">Upload Your PDF Here...</h1>
        <Upload size={45} />
      </div>
    </div>
  );
};

export default FileUpload;
