import { Logo } from './Logo';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-brand-100 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Logo variant="full-light" height={30} />
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink-700">
          <a href="#tools" className="hover:text-brand-700 transition-colors">Tools</a>
          <a href="#how" className="hover:text-brand-700 transition-colors">How it works</a>
          <a
            href="https://github.com/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-500 hover:text-brand-700 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
