export type Language = 'en' | 'es';

type TranslationKey =
  | 'github'
  | 'heroBadge'
  | 'heroTitle'
  | 'heroDescription'
  | 'allTools'
  | 'uploadTitle'
  | 'dropTitle'
  | 'browse'
  | 'maxFile'
  | 'removeFile'
  | 'convertTo'
  | 'uploadPrompt'
  | 'secureProcessing'
  | 'processingWait'
  | 'doneTitle'
  | 'fileReady'
  | 'download'
  | 'convertAnother'
  | 'page'
  | 'dpi'
  | 'betaNote'
  | 'footer'
  | 'loading'
  | 'errorCode'
  | 'officePdf'
  | 'officePdfDescription'
  | 'wordPdf'
  | 'wordPdfDescription'
  | 'imagePdf'
  | 'imagePdfDescription'
  | 'pdfImage'
  | 'pdfImageDescription'
  | 'pdfJpg'
  | 'pdfJpgDescription'
  | 'pdfWord'
  | 'pdfWordDescription';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    github: 'GitHub',
    heroBadge: 'Fast, free, no sign-up',
    heroTitle: 'Every tool you need for PDFs',
    heroDescription: 'Convert, extract and transform. Pick a tool to get started.',
    allTools: 'All tools',
    uploadTitle: 'Drag & drop your file',
    dropTitle: 'Drop it here!',
    browse: 'or click to browse',
    maxFile: 'Max 25MB',
    removeFile: 'Remove selected file',
    convertTo: 'Convert to',
    uploadPrompt: 'Upload your file to begin.',
    secureProcessing: 'Your file is being processed securely.',
    processingWait: 'This may take a moment',
    doneTitle: 'All done!',
    fileReady: 'Your file is ready.',
    download: 'Download',
    convertAnother: 'Convert another file',
    page: 'Page',
    dpi: 'DPI',
    betaNote: 'PDF → Word is best-effort. Complex layouts may not transfer perfectly.',
    footer: 'Files auto-deleted after conversion.',
    loading: 'Loading',
    errorCode: 'Error code',
    officePdf: 'Office to PDF',
    officePdfDescription: 'Word, Excel, PPT → PDF',
    wordPdf: 'Word to PDF',
    wordPdfDescription: 'DOC and DOCX → PDF',
    imagePdf: 'JPG to PDF',
    imagePdfDescription: 'Images into one PDF',
    pdfImage: 'PDF to Image',
    pdfImageDescription: 'Extract pages as PNG',
    pdfJpg: 'PDF to JPG',
    pdfJpgDescription: 'Pages as JPG',
    pdfWord: 'PDF to Word',
    pdfWordDescription: 'Best-effort editable text',
  },
  es: {
    github: 'GitHub',
    heroBadge: 'Rápido, gratis y sin registro',
    heroTitle: 'Todas las herramientas que necesitas para tus PDF',
    heroDescription: 'Convierte, extrae y transforma. Elige una herramienta para comenzar.',
    allTools: 'Todas las herramientas',
    uploadTitle: 'Arrastra y suelta tu archivo',
    dropTitle: '¡Suéltalo aquí!',
    browse: 'o haz clic para buscar',
    maxFile: 'Máximo 25 MB',
    removeFile: 'Eliminar archivo seleccionado',
    convertTo: 'Convertir a',
    uploadPrompt: 'Sube tu archivo para comenzar.',
    secureProcessing: 'Tu archivo se está procesando de forma segura.',
    processingWait: 'Esto puede tardar un momento',
    doneTitle: '¡Listo!',
    fileReady: 'Tu archivo está preparado.',
    download: 'Descargar',
    convertAnother: 'Convertir otro archivo',
    page: 'Página',
    dpi: 'DPI',
    betaNote: 'PDF → Word es una conversión aproximada. Los diseños complejos pueden no transferirse perfectamente.',
    footer: 'Los archivos se eliminan automáticamente después de la conversión.',
    loading: 'Cargando',
    errorCode: 'Código de error',
    officePdf: 'Office a PDF',
    officePdfDescription: 'Word, Excel, PPT → PDF',
    wordPdf: 'Word a PDF',
    wordPdfDescription: 'DOC y DOCX → PDF',
    imagePdf: 'JPG a PDF',
    imagePdfDescription: 'Convierte imágenes en PDF',
    pdfImage: 'PDF a imagen',
    pdfImageDescription: 'Extrae páginas como PNG',
    pdfJpg: 'PDF a JPG',
    pdfJpgDescription: 'Convierte páginas a JPG',
    pdfWord: 'PDF a Word',
    pdfWordDescription: 'Texto editable aproximado',
  },
};

export function translate(language: Language, key: TranslationKey): string {
  return translations[language][key];
}
