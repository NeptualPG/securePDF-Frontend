export type OutputFormat = 'pdf';

export type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

export interface ConversionOptions {
  outputFormat: OutputFormat;
  compress: boolean;
  passwordProtect: boolean;
}

export interface ConversionResult {
  file: Blob;
  fileName: string;
}
