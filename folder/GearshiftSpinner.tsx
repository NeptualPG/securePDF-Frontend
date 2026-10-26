import { Logo } from './Logo';

/**
 * Branded loading spinner.
 *
 * Uses the gearshift sphere mark only, spinning slowly around its center.
 * The orbital rings make the rotation visually rich without any extra asset.
 *
 * Use during the indeterminate "converting…" phase between upload-done and
 * download-ready.
 */
interface GearshiftSpinnerProps {
  size?: number;
  /** "light" = dark mark on light bg; "dark" = white mark on dark/brand bg */
  tone?: 'light' | 'dark';
  className?: string;
}

export function GearshiftSpinner({
  size = 56,
  tone = 'dark',
  className,
}: GearshiftSpinnerProps) {
  return (
    <img
      src={tone === 'dark' ? '/brand/gearshift-mark-white.svg' : '/brand/gearshift-mark.svg'}
      alt=""
      role="presentation"
      width={size}
      height={size}
      className={`animate-spin-slow ${className ?? ''}`}
      style={{ width: size, height: size }}
    />
  );
}

export default GearshiftSpinner;
