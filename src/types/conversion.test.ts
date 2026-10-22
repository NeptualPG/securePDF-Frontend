import { describe, expect, it } from 'vitest';
import type { ConversionOptions } from './conversion';

describe('conversion types', () => {
  it('supports the v1 PDF options shape', () => {
    const options: ConversionOptions = {
      target: 'pdf',
      page: 1,
      dpi: 150,
      preserve_layout: true,
    };

    expect(options.target).toBe('pdf');
  });
});
