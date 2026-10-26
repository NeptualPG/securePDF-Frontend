// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { convertFile } from '../services/conversionApi';
import type { ConversionOptions } from '../types/conversion';
import { useConversion } from './useConversion';

vi.mock('../services/conversionApi', () => ({ convertFile: vi.fn() }));

const convertFileMock = vi.mocked(convertFile);
const file = new File(['%PDF-1.7'], 'report.pdf');
const options: ConversionOptions = { target: 'docx' };

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  convertFileMock.mockReset();
});

describe('useConversion', () => {
  it('stores the result and reports success', async () => {
    const conversion = { file: new Blob(['docx']), fileName: 'converted.docx' };
    convertFileMock.mockResolvedValue(conversion);
    const { result } = renderHook(() => useConversion());

    let outcome: Awaited<ReturnType<typeof result.current.convert>> = null;
    await act(async () => {
      outcome = await result.current.convert(file, options);
    });

    expect(outcome).toBe('success');
    expect(result.current.status).toBe('success');
    expect(result.current.progress).toBe(100);
    expect(result.current.result).toBe(conversion);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('stops the progress timer and reports the error', async () => {
    convertFileMock.mockRejectedValue(new Error('We could not convert that file.'));
    const { result } = renderHook(() => useConversion());

    let outcome: Awaited<ReturnType<typeof result.current.convert>> = null;
    await act(async () => {
      outcome = await result.current.convert(file, options);
    });

    expect(outcome).toBe('error');
    expect(result.current.error).toBe('We could not convert that file.');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('stops the progress timer when the conversion is aborted', async () => {
    convertFileMock.mockRejectedValue(new DOMException('Aborted', 'AbortError'));
    const { result } = renderHook(() => useConversion());

    let outcome: Awaited<ReturnType<typeof result.current.convert>> = 'idle';
    await act(async () => {
      outcome = await result.current.convert(file, options);
    });

    expect(outcome).toBeNull();
    expect(result.current.error).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });
});
