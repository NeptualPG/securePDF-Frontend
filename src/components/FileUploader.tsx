import { useRef, useState } from 'react';
import { Logo } from './Logo';
import type { Language } from '../i18n';
import { translate } from '../i18n';

interface FileUploaderProps {
  file: File | null;
  disabled?: boolean;
  acceptedExtensions: string[];
  onFileSelected: (file: File | null) => void;
  language: Language;
}

export function FileUploader({ file, disabled = false, acceptedExtensions, onFileSelected, language }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const accept = acceptedExtensions.map((extension) => `.${extension}`).join(',');
  const pick = (candidate?: File) => { if (candidate && candidate.size <= 25 * 1024 * 1024) onFileSelected(candidate); };

  return (
    <div className={`dropzone ${dragging ? 'dropzone--active' : ''}`} onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); if (!disabled) pick(event.dataTransfer.files[0]); }}>
      <input ref={inputRef} type="file" accept={accept} disabled={disabled} onChange={(event) => pick(event.target.files?.[0])} />
      <div className="upload-icon"><Logo variant="mark-white" height={48} decorative /></div>
      <h3>{dragging ? translate(language, 'dropTitle') : translate(language, 'uploadTitle')}</h3>
      <p>{translate(language, 'browse')}</p>
      <small>{translate(language, 'maxFile')} · {acceptedExtensions.join(', ').toUpperCase()}</small>
      <button className="secondary-button" type="button" disabled={disabled} onClick={() => inputRef.current?.click()}>{translate(language, 'browse')}</button>
      {file && <span className="sr-only">Selected: {file.name}</span>}
    </div>
  );
}
