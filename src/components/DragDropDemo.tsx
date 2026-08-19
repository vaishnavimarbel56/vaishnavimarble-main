import React from "react";
import DragDrop from "./DragDrop";

export const DragDropDemo: React.FC = () => {
  const handleFiles = (files: File[]) => {
    // This demo intentionally does not upload to a server.
    // Replace this with your upload logic (S3 signed URL, API endpoint, etc.).
    console.log("Selected files:", files);
    alert(`Selected ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Drag & Drop Demo</h2>
      <p>
        Responsive drag-and-drop component with mobile touch support. Tap to open file picker on
        mobile.
      </p>

      <DragDrop accept="image/*,application/pdf" maxFiles={6} onFilesChanged={handleFiles} />

      <p style={{ marginTop: 16 }}>
        Integration notes: to actually upload files serverless, implement a function that exchanges
        files for signed URLs (S3) or POSTs the files to an API Gateway / serverless function.
      </p>
    </div>
  );
};

export default DragDropDemo;
