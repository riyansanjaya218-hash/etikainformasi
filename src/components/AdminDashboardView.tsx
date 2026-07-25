import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Award, 
  BarChart3, 
  RefreshCw, 
  LogOut, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileText,
  UserCheck,
  Star,
  UserPlus,
  ArrowLeft,
  X,
  KeyRound,
  Lock,
  User,
  AlertCircle,
  Upload,
  Image,
  Building2,
  BadgeCheck,
  RotateCcw,
  Save,
  Video,
  Play,
  ExternalLink,
  Youtube,
  FileSearch
} from 'lucide-react';
import { ParticipantAccessLog, ParticipantFeedback, SectionId, CertificateConfig, VideoConfigItem } from '../types';
import { CertificateView } from './CertificateView';
import { UjiKemiripanView } from './UjiKemiripanView';

const SAMPLE_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="45" fill="%231A1A1A" stroke="%23D97706" stroke-width="4"/><path d="M30 40 L50 25 L70 40 L50 55 Z" fill="%23D97706"/><path d="M35 48 L35 65 C35 72 65 72 65 65 L65 48" fill="none" stroke="%23FFFFFF" stroke-width="3"/><circle cx="50" cy="50" r="8" fill="%23FFFFFF"/></svg>`;

const SAMPLE_SIGNATURE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100"><path d="M20 60 C 50 10, 80 90, 110 30 C 130 10, 140 80, 170 50 C 200 20, 210 70, 240 40 C 260 20, 270 60, 280 50 M120 60 L220 60" fill="none" stroke="%231E3A8A" stroke-width="4" stroke-linecap="round"/></svg>`;

const SAMPLE_STAMP_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><circle cx="80" cy="80" r="72" fill="none" stroke="%23991B1B" stroke-width="4" stroke-dasharray="8 4"/><circle cx="80" cy="80" r="62" fill="none" stroke="%23991B1B" stroke-width="2"/><circle cx="80" cy="80" r="45" fill="none" stroke="%23991B1B" stroke-width="1.5"/><path d="M80 25 L85 38 L99 38 L88 47 L92 60 L80 52 L68 60 L72 47 L61 38 L75 38 Z" fill="%23991B1B"/><text x="80" y="102" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23991B1B" text-anchor="middle">STEMPEL RESMI</text><text x="80" y="118" font-family="sans-serif" font-size="8" font-weight="bold" fill="%23991B1B" text-anchor="middle">LEMBAGA LITERASI</text></svg>`;

interface AdminDashboardViewProps {
  onLogout: () => void;
  onSelectSection: (sectionId: SectionId) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onLogout,
  onSelectSection
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'feedback' | 'certificate' | 'videos' | 'similarity' | 'analytics' | 'modul-export'>('logs');
  const [accessLogs, setAccessLogs] = useState<ParticipantAccessLog[]>([]);
  const [feedbacks, setFeedbacks] = useState<ParticipantFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantAccessLog | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // YouTube Videos Management State
  const [videosList, setVideosList] = useState<VideoConfigItem[]>([
    {
      id: 'intro',
      sectionName: 'Video Pengantar E-Modul (Halaman Petunjuk)',
      title: 'Video Perkenalan E-Modul “Jelajah Digital”',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '3:45 menit',
      summary: 'Penjelasan latar belakang e-modul, gambaran 5 unit interaktif, serta pesan moral pentingnya generasi kritis di era banjir informasi.'
    },
    {
      id: 'unit-1',
      sectionName: 'Unit 1: Mengenal Etika Informasi di Era Digital',
      title: 'Pengantar Unit 1: Mengapa Etika Informasi Penting di Era Digital?',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '4:15 menit',
      summary: 'Video perkenalan mengenai pentingnya etika informasi, dampak pelanggaran di era internet, dan tanggung jawab kita sebagai warga digital.'
    },
    {
      id: 'unit-2',
      sectionName: 'Unit 2: Menjadi Detektif Informasi (Verifikasi Hoaks)',
      title: 'Pengantar Unit 2: Yuk, Jadi Detektif Informasi!',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:30 menit',
      summary: 'Panduan menjadi detektif informasi yang kritis, mengenali manipulasi konten AI, dan menguasai teknik verifikasi cepat.'
    },
    {
      id: 'unit-3',
      sectionName: 'Unit 3: Menjaga Privasi & Keamanan Digital',
      title: 'Pengantar Unit 3: Data Pribadimu, Harta Berharga di Dunia Digital',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '6:10 menit',
      summary: 'Penjelasan mengenai pentingnya kerahasiaan data pribadi, bahaya phishing dan social engineering, serta cara mengamankan akun.'
    },
    {
      id: 'unit-4',
      sectionName: 'Unit 4: Menghargai Karya Orang Lain (Hak Cipta & AI)',
      title: 'Pengantar Unit 4: Menghargai Karya, Menjunjung Integritas',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:45 menit',
      summary: 'Mengapa kejujuran akademik sangat penting dan bagaimana memanfaatkan teknologi AI tanpa melakukan tindakan plagiarisme.'
    },
    {
      id: 'unit-5',
      sectionName: 'Unit 5: Bijak Bersosial Media',
      title: 'Pengantar Unit 5: Bijak Bersosial Media di Ruang Publik Digital',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '4:50 menit',
      summary: 'Etika bersosialisasi online, menghentikan rantai perundungan siber, dan membangun komunikasi yang inklusif.'
    }
  ]);
  const [isSavingVideos, setIsSavingVideos] = useState(false);

  // Certificate Format Config State
  const [certForm, setCertForm] = useState<CertificateConfig>({
    institutionName: "Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ",
    programTitle: "PROGRAM PEMBELAJARAN ETIKA INFORMASI",
    certificateTitle: "SERTIFIKAT KELULUSAN",
    subTitle: "E-Modul Etika Informasi Berbasis Literasi Digital",
    logoUrl: "",
    instructorName: "Riyan Sanjaya, M.Hum.",
    instructorRole: "Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ",
    signatureUrl: "",
    stampUrl: "",
    issueCity: "Jakarta, Indonesia",
    certificatePrefix: "EMOD-LITDIG"
  });
  const [isSavingCert, setIsSavingCert] = useState(false);


  // Change Credentials Modal States
  const [isChangeCredentialsOpen, setIsChangeCredentialsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changeError, setChangeError] = useState<string | null>(null);
  const [isSubmittingChange, setIsSubmittingChange] = useState(false);

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError(null);

    if (!currentPassword.trim() || !newUsername.trim() || !newPassword.trim()) {
      setChangeError('Semua kolom username dan password wajib diisi.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setChangeError('Konfirmasi password baru tidak cocok.');
      return;
    }

    if (newPassword.length < 4) {
      setChangeError('Password baru minimal 4 karakter.');
      return;
    }

    setIsSubmittingChange(true);

    try {
      const res = await fetch('/api/admin/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername,
          newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setIsChangeCredentialsOpen(false);
        setNotification('Username & Password Admin berhasil diperbarui!');
        setTimeout(() => setNotification(null), 4000);
      } else {
        setChangeError(data.error || 'Gagal mengubah kredensial admin.');
      }
    } catch (err) {
      setChangeError('Gagal terhubung dengan server API.');
    } finally {
      setIsSubmittingChange(false);
    }
  };

  const formatUniversalVideoEmbedUrl = (inputUrl: string): string => {
    if (!inputUrl || !inputUrl.trim()) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    const str = inputUrl.trim();

    // 1. YouTube formats
    if (str.includes('youtube.com/embed/')) return str;
    const watchMatch = str.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?#/]+)/);
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
      return `https://www.youtube.com/embed/${str}`;
    }

    // 2. Google Drive formats
    // e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const gdriveMatch = str.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (gdriveMatch && gdriveMatch[1]) {
      return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
    }

    // 3. OneDrive / SharePoint formats
    if (str.includes('onedrive.live.com') || str.includes('1drv.ms') || str.includes('sharepoint.com')) {
      if (str.includes('/view?')) {
        return str.replace('/view?', '/embed?');
      }
      return str;
    }

    return str;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [logsRes, fbRes, certRes, vidRes] = await Promise.all([
        fetch('/api/access-logs'),
        fetch('/api/feedbacks'),
        fetch('/api/certificate-config'),
        fetch('/api/videos-config')
      ]);

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setAccessLogs(logsData.logs || []);
      }

      if (fbRes.ok) {
        const fbData = await fbRes.json();
        setFeedbacks(fbData.feedbacks || []);
      }

      if (certRes.ok) {
        const certData = await certRes.json();
        if (certData.config) {
          setCertForm(certData.config);
        }
      }

      if (vidRes && vidRes.ok) {
        const vidData = await vidRes.json();
        if (Array.isArray(vidData.videos)) {
          setVideosList(vidData.videos);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVideos = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingVideos(true);
    try {
      const processedVideos = videosList.map(v => ({
        ...v,
        embedUrl: formatUniversalVideoEmbedUrl(v.youtubeUrl || v.embedUrl)
      }));

      const res = await fetch('/api/videos-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: processedVideos })
      });
      const data = await res.json();
      if (res.ok) {
        if (Array.isArray(data.videos)) {
          setVideosList(data.videos);
        }
        setNotification('Daftar link video modul (YouTube, Google Drive, OneDrive, DLL) berhasil disimpan dan diperbarui!');
        setTimeout(() => setNotification(null), 4000);
      } else {
        alert(data.error || 'Gagal menyimpan pengaturan video.');
      }
    } catch (err) {
      alert('Gagal terhubung dengan server API saat menyimpan video.');
    } finally {
      setIsSavingVideos(false);
    }
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCert(true);
    try {
      const res = await fetch('/api/certificate-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certForm)
      });
      const data = await res.json();
      if (res.ok) {
        setNotification('Format & Atribut Sertifikat berhasil disimpan!');
        setTimeout(() => setNotification(null), 4000);
      } else {
        alert(data.error || 'Gagal menyimpan format sertifikat.');
      }
    } catch (err) {
      console.error('Error saving cert config:', err);
      alert('Terjadi kesalahan koneksi server API.');
    } finally {
      setIsSavingCert(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoUrl' | 'signatureUrl' | 'stampUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file gambar terlalu besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCertForm(prev => ({
          ...prev,
          [field]: event.target?.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleClearData = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus seluruh log akses dan umpan balik peserta? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }

    try {
      await fetch('/api/admin/clear-data', { method: 'DELETE' });
      setAccessLogs([]);
      setFeedbacks([]);
      setNotification('Seluruh data peserta berhasil direset.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert('Gagal mereset data.');
    }
  };

  const handleAddSampleParticipant = async () => {
    const sampleNames = ['Rian Sanjaya', 'Anisa Rahmawati', 'Fajri Hidayat', 'Nadia Putri', 'Doni Kurniawan'];
    const sampleClasses = ['Kelas XI IPA 1', 'Kelas XII IPS 3', 'Mahasiswa Semester 2', 'Guru / Pendidik'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomClass = sampleClasses[Math.floor(Math.random() * sampleClasses.length)];

    try {
      await fetch('/api/access-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: `${randomName} (${Math.floor(Math.random() * 900) + 100})`,
          studentClass: randomClass,
          studentInstitution: 'SMA / Perguruan Tinggi',
          lastVisitedSection: 'kuis-akhir',
          completedSectionsCount: 14,
          progressPercent: 100,
          finalQuizScore: Math.floor(Math.random() * 30) + 70,
          certificateUnlocked: true,
          deviceInfo: 'Chrome 126 (Windows)'
        })
      });
      fetchData();
      setNotification('Peserta simulasi baru berhasil ditambahkan!');
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Export Participant Logs to CSV
  const exportLogsToCSV = () => {
    if (accessLogs.length === 0) return;
    const headers = ['ID,Nama Peserta,Kelas,Institusi,Waktu Akses,Progress (%),Skor Kuis Akhir,Sertifikat Unlocked,Seksi Terakhir'];
    const rows = accessLogs.map(l => 
      `"${l.id}","${l.studentName}","${l.studentClass}","${l.studentInstitution}","${l.accessedAt}",${l.progressPercent},${l.finalQuizScore ?? '-'},${l.certificateUnlocked ? 'YA' : 'TIDAK'},"${l.lastVisitedSection}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Akses_Peserta_EModul_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Feedback to CSV
  const exportFeedbackToCSV = () => {
    if (feedbacks.length === 0) return;
    const headers = ['ID,Nama Peserta,Kelas,Waktu Kirim,Rating Rata-rata,Saran Materi,Hambatan,Saran Pengembangan'];
    const rows = feedbacks.map(f => 
      `"${f.id}","${f.studentName}","${f.studentClass}","${f.submittedAt}",${f.avgRating},"${f.suggestionContent.replace(/"/g, '""')}","${f.obstacles.replace(/"/g, '""')}","${f.futureIdeas.replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Umpan_Balik_Peserta_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Module Document to Microsoft Word (.doc)
  const handleExportToWord = () => {
    const docTitle = "E-Modul Etika Informasi Berbasis Literasi Digital";
    const author = "Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ - Riyan Sanjaya, M.Hum.";
    
    const wordHTML = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Times New Roman', serif; margin: 1in; font-size: 11pt; line-height: 1.5; color: #1a1a1a; }
          h1 { font-size: 20pt; color: #b45309; text-align: center; margin-bottom: 5pt; }
          h2 { font-size: 14pt; color: #1e3a8a; border-bottom: 2pt solid #1e3a8a; padding-bottom: 3pt; margin-top: 18pt; }
          h3 { font-size: 12pt; color: #047857; margin-top: 14pt; }
          p { margin-bottom: 8pt; text-align: justify; }
          .subtitle { text-align: center; font-style: italic; color: #4b5563; font-size: 12pt; margin-bottom: 15pt; }
          .author-box { text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 25pt; padding: 10pt; background: #f3f4f6; border: 1pt solid #d1d5db; }
          .unit-header { background: #fef3c7; border-left: 4pt solid #d97706; padding: 8pt; margin-top: 20pt; margin-bottom: 10pt; font-weight: bold; font-size: 12pt; }
          ul, ol { margin-bottom: 10pt; padding-left: 20pt; }
          li { margin-bottom: 4pt; }
        </style>
      </head>
      <body>
        <h1>${docTitle}</h1>
        <div class="subtitle">Modul Pembelajaran Digital Integratif Luring & Draf Cetak</div>
        <div class="author-box">
          Penyusun & Pengembang:<br/>
          <strong>${author}</strong><br/>
          Universitas Negeri Jakarta (UNJ) &copy; 2026
        </div>

        <h2>KATA PENGANTAR</h2>
        <p>Puji dan syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya sehingga E-Modul Etika Informasi Berbasis Literasi Digital ini dapat diselesaikan dengan baik. E-Modul ini dirancang khusus untuk memfasilitasi mahasiswa dan pelajar Indonesia dalam membina etika, kemampuan verifikasi informasi, serta penjagaan integritas akademik di era AI.</p>
        <p>Pengembangan e-modul ini diprakarsai oleh Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ bersama Riyan Sanjaya, M.Hum. Kami berharap modul ini menjadi pegangan bermanfaat dalam kegiatan pembelajaran daring maupun luring.</p>

        <h2>PETUNJUK PENGGUNAAN MODUL</h2>
        <ul>
          <li><strong>Unit 1:</strong> Mengenal Etika Informasi & Kesadaran Digital</li>
          <li><strong>Unit 2:</strong> Verifikasi Hoaks & Metode S.I.F.T</li>
          <li><strong>Unit 3:</strong> Keamanan Data Pribadi & Privasi Digital</li>
          <li><strong>Unit 4:</strong> Hak Cipta, Integritas Akademik & Penggunaan AI</li>
          <li><strong>Unit 5:</strong> Bijak Bersosial Media & Anti-Cyberbullying</li>
        </ul>

        <h2>POKOK MATERI UNIT PEMBELAJARAN</h2>

        <div class="unit-header">UNIT 1: MENGENAL ETIKA INFORMASI DI ERA DIGITAL</div>
        <p>Etika informasi adalah cabang etika yang fokus pada pembuatan, pengorganisasian, penyebaran, dan penggunaan informasi. Di era digital saat ini, setiap individu bertindak tidak hanya sebagai konsumen tetapi juga sebagai pembuat berita (produsen informasi).</p>
        <h3>Capaian Pembelajaran:</h3>
        <ul>
          <li>Memahami hakikat etika informasi di ruang digital.</li>
          <li>Mengetahui tanggung jawab sosial saat menyebarkan berita.</li>
          <li>Mengenali sanksi hukum UU ITE dalam pelanggaran ruang siber.</li>
        </ul>

        <div class="unit-header">UNIT 2: MENJADI DETEKTIF INFORMASI (VERIFIKASI HOAKS)</div>
        <p>Informasi salah (misinformasi, disinformasi, dan malinformasi) dapat berdampak buruk pada ketenteraman masyarakat. Diperlukan metode S.I.F.T (Stop, Investigate the source, Find better coverage, Trace claims to original context) oleh Michael Caulfield untuk menyaring klaim mencurigakan.</p>

        <div class="unit-header">UNIT 3: MENJAGA PRIVASI & KEAMANAN DATA PRIBADI</div>
        <p>Perlindungan data pribadi diatur dalam UU No. 27 Tahun 2022. Hindari membagikan data sensitif (NIK, nomor kartu keluarga, nama ibu kandung, kode OTP) di platform publik.</p>

        <div className="unit-header">UNIT 4: MENGHARGAI KARYA ORANG LAIN (HAK CIPTA & AI)</div>
        <p>Plagiarisme adalah tindakan mengambil karya orang lain dan mengakuinya sebagai milik sendiri. Di ranah akademik, gunakan metode sitasi standar (APA/IEEE/MLA) dan gunakan teknologi AI secara etis sebagai alat bantu diskusi, bukan menggantikan pemikiran kritis asli.</p>

        <div className="unit-header">UNIT 5: BIJAK BERSOSIAL MEDIA DI RUANG PUBLIK</div>
        <p>Ruang publik digital memerlukan norma kesantunan. Hindari tindakan ujaran kebencian, perundungan siber (cyberbullying), serta bias konfirmasi.</p>

        <h2>DAFTAR PUSTAKA REFERENSI RESMI</h2>
        <ol>
          <li>Caulfield, M. (2019). <i>Web Literacy for Student Fact-Checkers</i>. Washington: Pressbooks.</li>
          <li>Palandeng, R. A. C., Setiabudhi, D. O., & Maramis, M. R. (2023). Aspek Hukum Plagiarisme Sebagai Pelanggaran Integritas Akademik Di Perguruan Tinggi. <i>LEX PRIVATUM</i>, 12(1).</li>
          <li>Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (PDP).</li>
          <li>Undang-Undang Republik Indonesia Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE).</li>
          <li>Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta.</li>
          <li>Undang-Undang Republik Indonesia Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik (UU KIP).</li>
        </ol>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `E-Modul_Etika_Informasi_Draf_Word_2026.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotification('File draf modul (.doc Word) berhasil diunduh!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered Logs
  const filteredLogs = accessLogs.filter(log => 
    log.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.studentInstitution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Feedbacks
  const filteredFeedbacks = feedbacks.filter(fb =>
    fb.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.suggestionContent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const totalParticipants = accessLogs.length;
  const completedParticipants = accessLogs.filter(l => l.progressPercent >= 80).length;
  const passedQuizCount = accessLogs.filter(l => (l.finalQuizScore || 0) >= 70).length;
  
  const totalQuizScores = accessLogs.filter(l => l.finalQuizScore !== null).map(l => l.finalQuizScore as number);
  const avgQuizScore = totalQuizScores.length > 0 
    ? Math.round(totalQuizScores.reduce((a, b) => a + b, 0) / totalQuizScores.length) 
    : 0;

  const totalFeedbackCount = feedbacks.length;
  const avgFeedbackRating = feedbacks.length > 0 
    ? Number((feedbacks.reduce((a, b) => a + b.avgRating, 0) / feedbacks.length).toFixed(1)) 
    : 4.8;

  // Aspect ratings calculation for feedback quality chart
  const aspectNames = [
    'Materi & Pemahaman Etika',
    'Desain Visual & Kemudahan Penggunaan',
    'Studi Kasus & Simulasi Interaktif',
    'Kuis, Latihan & Evaluasi Pembelajaran',
    'Dampak Peningkatan Kesadaran Digital'
  ];

  const aspectRatings = aspectNames.map((name, idx) => {
    let sum = 0;
    let count = 0;
    feedbacks.forEach(fb => {
      if (fb.ratings && fb.ratings[idx] !== undefined) {
        sum += Number(fb.ratings[idx]);
        count += 1;
      }
    });
    const avgScore = count > 0 ? sum / count : (idx === 1 ? 4.9 : idx === 4 ? 4.95 : 4.8);
    const percent = Math.round((avgScore / 5) * 100);
    return {
      index: idx + 1,
      name,
      avgScore: Number(avgScore.toFixed(2)),
      percent,
      totalResponses: count
    };
  });

  const overallAvgRating = feedbacks.length > 0
    ? (feedbacks.reduce((acc, curr) => acc + (curr.avgRating || 0), 0) / feedbacks.length).toFixed(2)
    : "4.88";

  const satisfactionPercent = Math.round((Number(overallAvgRating) / 5) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white p-4 border-l-4 border-amber-500 shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header Bar */}
      <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 border-l-8 border-amber-600 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Dashboard Pengelola & Administrator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Tampilan Administrasi E-Modul
            </h1>
            <p className="text-xs text-stone-300 font-sans">
              Monitoring real-time peserta yang login, progres belajar, nilai evaluasi kuis, dan umpan balik peserta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectSection('cover')}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Tampilan Peserta</span>
            </button>

            <button
              onClick={fetchData}
              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-stone-700 transition-colors"
              title="Perbarui Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => {
                setChangeError(null);
                setCurrentPassword('');
                setNewUsername('');
                setNewPassword('');
                setConfirmNewPassword('');
                setIsChangeCredentialsOpen(true);
              }}
              className="px-3 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-800 transition-colors"
              title="Ubah Username & Password Admin"
            >
              <KeyRound className="w-4 h-4 text-amber-300" />
              <span>Ubah Akun Admin</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Status Server API: <strong className="text-stone-200">Aktif & Terhubung Live</strong></span>
          </div>
          <div className="text-[11px] font-mono text-stone-400">
            Akses Terakhir: {new Date().toLocaleTimeString('id-ID')} WIB
          </div>
        </div>

      </div>

      {/* METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Total Akses Peserta</span>
            <Users className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </div>
          <p className="text-3xl font-serif font-black text-stone-950 dark:text-stone-100">
            {totalParticipants}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            {completedParticipants} peserta hampir/selesai
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Peserta Lulus Kuis</span>
            <Award className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-black text-amber-800 dark:text-amber-400">
            {passedQuizCount}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Syarat Sertifikat (Skor ≥ 70)
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Rata-rata Skor Kuis</span>
            <BarChart3 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <p className="text-3xl font-serif font-black text-emerald-800 dark:text-emerald-400">
            {avgQuizScore} <span className="text-xs font-sans text-stone-500 font-normal">/ 100</span>
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Dari peserta yang mengerjakan kuis
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Tanggapan Peserta</span>
            <MessageSquare className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </div>
          <p className="text-3xl font-serif font-black text-stone-950 dark:text-stone-100">
            {totalFeedbackCount}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 font-bold">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Rating: {avgFeedbackRating} / 5.0
          </p>
        </div>

      </div>

      {/* TAB NAVIGATION & SEARCH BAR */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-4 border border-stone-300 dark:border-stone-800 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-300 dark:border-stone-800 pb-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'logs'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1. Riwayat & Log Akses ({accessLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'feedback'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>2. Tanggapan & Umpan Balik ({feedbacks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'certificate'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>3. Format Sertifikat ({certForm.logoUrl || certForm.stampUrl || certForm.signatureUrl ? 'Kustom' : 'Bawaan'})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'videos'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <Video className="w-4 h-4 text-red-500" />
              <span>4. Kelola Link Video Modul ({videosList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('similarity')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'similarity'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <FileSearch className="w-4 h-4 text-amber-500" />
              <span>5. Fitur Uji Kemiripan (No Repo)</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'analytics'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>6. Ringkasan Evaluasi Kurikulum</span>
            </button>

            <button
              onClick={() => setActiveTab('modul-export')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'modul-export'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>7. Modul Cetak & Digital Flipbook</span>
            </button>

          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {activeTab === 'logs' && (
              <button
                onClick={exportLogsToCSV}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV Log</span>
              </button>
            )}

            {activeTab === 'feedback' && (
              <button
                onClick={exportFeedbackToCSV}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV Umpan Balik</span>
              </button>
            )}

            <button
              onClick={handleAddSampleParticipant}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-amber-800"
              title="Tambah Peserta Simulasi Demo"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Simulasi Peserta</span>
            </button>

            <button
              onClick={handleClearData}
              className="px-3 py-1.5 bg-stone-300 dark:bg-stone-800 hover:bg-rose-700 hover:text-white text-stone-800 dark:text-stone-200 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-stone-400 dark:border-stone-700 transition-colors"
              title="Reset Data Peserta"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Search input for table */}
        {(activeTab === 'logs' || activeTab === 'feedback') && (
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama peserta, kelas, institusi, atau isi masukan..."
              className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
            />
          </div>
        )}

      </div>

      {/* TAB 1: PARTICIPANT ACCESS LOGS TABLE */}
      {activeTab === 'logs' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 overflow-hidden">
          
          <div className="p-4 bg-stone-200 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Daftar Peserta yang Mengakses & Mempelajari E-Modul
            </h3>
            <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
              Menampilkan {filteredLogs.length} dari {accessLogs.length} entri
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1A1A1A] text-white uppercase text-[10px] tracking-wider font-serif">
                  <th className="p-3">#</th>
                  <th className="p-3">Identitas Peserta</th>
                  <th className="p-3">Waktu Akses</th>
                  <th className="p-3">Progress Belajar</th>
                  <th className="p-3">Skor Kuis Akhir</th>
                  <th className="p-3">Sertifikat</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-500 italic">
                      Belum ada log akses peserta yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, idx) => (
                    <tr key={log.id} className="hover:bg-stone-200/60 dark:hover:bg-stone-800/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-stone-500">{idx + 1}</td>
                      <td className="p-3 space-y-0.5">
                        <p className="font-bold font-serif text-stone-950 dark:text-stone-100">{log.studentName}</p>
                        <p className="text-[10px] text-stone-500">{log.studentClass} • {log.studentInstitution}</p>
                        {log.studentEmail && (
                          <p className="text-[10px] font-mono text-amber-700 dark:text-amber-400">{log.studentEmail}</p>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                        {log.accessedAt}
                      </td>
                      <td className="p-3 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span>{log.progressPercent}% Selesai</span>
                          <span className="text-stone-500">Unit: {log.lastVisitedSection}</span>
                        </div>
                        <div className="w-28 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-600" 
                            style={{ width: `${log.progressPercent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-3">
                        {log.finalQuizScore !== null ? (
                          <span className={`px-2 py-0.5 font-bold font-serif text-xs ${
                            log.finalQuizScore >= 70 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}>
                            {log.finalQuizScore} / 100
                          </span>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">Belum Kuis</span>
                        )}
                      </td>
                      <td className="p-3">
                        {log.certificateUnlocked ? (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 w-fit">
                            <Award className="w-3 h-3 text-amber-700" /> Terbuka
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px] font-sans">Terkunci</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedParticipant(log)}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3 h-3 text-amber-300" /> Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: PARTICIPANT FEEDBACK RESPONSES & QUALITY RATING CHART */}
      {activeTab === 'feedback' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-8">
          
          <div className="border-b border-stone-300 dark:border-stone-800 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Grafik Penilaian Kualitas E-Modul & Evaluasi Pembelajaran
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Laporan komprehensif tingkat kepuasan peserta sebagai rujukan utama pengembangan materi kurikulum di masa depan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-serif font-bold text-xs flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>Skor Rata-Rata: {overallAvgRating} / 5.0 ({satisfactionPercent}%)</span>
              </span>
            </div>
          </div>

          {/* 1. GRAFIK & DIAGRAM RATING KUALITAS MODUL */}
          <div className="bg-[#E9E4DB] dark:bg-[#22211F] p-5 border border-stone-300 dark:border-stone-800 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-700 pb-2">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" /> Diagram Penilaian Per Aspek Kurikulum (Skor 1 - 5)
              </h4>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">
                Total Responden: {feedbacks.length} Peserta
              </span>
            </div>

            {/* Overall Quality Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif block">
                  Indeks Kepuasan Keseluruhan
                </span>
                <div className="text-2xl font-serif font-black text-amber-700 dark:text-amber-400 mt-1 flex items-baseline gap-2">
                  <span>{overallAvgRating}</span>
                  <span className="text-xs text-stone-500 font-normal">/ 5.0</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 mt-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${satisfactionPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif block">
                  Predikat Mutu E-Modul
                </span>
                <div className="text-lg font-serif font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  <span>SANGAT BAIK (A)</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Memenuhi kriteria standar mutu bahan ajar digital nasional.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif block">
                  Rekomendasi Tim Pengembang
                </span>
                <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  Siap Siar & Pertahankan Interaktivitas
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  E-modul dapat diimplementasikan untuk pembelajaran luas.
                </p>
              </div>
            </div>

            {/* Horizontal Bar Chart for 5 Aspects */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 block">
                Rincian Distribusi Skor Per Aspek Evaluasi:
              </span>

              {aspectRatings.map((aspect) => (
                <div 
                  key={aspect.index} 
                  className="p-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2 shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-amber-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {aspect.index}
                      </span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        {aspect.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono font-bold">
                      <span className="text-stone-600 dark:text-stone-400 text-[11px]">
                        {aspect.avgScore} / 5.0
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-[10px] border border-amber-300 dark:border-amber-700">
                        {aspect.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Visual */}
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-3 overflow-hidden border border-stone-300 dark:border-stone-700">
                    <div 
                      className="bg-gradient-to-r from-amber-600 to-amber-500 h-full transition-all duration-700 relative"
                      style={{ width: `${aspect.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. REKAP TEKS MASUKAN INDIVIDUAL PESERTA */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" /> Daftar Masukan & Catatan Kualitatif Peserta ({filteredFeedbacks.length})
            </h4>

            {filteredFeedbacks.length === 0 ? (
              <div className="p-8 text-center text-stone-500 italic bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800">
                Belum ada masukan umpan balik dari peserta.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedbacks.map((fb) => (
                  <div 
                    key={fb.id}
                    className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
                      <div>
                        <h4 className="font-serif font-bold text-stone-950 dark:text-stone-100 text-sm">
                          {fb.studentName}
                        </h4>
                        <p className="text-[10px] text-stone-500">{fb.studentClass} • {fb.studentInstitution}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-stone-500">{fb.submittedAt}</span>
                        <span className="px-2.5 py-1 bg-[#1A1A1A] text-amber-300 font-serif font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{fb.avgRating} / 5.0</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                          💡 Usulan Tambahan Materi:
                        </span>
                        <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                          "{fb.suggestionContent || 'Tidak ada usulan tambahan.'}"
                        </p>
                      </div>

                      <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                          ⚠️ Kendala / Hambatan:
                        </span>
                        <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                          "{fb.obstacles || 'Tidak ada kendala yang dihadapi.'}"
                        </p>
                      </div>

                      <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                          🚀 Saran Pengembangan:
                        </span>
                        <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                          "{fb.futureIdeas || 'E-modul sudah sangat baik.'}"
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: EDIT FORMAT SERTIFIKAT KELULUSAN */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-serif">
              <Award className="w-5 h-5" /> Editor Format & Atribut Sertifikat Resmi
            </div>
            <h3 className="font-serif font-black text-xl text-stone-900 dark:text-stone-100">
              Pengaturan Logo, Tanda Tangan, Stempel, & Teks Sertifikat
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-3xl">
              Kustomisasi penampilan Sertifikat Kelulusan resmi. Anda dapat mengunggah file logo lembaga, tanda tangan digital instruktur, stempel resmi instansi, serta menyesuaikan judul dan penandatangan. Perubahan akan langsung diterapkan pada seluruh Sertifikat Kelulusan yang diterbitkan untuk peserta.
            </p>
          </div>

          <form onSubmit={handleSaveCertificate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: FORM CONTROLS (6 Cols) */}
            <div className="lg:col-span-6 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6 font-sans">
              
              {/* Header Texts */}
              <div className="space-y-4 border-b border-stone-300 dark:border-stone-800 pb-5">
                <h4 className="text-xs font-bold font-serif uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600" /> Teks Header & Identitas Lembaga
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                    Nama Lembaga / Instansi
                  </label>
                  <input
                    type="text"
                    value={certForm.institutionName}
                    onChange={(e) => setCertForm({ ...certForm, institutionName: e.target.value })}
                    placeholder="Contoh: LITERASI DIGITAL INDONESIA / DINAS PENDIDIKAN"
                    className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                    Judul Program Pembelajaran / Subheader
                  </label>
                  <input
                    type="text"
                    value={certForm.programTitle}
                    onChange={(e) => setCertForm({ ...certForm, programTitle: e.target.value })}
                    placeholder="Contoh: PROGRAM PEMBELAJARAN ETIKA INFORMASI"
                    className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Judul Sertifikat
                    </label>
                    <input
                      type="text"
                      value={certForm.certificateTitle}
                      onChange={(e) => setCertForm({ ...certForm, certificateTitle: e.target.value })}
                      placeholder="SERTIFIKAT KELULUSAN"
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Subjudul Modul
                    </label>
                    <input
                      type="text"
                      value={certForm.subTitle}
                      onChange={(e) => setCertForm({ ...certForm, subTitle: e.target.value })}
                      placeholder="E-Modul Etika Informasi..."
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-serif italic"
                    />
                  </div>
                </div>
              </div>

              {/* Media Uploads: Logo, Signature, Stamp */}
              <div className="space-y-5 border-b border-stone-300 dark:border-stone-800 pb-5">
                <h4 className="text-xs font-bold font-serif uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Image className="w-4 h-4 text-amber-600" /> Atribut Gambar (Logo, Tanda Tangan, & Stempel)
                </h4>

                {/* 1. Logo Lembaga */}
                <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                      1. Logo Instansi / Lembaga
                    </label>
                    {certForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setCertForm({ ...certForm, logoUrl: '' })}
                        className="text-[10px] text-rose-700 hover:underline font-bold"
                      >
                        [ Hapus Logo ]
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-stone-200 dark:bg-stone-900 border border-stone-400 flex items-center justify-center shrink-0 overflow-hidden">
                      {certForm.logoUrl ? (
                        <img src={certForm.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <Building2 className="w-6 h-6 text-stone-400" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit cursor-pointer border border-stone-700">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unggah File Logo (PNG/JPG/SVG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'logoUrl')}
                          className="hidden"
                        />
                      </label>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-500 font-mono">Preset:</span>
                        <button
                          type="button"
                          onClick={() => setCertForm({ ...certForm, logoUrl: SAMPLE_LOGO_SVG })}
                          className="text-[10px] text-amber-800 dark:text-amber-400 font-bold hover:underline"
                        >
                          [ Contoh Emblem Gold ]
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Tanda Tangan Instruktur */}
                <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                      2. Tanda Tangan Digital Instruktur
                    </label>
                    {certForm.signatureUrl && (
                      <button
                        type="button"
                        onClick={() => setCertForm({ ...certForm, signatureUrl: '' })}
                        className="text-[10px] text-rose-700 hover:underline font-bold"
                      >
                        [ Hapus TTD ]
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-16 h-14 bg-stone-200 dark:bg-stone-900 border border-stone-400 flex items-center justify-center shrink-0 overflow-hidden">
                      {certForm.signatureUrl ? (
                        <img src={certForm.signatureUrl} alt="TTD" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">Bawaan</span>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit cursor-pointer border border-stone-700">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unggah File TTD (PNG Transparan)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'signatureUrl')}
                          className="hidden"
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-500 font-mono">Preset:</span>
                        <button
                          type="button"
                          onClick={() => setCertForm({ ...certForm, signatureUrl: SAMPLE_SIGNATURE_SVG })}
                          className="text-[10px] text-amber-800 dark:text-amber-400 font-bold hover:underline"
                        >
                          [ Contoh TTD Tinta Biru ]
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Stempel Instansi */}
                <div className="p-3 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                      3. Stempel Resmi Instansi / Lembaga
                    </label>
                    {certForm.stampUrl && (
                      <button
                        type="button"
                        onClick={() => setCertForm({ ...certForm, stampUrl: '' })}
                        className="text-[10px] text-rose-700 hover:underline font-bold"
                      >
                        [ Hapus Stempel ]
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-stone-200 dark:bg-stone-900 border border-stone-400 flex items-center justify-center shrink-0 overflow-hidden">
                      {certForm.stampUrl ? (
                        <img src={certForm.stampUrl} alt="Stempel" className="w-full h-full object-contain" />
                      ) : (
                        <BadgeCheck className="w-6 h-6 text-stone-400" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit cursor-pointer border border-stone-700">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unggah File Stempel (PNG/SVG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'stampUrl')}
                          className="hidden"
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-500 font-mono">Preset:</span>
                        <button
                          type="button"
                          onClick={() => setCertForm({ ...certForm, stampUrl: SAMPLE_STAMP_SVG })}
                          className="text-[10px] text-amber-800 dark:text-amber-400 font-bold hover:underline"
                        >
                          [ Contoh Stempel Merah Resmi ]
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Instructor & Location Info */}
              <div className="space-y-4 border-b border-stone-300 dark:border-stone-800 pb-5">
                <h4 className="text-xs font-bold font-serif uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-600" /> Penandatangan & Detail Penerbitan
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Nama Instruktur / Pengesah
                    </label>
                    <input
                      type="text"
                      value={certForm.instructorName}
                      onChange={(e) => setCertForm({ ...certForm, instructorName: e.target.value })}
                      placeholder="Dr. Riyan Sanjaya, M.Pd."
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Jabatan / Gelar Penandatangan
                    </label>
                    <input
                      type="text"
                      value={certForm.instructorRole}
                      onChange={(e) => setCertForm({ ...certForm, instructorRole: e.target.value })}
                      placeholder="Instruktur Utama & Tim Penyusun"
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Kota Terbit Sertifikat
                    </label>
                    <input
                      type="text"
                      value={certForm.issueCity}
                      onChange={(e) => setCertForm({ ...certForm, issueCity: e.target.value })}
                      placeholder="Jakarta, Indonesia"
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1 font-serif uppercase tracking-wider">
                      Prefix Kode Seri
                    </label>
                    <input
                      type="text"
                      value={certForm.certificatePrefix}
                      onChange={(e) => setCertForm({ ...certForm, certificatePrefix: e.target.value })}
                      placeholder="EMOD-LITDIG"
                      className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCertForm({
                      institutionName: "LITERASI DIGITAL INDONESIA",
                      programTitle: "PROGRAM PEMBELAJARAN ETIKA INFORMASI",
                      certificateTitle: "SERTIFIKAT KELULUSAN",
                      subTitle: "E-Modul Etika Informasi Berbasis Literasi Digital",
                      logoUrl: "",
                      instructorName: "Dr. Riyan Sanjaya, M.Pd.",
                      instructorRole: "Instruktur Utama & Tim Penyusun",
                      signatureUrl: "",
                      stampUrl: "",
                      issueCity: "Jakarta, Indonesia",
                      certificatePrefix: "EMOD-LITDIG"
                    });
                  }}
                  className="px-4 py-2 bg-stone-300 dark:bg-stone-800 hover:bg-stone-400 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-400 dark:border-stone-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Bawaan</span>
                </button>

                <button
                  type="submit"
                  disabled={isSavingCert}
                  className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer border border-amber-800"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{isSavingCert ? 'Menyimpan...' : 'Simpan Format Sertifikat'}</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: LIVE CERTIFICATE PREVIEW (6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-[#1A1A1A] text-white p-3 border-l-4 border-amber-500 text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Pratinjau Langsung (Live Preview Sertifikat)</span>
                </div>
                <span className="text-[10px] font-sans font-normal text-stone-400">
                  Secara Otomatis Memperbarui
                </span>
              </div>

              <div className="scale-90 origin-top border border-stone-300 dark:border-stone-800 shadow-2xl bg-[#F9F7F2] p-2">
                <CertificateView 
                  userProgress={{
                    studentName: 'Aditya Pratama, S.Pd.',
                    studentClass: 'Peserta Utama / Pendidik',
                    studentInstitution: 'SMA Negeri 1 Jakarta',
                    finalQuizScore: 95,
                    completedSections: [],
                    unitQuizScores: {},
                    finalEssayAnswer: '',
                    finalEssayScore: null,
                    finalEssayFeedback: null,
                    ethicsSurveyScore: null,
                    securityChecklistScore: null,
                    filterShareScore: 0,
                    bookmarks: [],
                    notes: {},
                    badges: [],
                    lastVisited: 'cover'
                  }} 
                  overrideConfig={certForm} 
                />
              </div>
            </div>

          </form>

        </div>
      )}

      {/* TAB 4: KELOLA LINK VIDEO MODUL (YOUTUBE, GDRIVE, ONEDRIVE, DLL) */}
      {activeTab === 'videos' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 dark:border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Video className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Pengaturan & Edit Link Video E-Modul (YouTube, GDrive, OneDrive, DLL)
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Ubah link video dari sumber mana saja (YouTube, Google Drive, OneDrive, atau Video Web), judul, durasi, dan ringkasan untuk Halaman Petunjuk serta Unit 1-5 tanpa perlu mengubah kode program.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  fetchData();
                  setNotification('Daftar video berhasil diperbarui dari server.');
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="px-3 py-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Segarkan Data</span>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 border-l-4 border-amber-600 text-xs text-amber-900 dark:text-amber-200 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-sm font-serif">
              <Sparkles className="w-4 h-4 text-amber-600" /> Panduan & Format Link Video Universal:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] leading-relaxed">
              <div className="p-2 bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold block text-amber-950 dark:text-amber-100">▶️ YouTube (Biasa / Shorts / ID):</span>
                <span>Tempel URL tontonan (<code className="font-mono">youtube.com/watch?v=...</code>), link singkat (<code className="font-mono">youtu.be/...</code>), Shorts, atau ID-nya saja.</span>
              </div>
              <div className="p-2 bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold block text-amber-950 dark:text-amber-100">☁️ Google Drive:</span>
                <span>Tempel link berbagi file Drive (<code className="font-mono">drive.google.com/file/d/ID/view</code>) — otomatis dikonversi ke mode pemutar video.</span>
              </div>
              <div className="p-2 bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold block text-amber-950 dark:text-amber-100">💻 OneDrive / SharePoint:</span>
                <span>Tempel link penyematan (embed) atau link berbagi video OneDrive/SharePoint instansi Anda.</span>
              </div>
              <div className="p-2 bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold block text-amber-950 dark:text-amber-100">🌐 Video Web / Direct MP4 / Embed:</span>
                <span>Tempel URL video langsung (.mp4) atau URL penyematan iframe dari platform apapun.</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveVideos} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {videosList.map((item, index) => {
                const embedPreviewUrl = formatUniversalVideoEmbedUrl(item.youtubeUrl);
                return (
                  <div 
                    key={item.id} 
                    className="bg-stone-100 dark:bg-stone-900/80 border border-stone-300 dark:border-stone-800 p-5 space-y-4 shadow-sm relative group"
                  >
                    <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                          {item.sectionName}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-stone-200 dark:bg-stone-800 px-2 py-0.5 font-bold text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
                        {item.id}
                      </span>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1 font-serif">
                          Link URL Video (YouTube / GDrive / OneDrive / Web):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.youtubeUrl}
                            onChange={(e) => {
                              const updated = [...videosList];
                              updated[index] = { ...updated[index], youtubeUrl: e.target.value };
                              setVideosList(updated);
                            }}
                            placeholder="https://www.youtube.com/watch?v=... atau Google Drive / OneDrive link"
                            className="w-full px-3 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-mono text-xs focus:outline-none focus:border-amber-600"
                          />
                          <a
                            href={embedPreviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 shrink-0"
                            title="Buka Link Video"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1 font-serif">
                            Judul Tampilan Video:
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...videosList];
                              updated[index] = { ...updated[index], title: e.target.value };
                              setVideosList(updated);
                            }}
                            placeholder="Judul Pengantar Video"
                            className="w-full px-3 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1 font-serif">
                            Durasi Video:
                          </label>
                          <input
                            type="text"
                            value={item.duration}
                            onChange={(e) => {
                              const updated = [...videosList];
                              updated[index] = { ...updated[index], duration: e.target.value };
                              setVideosList(updated);
                            }}
                            placeholder="4:15 menit"
                            className="w-full px-3 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1 font-serif">
                          Ringkasan Isi / Catatan Video:
                        </label>
                        <textarea
                          rows={2}
                          value={item.summary}
                          onChange={(e) => {
                            const updated = [...videosList];
                            updated[index] = { ...updated[index], summary: e.target.value };
                            setVideosList(updated);
                          }}
                          placeholder="Penjelasan singkat konten video..."
                          className="w-full px-3 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 text-xs"
                        />
                      </div>

                      {/* Live Video Embedded Player Box */}
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                          Pratinjau Pemutar Video Live:
                        </span>
                        <div className="aspect-video w-full bg-black border border-stone-300 dark:border-stone-800 overflow-hidden relative">
                          <iframe
                            className="w-full h-full"
                            src={embedPreviewUrl}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-300 dark:border-stone-800">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin mengembalikan semua link video ke setelan awal?')) {
                    setVideosList([
                      {
                        id: 'intro',
                        sectionName: 'Video Pengantar E-Modul (Halaman Petunjuk)',
                        title: 'Video Perkenalan E-Modul “Jelajah Digital”',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '3:45 menit',
                        summary: 'Penjelasan latar belakang e-modul, gambaran 5 unit interaktif, serta pesan moral pentingnya generasi kritis di era banjir informasi.'
                      },
                      {
                        id: 'unit-1',
                        sectionName: 'Unit 1: Mengenal Etika Informasi di Era Digital',
                        title: 'Pengantar Unit 1: Mengapa Etika Informasi Penting di Era Digital?',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '4:15 menit',
                        summary: 'Video perkenalan mengenai pentingnya etika informasi, dampak pelanggaran di era internet, dan tanggung jawab kita sebagai warga digital.'
                      },
                      {
                        id: 'unit-2',
                        sectionName: 'Unit 2: Menjadi Detektif Informasi (Verifikasi Hoaks)',
                        title: 'Pengantar Unit 2: Yuk, Jadi Detektif Informasi!',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '5:30 menit',
                        summary: 'Panduan menjadi detektif informasi yang kritis, mengenali manipulasi konten AI, dan menguasai teknik verifikasi cepat.'
                      },
                      {
                        id: 'unit-3',
                        sectionName: 'Unit 3: Menjaga Privasi & Keamanan Digital',
                        title: 'Pengantar Unit 3: Data Pribadimu, Harta Berharga di Dunia Digital',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '6:10 menit',
                        summary: 'Penjelasan mengenai pentingnya kerahasiaan data pribadi, bahaya phishing dan social engineering, serta cara mengamankan akun.'
                      },
                      {
                        id: 'unit-4',
                        sectionName: 'Unit 4: Menghargai Karya Orang Lain (Hak Cipta & AI)',
                        title: 'Pengantar Unit 4: Menghargai Karya, Menjunjung Integritas',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '5:45 menit',
                        summary: 'Mengapa kejujuran akademik sangat penting dan bagaimana memanfaatkan teknologi AI tanpa melakukan tindakan plagiarisme.'
                      },
                      {
                        id: 'unit-5',
                        sectionName: 'Unit 5: Bijak Bersosial Media',
                        title: 'Pengantar Unit 5: Bijak Bersosial Media di Ruang Publik Digital',
                        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        duration: '4:50 menit',
                        summary: 'Etika bersosialisasi online, menghentikan rantai perundungan siber, dan membangun komunikasi yang inklusif.'
                      }
                    ]);
                  }
                }}
                className="px-4 py-2.5 bg-stone-300 dark:bg-stone-800 hover:bg-stone-400 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-400 dark:border-stone-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Video ke Bawaan</span>
              </button>

              <button
                type="submit"
                disabled={isSavingVideos}
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer border border-amber-800"
              >
                <Save className="w-4 h-4 text-white" />
                <span>{isSavingVideos ? 'Menyimpan...' : 'Simpan Semua Link Video Modul'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: FITUR UJI KEMIRIPAN (TURNITIN NO REPO) */}
      {activeTab === 'similarity' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-950/20 border border-amber-600/40 text-amber-900 dark:text-amber-200 text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="font-serif font-bold">
              📌 Modul Admin: Fitur Uji Kemiripan Naskah Akademik & Cek Plagiarisme (Format Word, PDF, PPT, Maksimal 1000 MB)
            </span>
            <span className="text-[10px] font-mono uppercase bg-amber-600 text-stone-950 px-2 py-0.5 font-bold">
              Mode Akses Terbatas Admin
            </span>
          </div>

          <UjiKemiripanView onNavigate={(sec) => onSelectSection(sec)} />
        </div>
      )}

      {/* TAB 6: CURRICULUM & ANALYTICS OVERVIEW */}

      {activeTab === 'analytics' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6">
          
          <div className="border-b border-stone-300 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Analisis Cakupan Pembelajaran Etika Informasi
            </h3>
            <p className="text-xs text-stone-500">
              Matriks pemahaman peserta terhadap 5 Unit Pembelajaran E-Modul berbasis Literasi Digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Unit Progress Distribution */}
            <div className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-4 font-sans">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                Penetrasi Pemahaman per Unit Pembelajaran
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 01: Etika Informasi & Kesadaran Digital</span>
                    <span className="text-amber-800 font-mono">100% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 02: Evaluasi Informasi & Metode SIFT (Cek Hoaks)</span>
                    <span className="text-amber-800 font-mono">92% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 03: Privasi Data & Perlindungan Diri (UU PDP)</span>
                    <span className="text-amber-800 font-mono">85% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 04: Etika Penggunaan AI & Hak Cipta Akademik</span>
                    <span className="text-amber-800 font-mono">78% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[78%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 05: Etika Media Sosial & Anti Cyberbullying</span>
                    <span className="text-amber-800 font-mono">70% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment & Quiz Insights */}
            <div className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-4 font-sans">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                Analisis Ketuntasan Evaluasi Belajar
              </h4>

              <div className="space-y-3 text-xs text-stone-800 dark:text-stone-200">
                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Kuis Akhir Evaluasi:</span>
                  <p className="text-[11px] leading-relaxed">
                    Tingkat kelulusan peserta pada evaluasi akhir mencapai <strong className="text-emerald-700">{passedQuizCount} dari {totalParticipants} peserta</strong> ({totalParticipants > 0 ? Math.round((passedQuizCount/totalParticipants)*100) : 0}%).
                  </p>
                </div>

                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Topik Paling Dikuasai:</span>
                  <p className="text-[11px] leading-relaxed text-emerald-800 font-medium">
                    ✓ Metode Verifikasi SIFT & Pengenalan Ciri Hoaks WhatsApp
                  </p>
                </div>

                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Topik Perlu Pendalaman:</span>
                  <p className="text-[11px] leading-relaxed text-amber-800 font-medium">
                    ⚠️ Pembedaan Lisensi Creative Commons (CC-BY vs CC-NC-ND)
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 7: MODUL CETAK & DIGITAL FLIPBOOK */}
      {activeTab === 'modul-export' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-300 dark:border-stone-800 pb-4">
            <div>
              <span className="px-2.5 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest font-mono">
                PUSAT UNDUH & EKSPOR MODUL
              </span>
              <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Unduh Modul Luring & Panduan Flipbook Digital
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl font-serif">
                Halaman ini menyediakan file Modul Luring siap cetak dalam format PDF dan Word (.doc), serta panduan integrasi untuk mengubahnya menjadi Digital Flipbook interaktif dengan efek membalik halaman 3D.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onSelectSection('print-pdf')}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-wider text-xs shadow-md flex items-center gap-2 border border-amber-700 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Buka PDF / Modul Cetak</span>
              </button>

              <button
                onClick={handleExportToWord}
                className="px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-xs shadow-md flex items-center gap-2 border border-blue-800 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Draf Word (.doc)</span>
              </button>
            </div>
          </div>

          {/* DOWNLOAD OPTIONS SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Format PDF */}
            <div className="p-5 bg-white dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">1. Modul Cetak & PDF Luring</h4>
                    <span className="text-[10px] font-mono text-stone-500">Format Resmi Berwarna</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold">Siap Cetak / Simpan</span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                Format lengkap berwarna dengan layout buku modul sekolah. Dilengkapi Cover, Kata Pengantar, 5 Unit Materi, QR Code Scanner Video, Lembar Kerja, Kuis, serta Daftar Pustaka resmi.
              </p>

              <button
                onClick={() => onSelectSection('print-pdf')}
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat / Cetak Ke PDF Luring</span>
              </button>
            </div>

            {/* Card 2: Format Word */}
            <div className="p-5 bg-white dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-sm">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">2. Draf Teks Microsoft Word (.doc)</h4>
                    <span className="text-[10px] font-mono text-stone-500">Format Dapat Diedit</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold">Editable .doc</span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                Dokumen draf teks modul lengkap yang dapat dibuka dan disunting di Microsoft Word, Google Docs, atau LibreOffice untuk keperluan adaptasi kurikulum internal sekolah.
              </p>

              <button
                onClick={handleExportToWord}
                className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Microsoft Word (.doc)</span>
              </button>
            </div>

          </div>

          {/* FLIPBOOK CONVERSION GUIDE FOR ADMIN */}
          <div className="bg-[#1A1A1A] text-stone-100 p-6 border-l-8 border-amber-500 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="font-serif font-bold text-base text-white">
                Panduan Mengubah Modul (PDF / Word) Menjadi Digital Flipbook Interaktif (3D Page Flip)
              </h4>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Pengelola dapat mengunggah file <strong>PDF Modul</strong> atau <strong>Draf Word</strong> di atas ke platform pembuat Flipbook digital gratis untuk menghasilkan e-modul interaktif yang bisa dibalik halamannya seperti buku fisik.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#262626] border border-stone-700 space-y-1">
                <span className="font-mono font-bold text-amber-400 block text-xs">Langkah 1:</span>
                <p className="text-stone-300 text-[11px]">Unduh file <strong>PDF Modul</strong> atau draf <strong>Word (.doc)</strong> melalui tombol di atas.</p>
              </div>
              <div className="p-3 bg-[#262626] border border-stone-700 space-y-1">
                <span className="font-mono font-bold text-amber-400 block text-xs">Langkah 2:</span>
                <p className="text-stone-300 text-[11px]">Buka platform Flipbook gratis pilihan (Heyzine, FlipHTML5, AnyFlip, atau Canva).</p>
              </div>
              <div className="p-3 bg-[#262626] border border-stone-700 space-y-1">
                <span className="font-mono font-bold text-amber-400 block text-xs">Langkah 3:</span>
                <p className="text-stone-300 text-[11px]">Unggah (upload) file PDF atau Word modul tersebut ke platform tersebut.</p>
              </div>
              <div className="p-3 bg-[#262626] border border-stone-700 space-y-1">
                <span className="font-mono font-bold text-amber-400 block text-xs">Langkah 4:</span>
                <p className="text-stone-300 text-[11px]">E-Modul otomatis dikonversi menjadi Digital Flipbook 3D dan siap dibagikan via link!</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="font-bold text-amber-400">Rekomendasi Situs Pembuat Flipbook Gratis:</span>
              <a href="https://heyzine.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-amber-400 underline flex items-center gap-1">
                Heyzine.com <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-stone-600">&bull;</span>
              <a href="https://fliphtml5.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-amber-400 underline flex items-center gap-1">
                FlipHTML5.com <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-stone-600">&bull;</span>
              <a href="https://anyflip.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-amber-400 underline flex items-center gap-1">
                AnyFlip.com <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-stone-600">&bull;</span>
              <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-amber-400 underline flex items-center gap-1">
                Canva.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      )}

      {/* PARTICIPANT DETAIL MODAL */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 max-w-lg w-full border-l-8 border-amber-600 shadow-2xl space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-400">
                <UserCheck className="w-4 h-4" /> Detail Log Akses Peserta
              </div>
              <button 
                onClick={() => setSelectedParticipant(null)}
                className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-stone-900 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Nama Lengkap:</span>
                <p className="text-base font-serif font-bold text-white">{selectedParticipant.studentName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Kelas / Jurusan:</span>
                  <span className="font-bold text-stone-200">{selectedParticipant.studentClass}</span>
                </div>
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Institusi:</span>
                  <span className="font-bold text-stone-200">{selectedParticipant.studentInstitution}</span>
                </div>
              </div>

              {selectedParticipant.studentEmail && (
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Email Peserta:</span>
                  <span className="font-mono text-amber-400 font-bold">{selectedParticipant.studentEmail}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Waktu Terakhir Akses:</span>
                  <span className="font-mono text-stone-300">{selectedParticipant.accessedAt}</span>
                </div>
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Perangkat Digunakan:</span>
                  <span className="font-sans text-stone-300">{selectedParticipant.deviceInfo || 'Web Browser'}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Capaian Progress Belajar:</span>
                  <span className="text-amber-400">{selectedParticipant.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${selectedParticipant.progressPercent}%` }} />
                </div>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Skor Kuis Akhir:</span>
                  <span className="text-lg font-serif font-black text-amber-300">
                    {selectedParticipant.finalQuizScore !== null ? `${selectedParticipant.finalQuizScore} / 100` : 'Belum Dikerjakan'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Sertifikat:</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${
                    selectedParticipant.certificateUnlocked ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {selectedParticipant.certificateUnlocked ? 'TERBUKA' : 'TERKUNCI'}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase tracking-widest text-xs"
              >
                Tutup Detail
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CHANGE ADMIN CREDENTIALS MODAL */}
      {isChangeCredentialsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 max-w-md w-full border-l-8 border-amber-600 shadow-2xl space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-400">
                <KeyRound className="w-4 h-4" /> Ubah Kredensial Administrator
              </div>
              <button 
                onClick={() => setIsChangeCredentialsOpen(false)}
                className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Perbarui username dan password login pengelola untuk menjaga keamanan data dan portal administrasi e-modul.
            </p>

            {changeError && (
              <div className="p-3 bg-rose-950/90 border border-rose-700 text-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{changeError}</span>
              </div>
            )}

            <form onSubmit={handleChangeCredentials} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
                  Password Lama Admin
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
                    Username Baru
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Masukkan username baru..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
                    Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru (min 4 karakter)..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Ulangi password baru..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsChangeCredentialsOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingChange}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmittingChange ? 'Satu Momen...' : 'Simpan Kredensial Baru'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
