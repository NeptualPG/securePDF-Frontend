import type { ConversionOptions, ConversionResult } from '../types/conversion';

const conversionEndpoint = '/api/convert';

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
  formData.append('file', file);
  formData.append('output_format', options.outputFormat);
  formData.append('compress', String(options.compress));
  formData.append('password_protect', String(options.passwordProtect));

  const response = await fetch(conversionEndpoint, {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!response.ok) {
    let message = `Conversion failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // The server may return a non-JSON error response.
    }
    throw new Error(message);
  }

  return {
    file: await response.blob(),
    fileName: fileNameFromHeader(
      response.headers.get('content-disposition'),
      `${file.name.replace(/\.[^.]+$/, '')}.pdf`,
    ),
  };
}
