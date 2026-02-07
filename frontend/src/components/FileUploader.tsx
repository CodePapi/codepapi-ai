import React, { useRef, useState } from 'react';

interface Props {
  onFileRead: (content: string, filename?: string) => void;
  disabled?: boolean;
}

const FileUploader = ({ onFileRead, disabled }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      onFileRead(result, file.name);
    };
    reader.readAsText(file);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    readFile(files[0]);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".js,.ts,.jsx,.tsx,.py,.java,.cs,.cpp,.txt"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (disabled) return;
          handleFiles(e.dataTransfer.files);
        }}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
          disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-800'
        } ${dragOver ? 'bg-slate-800' : ''}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-300"
          role="img"
        >
          <title>Upload file</title>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 5 17 10" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </svg>
        <span>{disabled ? 'Upload (disabled)' : 'Upload / Drop'}</span>
      </button>
    </div>
  );
};

export default FileUploader;
