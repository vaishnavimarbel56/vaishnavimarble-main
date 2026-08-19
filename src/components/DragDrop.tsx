import React, { useRef, useState } from "react";
import "./DragDrop.css";

export type DragDropProps = {
  accept?: string; // e.g. "image/*"
  maxFiles?: number;
  onFilesChanged?: (files: File[]) => void;
  className?: string;
};

export const DragDrop: React.FC<DragDropProps> = ({
  accept = "*/*",
  maxFiles = 10,
  onFilesChanged,
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateFiles = (next: File[]) => {
    const limited = next.slice(0, maxFiles);
    setFiles(limited);
    onFilesChanged?.(limited);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    updateFiles(arr);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className={`vaish-dragdrop-root ${className}`}>
      <div
        className={`vaish-dropzone ${dragActive ? "vaish-dropzone--active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFilePicker();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="vaish-file-input"
          onChange={onInputChange}
        />

        <div className="vaish-dropzone__content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="vaish-drop-illustration"
            aria-hidden
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 5 17 10" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>

          <div className="vaish-droptext">
            <strong>Drag & drop files here</strong>
            <span>or tap to choose (supports mobile)</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="vaish-file-list">
          {files.map((f, i) => (
            <div key={`${f.name}-${i}`} className="vaish-file-item">
              <div className="vaish-file-meta">
                <div className="vaish-file-name">{f.name}</div>
                <div className="vaish-file-size">{(f.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
