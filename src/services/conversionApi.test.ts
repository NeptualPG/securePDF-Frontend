import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ConversionOptions } from '../types/conversion';
import { ConversionApiError, convertFile } from './conversionApi';

const options: ConversionOptions = { target: 'png', page: 2, dpi: 300 };

function mockFetch(response: Response) {
  const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('convertFile', () => {
  const file = new File(['%PDF-1.7'], 'report.pdf');

  it('posts the file, target format and options to /api/v1/convert', async () => {
    const fetchMock = mockFetch(new Response('png'));

    await convertFile(file, options);

    expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/convert');
    const form = fetchMock.mock.calls[0][1]?.body as FormData;
    expect(form.get('file')).toBeInstanceOf(File);
    expect(form.get('target_format')).toBe('png');
    expect(JSON.parse(form.get('options') as string)).toEqual({ page: 2, dpi: 300 });
  });

  it('omits options when there are none', async () => {
    const fetchMock = mockFetch(new Response('pdf'));

    await convertFile(file, { target: 'pdf' });

    const form = fetchMock.mock.calls[0][1]?.body as FormData;
    expect(form.has('options')).toBe(false);
  });

  it('uses the file name from Content-Disposition', async () => {
    mockFetch(new Response('png', { headers: { 'Content-Disposition': 'attachment; filename="converted.png"' } }));

    const result = await convertFile(file, options);

    expect(result.fileName).toBe('converted.png');
  });

  it('falls back to the original name with the target extension', async () => {
    mockFetch(new Response('png'));

    const result = await convertFile(file, options);

    expect(result.fileName).toBe('report.png');
  });

  it('maps the error code returned by the server', async () => {
    mockFetch(Response.json({ error: 'Payload too large', code: 'PAYLOAD_TOO_LARGE' }, { status: 413 }));

    const error = await convertFile(file, options).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(ConversionApiError);
    expect((error as ConversionApiError).code).toBe('PAYLOAD_TOO_LARGE');
  });

  it('throws a generic error when the error body is not JSON', async () => {
    mockFetch(new Response('Bad gateway', { status: 502 }));

    await expect(convertFile(file, options)).rejects.toThrow('Conversion failed (502)');
  });
});
