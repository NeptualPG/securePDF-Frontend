import { describe, expect, it } from 'vitest';
import type { ConversionOptions } from './conversion';

describe('conversion types', () => {
  it('supports the v1 PDF options shape', () => {
    const options: ConversionOptions = {
      outputFormat: 'pdf',
      compress: true,
      passwordProtect: false,
    };

    expect(options.outputFormat).toBe('pdf');
  });
});
