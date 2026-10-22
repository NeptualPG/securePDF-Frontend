import type { ConversionOptions, ConversionResult } from '../types/conversion';
import { friendlyError } from './errorMessages';

export class ConversionApiError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'ConversionApiError';
  }
}

const conversionEndpoint = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1/convert`;

function fileNameFromHeader(contentDisposition: string | null, fallback: string): string {
  const match = contentDisposition?.match(/filename="?([^";]+)"?/i);
  return match?.[1] ?? fallback;
}

export async function convertFile(
  file: File,
  options: ConversionOptions,
  signal?: AbortSignal,
): Promise<ConversionResult> {
  const formData = new FormData();
  const { target, ...conversionOptions } = options;
  formData.append('file', file);
  formData.append('target_format', target);
  if (Object.keys(conversionOptions).length > 0) {
    formData.append('options', JSON.stringify(conversionOptions));
  }

  const response = await fetch(conversionEndpoint, {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!response.ok) {
    const message = `Conversion failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string; code?: string };
      throw new ConversionApiError(friendlyError(body.code), body.code);
    } catch (error) {
      if (error instanceof ConversionApiError) throw error;
      throw new ConversionApiError(message);
    }
  }

  return {
    file: await response.blob(),
    fileName: fileNameFromHeader(
      response.headers.get('content-disposition'),
      `${file.name.replace(/\.[^.]+$/, '')}.${target}`,
    ),
  };
}
