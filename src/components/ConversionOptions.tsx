import { supportedTargets, type ConversionOptions, type OutputFormat } from '../types/conversion';

interface ConversionOptionsProps {
  file: File | null;
  options: ConversionOptions;
  disabled?: boolean;
  onChange: (options: ConversionOptions) => void;
}

export function ConversionOptionsPanel({ file, options, disabled = false, onChange }: ConversionOptionsProps) {
  const extension = file?.name.split('.').pop()?.toLowerCase() ?? '';
  const targets = supportedTargets[extension] ?? [];
  const target = targets.includes(options.target) ? options.target : targets[0] ?? 'pdf';

  return (
    <section className="options-card" aria-labelledby="options-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Customize</span>
          <h2 id="options-title">Conversion options</h2>
        </div>
      </div>
      <label>
        <span>Convert to</span>
        <select
        value={target}
          disabled={disabled}
        onChange={(event) => onChange({ ...options, target: event.target.value as OutputFormat })}
        >
        {targets.map((format) => <option key={format} value={format}>{format.toUpperCase()}</option>)}
        </select>
        {!file && <small className="option-hint">Select a file first.</small>}
        {file && targets.length === 0 && <small className="option-error">Unsupported source format.</small>}
      </label>
      {(target === 'png' || target === 'jpg') && (
        <div className="image-options">
        <label>Page<input type="number" min="1" value={options.page ?? 1} disabled={disabled}
          onChange={(event) => onChange({ ...options, page: Math.max(1, Number(event.target.value)) })} /></label>
        <label>DPI<input type="number" min="72" max="600" value={options.dpi ?? 150} disabled={disabled}
          onChange={(event) => onChange({ ...options, dpi: Math.min(600, Math.max(72, Number(event.target.value))) })} /></label>
        </div>
      )}
      {target === 'docx' && (
        <label className="checkbox-row">
        <input type="checkbox" checked={options.preserve_layout ?? true} disabled={disabled}
          onChange={(event) => onChange({ ...options, preserve_layout: event.target.checked })} />
        <span>Preserve layout (best-effort)</span>
        </label>
      )}
      {target === 'docx' && <small className="option-hint">PDF to DOCX is best-effort.</small>}
    </section>
  );
}
