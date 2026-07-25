import React, { useState } from 'react';
import { 
  FileSearch, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Printer, 
  RotateCcw, 
  Info, 
  BookOpen, 
  Upload,
  HelpCircle,
  Filter,
  Sliders,
  ExternalLink,
  Layers,
  Check,
  X,
  Tag,
  Eye,
  EyeOff
} from 'lucide-react';
import { SectionId } from '../types';

interface UjiKemiripanViewProps {
  onSelectSection: (sectionId: SectionId) => void;
}

export interface MatchSource {
  id: number;
  name: string;
  url?: string;
  category?: string;
  percentage: number;
  color: string;
}

export interface FlaggedSegment {
  sourceId?: number;
  text: string;
  similarityType: string;
  matchSourceEstimate: string;
  suggestion: string;
  riskLevel: 'low' | 'medium' | 'high';
  isQuote?: boolean;
  isBibliography?: boolean;
  wordCount?: number;
}

export interface SimilarityReport {
  reportId: string;
  analysisTimestamp: string;
  wordCount: number;
  characterCount: number;
  overallSimilarityScore: number;
  classification: string;
  directMatchPercentage: number;
  uncitedParaphrasePercentage: number;
  citationFormatScore: number;
  aiGeneratedPercentage: number;
  ethicalSummary: string;
  sources?: MatchSource[];
  flaggedSegments: FlaggedSegment[];
  citationRecommendations: string[];
}

const SAMPLE_TEXTS = {
  original: `Literasi digital tidak hanya berfokus pada kemampuan teknis mengoperasikan perangkat digital, melainkan juga mencakup pemahaman etis dalam mengevaluasi kebenaran informasi (Sanjaya, 2026). Menurut UU PDP No. 27 Tahun 2022, perlindungan data pribadi merupakan hak asasi setiap warga negara yang wajib dihomati dalam ruang siber. Oleh karena itu, penerapan verifikasi fakta dengan metode SIFT (Stop, Investigate, Find, Trace) menjadi instrumen penting bagi masyarakat Indonesia untuk mencegah penyebaran hoaks dan misinformasi.`,
  
  plagiarism: `Pada era globalisasi saat ini perkembangan teknologi informasi sangat pesat. Literasi digital adalah kemampuan menggunakan media digital secara bijak. "Di samping itu perlindungan data pribadi adalah hal yang sangat penting sekali." Penyebaran hoaks dan berita bohong di media sosial sangat berbahaya sehingga kita harus selalu berhati-hati dan menyaring informasi sebelum membagikan kepada orang lain.
Daftar Pustaka:
1. Sanjaya, R. (2026). Literasi Digital dan Etika Informasi. Jakarta: Penerbit Edukasi.`,

  paraphraseAi: `Seiring perkembangan zaman, ruang digital telah menjadi bagian tak terpisahkan dari kehidupan sehari-hari. Berdasarkan studi literatur terkini, efektivitas komunikasi publik sangat ditentukan oleh tingkat keandalan data yang disajikan. Oleh sebab itu, setiap individu dituntut untuk melakukan validasi sumber secara kritis sebelum mengambil keputusan berbasis informasi digital.`
};

const DEFAULT_SOURCE_COLORS = ['#E11D48', '#9333EA', '#0284C7', '#059669', '#D97706', '#DC2626'];

export const UjiKemiripanView: React.FC<UjiKemiripanViewProps> = ({ onSelectSection }) => {
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentText, setDocumentText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<SimilarityReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Turnitin Exclude & Include Controls State
  const [excludeQuotes, setExcludeQuotes] = useState(false);
  const [excludeBibliography, setExcludeBibliography] = useState(true);
  const [excludeSmallMatches, setExcludeSmallMatches] = useState(false);
  const [smallMatchWordsLimit, setSmallMatchWordsLimit] = useState(8);
  const [activeSourceFilter, setActiveSourceFilter] = useState<number | 'all'>('all');

  // Detail Modal for selected highlighted segment
  const [selectedSegment, setSelectedSegment] = useState<FlaggedSegment | null>(null);

  const wordCount = documentText.trim() ? documentText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = documentText.length;

  const handleRunCheck = async () => {
    if (!documentText.trim()) {
      setError('Harap masukkan atau unggah teks naskah yang ingin diuji kemiripannya.');
      return;
    }

    if (wordCount < 10) {
      setError('Teks naskah terlalu pendek. Masukkan minimal 10 kata untuk analisis yang akurat.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setReport(null);

    try {
      const res = await fetch('/api/check-similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText,
          title: documentTitle.trim() || 'Karya Ilmiah / Tugas Naskah'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setReport(data);
      } else {
        setError(data.error || 'Gagal melakukan uji kemiripan dokumen.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi saat mengirim dokumen ke server.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check max file size (1000 MB)
    const MAX_SIZE_BYTES = 1000 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      setError(`Ukuran file (${(file.size / (1024 * 1024)).toFixed(1)} MB) melebihi batas maksimal 1000 MB.`);
      return;
    }

    setError(null);
    const fileName = file.name;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';

    if (!documentTitle) {
      setDocumentTitle(fileName.replace(/\.[^/.]+$/, ""));
    }

    if (ext === 'txt' || ext === 'md' || ext === 'text') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setDocumentText(content);
      };
      reader.readAsText(file);
    } else {
      // For Word (.doc, .docx), PDF (.pdf), PPT (.ppt, .pptx)
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        if (buffer) {
          const bytes = new Uint8Array(buffer);
          let rawStr = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.length; i += chunkSize) {
            const sub = bytes.subarray(i, i + chunkSize);
            rawStr += String.fromCharCode.apply(null, Array.from(sub));
          }
          const cleanedText = rawStr
            .replace(/[^\x20-\x7E\t\n\r\u00A0-\u024F]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          if (cleanedText.length > 30) {
            setDocumentText(cleanedText);
          } else {
            setDocumentText(`[File Dokumen: ${fileName}]\n\nDokumen ${ext.toUpperCase()} berhasil dimuat. Siap diuji untuk kemiripan naskah, cek plagiarisme, dan pemindaian etika akademik Turnitin No-Repository.`);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Filtered segments based on Exclude / Include Turnitin Controls
  const getFilteredSegments = () => {
    if (!report || !report.flaggedSegments) return [];
    
    return report.flaggedSegments.filter(seg => {
      // Filter by active source if specified
      if (activeSourceFilter !== 'all' && seg.sourceId !== activeSourceFilter) {
        return false;
      }
      // Exclude Quotes
      if (excludeQuotes && seg.isQuote) {
        return false;
      }
      // Exclude Bibliography
      if (excludeBibliography && seg.isBibliography) {
        return false;
      }
      // Exclude Small Matches
      const wordsInSeg = seg.wordCount || seg.text.split(/\s+/).filter(Boolean).length;
      if (excludeSmallMatches && wordsInSeg < smallMatchWordsLimit) {
        return false;
      }
      return true;
    });
  };

  const activeSegments = getFilteredSegments();

  // Dynamic Similarity Score after filters applied
  const calculateEffectiveScore = () => {
    if (!report) return 0;
    const totalOriginalSegments = report.flaggedSegments.length;
    if (totalOriginalSegments === 0) return report.overallSimilarityScore;

    const remainingRatio = activeSegments.length / totalOriginalSegments;
    const recalculated = Math.round(report.overallSimilarityScore * remainingRatio);
    return Math.max(0, recalculated);
  };

  const effectiveScore = calculateEffectiveScore();

  const getScoreColor = (score: number) => {
    if (score <= 15) return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
    if (score <= 30) return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';
  };

  const getSourceColor = (sourceId?: number) => {
    if (!sourceId) return '#E11D48';
    return DEFAULT_SOURCE_COLORS[(sourceId - 1) % DEFAULT_SOURCE_COLORS.length];
  };

  // Turnitin Annotated Document Text Renderer
  const renderAnnotatedDocumentText = () => {
    if (!documentText) return null;

    // Break text into paragraphs or sentences
    const paragraphs = documentText.split(/\n+/).filter(p => p.trim());

    return (
      <div className="space-y-4 font-serif text-sm leading-relaxed text-stone-900 dark:text-stone-100 selection:bg-amber-200">
        {paragraphs.map((para, pIdx) => {
          let paragraphContent: React.ReactNode[] = [para];

          // Highlight matched segments inside paragraphs
          activeSegments.forEach((seg, sIdx) => {
            const newParagraphContent: React.ReactNode[] = [];
            const sourceObj = report?.sources?.find(s => s.id === seg.sourceId) || { id: seg.sourceId || 1, color: getSourceColor(seg.sourceId) };
            const sourceColor = sourceObj.color || getSourceColor(seg.sourceId);

            paragraphContent.forEach((node, nIdx) => {
              if (typeof node === 'string') {
                const segText = seg.text.trim();
                const foundPos = node.toLowerCase().indexOf(segText.toLowerCase());

                if (foundPos !== -1 && segText.length > 5) {
                  const before = node.substring(0, foundPos);
                  const matched = node.substring(foundPos, foundPos + segText.length);
                  const after = node.substring(foundPos + segText.length);

                  if (before) newParagraphContent.push(before);

                  newParagraphContent.push(
                    <mark
                      key={`match-${pIdx}-${sIdx}-${nIdx}`}
                      onClick={() => setSelectedSegment(seg)}
                      title={`Klik untuk lihat rincian Turnitin: ${seg.matchSourceEstimate}`}
                      className="px-1 py-0.5 my-0.5 rounded-2xs cursor-pointer transition-all hover:brightness-90 relative inline-flex items-center gap-1 font-serif group border border-stone-400/30"
                      style={{
                        backgroundColor: `${sourceColor}25`,
                        color: 'inherit',
                        borderBottom: `2.5px solid ${sourceColor}`
                      }}
                    >
                      <span className="font-medium">{matched}</span>
                      <sup 
                        className="px-1 py-0.2 bg-[#1A1A1A] text-white font-mono font-bold text-[9px] rounded-xs shrink-0 select-none"
                        style={{ backgroundColor: sourceColor }}
                      >
                        #{seg.sourceId || 1}
                      </sup>
                    </mark>
                  );

                  if (after) newParagraphContent.push(after);
                } else {
                  newParagraphContent.push(node);
                }
              } else {
                newParagraphContent.push(node);
              }
            });

            paragraphContent = newParagraphContent;
          });

          return (
            <p key={pIdx} className="p-3 bg-white/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xs">
              {paragraphContent}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans pb-16">
      
      {/* Print Specific CSS */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .shadow-2xl, .shadow-xl, .shadow-md { shadow: none !important; }
          .border-2, .border { border-color: #333 !important; }
        }
      `}</style>

      {/* Header Banner */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 sm:p-8 space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black flex items-center justify-center font-serif font-black text-lg shadow-md">
              <FileSearch className="w-5 h-5 text-amber-400 dark:text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 font-serif block">
                Turnitin Originality Report Engine
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                Uji Kemiripan Dokumen (Turnitin No Repo)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>100% Transient / No Repository Policy</span>
          </div>
        </div>

        {/* Guarantee Callout */}
        <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 dark:border-amber-500 text-stone-800 dark:text-stone-200 text-xs leading-relaxed space-y-1">
          <p className="font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            Jaminan Perlindungan Hak Cipta & Kerahasiaan Dokumen:
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            Sistem penguji kemiripan ini beroperasi dengan kebijakan <strong className="text-stone-900 dark:text-stone-200">No Repository (Non-Archiving)</strong> mirip standar industri Turnitin/iThenticate. Dokumen yang Anda unggah/salin hanya dianalisis secara transient saat pengujian dan <strong>TIDAK DISIMPAN ATAU DIARSIPKAN</strong> dalam basis data publik manapun.
          </p>
        </div>
      </div>

      {/* INPUT SECTION */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6 no-print">
        
        <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600" /> Form Naskah Karya Ilmiah / Tugas
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[10px] text-stone-500 font-mono">
              Format: Word (.doc/.docx), PDF (.pdf), PPT (.ppt/.pptx), Teks | Maks 1000 MB
            </span>
            <label className="px-3 py-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border border-stone-400 dark:border-stone-700 transition-colors">
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>Unggah Dokumen (Word, PDF, PPT)</span>
              <input 
                type="file" 
                accept=".doc,.docx,.pdf,.ppt,.pptx,.txt,.md,.text"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Title & Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1 font-serif">
              Judul Dokumen / Nama Tugas
            </label>
            <input 
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Contoh: Makalah Etika Informasi dan Penulisan Karya Ilmiah Bebas Plagiarisme..."
              className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-serif">
                Isi Teks Naskah Dokumen
              </label>

              <div className="text-[11px] text-stone-500 font-mono">
                {wordCount} kata | {charCount} karakter
              </div>
            </div>

            <textarea
              rows={8}
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Tempelkan (paste) paragraf, esai, abstrak, atau draf makalah karya ilmiah yang ingin diuji di sini..."
              className="w-full p-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-sans leading-relaxed"
            />
          </div>

          {/* Quick Presets for Demo */}
          <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
            <span className="text-[11px] font-bold font-serif uppercase tracking-wider text-stone-800 dark:text-stone-200 block">
              💡 Coba Contoh Naskah Sampel:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setDocumentTitle("Contoh Naskah Asli dengan Sitasi Lengkap (APA)");
                  setDocumentText(SAMPLE_TEXTS.original);
                }}
                className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider"
              >
                1. Naskah Etis & Sitasi Tepat (Kemiripan Rendah)
              </button>

              <button
                type="button"
                onClick={() => {
                  setDocumentTitle("Contoh Naskah Copy-Paste Tanpa Sitasi");
                  setDocumentText(SAMPLE_TEXTS.plagiarism);
                }}
                className="px-2.5 py-1 bg-rose-800 hover:bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider"
              >
                2. Naskah Copy-Paste (Indikasi Plagiarisme Tinggi)
              </button>

              <button
                type="button"
                onClick={() => {
                  setDocumentTitle("Contoh Paraphrase AI Tanpa Atribusi");
                  setDocumentText(SAMPLE_TEXTS.paraphraseAi);
                }}
                className="px-2.5 py-1 bg-amber-800 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider"
              >
                3. Naskah Paraphrase AI (Perlu Penyesuaian)
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/90 border border-rose-700 text-rose-200 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-300 dark:border-stone-800">
          <button
            type="button"
            onClick={() => {
              setDocumentTitle('');
              setDocumentText('');
              setReport(null);
              setError(null);
            }}
            className="px-4 py-2 bg-stone-300 dark:bg-stone-800 hover:bg-stone-400 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Bersihkan Form</span>
          </button>

          <button
            type="button"
            onClick={handleRunCheck}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black dark:hover:bg-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl disabled:opacity-50 transition-all cursor-pointer border border-amber-600"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                <span>Memproses Uji Kemiripan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-700" />
                <span>Uji Kemiripan Turnitin Sekarang</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* RESULTS DISPLAY (TURNITIN-STYLE REPORT) */}
      {report && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border-2 border-stone-800 dark:border-stone-700 p-6 sm:p-8 space-y-8 shadow-2xl animate-fade-in">
          
          {/* Report Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-stone-800 dark:border-stone-700 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-stone-800 text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                  ID LAPORAN: {report.reportId}
                </span>
                <span className="px-2 py-0.5 bg-emerald-800 text-white text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                  <Lock className="w-3 h-3" /> NO REPOSITORY VERIFIED
                </span>
              </div>
              <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-100 pt-1">
                TURNITIN ORIGINALITY REPORT & KEMIRIPAN NASKAH
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-serif italic">
                {documentTitle || 'Karya Ilmiah / Tugas Naskah'} &bull; Analisis pada {new Date(report.analysisTimestamp).toLocaleString('id-ID')}
              </p>
            </div>

            <button
              onClick={handlePrintReport}
              className="no-print px-5 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black font-bold uppercase tracking-widest text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer border border-amber-600"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil Report PDF</span>
            </button>
          </div>

          {/* TURNITIN EXCLUDE & INCLUDE FILTERS PANEL */}
          <div className="bg-[#E9E4DB] dark:bg-[#22211F] p-4 border border-stone-300 dark:border-stone-800 space-y-3 no-print">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Panel Filter Exclude & Include (Turnitin Settings)
                </h3>
              </div>

              {/* Recalculated Score Badge */}
              <div className="flex items-center gap-2 text-xs font-serif font-bold">
                <span className="text-stone-500">Skor Awal: {report.overallSimilarityScore}%</span>
                <span className="text-amber-600">&rarr;</span>
                <span className={`px-2.5 py-0.5 border font-mono ${getScoreColor(effectiveScore)}`}>
                  Skor Efektif Filter: {effectiveScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* Option 1: Exclude Quotes */}
              <label className="p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 flex items-center gap-2.5 cursor-pointer hover:border-amber-500 transition-colors">
                <input 
                  type="checkbox"
                  checked={excludeQuotes}
                  onChange={(e) => setExcludeQuotes(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 cursor-pointer"
                />
                <div>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 block">
                    Exclude Quotes (Kutipan)
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Abaikan teks dalam tanda petik ("...")
                  </span>
                </div>
              </label>

              {/* Option 2: Exclude Bibliography */}
              <label className="p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 flex items-center gap-2.5 cursor-pointer hover:border-amber-500 transition-colors">
                <input 
                  type="checkbox"
                  checked={excludeBibliography}
                  onChange={(e) => setExcludeBibliography(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 cursor-pointer"
                />
                <div>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 block">
                    Exclude Bibliography (Pustaka)
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Abaikan bagian daftar pustaka / referensi
                  </span>
                </div>
              </label>

              {/* Option 3: Exclude Small Matches */}
              <div className="p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={excludeSmallMatches}
                    onChange={(e) => setExcludeSmallMatches(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 cursor-pointer"
                  />
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                    Exclude Small Matches
                  </span>
                </label>

                {excludeSmallMatches && (
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono pl-6">
                    <span>Batas min:</span>
                    <select
                      value={smallMatchWordsLimit}
                      onChange={(e) => setSmallMatchWordsLimit(Number(e.target.value))}
                      className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold"
                    >
                      <option value={5}>5 Kata</option>
                      <option value={8}>8 Kata</option>
                      <option value={10}>10 Kata</option>
                      <option value={15}>15 Kata</option>
                    </select>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* TURNITIN DUAL PANEL DASHBOARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT PANEL: TURNITIN ANNOTATED DOCUMENT VIEWER */}
            <div className="lg:col-span-8 bg-[#E9E4DB]/40 dark:bg-[#22211F]/60 p-5 border border-stone-300 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-700 pb-2">
                <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-amber-600" /> Naskah Bertanda Kemiripan (Annotated Text)
                </h3>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">
                  {activeSegments.length} Segmen Ditandai
                </span>
              </div>

              {/* Text Viewer */}
              {renderAnnotatedDocumentText()}

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Klik pada kalimat bertanda warna & nomor tag <code className="font-mono bg-amber-200 dark:bg-amber-900 px-1 font-bold">#1</code> untuk melihat detail sumber kutipan dan saran perbaikan sitasi.</span>
              </div>
            </div>

            {/* RIGHT PANEL: TURNITIN MATCH OVERVIEW & SOURCES LIST */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Big Similarity Index Box */}
              <div className={`p-5 border-4 border-double text-center space-y-2.5 ${getScoreColor(effectiveScore)} shadow-inner`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] font-serif block">
                  Turnitin Similarity Index
                </span>

                <div className="text-5xl font-serif font-black tracking-tight">
                  {effectiveScore}%
                </div>

                <div className="inline-block px-3 py-1 bg-stone-900 text-white text-[11px] font-bold uppercase tracking-wider font-serif">
                  Status: {effectiveScore <= 15 ? 'SANGAT AMAN' : effectiveScore <= 30 ? 'MODERAT' : 'PERLU REVISI'}
                </div>
              </div>

              {/* Match Sources Breakdown List */}
              <div className="bg-[#E9E4DB] dark:bg-[#22211F] p-4 border border-stone-300 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-700 pb-2">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    Sumber Pencocokan (Match Overview)
                  </h4>

                  {activeSourceFilter !== 'all' && (
                    <button
                      onClick={() => setActiveSourceFilter('all')}
                      className="text-[10px] text-amber-700 dark:text-amber-400 font-bold underline font-mono cursor-pointer"
                    >
                      Lihat Semua
                    </button>
                  )}
                </div>

                {/* Sources Items */}
                <div className="space-y-2">
                  {report.sources && report.sources.length > 0 ? (
                    report.sources.map((src) => {
                      const isSelected = activeSourceFilter === src.id;
                      return (
                        <div
                          key={src.id}
                          onClick={() => setActiveSourceFilter(isSelected ? 'all' : src.id)}
                          className={`p-2.5 bg-white dark:bg-stone-900 border text-xs cursor-pointer transition-all space-y-1 ${
                            isSelected 
                              ? 'border-amber-600 ring-2 ring-amber-500/40 shadow-sm' 
                              : 'border-stone-300 dark:border-stone-800 hover:border-amber-400'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span 
                                className="w-5 h-5 rounded-xs text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0"
                                style={{ backgroundColor: src.color || getSourceColor(src.id) }}
                              >
                                #{src.id}
                              </span>
                              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 truncate text-[11px]">
                                {src.name}
                              </span>
                            </div>

                            <span className="font-mono font-bold text-stone-800 dark:text-stone-200 text-xs shrink-0">
                              {src.percentage}%
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono pt-1 border-t border-stone-200 dark:border-stone-800">
                            <span>{src.category || 'Publikasi Ilmiah'}</span>
                            {src.url && (
                              <a 
                                href={src.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                              >
                                <span>Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[11px] text-stone-500 italic p-2 text-center">
                      Tidak ada sumber spesifik terdeteksi.
                    </div>
                  )}
                </div>
              </div>

              {/* Indicator Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block">
                    Match Langsung
                  </span>
                  <p className="text-lg font-serif font-black text-rose-700 dark:text-rose-400">
                    {report.directMatchPercentage}%
                  </p>
                </div>

                <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block">
                    Paraphrase Tanpa Sitasi
                  </span>
                  <p className="text-lg font-serif font-black text-amber-700 dark:text-amber-400">
                    {report.uncitedParaphrasePercentage}%
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Ethical Summary */}
          <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-[#1A1A1A] dark:border-stone-300 text-xs space-y-1">
            <h3 className="font-bold font-serif text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Ringkasan Evaluasi Integritas Akademik:
            </h3>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {report.ethicalSummary}
            </p>
          </div>

          {/* Citation Recommendations */}
          {report.citationRecommendations && report.citationRecommendations.length > 0 && (
            <div className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3 text-xs font-sans">
              <h3 className="font-bold font-serif text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Panduan Praktis Pencegahan Plagiarisme & Sitasi Ilmiah:
              </h3>
              <ul className="space-y-2 text-stone-700 dark:text-stone-300">
                {report.citationRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">{idx + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Verification Footer */}
          <div className="pt-6 border-t border-stone-300 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 font-serif">
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200">E-Modul Etika Informasi Berbasis Literasi Digital</p>
              <p>Sistem Evaluasi Integritas Akademik & Uji Kemiripan Dokumen (Turnitin No Repository Policy)</p>
            </div>
            <div className="text-right font-mono text-[10px]">
              <p>VERIFIED NON-ARCHIVED</p>
              <p>NO DATA RETAINED</p>
            </div>
          </div>

        </div>
      )}

      {/* SELECTED SEGMENT INSPECTOR MODAL */}
      {selectedSegment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 no-print animate-fade-in">
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border-2 border-amber-600 p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-700 pb-3">
              <div className="flex items-center gap-2">
                <span 
                  className="w-6 h-6 rounded-xs text-white font-mono font-bold text-xs flex items-center justify-center shrink-0"
                  style={{ backgroundColor: getSourceColor(selectedSegment.sourceId) }}
                >
                  #{selectedSegment.sourceId || 1}
                </span>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm uppercase tracking-wider">
                  Rincian Kemiripan Kalimat (Turnitin Match)
                </h3>
              </div>

              <button
                onClick={() => setSelectedSegment(null)}
                className="p-1 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif block">
                  Sumber Pencocokan Terdeteksi:
                </span>
                <p className="font-serif font-bold text-amber-800 dark:text-amber-400 text-sm">
                  {selectedSegment.matchSourceEstimate}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif block">
                  Potongan Kalimat Bertanda:
                </span>
                <p className="font-serif italic p-3 bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-stone-950 dark:text-stone-100 leading-relaxed mt-1">
                  "{selectedSegment.text}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-stone-200 dark:bg-stone-800">
                  <span className="text-stone-500 block">Kategori Kemiripan:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{selectedSegment.similarityType}</span>
                </div>
                <div className="p-2 bg-stone-200 dark:bg-stone-800">
                  <span className="text-stone-500 block">Jumlah Kata Segmen:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{selectedSegment.wordCount || selectedSegment.text.split(/\s+/).length} Kata</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1">
                <span className="font-serif font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rekomendasi Revisi Etika Akademik:
                </span>
                <p className="pl-5 leading-relaxed">{selectedSegment.suggestion}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSegment(null)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDUCATIONAL GUIDE AT BOTTOM */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-4 font-sans no-print">
        <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          Mengapa Uji Kemiripan No Repository Penting untuk Pelajar & Peneliti?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600 dark:text-stone-400">
          <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-1">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 font-serif">1. Bebas Masalah Self-Plagiarism</h4>
            <p>Sistem tidak pernah mengarsipkan naskah Anda, sehingga ketika draf akhir diunggah ke kampus/penerbit, naskah tidak akan terdeteksi plagiarisme 100% terhadap diri sendiri.</p>
          </div>

          <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-1">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 font-serif">2. Perlindungan Hak Cipta Naskah</h4>
            <p>Gagasan dan draf mentah Anda aman dari pencurian data atau pengarsipan tanpa izin oleh pihak ketiga.</p>
          </div>

          <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-1">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 font-serif">3. Belajar Paraphrase Etis</h4>
            <p>Bukan sekadar memberikan skor, sistem memberikan umpan balik langsung cara merekonstruksi klausa dan menyisipkan rujukan ilmiah yang benar.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
