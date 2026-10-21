import { useEffect, useMemo, useState } from 'react';
import { ConversionOptionsPanel } from './components/ConversionOptions';
import { DownloadButton } from './components/DownloadButton';
import { FileUploader } from './components/FileUploader';
import { ProgressBar } from './components/ProgressBar';
import { useConversion } from './hooks/useConversion';
import type { ConversionOptions } from './types/conversion';
import './styles.css';

const defaultOptions: ConversionOptions = {
  outputFormat: 'pdf',
  compress: true,
  passwordProtect: false,
};

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [options, setOptions] = useState(defaultOptions);
  const { status, progress, error, result, convert } = useConversion();
  const downloadUrl = useMemo(() => (result ? URL.createObjectURL(result.file) : null), [result]);

  useEffect(() => () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  }, [downloadUrl]);

  const isConverting = status === 'converting';

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="SecurePDF home">
          <span className="brand-mark" aria-hidden="true">S</span>
          Secure<span>PDF</span>
        </a>
        <span className="security-note"><span aria-hidden="true">●</span> Files are processed securely</span>
      </header>

      <section className="hero">
        <span className="eyebrow">Simple. Private. Reliable.</span>
        <h1>Convert files to <em>PDF</em></h1>
        <p>Transform your documents in seconds. Your files are handled securely and never stored longer than necessary.</p>
      </section>

      <section className="workspace" aria-label="File conversion">
        <div className="primary-column">
          <FileUploader file={file} disabled={isConverting} onFileSelected={setFile} />
          <ProgressBar progress={progress} visible={isConverting} />
          {error && <p className="error-message" role="alert">{error}</p>}
          {status === 'success' && result && (
            <div className="success-message" role="status">
              <span aria-hidden="true">✓</span>
              <div><strong>Your file is ready.</strong><small>{result.fileName}</small></div>
            </div>
          )}
          <DownloadButton url={downloadUrl} fileName={result?.fileName} />
          <button
            type="button"
            className="convert-button"
            disabled={!file || isConverting}
            onClick={() => file && convert(file, options)}
          >
            {isConverting ? 'Converting...' : status === 'success' ? 'Convert another file' : 'Convert to PDF'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <ConversionOptionsPanel options={options} disabled={isConverting} onChange={setOptions} />
      </section>

      <footer><span>SecurePDF</span> · Your privacy is our priority</footer>
    </main>
  );
}
