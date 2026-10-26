import { cn } from '../utils/cn';

/**
 * Gearshift logo — four variants for four contexts.
 *
 * Usage:
 *   <Logo variant="full-light"  height={32} />   // header on white bg
 *   <Logo variant="full-dark"   height={32} />   // header on dark/brand bg
 *   <Logo variant="mark"        height={28} />   // favicon-style on white
 *   <Logo variant="mark-white"  height={28} />   // on brand-red chips
 *
 * Files must live at: /public/brand/{variant}.svg
 */
type Variant = 'full-light' | 'full-dark' | 'mark' | 'mark-white';

const SRC: Record<Variant, string> = {
  'full-light':  '/brand/gearshift-light.svg',
  'full-dark':   '/brand/gearshift-dark.svg',
  'mark':        '/brand/gearshift-mark.svg',
  'mark-white':  '/brand/gearshift-mark-white.svg',
};

interface LogoProps {
  variant?: Variant;
  /** height in px — width auto-scales */
  height?: number;
  /** When true, the <img> gets alt="" and role="presentation" (decorative) */
  decorative?: boolean;
  className?: string;
}

export function Logo({
  variant = 'full-light',
  height = 32,
  decorative = false,
  className,
}: LogoProps) {
  return (
    <img
      src={SRC[variant]}
      alt={decorative ? '' : 'Gearshift'}
      role={decorative ? 'presentation' : undefined}
      height={height}
      className={cn('h-auto w-auto select-none', className)}
      style={{ height }}
      draggable={false}
    />
  );
}

export default Logo;
