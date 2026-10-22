export type OutputFormat =
  | 'pdf' | 'doc' | 'docx' | 'rtf' | 'odt'
  | 'xls' | 'xlsx' | 'ods' | 'ppt' | 'pptx' | 'odp'
  | 'png' | 'jpg';

export type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

export interface ConversionOptions {
  target: OutputFormat;
  page?: number;
  dpi?: number;
  preserve_layout?: boolean;
}

export interface ConversionResult {
  file: Blob;
  fileName: string;
}

export const supportedTargets: Record<string, OutputFormat[]> = {
  docx: ['pdf'],
  doc: ['pdf'],
  rtf: ['pdf'],
  odt: ['pdf'],
  xlsx: ['pdf'],
  xls: ['pdf'],
  ods: ['pdf'],
  pptx: ['pdf'],
  ppt: ['pdf'],
  odp: ['pdf'],
  jpg: ['pdf'],
  jpeg: ['pdf'],
  png: ['pdf'],
  webp: ['pdf'],
  gif: ['pdf'],
  bmp: ['pdf'],
  pdf: ['docx', 'png', 'jpg'],
};
