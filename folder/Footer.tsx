import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-brand-100">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo variant="full-light" height={22} decorative />
          <span className="text-xs text-ink-500">
            © {new Date().getFullYear()} Gearshift
          </span>
        </div>
        <p className="text-xs text-ink-500 text-center sm:text-right">
          Files auto-deleted after conversion · No accounts · No tracking
        </p>
      </div>
    </footer>
  );
}

export default Footer;
