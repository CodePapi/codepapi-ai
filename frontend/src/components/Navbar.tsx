import { Bug, Code2, RotateCcw, Search, Zap } from 'lucide-react';

type Mode = 'translate' | 'review' | 'fix';

interface NavbarProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isProcessing: boolean;
  targetLang: string;
  handleAction: () => void;
  resetAll: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export function Navbar({
  mode,
  setMode,
  isProcessing,
  targetLang,
  handleAction,
  resetAll,
  mobileNavOpen,
  setMobileNavOpen,
}: NavbarProps) {
  const modes = [
    { id: 'translate', label: 'Translate', icon: <Code2 size={16} /> },
    { id: 'review', label: 'Review', icon: <Search size={16} /> },
    { id: 'fix', label: 'Check Bugs', icon: <Bug size={16} /> },
  ];

  const isRunDisabled = isProcessing || (mode === 'translate' && !targetLang);

  return (
    <>
      <nav className="border-b border-slate-800 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap size={20} className="fill-white text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            CodePapi <span className="text-blue-500">AI</span>
          </span>
        </div>

        {/* Desktop Mode Switcher */}
        <div className="hidden sm:flex">
          <div
            className={`flex bg-slate-900 border border-slate-800 p-1 rounded-xl transition-all ${
              isProcessing ? 'opacity-40 pointer-events-none scale-95' : ''
            }`}
          >
            {modes.map((m) => (
              <button
                type="button"
                key={m.id}
                disabled={isProcessing}
                onClick={() => setMode(m.id as Mode)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  mode === m.id
                    ? 'bg-slate-800 text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 cursor-pointer'
                }`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex gap-4">
          <button
            type="button"
            disabled={isProcessing}
            onClick={resetAll}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
            title="Reset All"
          >
            <RotateCcw size={20} />
          </button>
          <button
            type="button"
            disabled={isRunDisabled}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
              isRunDisabled
                ? 'bg-slate-700 opacity-50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 active:scale-95 cursor-pointer'
            }`}
            onClick={handleAction}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              'Run AI'
            )}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="sm:hidden p-2 rounded-md text-slate-300 hover:bg-slate-800 cursor-pointer"
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          {mobileNavOpen ? (
            <Zap size={24} className="rotate-45" /> // Simple toggle visual
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-slate-300">test</div>
              <div className="w-6 h-0.5 bg-slate-300">test</div>
            </div>
          )}
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div className="sm:hidden bg-[#0b0e14]/95 border-b border-slate-800 px-4 py-3 sticky top-[65px] z-40">
          <div className="flex flex-col gap-3">
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMode(m.id as Mode);
                    setMobileNavOpen(false);
                  }}
                  className={`flex-1 text-sm py-2 rounded-md ${
                    mode === m.id
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-slate-300'
                  } cursor-pointer`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  setMobileNavOpen(false);
                }}
                className="flex-1 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAction();
                  setMobileNavOpen(false);
                }}
                disabled={isRunDisabled}
                className={`flex-1 py-2 rounded-md text-sm font-bold ${
                  isRunDisabled
                    ? 'bg-slate-700 opacity-50'
                    : 'bg-blue-600 cursor-pointer'
                }`}
              >
                Run AI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
