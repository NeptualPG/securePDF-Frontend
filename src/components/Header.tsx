import { Code2 } from 'lucide-react';
import { Logo } from './Logo';
import type { Language } from '../i18n';
import { translate } from '../i18n';

export function Header({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="/" aria-label="Gearshift home">
          <Logo variant="full-light" height={34} />
        </a>
        <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer">
          <Code2 size={16} /> {translate(language, 'github')}
        </a>
        <div className="language-switcher" aria-label="Language">
          <button
            type="button"
            className={language === 'en' ? 'language-active' : ''}
            onClick={() => onLanguageChange('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={language === 'es' ? 'language-active' : ''}
            onClick={() => onLanguageChange('es')}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  );
}
