import { useCallback, useEffect, useRef, useState } from 'react';
import { convertFile } from '../services/conversionApi';
import type { ConversionOptions, ConversionResult, ConversionStatus } from '../types/conversion';

export function useConversion() {
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const convert = useCallback(async (file: File, options: ConversionOptions) => {
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;
    setStatus('converting');
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const progressTimer = window.setInterval(() => {
        setProgress((current) => Math.min(current + 10, 90));
      }, 250);
      const conversion = await convertFile(file, options, controller.signal);
      window.clearInterval(progressTimer);
      setProgress(100);
      setResult(conversion);
      setStatus('success');
    } catch (conversionError) {
      if (conversionError instanceof DOMException && conversionError.name === 'AbortError') return;
      setError(conversionError instanceof Error ? conversionError.message : 'An unexpected error occurred.');
      setStatus('error');
    }
  }, []);

  useEffect(() => () => abortController.current?.abort(), []);

  return { status, progress, error, result, convert };
}
