import React from 'react';
import { 
  BookOpen, 
  Search, 
  Printer, 
  Sparkles, 
  Bookmark, 
  Sun, 
  Moon, 
  Type,
  Award,
  CheckCircle2,
  Menu,
  ShieldCheck,
  LogOut,
  User
} from 'lucide-react';
import { SectionId, UserProgress } from '../types';

interface HeaderProps {
  currentSection: SectionId;
  onSelectSection: (sectionId: SectionId) => void;
  onOpenSearch: () => void;
  onOpenAiTutor: () => void;
  userProgress: UserProgress;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onParticipantLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  onOpenSearch,
  onOpenAiTutor,
  userProgress,
  onToggleSidebar,
  darkMode,
  onToggleDarkMode,
  fontSize,
  onChangeFontSize,
  onParticipantLogout
}) => {
  const hasIdentity = Boolean(userProgress.studentName && userProgress.studentName.trim().length > 0);
  // Calculate completion percentage
  const totalSections = 9; // unit 1-5, cover, kata pengantar, petunjuk, peta konsep
  const completedCount = userProgress.completedSections.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalSections) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 dark:bg-[#141413]/95 backdrop-blur border-b border-stone-300/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors lg:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onSelectSection('cover')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-md bg-[#1A1A1A] dark:bg-stone-200 text-[#F9F7F2] dark:text-[#1A1A1A] flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-stone-800 dark:group-hover:bg-white transition-colors">
              E
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-[#1A1A1A] dark:text-stone-100 text-lg leading-tight tracking-tight">
                  Jelajah Digital
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 rounded border border-stone-300 dark:border-stone-700">
                  E-Modul
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Etika Informasi berbasis Literasi Digital</p>
            </div>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-4">
          <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden border border-stone-300/60 dark:border-stone-700">
            <div 
              className="bg-[#1A1A1A] dark:bg-stone-200 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 min-w-10">
            {progressPercent}%
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Cek Fakta Button */}
          <button
            onClick={() => onSelectSection('cek-fakta')}
            className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors border ${
              currentSection === 'cek-fakta'
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 hover:bg-amber-200 border-amber-300 dark:border-amber-800'
            }`}
            title="Fitur Cek Fakta Online Interaktif"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
            <span className="hidden sm:inline">Cek Fakta</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 text-stone-800 dark:text-stone-200 bg-stone-200/50 dark:bg-stone-800/80 hover:bg-stone-300/60 dark:hover:bg-stone-700 rounded-md text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors border border-stone-300 dark:border-stone-700"
            title="Cari Topik E-Modul"
          >
            <Search className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
            <span className="hidden sm:inline">Cari</span>
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={onOpenAiTutor}
            className="px-3 py-1.5 bg-[#1A1A1A] dark:bg-stone-200 text-[#F9F7F2] dark:text-[#1A1A1A] hover:bg-stone-800 dark:hover:bg-white rounded-md text-[11px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            title="Tanya Asisten AI Literasi Digital"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-700" />
            <span className="hidden sm:inline">Asisten AI</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={() => onSelectSection('print-pdf')}
            className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors border ${
              currentSection === 'print-pdf'
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 border-stone-300 dark:border-stone-700'
            }`}
            title="Buka Format PDF Luring / Cetak Modul"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Luring</span>
          </button>

          {/* Font Size Toggle */}
          <div className="hidden sm:flex items-center bg-stone-200/60 dark:bg-stone-800/60 rounded-md p-0.5 border border-stone-300 dark:border-stone-700">
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1.5 py-0.5 text-xs font-serif font-bold rounded ${fontSize === 'normal' ? 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-black shadow-xs' : 'text-stone-600 dark:text-stone-400'}`}
              title="Ukuran Teks Normal"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1.5 py-0.5 text-sm font-serif font-bold rounded ${fontSize === 'large' ? 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-black shadow-xs' : 'text-stone-600 dark:text-stone-400'}`}
              title="Ukuran Teks Besar"
            >
              A+
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors border border-stone-300 dark:border-stone-700"
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-800" />}
          </button>

          {/* Participant Logout Button */}
          {hasIdentity && onParticipantLogout && (
            <button
              onClick={onParticipantLogout}
              className="px-2.5 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 dark:bg-rose-950/80 dark:hover:bg-rose-900 dark:text-rose-200 dark:border-rose-800"
              title={`Peserta: ${userProgress.studentName} — Klik untuk Keluar / Logout`}
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span className="hidden lg:inline truncate max-w-[90px]">{userProgress.studentName}</span>
              <span className="text-[9px] font-mono font-bold text-rose-700 dark:text-rose-300">(Logout)</span>
            </button>
          )}

          {/* Admin Login Button */}
          <button
            onClick={() => onSelectSection(currentSection === 'admin-dashboard' ? 'admin-dashboard' : 'admin-login')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 transition-colors border ${
              currentSection === 'admin-login' || currentSection === 'admin-dashboard'
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 border-stone-300 dark:border-stone-700'
            }`}
            title="Akses Portal Pengelola / Admin"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden xl:inline">Admin</span>
          </button>

        </div>

      </div>
    </header>
  );
};
