import { Logo } from './Logo';
import type { Language } from '../i18n';
import { translate } from '../i18n';

export function Footer({ language }: { language: Language }) {
  return (
    <footer className="site-footer">
      <Logo variant="full-light" height={24} decorative />
      <span>{translate(language, 'footer')}</span>
    </footer>
  );
}
