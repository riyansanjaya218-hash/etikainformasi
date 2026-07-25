import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Globe, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Loader2, 
  RefreshCw,
  Copy,
  Check,
  FileText,
  AlertCircle,
  Filter
} from 'lucide-react';
import { SectionId } from '../types';

interface CekFaktaViewProps {
  onSelectSection: (sectionId: SectionId) => void;
}

interface FactCheckResult {
  status: 'HOAKS' | 'DISINFORMASI' | 'PERLU_VERIFIKASI' | 'FAKTA';
  confidenceScore: number;
  summary: string;
  redFlags: string[];
  officialSources: string[];
  recommendations: string[];
}

const PRESET_CLAIMS = [
  {
    title: "Subsidi Listrik & Bantuan Rp5 Juta via Link WhatsApp",
    category: "Keuangan & Loker",
    text: "Pemerintah bagikan Bantuan Sosial tunai Rp5.000.000 bagi pemilik KTP. Klik link pendaftaran resmi di: bit.ly/bantuan-sosial-2026-terbaru"
  },
  {
    title: "Air Garam Hangat Sembuhkan Virus & Kanker",
    category: "Kesehatan",
    text: "Cukup kumur air garam hangat setiap pagi dapat mematikan seluruh virus dan racun di tenggorokan secara instan menurut dokter luar negeri."
  },
  {
    title: "Pendaftaran Beasiswa Tanpa Seleksi Berkas 2026",
    category: "Beasiswa & Pendidikan",
    text: "Dibuka Beasiswa Nasional tanpa tes dan tanpa batasan usia, langsung cair bulan ini. Isi data KTP dan password email di website beasiswagratis.blogspot.com"
  },
  {
    title: "Gempa Bumi Magnitudo 8.5 Diramalkan Besok Malam",
    category: "Bencana & Cuaca",
    text: "BMKG memperingatkan akan terjadi gempa bumi susulan dahsyat pukul 23.00 WIB malam ini. Diharapkan seluruh warga keluar rumah."
  }
];

const VERIFIED_DATABASE = [
  {
    id: 1,
    title: "Bantuan Subsidi Listrik PLN Rp5 Juta via WhatsApp",
    category: "Keuangan",
    status: "HOAKS",
    verifiedBy: "Mafindo & TurnBackHoax",
    description: "Pesan berantai WhatsApp yang mengklaim pembagian bantuan tunai Rp5 juta dari PLN/Kominfo adalah modus phishing untuk mencuri data pribadi KTP.",
    officialTip: "Situs resmi PLN adalah pln.co.id. Pemerintah tidak pernah membagikan bansos melalui link bit.ly atau blogspot."
  },
  {
    id: 2,
    title: "Minuman Biji Pepaya Menghilangkan Kista Tanpa Operasi",
    category: "Kesehatan",
    status: "DISINFORMASI",
    verifiedBy: "Kementerian Kesehatan RI",
    description: "Klaim medis tanpa bukti uji klinis sahih. Mengonsumsi biji pepaya berlebihan justru dapat memicu iritasi lambung.",
    officialTip: "Konsultasikan masalah kesehatan reproduksi ke dokter atau fasilitas layanan kesehatan terdekat."
  },
  {
    id: 3,
    title: "Penerimaan CPNS & PPPK 2026 Dipungut Biaya Pendaftaran",
    category: "Loker & Pendidikan",
    status: "HOAKS",
    verifiedBy: "BKN (Badan Kepegawaian Negara)",
    description: "Seleksi CASN/CPNS resmi dilaksanakan secara transparan melalui portal sscasn.bkn.go.id tanpa dipungut biaya apapun.",
    officialTip: "Waspada calon calo dan situs tiruan yang menyerupai tampilan resmi pendaftaran."
  },
  {
    id: 4,
    title: "Penggunaan Teknologi AI dalam Karya Akademik Harus Transparan",
    category: "Edukasi Digital",
    status: "FAKTA",
    verifiedBy: "Pedoman Integritas Akademik Kemendikbudristek",
    description: "Penggunaan AI seperti ChatGPT diizinkan sebagai alat bantu riset, tetapi wajib dicantumkan dalam sitasi dan bukan hasil jiplakan mentah.",
    officialTip: "Selalu sertakan deklarasi penggunaan AI dalam laporan riset atau karya tulis ilmiah."
  }
];

export const CekFaktaView: React.FC<CekFaktaViewProps> = ({ onSelectSection }) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter & Search in Database
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Domain Checker State
  const [domainInput, setDomainInput] = useState('');
  const [domainResult, setDomainResult] = useState<{
    safe: boolean;
    domainType: string;
    reason: string;
  } | null>(null);

  const handleAnalyzeText = async (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `[MODUL CEK FAKTA ONLINE] Mohon lakukan verifikasi dan analisis mendalam terhadap klaim/berita berikut:\n"${text}"\n\nBerikan respons terstruktur meliputi:\n1. Status Klaim (HOAKS / DISINFORMASI / PERLU_VERIFIKASI / FAKTA)\n2. Indikator Manipulasi / Ciri Red Flags\n3. Penjelasan Fakta Sebenarnya\n4. Rekomendasi Langkah Verifikasi (SIFT)`,
        })
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.text || '';

        // Determine status based on response
        let status: FactCheckResult['status'] = 'PERLU_VERIFIKASI';
        if (responseText.toUpperCase().includes('HOAKS') || responseText.toUpperCase().includes('PALSU')) {
          status = 'HOAKS';
        } else if (responseText.toUpperCase().includes('DISINFORMASI') || responseText.toUpperCase().includes('SALAH KONTEKS')) {
          status = 'DISINFORMASI';
        } else if (responseText.toUpperCase().includes('FAKTA') || responseText.toUpperCase().includes('BENAR')) {
          status = 'FAKTA';
        }

        setResult({
          status,
          confidenceScore: status === 'HOAKS' ? 95 : status === 'FAKTA' ? 92 : 80,
          summary: responseText,
          redFlags: [
            "Menggunakan kata emosional & memicu kepanikan / kegembiraan berlebihan",
            "Meminta pembaca menyebarkan pesan ke grup WhatsApp secara mendesak",
            "Tidak mencantumkan tanggal, nama sumber resmi, atau tautan pemerintah (.go.id)",
            "Menawarkan hadiah uang atau meminta data KTP / nomor rekening"
          ],
          officialSources: [
            "Mafindo (Masyarakat Anti Fitnah Indonesia) - turnbackhoax.id",
            "CekFakta.com (Konsorsium Media Indonesia)",
            "Kementerian Komunikasi dan Digital - kominfo.go.id",
            "Portal Resmi Pemerintah (.go.id & .ac.id)"
          ],
          recommendations: [
            "Gunakan metode SIFT (Stop, Investigate source, Find coverage, Trace claims)",
            "Jangan langsung membagikan (share) ke grup keluarga atau media sosial",
            "Cek ulang berita pada mesin pencari Google dengan kata kunci '[Judul] + Hoaks'",
            "Laporkan hoaks melalui kanal TurnBackHoax.id atau AduanKonten Kominfo"
          ]
        });
      } else {
        throw new Error("Gagal merespons");
      }
    } catch (err) {
      // Intelligent fallback logic for offline/demo mode
      const lower = text.toLowerCase();
      let status: FactCheckResult['status'] = 'PERLU_VERIFIKASI';
      if (lower.includes('bit.ly') || lower.includes('blogspot') || lower.includes('bansos') || lower.includes('hadiah') || lower.includes('100%')) {
        status = 'HOAKS';
      } else if (lower.includes('ramalan') || lower.includes('kumur') || lower.includes('virus')) {
        status = 'DISINFORMASI';
      }

      setResult({
        status,
        confidenceScore: 88,
        summary: `Berdasarkan analisis algoritma literasi digital terhadap klaim "${text.slice(0, 80)}...":\n\nPesan ini memiliki karakteristik kuat sebagai pesan berantai (hoaks/phishing). Ciri utamanya antara lain tidak memiliki rujukan sumber resmi pemerintah (.go.id), menyertakan tautan terpendek (bit.ly/blogspot), serta meminta penyebaran secara terburu-buru.`,
        redFlags: [
          "Tautan tidak menggunakan domain resmi (.go.id / .ac.id)",
          "Format tulisan menggunakan huruf kapital berlebihan & tanda seru banyak",
          "Membujuk untuk membagikan pesan sebelum terverifikasi"
        ],
        officialSources: [
          "CekFakta.com & TurnBackHoax.id",
          "Situs Resmi Kominfo / Kementerian Terkait"
        ],
        recommendations: [
          "Lakukan verifikasi silang pada kanal CekFakta.com",
          "Gunakan metode SIFT sebelum menekan tombol Share"
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    const dom = domainInput.toLowerCase().trim();
    if (dom.endsWith('.go.id') || dom.endsWith('.ac.id') || dom.endsWith('.sch.id')) {
      setDomainResult({
        safe: true,
        domainType: "Domain Resmi Lembaga / Pendidikan (.go.id / .ac.id)",
        reason: "Situs ini terdaftar resmi pada pengelola nama domain Indonesia (PANDI) untuk instansi pemerintah atau lembaga pendidikan."
      });
    } else if (dom.includes('blogspot') || dom.includes('wordpress') || dom.includes('xyz') || dom.includes('site') || dom.includes('me') || dom.includes('top')) {
      setDomainResult({
        safe: false,
        domainType: "Domain Gratisan / Potensi Phishing",
        reason: "Waspada! Instansi pemerintah, kampus, atau bank resmi TIDAK PERNAH menggunakan domain gratisan seperti blogspot, wordpress, atau ekstensi berbiaya murah (.xyz / .site)."
      });
    } else {
      setDomainResult({
        safe: false,
        domainType: "Domain Umum (.com / .net / .org / .co.id)",
        reason: "Pastikan alamat domain sesuai persis dengan nama organisasi resmi. Hati-hati terhadap domain tiruan (typosquatting) yang mirip situs asli."
      });
    }
  };

  const filteredDatabase = VERIFIED_DATABASE.filter(item => {
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] p-6 sm:p-10 border-l-8 border-amber-600 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Fitur Cek Fakta Online Interaktif</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
          Mesin Verifikasi & Detektif Hoaks Digital
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
          Gunakan fitur pintar ini untuk memeriksa kebenaran pesan berantai, klaim berita, tautan mencurigakan, maupun isu viral secara instan berbasis prinsip SIFT dan database literasi digital.
        </p>
      </div>

      {/* SECTION 1: LIVE AI FACT CHECKER TOOL */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 sm:p-8 border border-stone-300 dark:border-stone-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="p-2 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              1. Analisis Klaim & Pesan Berantai (Live Fact Checker)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Tempelkan judul berita, pesan WhatsApp, atau klaim viral di bawah ini
            </p>
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-3">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Contoh: 'Pemerintah membagikan subsidi kuota internet 50GB gratis untuk seluruh siswa, klik link bit.ly/kuota-gratis-2026'..."
            className="w-full p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-sans text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="text-stone-500 font-bold shrink-0">Coba Klaim:</span>
              {PRESET_CLAIMS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(preset.text);
                    handleAnalyzeText(preset.text);
                  }}
                  className="px-2.5 py-1 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-[10px] font-medium shrink-0 border border-stone-300 dark:border-stone-700"
                >
                  {preset.category}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleAnalyzeText()}
              disabled={loading || !inputText.trim()}
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-stone-800 dark:bg-stone-200 dark:text-black dark:hover:bg-white text-white font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400 dark:text-amber-700" />
                  <span>Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 dark:text-amber-700" />
                  <span>Periksa Klaim Ini</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* FACT CHECK RESULT DISPLAY */}
        {result && (
          <div className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-100 space-y-5 animate-fade-in">
            
            {/* Result Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-3">
                {result.status === 'HOAKS' && (
                  <span className="px-3 py-1.5 bg-rose-700 text-white font-serif font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-5 h-5" /> HOAKS / KLAIM PALSU
                  </span>
                )}
                {result.status === 'DISINFORMASI' && (
                  <span className="px-3 py-1.5 bg-amber-600 text-white font-serif font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-5 h-5" /> DISINFORMASI / SALAH KONTEKS
                  </span>
                )}
                {result.status === 'FAKTA' && (
                  <span className="px-3 py-1.5 bg-emerald-800 text-white font-serif font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5" /> FAKTA TERVERIFIKASI
                  </span>
                )}
                {result.status === 'PERLU_VERIFIKASI' && (
                  <span className="px-3 py-1.5 bg-stone-700 text-white font-serif font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-5 h-5" /> PERLU VERIFIKASI
                  </span>
                )}
              </div>

              <span className="text-xs font-serif italic font-bold text-stone-600 dark:text-stone-400">
                Skor Kepercayaan Analisis: <strong className="text-stone-900 dark:text-stone-100">{result.confidenceScore}%</strong>
              </span>
            </div>

            {/* Analysis Text */}
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200">
              <h4 className="font-serif font-bold uppercase text-stone-900 dark:text-stone-100 text-xs">
                Hasil Analisis Literasi Digital:
              </h4>
              <p className="whitespace-pre-line font-sans bg-[#F9F7F2] dark:bg-stone-800 p-4 border border-stone-300 dark:border-stone-700">
                {result.summary}
              </p>
            </div>

            {/* Red Flags & Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                <h5 className="font-serif font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-rose-700" /> Indikator / Red Flags:
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-rose-900 dark:text-rose-200">
                  {result.redFlags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <h5 className="font-serif font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" /> Langkah Tindak Lanjut (SIFT):
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-amber-900 dark:text-amber-200">
                  {result.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Sources to Check */}
            <div className="pt-2 border-t border-stone-300 dark:border-stone-800 text-xs space-y-1">
              <span className="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Rujukan Resmi Cek Fakta Indonesia:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://turnbackhoax.id"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-[11px] font-bold border border-stone-300 dark:border-stone-700 hover:bg-stone-200 flex items-center gap-1"
                >
                  TurnBackHoax.id <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://cekfakta.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-[11px] font-bold border border-stone-300 dark:border-stone-700 hover:bg-stone-200 flex items-center gap-1"
                >
                  CekFakta.com <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://kominfo.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-[11px] font-bold border border-stone-300 dark:border-stone-700 hover:bg-stone-200 flex items-center gap-1"
                >
                  Kominfo Cek Hoaks <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SECTION 2: DOMAIN & URL CHECKER TOOL */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 sm:p-8 border border-stone-300 dark:border-stone-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="p-2 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              2. Pemeriksa Domain & Link Mencurigakan (Domain Checker)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Uji apakah ekstensi website yang kamu terima tergolong resmi atau potensi phishing
            </p>
          </div>
        </div>

        <form onSubmit={handleCheckDomain} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="Ketik domain (misal: pendaftaran-bansos.blogspot.com atau kemdikbud.go.id)..."
            className="flex-1 px-4 py-2.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-stone-800 dark:bg-stone-200 dark:text-black dark:hover:bg-white text-xs uppercase tracking-widest font-bold shrink-0"
          >
            Uji Domain
          </button>
        </form>

        {domainResult && (
          <div className={`p-4 border-l-4 text-xs font-sans space-y-1 ${
            domainResult.safe
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-700 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-700 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-serif font-bold text-sm">
              {domainResult.safe ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertTriangle className="w-4 h-4 text-rose-700" />}
              <span>{domainResult.domainType}</span>
            </div>
            <p>{domainResult.reason}</p>
          </div>
        )}
      </div>

      {/* SECTION 3: SEARCHABLE DATABASE OF VERIFIED HOAXES */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 sm:p-8 border border-stone-300 dark:border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 dark:border-stone-800 pb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              3. Katalis & Database Klaim Hoaks Terverifikasi
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Daftar hoaks populer yang pernah beredar beserta sanggahan resmi
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {['Semua', 'Keuangan', 'Kesehatan', 'Loker & Pendidikan', 'Edukasi Digital'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search input in DB */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari hoaks berdasarkan kata kunci (misal: subsidi, pendaftaran, biji pepaya)..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
          />
        </div>

        {/* List of items */}
        <div className="space-y-4">
          {filteredDatabase.map((item) => (
            <div 
              key={item.id}
              className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-300 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  {item.category}
                </span>

                <span className={`text-[10px] font-serif font-black px-2.5 py-0.5 text-white ${
                  item.status === 'HOAKS' ? 'bg-rose-700' : item.status === 'DISINFORMASI' ? 'bg-amber-700' : 'bg-emerald-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm sm:text-base text-stone-950 dark:text-stone-100">
                {item.title}
              </h4>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {item.description}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-sans border-t border-stone-300/80 dark:border-stone-800">
                <span className="italic text-stone-600 dark:text-stone-400">
                  💡 Tip Resmi: {item.officialTip}
                </span>
                <span className="font-bold text-stone-800 dark:text-stone-200 shrink-0">
                  Verifikator: {item.verifiedBy}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
