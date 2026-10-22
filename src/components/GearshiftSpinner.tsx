import { Logo } from './Logo';

interface GearshiftSpinnerProps {
  size?: number;
  tone?: 'dark' | 'light';
}

export function GearshiftSpinner({ size = 56, tone = 'dark' }: GearshiftSpinnerProps) {
  return (
    <span className="gearshift-spinner animate-spin-slow" style={{ width: size, height: size }} aria-label="Loading">
      <Logo variant={tone === 'dark' ? 'mark' : 'mark-white'} height={size} decorative />
    </span>
  );
}
