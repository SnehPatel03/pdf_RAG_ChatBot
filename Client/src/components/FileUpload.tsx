import { Upload } from "lucide-react";
import * as React from "react";
import { SignOutButton} from '@clerk/clerk-react'


const FileUpload: React.FC = () => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUploadBtnClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");

    /* Listener */
    el.addEventListener("change", async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          setIsUploading(true);
          const formData = new FormData();
          formData.append("pdf", file);

          try {
            await fetch("http://localhost:3000/upload/pdf", {
              method: 'POST',
              body: formData
            });
            console.log("File Uploaded Successfully!!");
          } catch (error) {
            console.error("Upload failed:", error);
          } finally {
            setIsUploading(false);
          }
        }
      }
    });
    el.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("pdf", file);

        try {
          await fetch("http://localhost:3000/upload/pdf", {
            method: 'POST',
            body: formData
          });
          console.log("File Uploaded Successfully!!");
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 fixed">
      <div className='fixed top-5 left-5' >
           <button className="border-1 border-slate-400 text-slate-400 px-3 py-1 rounded-md hover:bg-red-700 hover:border-slate-800 scale-105 hover:text-slate-200 font-bold duration-500 text-sm">
              <SignOutButton />
           </button>
      </div>
      <div
        className={`
          relative cursor-pointer select-none
          bg-slate-800 border-2 border-dashed
          rounded-2xl p-12
          transition-all duration-500 ease-in-out
          hover:shadow-2xl hover:border-slate-600 hover:bg-slate-700
          active:scale-95
          ${isDragOver ? 'border-slate-500 bg-slate-700 shadow-2xl' : 'border-slate-600'}
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
        onClick={handleFileUploadBtnClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
             
        <div className="flex flex-col items-center gap-4 text-center">
          <div className={`
            p-4 rounded-full bg-slate-700 
            transition-colors duration-500
            ${isDragOver || isUploading ? 'bg-slate-600' : ''}
          `}>
            <Upload 
              size={32} 
              className={`
                text-slate-300 transition-all duration-500
                ${isDragOver ? 'text-white scale-110' : ''}
                ${isUploading ? 'text-white animate-pulse' : ''}
              `}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {isUploading ? 'Uploading...' : 'Upload PDF'}
            </h3>
            <p className="text-sm text-slate-400">
              Click to browse or drag and drop
            </p>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 bg-opacity-95 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-white font-medium">Uploading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;