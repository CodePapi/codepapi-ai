import  { useState } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageSelector } from './components/LanguageSelector';
import { Zap, Copy, Check, RotateCcw } from 'lucide-react';
import { translateCode } from './api/client';

function App() {
  const [sourceCode, setSourceCode] = useState('// Your code here...');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('typescript');
  const [targetLang, setTargetLang] = useState('python');
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);

  const stripCodeBlockFormatting = (code: string): string => {
    return code.replace(/^```\w*\n/, '').replace(/\n```$/, '');
  };

  const copyToClipboard = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConvert = async () => {
    if (!sourceCode.trim() || sourceCode === '// Your code here...') return;

    setIsConverting(true);
    try {
      const result = await translateCode(sourceCode, sourceLang, targetLang);
      
      if (result.success) {
        const cleanCode = stripCodeBlockFormatting(result.translatedCode);
        setOutputCode(cleanCode);
      } else {
        console.error("Conversion failed:", result);
        alert("Failed to convert code. Check backend logs.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Could not connect to the backend. Ensure Docker containers are running and CORS is enabled.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 font-sans antialiased">
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap size={20} className="fill-white text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">CodeConverter <span className="text-blue-500">AI</span></span>
        </div>
        
        <div className="flex gap-4">
          <button 
             onClick={() => { setSourceCode(''); setOutputCode(''); }}
             className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
             title="Clear All"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            disabled={isConverting}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${
              isConverting 
                ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 active:scale-95'
            }`}
            onClick={handleConvert}
          >
            {isConverting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : 'Convert Code'}
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          
          {/* Input Panel */}
          <section className="flex flex-col gap-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <LanguageSelector 
              label="Source Language" 
              value={sourceLang} 
              onChange={setSourceLang} 
            />
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              <Editor
                height="100%"
                theme="vs-dark"
                language={sourceLang}
                value={sourceCode}
                onChange={(v) => setSourceCode(v || '')}
                options={{
                  padding: { top: 20 },
                  fontSize: 14,
                  minimap: { enabled: false },
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                  fontLigatures: true,
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorSmoothCaretAnimation: "on",
                }}
              />
            </div>
          </section>

          {/* Output Panel */}
          <section className="flex flex-col gap-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div className="flex justify-between items-end">
              <LanguageSelector 
                label="Target Language" 
                value={targetLang} 
                onChange={setTargetLang} 
              />
              <button 
                onClick={copyToClipboard}
                disabled={!outputCode}
                className="mb-1 p-2.5 hover:bg-slate-800 rounded-lg transition-all text-slate-400 flex items-center gap-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e]">
              <Editor
                height="100%"
                theme="vs-dark"
                language={targetLang}
                value={outputCode}
                options={{
                  readOnly: true,
                  padding: { top: 20 },
                  fontSize: 14,
                  minimap: { enabled: false },
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                  fontLigatures: true,
                  domReadOnly: true,
                }}
              />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;