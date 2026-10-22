import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  File,
  FileImage,
  FileOutput,
  FileText,
  Image as ImageIcon,
  Sparkles,
  X,
} from 'lucide-react';
import { FileUploader } from './components/FileUploader';
import { ProgressBar } from './components/ProgressBar';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';
import { GearshiftSpinner } from './components/GearshiftSpinner';
import { Header } from './components/Header';
import { useConversion } from './hooks/useConversion';
import type { ConversionOptions, OutputFormat } from './types/conversion';
import type { Language } from './i18n';
import { translate } from './i18n';
import { friendlyError } from './services/errorMessages';
import './styles.css';
import './styles/logo-animations.css';

type View = 'home' | 'convert' | 'processing' | 'done';

interface Tool {
  id: string;
  target: OutputFormat;
  accepts: string[];
  icon: typeof FileText;
  accent: string;
  badge?: string;
  labelKey: Parameters<typeof translate>[1];
  descriptionKey: Parameters<typeof translate>[1];
}

const tools: Tool[] = [
  { id: 'office-pdf', target: 'pdf', labelKey: 'officePdf', descriptionKey: 'officePdfDescription', accepts: ['doc', 'docx', 'odt', 'rtf', 'xls', 'xlsx', 'ods', 'ppt', 'pptx', 'odp'], icon: FileText, accent: 'blue' },
  { id: 'word-pdf', target: 'pdf', labelKey: 'wordPdf', descriptionKey: 'wordPdfDescription', accepts: ['doc', 'docx'], icon: FileText, accent: 'violet' },
  { id: 'image-pdf', target: 'pdf', labelKey: 'imagePdf', descriptionKey: 'imagePdfDescription', accepts: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'], icon: ImageIcon, accent: 'rose' },
  { id: 'pdf-png', target: 'png', labelKey: 'pdfImage', descriptionKey: 'pdfImageDescription', accepts: ['pdf'], icon: FileImage, accent: 'amber' },
  { id: 'pdf-jpg', target: 'jpg', labelKey: 'pdfJpg', descriptionKey: 'pdfJpgDescription', accepts: ['pdf'], icon: ImageIcon, accent: 'orange' },
  { id: 'pdf-word', target: 'docx', labelKey: 'pdfWord', descriptionKey: 'pdfWordDescription', accepts: ['pdf'], icon: FileOutput, accent: 'violet', badge: 'Beta' },
];

const defaultOptions: ConversionOptions = {
  target: 'pdf',
  page: 1,
  dpi: 150,
  preserve_layout: true,
};

function Hero({ language }: { language: Language }) {
  return (
    <section className="hero">
      <div className="hero-pill"><Sparkles size={15} /> {translate(language, 'heroBadge')}</div>
      <h1>{translate(language, 'heroTitle')}</h1>
      <p>{translate(language, 'heroDescription')}</p>
    </section>
  );
}

function ToolGrid({ onPick, language }: { onPick: (tool: Tool) => void; language: Language }) {
  return (
    <section className="tool-grid" aria-label="Conversion tools">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button className="tool-card" key={tool.id} onClick={() => onPick(tool)} type="button">
            <span className={`tool-icon tool-icon--${tool.accent}`}><Icon size={24} /></span>
            <span className="tool-title">{translate(language, tool.labelKey)}{tool.badge && <small>{tool.badge}</small>}</span>
            <span className="tool-description">{translate(language, tool.descriptionKey)}</span>
          </button>
        );
      })}
    </section>
  );
}

function ConvertPanel({
  tool,
  file,
  options,
  disabled,
  onFile,
  onOptions,
  onBack,
  onStart,
  language,
}: {
  tool: Tool;
  file: File | null;
  options: ConversionOptions;
  disabled: boolean;
  onFile: (file: File | null) => void;
  onOptions: (options: ConversionOptions) => void;
  onBack: () => void;
  onStart: () => void;
  language: Language;
}) {
  return (
    <section className="convert-panel">
      <button className="back-button" onClick={onBack} type="button" disabled={disabled}><ArrowLeft size={16} /> {translate(language, 'allTools')}</button>
      <h2>{translate(language, 'convertTo')} {tool.target.toUpperCase()}</h2>
      <p className="panel-subtitle">{translate(language, 'uploadPrompt')}</p>
      <FileUploader language={language} file={file} disabled={disabled} acceptedExtensions={tool.accepts} onFileSelected={onFile} />
      {file && (
        <div className="selected-file">
          <span className="file-icon"><File size={19} /></span>
          <span className="selected-file-info"><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(2)} MB</small></span>
          <button type="button" onClick={() => onFile(null)} disabled={disabled} aria-label={translate(language, 'removeFile')}><X size={17} /></button>
        </div>
      )}
      {(tool.target === 'png' || tool.target === 'jpg') && (
        <div className="inline-options">
          <label>{translate(language, 'page')}<input type="number" min="1" value={options.page ?? 1} disabled={disabled} onChange={(event) => onOptions({ ...options, page: Math.max(1, Number(event.target.value)) })} /></label>
          <label>{translate(language, 'dpi')}<input type="number" min="72" max="600" value={options.dpi ?? 150} disabled={disabled} onChange={(event) => onOptions({ ...options, dpi: Math.min(600, Math.max(72, Number(event.target.value))) })} /></label>
        </div>
      )}
      {tool.target === 'docx' && <p className="beta-note">⚠ {translate(language, 'betaNote')}</p>}
      <button className="primary-button start-button" disabled={!file || disabled} onClick={onStart} type="button">{translate(language, 'convertTo')} {tool.target.toUpperCase()} <span>→</span></button>
    </section>
  );
}

function DoneView({ filename, onDownload, onRestart, language }: { filename: string; onDownload: () => void; onRestart: () => void; language: Language }) {
  return (
    <section className="done-view">
      <div className="done-icon"><Check size={38} /></div>
      <h2>{translate(language, 'doneTitle')}</h2>
      <p>{translate(language, 'fileReady')}</p>
      <button className="primary-button" onClick={onDownload} type="button">{translate(language, 'download')} {filename}</button>
      <button className="restart-button" onClick={onRestart} type="button">{translate(language, 'convertAnother')}</button>
    </section>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'es');
  const [view, setView] = useState<View>('home');
  const [tool, setTool] = useState<Tool | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [options, setOptions] = useState(defaultOptions);
  const { status, progress, error, errorCode, result, convert } = useConversion();
  const downloadUrl = useMemo(() => (result ? URL.createObjectURL(result.file) : null), [result]);

  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);
  useEffect(() => {
    if (status === 'success') setView('done');
    if (status === 'error') setView('convert');
  }, [status]);

  const selectTool = (selected: Tool) => {
    setTool(selected);
    setFile(null);
    setOptions({ ...defaultOptions, target: selected.target });
    setView('convert');
  };
  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };
  const restart = () => { setTool(null); setFile(null); setView('home'); };
  const download = () => { if (downloadUrl && result) { const link = document.createElement('a'); link.href = downloadUrl; link.download = result.fileName; link.click(); } };

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={changeLanguage} />
      <main className="container main-content">
        {view === 'home' && <><Hero language={language} /><ToolGrid language={language} onPick={selectTool} /></>}
        {view === 'convert' && tool && (
          <>
            <ConvertPanel language={language} tool={tool} file={file} options={options} disabled={status === 'converting'} onFile={setFile} onOptions={setOptions} onBack={restart} onStart={() => { setView('processing'); if (file) void convert(file, options); }} />
            {error && <ErrorBanner message={friendlyError(errorCode, language)} code={errorCode} errorCodeLabel={translate(language, 'errorCode')} />}
          </>
        )}
        {view === 'processing' && tool && <section className="processing-view"><GearshiftSpinner size={56} /><h2>{translate(language, 'convertTo')} {tool.target.toUpperCase()}...</h2><p>{translate(language, 'secureProcessing')}</p><ProgressBar progress={progress} visible /><span className="processing-caption">{translate(language, 'processingWait')}</span></section>}
        {view === 'done' && result && <DoneView language={language} filename={result.fileName} onDownload={download} onRestart={restart} />}
      </main>
      <Footer language={language} />
    </div>
  );
}
