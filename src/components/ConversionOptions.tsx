import type { ConversionOptions, OutputFormat } from '../types/conversion';

interface ConversionOptionsProps {
  options: ConversionOptions;
  disabled?: boolean;
  onChange: (options: ConversionOptions) => void;
}

export function ConversionOptionsPanel({ options, disabled = false, onChange }: ConversionOptionsProps) {
  return (
    <section className="options-card" aria-labelledby="options-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Customize</span>
          <h2 id="options-title">Conversion options</h2>
        </div>
      </div>
      <label>
        <span>Output format</span>
        <select
          value={options.outputFormat}
          disabled={disabled}
          onChange={(event) => onChange({ ...options, outputFormat: event.target.value as OutputFormat })}
        >
          <option value="pdf">Standard PDF</option>
        </select>
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={options.compress}
          disabled={disabled}
          onChange={(event) => onChange({ ...options, compress: event.target.checked })}
        />
        <span>Optimize file size</span>
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={options.passwordProtect}
          disabled={disabled}
          onChange={(event) => onChange({ ...options, passwordProtect: event.target.checked })}
        />
        <span>Add password protection</span>
      </label>
    </section>
  );
}
