import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Video, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Trophy,
  Save,
  MessageCircle,
  Share2
} from 'lucide-react';
import { SectionId, UnitInfo, UserProgress, QuizQuestion, VideoConfigItem } from '../types';
import { 
  UNIT_1_QUIZ, 
  UNIT_2_QUIZ, 
  UNIT_3_QUIZ, 
  UNIT_4_QUIZ, 
  UNIT_5_QUIZ 
} from '../data/quizData';
import { EthicsSurvey } from './InteractiveGames/EthicsSurvey';
import { DetectiveSim } from './InteractiveGames/DetectiveSim';
import { SecurityChecklist } from './InteractiveGames/SecurityChecklist';
import { PlagiarismScenarios } from './InteractiveGames/PlagiarismScenarios';
import { FilterShareGame } from './InteractiveGames/FilterShareGame';
import confetti from 'canvas-confetti';

interface UnitViewProps {
  unit: UnitInfo;
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
  onSaveUnitScore: (unitId: string, score: number) => void;
  onSaveSurveyScore: (score: number) => void;
  onSaveChecklistScore: (score: number) => void;
  onSaveFilterShareScore: (score: number) => void;
  onSaveNote: (sectionId: string, text: string) => void;
  onCompleteUnit: (unitId: SectionId) => void;
  videoOverride?: VideoConfigItem;
}

export const UnitView: React.FC<UnitViewProps> = ({
  unit,
  onSelectSection,
  userProgress,
  onSaveUnitScore,
  onSaveSurveyScore,
  onSaveChecklistScore,
  onSaveFilterShareScore,
  onSaveNote,
  onCompleteUnit,
  videoOverride
}) => {

  // Select quiz questions based on unit number
  const quizQuestions: QuizQuestion[] = 
    unit.number === 1 ? UNIT_1_QUIZ :
    unit.number === 2 ? UNIT_2_QUIZ :
    unit.number === 3 ? UNIT_3_QUIZ :
    unit.number === 4 ? UNIT_4_QUIZ :
    UNIT_5_QUIZ;

  // Local state for Unit Quiz
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(
    userProgress.unitQuizScores[unit.id] !== undefined
  );
  const [noteText, setNoteText] = useState<string>(
    userProgress.notes[unit.id] || ''
  );
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      alert('Mohon jawab seluruh 5 soal latihan unit ini.');
      return;
    }

    let correctCount = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / quizQuestions.length) * 100);
    setQuizSubmitted(true);
    onSaveUnitScore(unit.id, calculatedScore);
    onCompleteUnit(unit.id as SectionId);

    if (calculatedScore >= 80) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(unit.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 font-sans">
      
      {/* Unit Banner - Editorial Style */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] p-6 sm:p-10 space-y-4 relative overflow-hidden border-l-8 border-amber-600 shadow-md">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 border-b border-stone-800 pb-3">
          <span>UNIT 0{unit.number} — ETIKA INFORMASI</span>
          <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-amber-300 font-serif italic text-xs">
            🏆 {unit.badgeName}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
            {unit.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-serif italic">
            {unit.subtitle}
          </p>
        </div>

        {/* Learning Goals */}
        <div className="bg-[#242424] p-4 sm:p-5 border border-stone-800 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Tujuan Pembelajaran Unit 0{unit.number}:</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-300">
            {unit.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-serif italic text-amber-400 font-bold shrink-0">
                  {idx + 1}.
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video Intro Section */}
      {(() => {
        const currentVideo = videoOverride ? {
          title: videoOverride.title,
          embedPlaceholder: videoOverride.embedUrl,
          duration: videoOverride.duration,
          summary: videoOverride.summary
        } : unit.videoInfo;

        return (
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-300 dark:border-stone-800 pb-3">
              <div className="p-2.5 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">Video Pengantar Unit</span>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
                  {currentVideo.title}
                </h3>
              </div>
            </div>

            <div className="aspect-video w-full bg-black overflow-hidden border border-stone-300 dark:border-stone-800">
              <iframe
                className="w-full h-full"
                src={currentVideo.embedPlaceholder}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-[#E9E4DB] dark:bg-[#22211F] p-3.5 text-xs text-stone-800 dark:text-stone-300 space-y-1 border-l-4 border-stone-800 dark:border-stone-400">
              <p><span className="font-bold text-stone-900 dark:text-stone-100">Durasi Video:</span> {currentVideo.duration}</p>
              <p><span className="font-bold text-stone-900 dark:text-stone-100">Ringkasan Materi:</span> {currentVideo.summary}</p>
            </div>
          </div>
        );
      })()}

      {/* MAIN CONCEPT MATERIAL CONTENT (Custom tailored per Unit from PDF) */}
      
      {/* UNIT 1 MATERIAL */}
      {unit.number === 1 && (
        <div className="space-y-8">
          
          {/* Definition */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              Apa Itu Etika Informasi?
            </h3>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              Etika informasi adalah cabang dari etika yang membahas tentang nilai-nilai moral dan prinsip-prinsip yang mengatur perilaku manusia dalam menciptakan, mengakses, menyebarkan, dan menggunakan informasi.
            </p>
            <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-relaxed font-serif italic">
              “Bayangkan etika informasi seperti rambu lalu lintas di dunia digital. Sama seperti rambu lalu lintas mengatur kendaraan di jalan agar tidak terjadi kecelakaan, etika informasi mengatur kita agar tidak ‘kecelakaan’ di dunia maya.”
            </div>
          </div>

          {/* Table Masalah & Dampak */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4 overflow-hidden">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Mengapa Etika Informasi Penting di Indonesia?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white font-serif font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">Masalah</th>
                    <th className="p-3">Dampak Negatif</th>
                    <th className="p-3">Contoh Realitas di Indonesia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-bold text-rose-700 dark:text-rose-400">Hoaks & Disinformasi</td>
                    <td className="p-3">Kepanikan masyarakat, kerugian materi, perpecahan sosial</td>
                    <td className="p-3">Hoaks vaksin COVID-19, hoaks bencana alam gempa bumi</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-bold text-amber-700 dark:text-amber-400">Plagiarisme</td>
                    <td className="p-3">Merusak integritas akademik, merugikan pencipta asli</td>
                    <td className="p-3">Kasus plagiarisme skripsi/jurnal di kalangan mahasiswa</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">Pelanggaran Hak Cipta</td>
                    <td className="p-3">Kerugian ekonomi bagi kreator & seniman</td>
                    <td className="p-3">Pembajakan buku elektronik (e-book), film, musik online</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-bold text-blue-700 dark:text-blue-400">Pelanggaran Privasi</td>
                    <td className="p-3">Penyalahgunaan data pribadi, kejahatan siber</td>
                    <td className="p-3">Kebocoran data pengguna platform digital & e-commerce</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-bold text-rose-700 dark:text-rose-400">Ujaran Kebencian</td>
                    <td className="p-3">Perpecahan sosial, trauma psikologis korban</td>
                    <td className="p-3">Komentar rasis, SARA, dan cyberbullying di medsos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold font-serif uppercase tracking-wider text-[11px]">Info Penting survei Kominfo:</p>
                <p>Menurut survei Kominfo, tingkat literasi digital masyarakat Indonesia masih berada pada kategori <span className="font-bold underline">“sedang”</span>. Ini berarti masih banyak masyarakat yang belum mampu membedakan informasi yang benar dan hoaks!</p>
              </div>
            </div>
          </div>

          {/* Generasi Digital Native */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Generasi Digital Native: Tantangan & Peluang
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              Kamu adalah bagian dari generasi digital native—generasi yang lahir dan tumbuh bersama teknologi digital. Kamu fasih menggunakan gadget, namun fasih secara teknis belum tentu fasih secara etis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-rose-700 space-y-2 text-xs sm:text-sm">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">⚠️ Tantangan Utama:</h4>
                <ul className="space-y-1.5 text-stone-800 dark:text-stone-200 list-disc pl-4">
                  <li><span className="font-bold">Information Overload:</span> Terpapar ribuan informasi tiap hari. Mana yang dipercaya?</li>
                  <li><span className="font-bold">Echo Chamber & Filter Bubble:</span> Algoritma hanya menampilkan konten sesuai minatmu.</li>
                  <li><span className="font-bold">Kecepatan vs Ketepatan:</span> Tergoda "share" sebelum memverifikasi.</li>
                  <li><span className="font-bold">Identitas Digital vs Nyata:</span> Apakah keduanya sudah sejalan secara etis?</li>
                </ul>
              </div>

              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-emerald-700 space-y-2 text-xs sm:text-sm">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">🚀 Peluang Emas:</h4>
                <ul className="space-y-1.5 text-stone-800 dark:text-stone-200 list-disc pl-4">
                  <li>Kemampuan mengakses ilmu pengetahuan dari seluruh dunia secara instan.</li>
                  <li>Kesempatan untuk belajar hal baru dan keterampilan masa depan setiap hari.</li>
                  <li>Potensi menjadi agen perubahan positif di masyarakat digital.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Studi Kasus Gempa Jakarta */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-serif font-bold text-base">
              <Search className="w-5 h-5" />
              <span>Studi Kasus 1: Ketika Hoaks Bencana Alam Menjadi Viral</span>
            </div>
            <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2 text-xs sm:text-sm leading-relaxed">
              <p className="font-serif font-bold text-stone-900 dark:text-stone-100">Kasus: Berita Palsu tentang Bencana Alam Gempa Jakarta</p>
              <p className="text-stone-800 dark:text-stone-200">
                Beredar luas di WhatsApp dan Facebook sebuah video yang diklaim sebagai rekaman “gempa bumi dahsyat yang akan terjadi di Jakarta”. Video disertai narasi yang menyesakkan dan ajakan untuk segera mengungsi. Akibatnya, kepanikan melanda warga di beberapa wilayah Jakarta.
              </p>
              <p className="p-2.5 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black font-medium">
                <span className="font-bold uppercase text-[11px] tracking-wider text-amber-400 dark:text-amber-700 block">Fakta Cek:</span> Setelah ditelusuri tim cek fakta, video tersebut ternyata adalah rekaman gempa di negara lain beberapa tahun sebelumnya. Tidak ada rilis resmi dari BMKG tentang gempa besar di Jakarta.
              </p>
            </div>
          </div>

          {/* Interactive Ethics Survey Component */}
          <EthicsSurvey onSaveScore={onSaveSurveyScore} savedScore={userProgress.ethicsSurveyScore} />

        </div>
      )}

      {/* UNIT 2 MATERIAL */}
      {unit.number === 2 && (
        <div className="space-y-8">
          
          {/* Types of fake news */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Mengenal Jenis-Jenis Informasi Palsu
            </h3>
            <p className="text-sm text-stone-800 dark:text-stone-200">
              Tidak semua informasi palsu itu sama. Mari kita bedakan tingkat kesengajaannya:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white font-serif font-bold uppercase text-[11px]">
                    <th className="p-3">Jenis</th>
                    <th className="p-3">Definisi</th>
                    <th className="p-3">Contoh</th>
                    <th className="p-3">Niat Penyebar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-serif font-bold text-amber-700 dark:text-amber-400">Misinformasi</td>
                    <td className="p-3">Informasi salah yang disebarkan tanpa niat jahat/keliru.</td>
                    <td className="p-3">Berbagi berita lama yang dianggap masih baru/relevan.</td>
                    <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">Tidak sengaja</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-serif font-bold text-rose-700 dark:text-rose-400">Disinformasi</td>
                    <td className="p-3">Informasi palsu yang sengaja dibuat untuk menyesatkan.</td>
                    <td className="p-3">Hoaks politik, propaganda, clickbait provokatif.</td>
                    <td className="p-3 font-bold text-rose-700 dark:text-rose-400">Sengaja</td>
                  </tr>
                  <tr className="hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                    <td className="p-3 font-serif font-bold text-purple-700 dark:text-purple-400">Malinformasi</td>
                    <td className="p-3">Informasi benar yang disebarkan untuk merugikan orang.</td>
                    <td className="p-3">Data pribadi yang dibocorkan (doxing), gosip privasi.</td>
                    <td className="p-3 font-bold text-rose-700 dark:text-rose-400">Sengaja</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SIFT Method */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Teknik Verifikasi Informasi (Metode S.I.F.T)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              Ilmuwan informasi Michael Caulfield mengembangkan metode S.I.F.T untuk verifikasi cepat dan akurat:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-[#1A1A1A] dark:border-stone-300 space-y-1">
                <span className="font-serif italic font-black text-[#1A1A1A] dark:text-stone-100 text-lg block">S = STOP</span>
                <p className="text-stone-800 dark:text-stone-200">Berhenti sejenak sebelum membaca & membagikan. Tanyakan: "Apakah saya tahu kredibilitas sumber ini?"</p>
              </div>

              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-[#1A1A1A] dark:border-stone-300 space-y-1">
                <span className="font-serif italic font-black text-[#1A1A1A] dark:text-stone-100 text-lg block">I = INVESTIGATE</span>
                <p className="text-stone-800 dark:text-stone-200">Selidiki sumber informasi. Siapa penulisnya? Apakah situs tersebut dikenal kredibel?</p>
              </div>

              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-[#1A1A1A] dark:border-stone-300 space-y-1">
                <span className="font-serif italic font-black text-[#1A1A1A] dark:text-stone-100 text-lg block">F = FIND COVERAGE</span>
                <p className="text-stone-800 dark:text-stone-200">Cari liputan lain dari media kredibel (Tempo, Kompas, BMKG, BPS) untuk membandingkan fakta.</p>
              </div>

              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-[#1A1A1A] dark:border-stone-300 space-y-1">
                <span className="font-serif italic font-black text-[#1A1A1A] dark:text-stone-100 text-lg block">T = TRACE CLAIMS</span>
                <p className="text-stone-800 dark:text-stone-200">Telusuri klaim ke konteks aslinya. Apakah video/foto dipotong atau diubah dengan AI?</p>
              </div>
            </div>
          </div>

          {/* Interactive Detective Simulation Game */}
          <DetectiveSim />

        </div>
      )}

      {/* UNIT 3 MATERIAL */}
      {unit.number === 3 && (
        <div className="space-y-8">
          
          {/* Data Privacy UU PDP */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Data Pribadi Menurut UU PDP No. 27 Tahun 2022
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              Di era digital, data pribadi adalah aset paling berharga. Setiap kali kamu online, kamu meninggalkan jejak digital yang dapat dikumpulkan dan disalahgunakan jika tidak dijaga.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-rose-700 space-y-2 text-xs sm:text-sm">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">🔒 Data Pribadi Spesifik (Dilindungi Tinggi):</h4>
                <p className="text-stone-800 dark:text-stone-200">Data kesehatan, data biometrik (sidik jari, wajah), data keuangan/kartu kredit, data anak, catatan kejahatan.</p>
              </div>

              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 space-y-2 text-xs sm:text-sm">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">📄 Data Pribadi Umum:</h4>
                <p className="text-stone-800 dark:text-stone-200">Nama lengkap, jenis kelamin, kewarganegaraan, agama, nomor telepon, alamat rumah, tanggal lahir, riwayat pendidikan.</p>
              </div>
            </div>
          </div>

          {/* Case Study Phishing */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-serif font-bold text-base">
              <Search className="w-5 h-5" />
              <span>Studi Kasus 2: Phishing Mengatasnamakan Lembaga Kampus</span>
            </div>
            <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2 text-xs sm:text-sm leading-relaxed">
              <p className="font-serif font-bold text-stone-900 dark:text-stone-100">Kasus Email Palsu “Verifikasi Akun Portal Kampus”</p>
              <p className="text-stone-800 dark:text-stone-200">
                Seorang mahasiswa bernama Nadia menerima email yang tampak resmi dari kampus. Email memintanya mengklik link verifikasi akun dan memasukkan password. Karena menggunakan logo mirip kampus, Nadia memasukkan data. Beberapa jam kemudian, akun email dan portal studinya diambil alih orang lain.
              </p>
              <p className="p-2.5 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black font-medium">
                <span className="font-bold uppercase text-[11px] tracking-wider text-amber-400 dark:text-amber-700 block">Fakta Cek:</span> Email dikirim dari domain palsu: <code className="font-mono bg-stone-800 text-amber-300 px-1 py-0.5 font-bold">admin@unij.ac.id</code> (domain resmi kampus adalah <code className="font-mono bg-stone-800 text-emerald-300 px-1 py-0.5 font-bold">admin@kampus.ac.id</code>).
              </p>
            </div>
          </div>

          {/* Security Checklist Component */}
          <SecurityChecklist onSaveScore={onSaveChecklistScore} savedScore={userProgress.securityChecklistScore} />

        </div>
      )}

      {/* UNIT 4 MATERIAL */}
      {unit.number === 4 && (
        <div className="space-y-8">
          
          {/* Plagiarism & Citation */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Format Sitasi & Kutipan (APA 7th Edition)
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              Untuk menghindari plagiarisme, selalu cantumkan sumber dengan format standar akademis seperti APA Style 7th Edition:
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 space-y-1">
                <p className="font-serif font-bold text-stone-900 dark:text-stone-100">1. Kutipan Langsung Pendek:</p>
                <p className="font-serif italic text-stone-800 dark:text-stone-200">“Menurut Sanjaya (2026), literasi digital sangat penting bagi mahasiswa” (hal. 45).</p>
              </div>

              <div className="p-3.5 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 space-y-1">
                <p className="font-serif font-bold text-stone-900 dark:text-stone-100">2. Hasil Parafrase Mandiri:</p>
                <p className="font-serif italic text-stone-800 dark:text-stone-200">Menurut penelitian terbaru, mahasiswa dengan literasi digital tinggi lebih mampu mengidentifikasi hoaks (Sanjaya, 2026).</p>
              </div>

              <div className="p-3.5 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 space-y-1">
                <p className="font-serif font-bold text-stone-900 dark:text-stone-100">3. Format Penulisan Daftar Pustaka:</p>
                <p className="font-mono text-stone-800 dark:text-stone-200">Sanjaya, R. (2026). E-Modul Etika Informasi Berbasis Literasi Digital. Literasi Digital Press.</p>
              </div>
            </div>
          </div>

          {/* Interactive Plagiarism Scenarios Component */}
          <PlagiarismScenarios />

        </div>
      )}

      {/* UNIT 5 MATERIAL */}
      {unit.number === 5 && (
        <div className="space-y-8">
          
          {/* 5P Principles */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Prinsip "Saring Sebelum Sharing" (5P)
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200">
              Sebelum membagikan informasi di media sosial, terapkan 5 pertanyaan emas berikut:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-sans">
              <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-center space-y-1">
                <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 text-base block">1. PAHAMI</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px]">Pahami isi & konteks informasi.</p>
              </div>
              <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-center space-y-1">
                <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 text-base block">2. PERIKSA</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px]">Cek kebenaran dari sumber resmi.</p>
              </div>
              <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-center space-y-1">
                <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 text-base block">3. PERHATIKAN</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px]">Perhatikan dampak bagi orang lain.</p>
              </div>
              <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-center space-y-1">
                <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 text-base block">4. TIMBANG</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px]">Pertimbangkan motif di balik informasi.</p>
              </div>
              <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-700 text-center space-y-1">
                <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 text-base block">5. PUTUSKAN</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px]">Putuskan dengan bijak untuk share/filter.</p>
              </div>
            </div>
          </div>

          {/* Interactive Filter vs Share Game */}
          <FilterShareGame onSaveScore={onSaveFilterShareScore} savedScore={userProgress.filterShareScore} />

        </div>
      )}

      {/* UNIT MULTIPLE CHOICE QUIZ EXERCISES (5 Questions per Unit) */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg">
                Latihan Pemahaman Unit 0{unit.number}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Kerjakan 5 soal pilihan ganda berikut untuk menguji pemahamanmu!
              </p>
            </div>
          </div>

          {userProgress.unitQuizScores[unit.id] !== undefined && (
            <span className="px-3 py-1 bg-[#1A1A1A] text-amber-400 border border-amber-500 font-serif font-bold text-xs">
              Skor: {userProgress.unitQuizScores[unit.id]} / 100
            </span>
          )}
        </div>

        <form onSubmit={handleQuizSubmit} className="space-y-6">
          <div className="space-y-4">
            {quizQuestions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;
              const isUserCorrect = quizSubmitted && selectedAnswers[q.id] === q.correctAnswer;
              
              return (
                <div key={q.id} className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3">
                  <p className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                    0{idx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedAnswers[q.id] === optIdx;
                      const isOptionCorrect = q.correctAnswer === optIdx;

                      let optionStyle = 'bg-[#F9F7F2] dark:bg-[#1A1A18] text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100';

                      if (quizSubmitted) {
                        if (isOptionCorrect) {
                          optionStyle = 'bg-emerald-900 text-white border-emerald-700 font-bold';
                        } else if (isOptionSelected && !isUserCorrect) {
                          optionStyle = 'bg-rose-900 text-white border-rose-700 font-bold';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-black font-bold border-[#1A1A1A]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3 border text-left text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-serif font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </span>
                          {quizSubmitted && isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {quizSubmitted && isOptionSelected && !isUserCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-[#F9F7F2] dark:bg-[#1A1A18] border-l-4 border-amber-600 text-xs text-stone-800 dark:text-stone-200 space-y-1">
                      <span className="font-serif font-bold text-amber-800 dark:text-amber-400">Penjelasan Jawaban:</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            {quizSubmitted && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-bold hover:bg-stone-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Soal Latihan</span>
              </button>
            )}

            <button
              type="submit"
              disabled={quizSubmitted || Object.keys(selectedAnswers).length < quizQuestions.length}
              className="ml-auto px-6 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black dark:hover:bg-white disabled:opacity-50 text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan & Kirim Jawaban</span>
            </button>
          </div>
        </form>
      </div>

      {/* Summary Box */}
      <div className="bg-[#1A1A1A] text-white p-6 space-y-3 border-l-8 border-amber-600 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-base">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Rangkuman Unit 0{unit.number}: Poin Penting</span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-stone-300 list-disc pl-5 font-sans">
          {unit.keyPoints.map((pt, idx) => (
            <li key={idx} className="leading-relaxed">{pt}</li>
          ))}
        </ul>

        <div className="pt-2 border-t border-stone-800 text-center font-serif italic text-xs text-stone-400">
          “{unit.quote}”
        </div>
      </div>

      {/* Reflection Note Pad (PR) */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-3">
        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          Catatan Refleksi Mandiri / Pekerjaan Rumah (PR)
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Tuliskan refleksi pribadi atau tugas rumah mengenai materi Unit 0{unit.number} di sini:
        </p>

        <form onSubmit={handleSaveNoteSubmit} className="space-y-2">
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Tuliskan poin refleksi pribadi atau hasil analisismu..."
            className="w-full p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-[#1A1A1A] text-white hover:bg-stone-800 dark:bg-stone-200 dark:text-black text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Catatan</span>
            </button>

            {noteSaved && (
              <span className="text-xs font-serif italic font-bold text-emerald-700 dark:text-emerald-400">
                ✓ Catatan berhasil disimpan!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-800 font-sans">
        <button
          onClick={() => {
            if (unit.number === 1) onSelectSection('peta-konsep');
            else onSelectSection(`unit-${unit.number - 1}` as SectionId);
          }}
          className="px-4 py-2.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs uppercase tracking-wider hover:bg-stone-300 transition-colors flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{unit.number === 1 ? 'Peta Konsep' : `Unit 0${unit.number - 1}`}</span>
        </button>

        <button
          onClick={() => {
            if (unit.number < 5) onSelectSection(`unit-${unit.number + 1}` as SectionId);
            else onSelectSection('kuis-akhir');
          }}
          className="px-6 py-2.5 bg-[#1A1A1A] text-white hover:bg-stone-800 dark:bg-stone-200 dark:text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-stone-800"
        >
          <span>{unit.number < 5 ? `Lanjut ke Unit 0${unit.number + 1}` : 'Kuis Akhir & Evaluasi'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
