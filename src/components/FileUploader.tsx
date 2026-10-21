import { useRef, useState } from 'react';

interface FileUploaderProps {
  file: File | null;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
}

const acceptedTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png';

export function FileUploader({ file, disabled = false, onFileSelected }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (candidate: File | undefined) => {
    if (candidate) onFileSelected(candidate);
  };

  return (
    <div
      className={`uploader ${isDragging ? 'uploader--dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        if (!disabled) selectFile(event.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        disabled={disabled}
        onChange={(event) => selectFile(event.target.files?.[0])}
      />
      <div className="upload-icon" aria-hidden="true">↑</div>
      <h2>{file ? file.name : 'Drop your file here'}</h2>
      <p>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB selected` : 'or choose a file from your device'}</p>
      <button type="button" className="secondary-button" disabled={disabled} onClick={() => inputRef.current?.click()}>
        {file ? 'Choose a different file' : 'Browse files'}
      </button>
      <small>PDF, Office documents, JPG or PNG · up to 50 MB</small>
    </div>
  );
}
