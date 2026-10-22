import { describe, expect, it } from 'vitest';
import { friendlyError } from './errorMessages';

describe('friendlyError', () => {
  it('translates machine-readable backend codes', () => {
    expect(friendlyError('PASSWORD_PROTECTED')).toContain('password-protected');
    expect(friendlyError('UNKNOWN')).toContain('could not convert');
  });
});
