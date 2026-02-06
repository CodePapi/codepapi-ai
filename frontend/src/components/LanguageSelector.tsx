import { LANGUAGES, MIGRATIONS } from '../constants/languages';

interface Props {
  value: string;
  onChange: (val: string) => void;
  label: string;
  disabled?: boolean;
  excludeId?: string; // Add this to filter out the left-side selection
}

export const LanguageSelector = ({ value, onChange, label, disabled, excludeId }: Props) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
      {label}
    </label>
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-800 border border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-all hover:bg-slate-750 disabled:opacity-50"
    >
      <option value="">Select an option...</option> {/* Placeholder */}
      
      <optgroup label="Languages">
        {LANGUAGES.filter(l => l.id !== excludeId).map((lang) => (
          <option key={lang.id} value={lang.id}>{lang.name}</option>
        ))}
      </optgroup>
      
      <optgroup label="Framework Migrations">
        {MIGRATIONS.filter(m => m.id !== excludeId).map((mig) => (
          <option key={mig.id} value={mig.id}>{mig.name}</option>
        ))}
      </optgroup>
    </select>
  </div>
);