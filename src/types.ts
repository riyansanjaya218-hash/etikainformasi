export type SectionId = 
  | 'cover'
  | 'kata-pengantar'
  | 'petunjuk'
  | 'peta-konsep'
  | 'unit-1'
  | 'unit-2'
  | 'unit-3'
  | 'unit-4'
  | 'unit-5'
  | 'kuis-akhir'
  | 'cek-fakta'
  | 'certificate'
  | 'umpan-balik'
  | 'print-pdf'
  | 'admin-login'
  | 'admin-dashboard';

export interface ParticipantAccessLog {
  id: string;
  studentName: string;
  studentClass: string;
  studentInstitution: string;
  accessedAt: string;
  lastVisitedSection: string;
  completedSectionsCount: number;
  progressPercent: number;
  finalQuizScore: number | null;
  certificateUnlocked: boolean;
  deviceInfo?: string;
}

export interface ParticipantFeedback {
  id: string;
  studentName: string;
  studentClass: string;
  studentInstitution: string;
  submittedAt: string;
  ratings: Record<number, number>;
  avgRating: number;
  suggestionContent: string;
  obstacles: string;
  futureIdeas: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation?: string;
}

export interface UnitInfo {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  badgeName: string;
  description: string;
  learningGoals: string[];
  videoInfo: {
    title: string;
    embedPlaceholder: string;
    duration: string;
    summary: string;
  };
  keyPoints: string[];
  quote: string;
}

export interface UserProgress {
  completedSections: SectionId[];
  unitQuizScores: Record<string, number>; // e.g. { 'unit-1': 100, 'unit-2': 80 }
  finalQuizScore: number | null;
  finalEssayAnswer: string;
  finalEssayScore: number | null;
  finalEssayFeedback: string | null;
  ethicsSurveyScore: number | null; // Likert total 8-40
  securityChecklistScore: number | null; // 0-10
  filterShareScore: number; // 0-3
  bookmarks: SectionId[];
  notes: Record<string, string>; // sectionId -> note text
  studentName: string;
  studentClass: string;
  studentInstitution: string;
  badges: string[];
  lastVisited: SectionId;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface SearchResultItem {
  sectionId: SectionId;
  sectionTitle: string;
  title: string;
  snippet: string;
}
