import Editor, { DiffEditor } from '@monaco-editor/react';
import {
  Bug,
  Check,
  Clipboard,
  Code2,
  Copy,
  RotateCcw,
  Search,
  Terminal,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { fixBugs, reviewCode, translateCode } from './api/client';
import FileUploader from './components/FileUploader';
import { LanguageSelector } from './components/LanguageSelector';

type Mode = 'translate' | 'review' | 'fix';

function App() {
  // --- State ---
  const [sourceCode, setSourceCode] = useState('// Your code here...');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('javascript');
  const [targetLang, setTargetLang] = useState('');
  const [mode, setMode] = useState<Mode>('translate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // --- Logic: Syncing & Placeholders ---
  useEffect(() => {
    // If switching modes or source language, clear output when appropriate
    if (mode === 'translate') {
      // If user switches languages and there's no selected target, clear output
      setOutputCode((prev) => (targetLang ? prev : ''));
    }

    // Set presentable text when switching modes
    if (mode === 'review') {
      setOutputCode(
        '### AI Code Review\nSelect your input language and click "Run AI" to receive a deep analysis of your code quality, security, and performance.',
      );
    } else if (mode === 'fix') {
      setOutputCode(''); // Clear for Diff View
    } else if (mode === 'translate' && !targetLang) {
      setOutputCode('');
    }
  }, [sourceLang, mode, targetLang]);

  // --- Helpers ---
  const getEditorLanguage = (langId: string) => {
    if (!langId) return 'javascript';
    if (langId === 'javascript' || langId === 'typescript') return 'typescript';
    return langId;
  };

  const stripCodeBlockFormatting = (code: string): string => {
    return code
      .replace(/^```\w*\n/, '')
      .replace(/\n```$/, '')
      .trim();
  };

  // --- Input helpers (upload / paste / clear) ---
  const handleFileRead = (content: string, _filename?: string) => {
    setSourceCode(content);
    setOutputCode('');
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        alert('Clipboard is empty');
        return;
      }
      setSourceCode(text);
      setOutputCode('');
    } catch (err) {
      alert('Unable to read clipboard');
    }
  };

  const handleClearInput = () => {
    setSourceCode('// Your code here...');
    setOutputCode('');
  };

  const handleAction = async () => {
    if (!sourceCode.trim() || sourceCode === '// Your code here...') return;
    if (mode === 'translate' && !targetLang) {
      alert('Please select a target language.');
      return;
    }

    setIsProcessing(true);
    try {
      let result: {
        translatedCode?: string;
        reviewContent?: string;
        fixedCode?: string;
      } | null = null;
      if (mode === 'translate') {
        result = await translateCode(sourceCode, sourceLang, targetLang);
        setOutputCode(
          stripCodeBlockFormatting(
            result?.translatedCode || 'No translation received.',
          ),
        );
      } else if (mode === 'review') {
        result = await reviewCode(sourceCode, sourceLang);
        setOutputCode(result?.reviewContent || 'No review content received.');
      } else if (mode === 'fix') {
        result = await fixBugs(sourceCode, sourceLang);
        setOutputCode(
          stripCodeBlockFormatting(
            result?.fixedCode || 'No fixed code received.',
          ),
        );
      }
    } catch (error) {
      alert(
        'AI Engine is currently unavailable. Ensure Docker containers are running.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0b0e14] text-slate-200 font-sans antialiased ${isProcessing ? 'cursor-wait' : ''}`}
    >
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap size={20} className="fill-white text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            CodePapi <span className="text-blue-500">AI</span>
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="hidden sm:flex">
          <div
            className={`flex bg-slate-900 border border-slate-800 p-1 rounded-xl transition-all ${isProcessing ? 'opacity-40 pointer-events-none scale-95' : ''}`}
          >
            {[
              {
                id: 'translate',
                label: 'Translate',
                icon: <Code2 size={16} />,
              },
              { id: 'review', label: 'Review', icon: <Search size={16} /> },
              { id: 'fix', label: 'Check Bugs', icon: <Bug size={16} /> },
            ].map((m) => (
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

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="sm:hidden p-2 rounded-md text-slate-300 hover:bg-slate-800 cursor-pointer"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="img"
          >
            <title>{mobileNavOpen ? 'Close menu' : 'Open menu'}</title>
            {mobileNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden sm:flex gap-4">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => {
              setSourceCode('// Your code here...');
              setOutputCode('');
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
            title="Reset All"
          >
            <RotateCcw size={20} />
          </button>
          <button
            type="button"
            disabled={isProcessing || (mode === 'translate' && !targetLang)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
              isProcessing || (mode === 'translate' && !targetLang)
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
      </nav>

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div className="sm:hidden bg-[#0b0e14]/95 border-b border-slate-800 px-4 py-3">
          <div className="flex flex-col gap-3">
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
              {[
                { id: 'translate', label: 'Translate' },
                { id: 'review', label: 'Review' },
                { id: 'fix', label: 'Check Bugs' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMode(m.id as Mode);
                    setMobileNavOpen(false);
                  }}
                  className={`flex-1 text-sm py-2 rounded-md ${mode === m.id ? 'bg-slate-800 text-blue-400' : 'text-slate-300'} cursor-pointer`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSourceCode('// Your code here...');
                  setOutputCode('');
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
                disabled={isProcessing || (mode === 'translate' && !targetLang)}
                className={`flex-1 py-2 rounded-md text-sm font-bold ${isProcessing || (mode === 'translate' && !targetLang) ? 'bg-slate-700 opacity-50' : 'bg-blue-600 cursor-pointer'}`}
              >
                Run AI
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="p-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Input Panel */}
          <section className="flex flex-col gap-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div
              className={isProcessing ? 'opacity-40 pointer-events-none' : ''}
            >
              <LanguageSelector
                label="Source Language"
                value={sourceLang}
                onChange={setSourceLang}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <FileUploader
                  onFileRead={handleFileRead}
                  disabled={isProcessing}
                />
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-sm cursor-pointer disabled:cursor-not-allowed"
                  title="Paste from clipboard"
                >
                  <Clipboard size={14} /> Paste
                </button>
                <button
                  type="button"
                  onClick={handleClearInput}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-sm cursor-pointer disabled:cursor-not-allowed"
                  title="Clear input"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e]">
              <Editor
                height="100%"
                theme="vs-dark"
                language={getEditorLanguage(sourceLang)}
                value={sourceCode}
                onChange={(v) => setSourceCode(v || '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  readOnly: isProcessing,
                  padding: { top: 20 },
                }}
              />
            </div>
          </section>

          {/* Output Panel / Diff View */}
          <section className="flex flex-col gap-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 shadow-xl relative">
            <div className="flex justify-between items-end">
              <div
                className={`flex-1 ${isProcessing ? 'opacity-40 pointer-events-none' : ''}`}
              >
                {mode === 'translate' ? (
                  <LanguageSelector
                    label="Target Language"
                    value={targetLang}
                    onChange={setTargetLang}
                    excludeId={sourceLang} 
                  />
                ) : (
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      AI Context
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-lg text-sm border border-slate-700 text-blue-400 font-medium flex items-center gap-2">
                      <Terminal size={14} />
                      {mode === 'review'
                        ? 'Analysis Mode'
                        : 'Refactor Mode (Diff)'}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                disabled={!outputCode || isProcessing}
                onClick={() => {
                  navigator.clipboard.writeText(outputCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mb-1 p-2.5 hover:bg-slate-800 rounded-lg transition-all text-slate-400 flex items-center gap-2 text-sm disabled:opacity-10 cursor-pointer disabled:cursor-not-allowed"
              >
                {copied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] relative">
              {/* Idle State Overlay */}
              {!outputCode && mode !== 'fix' && !isProcessing && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-slate-500 bg-[#0b0e14]/40 backdrop-blur-[2px]">
                  <div className="p-4 bg-slate-900 rounded-full mb-4 border border-slate-800">
                    <Zap size={32} className="opacity-20 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium tracking-wide">
                    Select your target and click Run AI
                  </p>
                </div>
              )}

              {mode === 'fix' ? (
                <DiffEditor
                  height="100%"
                  theme="vs-dark"
                  original={sourceCode}
                  modified={
                    isProcessing ? sourceCode : outputCode || sourceCode
                  }
                  language={getEditorLanguage(sourceLang)}
                  options={{
                    fontSize: 14,
                    renderSideBySide: true,
                    minimap: { enabled: false },
                    readOnly: true,
                    padding: { top: 20 },
                  }}
                />
              ) : (
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={
                    mode === 'translate'
                      ? getEditorLanguage(targetLang)
                      : 'markdown'
                  }
                  defaultLanguage="markdown"
                  value={outputCode}
                  options={{
                    readOnly: true,
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    padding: { top: 20 },
                  }}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
