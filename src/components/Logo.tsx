import type { CSSProperties } from 'react';

export type LogoVariant = 'full-light' | 'full-dark' | 'mark' | 'mark-white';

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  decorative?: boolean;
}

const sources: Record<LogoVariant, string> = {
  'full-light': '/brand/gearshift-light.svg',
  'full-dark': '/brand/gearshift-dark.svg',
  mark: '/brand/gearshift-mark.svg',
  'mark-white': '/brand/gearshift-mark-white.svg',
};

export function Logo({ variant = 'full-light', height = 32, decorative = false }: LogoProps) {
  return (
    <img
      src={sources[variant]}
      alt={decorative ? '' : 'Gearshift'}
      aria-hidden={decorative}
      height={height}
      width={variant.startsWith('full') ? Math.round(height * 5) : height}
      style={{ display: 'block' } as CSSProperties}
    />
  );
}
