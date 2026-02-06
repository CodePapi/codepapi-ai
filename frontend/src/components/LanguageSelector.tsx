const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  label: string;
}

export const LanguageSelector = ({ value, onChange, label }: Props) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-800 border border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-colors hover:bg-slate-750"
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>{lang.name}</option>
      ))}
    </select>
  </div>
);