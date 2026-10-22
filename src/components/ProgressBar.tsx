interface ProgressBarProps {
  progress: number;
  visible: boolean;
}

export function ProgressBar({ progress, visible }: ProgressBarProps) {
  if (!visible) return null;
  return <div className="progress-track" aria-label={`${progress}% complete`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="progress-value" style={{ width: `${progress}%` }} /></div>;
}
