import React, { useState, useEffect } from 'react';
import { SectionId, UserProgress, VideoConfigItem } from './types';
import { getLocalVideosConfig, saveLocalVideosConfig } from './utils/videoStorage';
import { UNITS_DATA, BADGES_LIST } from './data/modulData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CoverView } from './components/CoverView';
import { KataPengantarView } from './components/KataPengantarView';
import { PetunjukView } from './components/PetunjukView';
import { PetaKonsepView } from './components/PetaKonsepView';
import { UnitView } from './components/UnitView';
import { KuisAkhirView } from './components/KuisAkhirView';
import { CertificateView } from './components/CertificateView';
import { UmpanBalikView } from './components/UmpanBalikView';
import { PrintPDFView } from './components/PrintPDFView';
import { CekFaktaView } from './components/CekFaktaView';
import { UjiKemiripanView } from './components/UjiKemiripanView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SearchModal } from './components/SearchModal';
import { AiTutorModal } from './components/AiTutorModal';

const INITIAL_PROGRESS: UserProgress = {
  completedSections: [],
  unitQuizScores: {},
  finalQuizScore: null,
  finalEssayAnswer: '',
  finalEssayScore: null,
  finalEssayFeedback: null,
  ethicsSurveyScore: null,
  securityChecklistScore: null,
  filterShareScore: 0,
  bookmarks: [],
  notes: {},
  studentName: '',
  studentClass: '',
  studentInstitution: 'Literasi Digital Indonesia',
  studentEmail: '',
  badges: [],
  lastVisited: 'cover'
};

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('cover');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('etika_literasi_digital_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROGRESS;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [videosConfig, setVideosConfig] = useState<VideoConfigItem[]>([]);
  const [identityNotice, setIdentityNotice] = useState<string | null>(null);

  // Fetch YouTube & Uploaded Videos Config (IndexedDB & Server API Fallback)
  const fetchVideosConfig = async () => {
    // 1. First load from IndexedDB for instant, reliable offline/hosting playback
    const localVideos = await getLocalVideosConfig();
    if (localVideos && localVideos.length > 0) {
      setVideosConfig(localVideos);
    }

    // 2. Try fetching from server API if hosted with backend
    try {
      const res = await fetch('/api/videos-config');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.videos) && data.videos.length > 0) {
          setVideosConfig(data.videos);
          await saveLocalVideosConfig(data.videos);
        }
      }
    } catch (e) {
      console.log('API videos-config unavailable or offline, using local storage.');
    }
  };

  useEffect(() => {
    fetchVideosConfig();
  }, [currentSection]);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('etika_literasi_digital_progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error(e);
    }
  }, [userProgress]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectSection = (sectionId: SectionId) => {
    const isAdmin = typeof window !== 'undefined' && Boolean(localStorage.getItem('admin_token'));
    const hasIdentity = Boolean(userProgress.studentName && userProgress.studentName.trim().length > 0);

    if (!isAdmin && sectionId !== 'cover' && sectionId !== 'admin-login' && sectionId !== 'admin-dashboard' && !hasIdentity) {
      setCurrentSection('cover');
      setIdentityNotice('⚠️ Mohon maaf, Anda tidak dapat membaca dan mengerjakan modul sebelum mengisikan & menyimpan Identitas Peserta pada formulir di Halaman Sampul.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIdentityNotice(null);
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto mark completion of informational sections
    if (['kata-pengantar', 'petunjuk', 'peta-konsep'].includes(sectionId)) {
      if (!userProgress.completedSections.includes(sectionId)) {
        setUserProgress(prev => ({
          ...prev,
          completedSections: [...prev.completedSections, sectionId]
        }));
      }
    }
  };

  const handleUpdateProfile = (name: string, studentClass: string, studentEmail?: string) => {
    setUserProgress(prev => ({
      ...prev,
      studentName: name,
      studentClass,
      studentEmail: studentEmail || prev.studentEmail || ''
    }));
    setIdentityNotice(null);
  };

  const handleSaveUnitScore = (unitId: string, score: number) => {
    setUserProgress(prev => ({
      ...prev,
      unitQuizScores: {
        ...prev.unitQuizScores,
        [unitId]: score
      }
    }));
  };

  const handleSaveSurveyScore = (score: number) => {
    setUserProgress(prev => ({ ...prev, ethicsSurveyScore: score }));
  };

  const handleSaveChecklistScore = (score: number) => {
    setUserProgress(prev => ({ ...prev, securityChecklistScore: score }));
  };

  const handleSaveFilterShareScore = (score: number) => {
    setUserProgress(prev => ({ ...prev, filterShareScore: score }));
  };

  const handleSaveNote = (sectionId: string, text: string) => {
    setUserProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [sectionId]: text }
    }));
  };

  const handleCompleteUnit = (unitId: SectionId) => {
    setUserProgress(prev => {
      const isAlreadyCompleted = prev.completedSections.includes(unitId);
      const newCompleted = isAlreadyCompleted ? prev.completedSections : [...prev.completedSections, unitId];

      // Check badge unlocking
      let newBadges = [...prev.badges];
      if (unitId === 'unit-1' && !newBadges.includes('pionir-etika')) newBadges.push('pionir-etika');
      if (unitId === 'unit-2' && !newBadges.includes('detektif-fakta')) newBadges.push('detektif-fakta');
      if (unitId === 'unit-3' && !newBadges.includes('guard-privacy')) newBadges.push('guard-privacy');
      if (unitId === 'unit-4' && !newBadges.includes('integritas-akademik')) newBadges.push('integritas-akademik');
      if (unitId === 'unit-5' && !newBadges.includes('duta-medsos')) newBadges.push('duta-medsos');

      return {
        ...prev,
        completedSections: newCompleted,
        badges: newBadges
      };
    });
  };

  const handleSaveFinalScore = (pgScore: number, essayScore: number, essayText: string, essayFeedback: string) => {
    const totalScore = pgScore + essayScore;
    setUserProgress(prev => {
      let newBadges = [...prev.badges];
      if (totalScore >= 70 && !newBadges.includes('master-literasi')) {
        newBadges.push('master-literasi');
      }
      return {
        ...prev,
        finalQuizScore: totalScore,
        finalEssayAnswer: essayText,
        finalEssayScore: essayScore,
        finalEssayFeedback: essayFeedback,
        badges: newBadges
      };
    });
  };

  // Sync progress to backend server API for Admin Dashboard tracking
  useEffect(() => {
    if (!userProgress.studentName) return;

    const totalSections = 14;
    const completedCount = userProgress.completedSections.length;
    const progressPercent = Math.min(100, Math.round((completedCount / totalSections) * 100));

    fetch('/api/access-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: userProgress.studentName,
        studentClass: userProgress.studentClass || 'Umum',
        studentInstitution: userProgress.studentInstitution || 'Literasi Digital Indonesia',
        studentEmail: userProgress.studentEmail || '',
        lastVisitedSection: currentSection,
        completedSectionsCount: completedCount,
        progressPercent,
        finalQuizScore: userProgress.finalQuizScore,
        certificateUnlocked: (userProgress.finalQuizScore !== null && userProgress.finalQuizScore >= 70),
        deviceInfo: `${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} Browser`
      })
    }).catch(err => console.error('Access log sync error:', err));
  }, [userProgress.studentName, userProgress.studentClass, userProgress.studentEmail, userProgress.completedSections, userProgress.finalQuizScore, currentSection]);

  const handleAdminLoginSuccess = () => {
    setCurrentSection('admin-dashboard');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setCurrentSection('cover');
  };

  const handleParticipantLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari akun peserta ini? Data identitas dan sesi belajar Anda akan di-reset untuk peserta berikutnya.')) {
      setUserProgress(INITIAL_PROGRESS);
      try {
        localStorage.removeItem('etika_literasi_digital_progress');
      } catch (e) {
        console.error(e);
      }
      setCurrentSection('cover');
      setIdentityNotice('✅ Anda telah berhasil keluar dari akun peserta. Silakan isi identitas baru jika peserta lain ingin memulai pembelajaran.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Font size multiplier class
  const fontSizeClass = 
    fontSize === 'large' ? 'text-lg' :
    fontSize === 'xlarge' ? 'text-xl' : '';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${fontSizeClass}`}>
      
      {/* Top Header */}
      <Header
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiTutor={() => setIsAiTutorOpen(true)}
        userProgress={userProgress}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onParticipantLogout={handleParticipantLogout}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar (Hidden on Admin pages) */}
        {!(currentSection === 'admin-login' || currentSection === 'admin-dashboard') && (
          <Sidebar
            currentSection={currentSection}
            onSelectSection={handleSelectSection}
            userProgress={userProgress}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onParticipantLogout={handleParticipantLogout}
          />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all ${
          (currentSection === 'admin-login' || currentSection === 'admin-dashboard') ? 'lg:ml-0' : 'lg:ml-72'
        }`}>
          {currentSection === 'cover' && (
            <CoverView
              onSelectSection={handleSelectSection}
              userProgress={userProgress}
              onUpdateProfile={handleUpdateProfile}
              identityNotice={identityNotice}
              onParticipantLogout={handleParticipantLogout}
            />
          )}

          {currentSection === 'kata-pengantar' && (
            <KataPengantarView onSelectSection={handleSelectSection} />
          )}

          {currentSection === 'petunjuk' && (
            <PetunjukView 
              onSelectSection={handleSelectSection} 
              videoInfo={videosConfig.find(v => v.id === 'intro')}
            />
          )}

          {currentSection === 'peta-konsep' && (
            <PetaKonsepView
              onSelectSection={handleSelectSection}
              userProgress={userProgress}
            />
          )}

          {currentSection.startsWith('unit-') && (
            <UnitView
              unit={UNITS_DATA.find(u => u.id === currentSection) || UNITS_DATA[0]}
              onSelectSection={handleSelectSection}
              userProgress={userProgress}
              onSaveUnitScore={handleSaveUnitScore}
              onSaveSurveyScore={handleSaveSurveyScore}
              onSaveChecklistScore={handleSaveChecklistScore}
              onSaveFilterShareScore={handleSaveFilterShareScore}
              onSaveNote={handleSaveNote}
              onCompleteUnit={handleCompleteUnit}
              videoOverride={videosConfig.find(v => v.id === currentSection)}
            />
          )}

          {currentSection === 'kuis-akhir' && (
            <KuisAkhirView
              onSelectSection={handleSelectSection}
              userProgress={userProgress}
              onSaveFinalScore={handleSaveFinalScore}
            />
          )}

          {currentSection === 'cek-fakta' && (
            <CekFaktaView onSelectSection={handleSelectSection} />
          )}

          {currentSection === 'uji-kemiripan' && (
            <UjiKemiripanView onSelectSection={handleSelectSection} />
          )}

          {currentSection === 'certificate' && (
            <CertificateView 
              userProgress={userProgress} 
              onParticipantLogout={handleParticipantLogout}
            />
          )}

          {currentSection === 'umpan-balik' && (
            <UmpanBalikView 
              userProgress={userProgress} 
              onParticipantLogout={handleParticipantLogout}
            />
          )}

          {currentSection === 'print-pdf' && (
            <PrintPDFView 
              onSelectSection={handleSelectSection} 
              videosConfig={videosConfig}
              userProgress={userProgress}
            />
          )}

          {currentSection === 'admin-login' && (
            <AdminLoginView
              onLoginSuccess={handleAdminLoginSuccess}
              onReturnToApp={() => handleSelectSection('cover')}
            />
          )}

          {currentSection === 'admin-dashboard' && (
            <AdminDashboardView
              onLogout={handleAdminLogout}
              onSelectSection={handleSelectSection}
            />
          )}
        </main>

      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={handleSelectSection}
      />

      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
      />

    </div>
  );
}
