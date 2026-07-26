import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Map, 
  HelpCircle, 
  CheckCircle2, 
  Award, 
  Printer, 
  MessageSquare, 
  X, 
  Bookmark,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Lock,
  LogOut
} from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { UNITS_DATA, BADGES_LIST } from '../data/modulData';

interface SidebarProps {
  currentSection: SectionId;
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  onParticipantLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  userProgress,
  isOpen,
  onClose,
  onParticipantLogout
}) => {
  const hasIdentity = Boolean(userProgress.studentName && userProgress.studentName.trim().length > 0);

  const navItems = [
    { id: 'cover', label: 'Halaman Sampul', icon: BookOpen, badge: null },
    { id: 'kata-pengantar', label: 'Kata Pengantar', icon: FileText, badge: !hasIdentity ? 'Terkunci' : null },
    { id: 'petunjuk', label: 'Petunjuk Penggunaan', icon: HelpCircle, badge: !hasIdentity ? 'Terkunci' : null },
    { id: 'peta-konsep', label: 'Peta Konsep & Alur', icon: Map, badge: !hasIdentity ? 'Terkunci' : null },
    { id: 'cek-fakta', label: 'Fitur Cek Fakta Online', icon: ShieldCheck, badge: !hasIdentity ? 'Terkunci' : 'Fitur AI' },
  ];

  const bottomItems = [
    { id: 'kuis-akhir', label: 'Kuis Akhir & Evaluasi', icon: Sparkles, badge: !hasIdentity ? 'Terkunci' : (userProgress.finalQuizScore !== null ? `${userProgress.finalQuizScore}/100` : null) },
    { id: 'certificate', label: 'Sertifikat Kelulusan', icon: Award, badge: !hasIdentity ? 'Terkunci' : (userProgress.finalQuizScore !== null && userProgress.finalQuizScore >= 70 ? 'Tersedia' : 'Terkunci') },
    { id: 'umpan-balik', label: 'Umpan Balik Modul', icon: MessageSquare, badge: !hasIdentity ? 'Terkunci' : null },
    { id: 'print-pdf', label: 'Download Modul (PDF)', icon: Printer, badge: !hasIdentity ? 'Terkunci' : (userProgress.finalQuizScore !== null && userProgress.finalQuizScore >= 70 ? 'Tersedia' : 'Terkunci') },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar drawer */}
      <aside 
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-[#F4F1EA] dark:bg-[#161615] border-r border-stone-300/80 dark:border-stone-800 transition-transform duration-300 ease-in-out overflow-y-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">

          {/* Close button on mobile */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-stone-300 dark:border-stone-800">
            <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">Daftar Isi E-Modul</span>
            <button onClick={onClose} className="p-1 rounded text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Profile Card - Editorial Callout */}
          <div className={`p-3.5 border-l-4 space-y-2 transition-all ${
            !hasIdentity 
              ? 'bg-amber-100/80 dark:bg-amber-950/60 border-amber-600 text-amber-950 dark:text-amber-200' 
              : 'bg-[#E9E4DB] dark:bg-[#1E1E1C] border-[#1A1A1A] dark:border-stone-200 text-[#1A1A1A] dark:text-stone-100'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] dark:bg-stone-200 text-[#F9F7F2] dark:text-[#1A1A1A] flex items-center justify-center font-serif font-bold text-xs shrink-0">
                {userProgress.studentName ? userProgress.studentName.charAt(0).toUpperCase() : <Lock className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500 dark:text-stone-400 block">
                  {hasIdentity ? 'Peserta Terdaftar' : 'Status Akses'}
                </span>
                <p className="text-xs font-serif font-bold truncate">
                  {userProgress.studentName || 'Belum Mengisi Identitas'}
                </p>
              </div>
            </div>
            {!hasIdentity ? (
              <p className="text-[10px] text-amber-900 dark:text-amber-300 font-sans font-bold leading-tight pt-1.5 border-t border-amber-300/80 dark:border-amber-800 flex items-center gap-1">
                <Lock className="w-3 h-3 shrink-0 text-amber-700 dark:text-amber-400" />
                <span>Isi identitas di Sampul untuk membuka modul</span>
              </p>
            ) : (
              <div className="pt-2 border-t border-stone-300 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-stone-600 dark:text-stone-400">
                  <span>Lencana:</span>
                  <span className="font-serif italic text-xs text-[#1A1A1A] dark:text-stone-200">
                    {userProgress.badges.length} / {BADGES_LIST.length}
                  </span>
                </div>
                {onParticipantLogout && (
                  <button
                    onClick={() => {
                      onParticipantLogout();
                      onClose();
                    }}
                    className="w-full py-1.5 px-2.5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800 text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Keluar / Logout Peserta</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation Group 1: General */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-2 mb-2">
              Pendahuluan
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSection(item.id as SectionId);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black font-bold border-l-2 border-amber-500'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400 dark:text-amber-700' : 'text-stone-500 dark:text-stone-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 border ${
                        isActive 
                          ? 'border-white text-white dark:border-black dark:text-black' 
                          : 'border-amber-600 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Group 2: Units 1 - 5 */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-2 mb-2">
              Unit Pembelajaran
            </h3>
            <div className="space-y-1.5">
              {UNITS_DATA.map((unit) => {
                const isActive = currentSection === unit.id;
                const isCompleted = userProgress.completedSections.includes(unit.id as SectionId);
                const score = userProgress.unitQuizScores[unit.id];

                return (
                  <button
                    key={unit.id}
                    onClick={() => {
                      onSelectSection(unit.id as SectionId);
                      onClose();
                    }}
                    className={`w-full text-left p-2.5 border transition-all ${
                      isActive
                        ? 'bg-[#E9E4DB] dark:bg-[#22211F] border-[#1A1A1A] dark:border-stone-400 text-[#1A1A1A] dark:text-stone-100 border-l-4'
                        : 'bg-[#F9F7F2] dark:bg-[#1A1A18] border-stone-300/80 dark:border-stone-800 hover:border-stone-400 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center">
                        <span className="font-serif italic text-sm text-stone-400 dark:text-stone-500 mr-2.5 shrink-0">
                          0{unit.number}
                        </span>
                        <span className="text-xs font-serif font-bold leading-snug line-clamp-1">
                          {unit.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {!hasIdentity && (
                          <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>
                    <div className="mt-1 pl-6 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      <span className="truncate">{unit.subtitle}</span>
                      {score !== undefined && (
                        <span className="font-serif italic font-bold text-amber-800 dark:text-amber-400 shrink-0 ml-1">
                          {score} pt
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Group 3: Final & Certificate */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-2 mb-2">
              Evaluasi & Sertifikat
            </h3>
            <div className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSection(item.id as SectionId);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400 dark:text-amber-700' : 'text-stone-500 dark:text-stone-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 border ${
                        isActive 
                          ? 'border-white text-white dark:border-black dark:text-black' 
                          : 'border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer note & Admin Access */}
          <div className="pt-4 border-t border-stone-300 dark:border-stone-800 space-y-3 text-[10px] uppercase tracking-widest text-stone-400 text-center font-sans">
            <button
              onClick={() => {
                onSelectSection('admin-login');
                onClose();
              }}
              className={`w-full py-2 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border ${
                currentSection === 'admin-login' || currentSection === 'admin-dashboard'
                  ? 'bg-amber-700 text-white border-amber-800'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 border-stone-300 dark:border-stone-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Akses Admin / Pengelola</span>
            </button>

            <div>
              <p className="font-bold text-stone-600 dark:text-stone-400">E-Modul Etika Informasi</p>
              <p className="mt-0.5">Literasi Digital © 2026</p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};
