interface ProgressBarProps {
  progress: number;
  visible: boolean;
}

export function ProgressBar({ progress, visible }: ProgressBarProps) {
  if (!visible) return null;
  return (
    <div className="progress-area" aria-live="polite">
      <div className="progress-label">
        <span>Converting securely...</span>
        <strong>{progress}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
