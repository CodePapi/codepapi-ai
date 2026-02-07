import { UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

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
          disabled
            ? 'opacity-50 pointer-events-none'
            : 'hover:bg-slate-800 cursor-pointer'
        } ${dragOver ? 'bg-slate-800' : ''}`}
      >
        <UploadCloud size={16} className="text-slate-300" role="img" />
        <span>{disabled ? 'Upload (disabled)' : 'Upload / Drop'}</span>
      </button>
    </div>
  );
};

export default FileUploader;
