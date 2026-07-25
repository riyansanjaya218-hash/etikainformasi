import { QuizQuestion } from '../types';

export const UNIT_1_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Etika informasi adalah...',
    options: [
      'Aturan tentang cara menggunakan komputer',
      'Prinsip moral dalam menciptakan, mengakses, dan menyebarkan informasi',
      'Panduan membuat akun media sosial',
      'Cara memperbanyak konten digital'
    ],
    correctAnswer: 1,
    explanation: 'Etika informasi merupakan cabang dari etika yang membahas nilai moral dan prinsip yang mengatur perilaku manusia dalam menciptakan, mengakses, dan menyebarkan informasi.'
  },
  {
    id: 2,
    question: 'Manakah yang termasuk pelanggaran etika informasi?',
    options: [
      'Mencantumkan sumber saat mengutip',
      'Memverifikasi berita sebelum membagikan',
      'Menyebarkan hoaks tanpa verifikasi',
      'Menggunakan kata sandi yang kuat'
    ],
    correctAnswer: 2,
    explanation: 'Menyebarkan berita bohong (hoaks) tanpa melakukan verifikasi terlebih dahulu merupakan bentuk pelanggaran etika informasi yang merugikan publik.'
  },
  {
    id: 3,
    question: 'Mengapa generasi digital native rentan terhadap hoaks?',
    options: [
      'Karena mereka tidak bisa menggunakan internet',
      'Karena informasi berlimpah dan sulit diverifikasi',
      'Karena mereka tidak memiliki gadget',
      'Karena mereka tidak suka membaca'
    ],
    correctAnswer: 1,
    explanation: 'Generasi digital native dihadapkan pada fenomena Information Overload, di mana arus informasi melimpah dalam waktu singkat sehingga membutuhkan kecermatan ekstra dalam memverifikasi.'
  },
  {
    id: 4,
    question: 'Salah satu dampak negatif hoaks adalah...',
    options: [
      'Meningkatkan pengetahuan masyarakat',
      'Mempererat persaudaraan',
      'Menimbulkan kepanikan dan kerugian',
      'Membantu pemerintah mengambil kebijakan'
    ],
    correctAnswer: 2,
    explanation: 'Hoaks dapat menciptakan keresahan sosial, kepanikan massal, disintegrasi, dan kerugian finansial maupun fisik.'
  },
  {
    id: 5,
    question: 'Apa yang dimaksud dengan "filter bubble"?',
    options: [
      'Gelembung sabun di layar HP',
      'Algoritma yang hanya menampilkan konten sesuai minat pengguna',
      'Fitur untuk menyaring air minum',
      'Aplikasi editing foto'
    ],
    correctAnswer: 1,
    explanation: 'Filter bubble terjadi ketika algoritma media sosial membatasi paparan informasi hanya pada hal-hal yang disukai pengguna, memicu sudut pandang yang kurang berimbang.'
  }
];

export const UNIT_2_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Manakah yang merupakan ciri-ciri hoaks?',
    options: [
      'Sumber jelas dan kredibel',
      'Judul sensasional dan provokatif',
      'Dilengkapi dengan data penelitian',
      'Ditulis oleh jurnalis profesional'
    ],
    correctAnswer: 1,
    explanation: 'Informasi hoaks umumnya menggunakan judul yang menggertak, provokatif, emosional, dan melebih-lebihkan agar menarik klik (clickbait).'
  },
  {
    id: 2,
    question: 'Metode S.I.F.T. dalam verifikasi informasi adalah singkatan dari...',
    options: [
      'Stop, Investigate, Find, Trace',
      'Start, Identify, Format, Type',
      'Search, Inspect, Forward, Tag',
      'Share, Inform, Forward, Trust'
    ],
    correctAnswer: 0,
    explanation: 'Metode S.I.F.T oleh Michael Caulfield mencakup: S (Stop), I (Investigate the source), F (Find better coverage), T (Trace claims to original context).'
  },
  {
    id: 3,
    question: 'Deepfake adalah...',
    options: [
      'Video yang direkam dengan kamera profesional',
      'Video atau audio palsu yang dibuat dengan AI',
      'Dokumentasi peristiwa nyata',
      'Film dokumenter'
    ],
    correctAnswer: 1,
    explanation: 'Deepfake memanfaatkan teknologi kecerdasan buatan (AI/deep learning) untuk memanipulasi atau merekayasa ekspresi wajah, suara, dan gerakan seseorang secara sangat mirip.'
  },
  {
    id: 4,
    question: 'Platform cek fakta di Indonesia adalah...',
    options: [
      'Google News',
      'Wikipedia',
      'Mafindo (Masyarakat Anti Fitnah Indonesia)',
      'YouTube'
    ],
    correctAnswer: 2,
    explanation: 'Mafindo bersama turnbackhoax.id dan CekFakta merupakan lembaga independen garis depan pemeriksa fakta di Indonesia.'
  },
  {
    id: 5,
    question: 'Mengapa informasi yang keluar dari konteks berbahaya?',
    options: [
      'Karena informasinya salah total',
      'Karena maknanya bisa berubah dan menyesatkan',
      'Karena tidak ada gambarnya',
      'Karena terlalu pendek'
    ],
    correctAnswer: 1,
    explanation: 'Kutipan atau foto asli yang dipotong dan dipindahkan ke konteks lain dapat mengubah fakta sebenarnya dan memperdaya pembaca.'
  }
];

export const UNIT_3_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Yang termasuk data pribadi spesifik menurut UU PDP No. 27/2022 adalah...',
    options: [
      'Nama lengkap',
      'Data kesehatan',
      'Alamat rumah',
      'Nomor telepon'
    ],
    correctAnswer: 1,
    explanation: 'Sesuai UU PDP, data kesehatan, biometrik, genetika, catatan kejahatan, data anak, dan data keuangan pribadi merupakan Data Pribadi Spesifik yang dilindungi tinggi.'
  },
  {
    id: 2,
    question: 'Phishing adalah...',
    options: [
      'Teknik memancing ikan di laut',
      'Penipuan untuk mendapatkan data pribadi',
      'Aplikasi editing foto',
      'Metode verifikasi data'
    ],
    correctAnswer: 1,
    explanation: 'Phishing adalah bentuk kejahatan siber berbasis manipulasi psikologis untuk memancing pengguna memberikan kredensial login, nomor kartu, atau data rahasia.'
  },
  {
    id: 3,
    question: 'Manakah yang merupakan contoh kata sandi yang kuat?',
    options: [
      '12345678',
      'K0mput3r&d4t4#2024!',
      'namakamu',
      'password'
    ],
    correctAnswer: 1,
    explanation: 'Kata sandi kuat memiliki panjang minimal 12+ karakter yang menggabungkan huruf besar, huruf kecil, angka, dan karakter khusus/simbol.'
  },
  {
    id: 4,
    question: 'Otentikasi dua faktor (2FA) adalah...',
    options: [
      'Login dengan dua kata sandi',
      'Metode verifikasi dengan dua langkah',
      'Dua kali login',
      'Dua akun yang digunakan'
    ],
    correctAnswer: 1,
    explanation: '2FA menambahkan lapisan pertahanan ekstra di mana pengguna harus mengonfirmasi otorisasi melalui metode kedua seperti OTP atau Authenticator App.'
  },
  {
    id: 5,
    question: 'Mengapa kita harus berhati-hati dengan WiFi publik?',
    options: [
      'Karena lambat',
      'Karena data bisa diretas orang lain',
      'Karena mahal',
      'Karena tidak stabil'
    ],
    correctAnswer: 1,
    explanation: 'Jaringan Wi-Fi publik tanpa enkripsi rentan terhadap serangan Man-in-the-Middle (MITM) yang memungkinkan peretas menyadap lalu lintas data pribadi.'
  }
];

export const UNIT_4_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Plagiarisme adalah...',
    options: [
      'Mengutip sumber dengan benar',
      'Mengambil karya orang lain dan mengakuinya sebagai milik sendiri',
      'Menulis daftar pustaka',
      'Membaca buku referensi'
    ],
    correctAnswer: 1,
    explanation: 'Plagiarisme merenggut karya cipta, pemikiran, atau ungkapan tulisan orang lain dan menyajikannya tanpa atribusi seolah milik pribadi.'
  },
  {
    id: 2,
    question: 'Manakah yang merupakan bentuk plagiarisme?',
    options: [
      'Menulis parafrase dengan mencantumkan sumber',
      'Mengutip langsung dengan tanda kutip dan sumber',
      'Copy-paste tanpa sumber',
      'Mencantumkan daftar pustaka'
    ],
    correctAnswer: 2,
    explanation: 'Mengisi tulisan dengan menyalin kalimat/paragraf secara langsung tanpa sitasi jelas adalah tindakan plagiarisme langsung.'
  },
  {
    id: 3,
    question: 'Lisensi Creative Commons BY-SA berarti...',
    options: [
      'Boleh digunakan tetapi tidak boleh diubah',
      'Boleh digunakan dengan mencantumkan pencipta dan dibagikan dengan lisensi yang sama',
      'Boleh digunakan untuk komersial saja',
      'Tidak boleh digunakan sama sekali'
    ],
    correctAnswer: 1,
    explanation: 'BY (Attribution) mengharuskan kredit pada pencipta asli, dan SA (ShareAlike) mewajibkan ciptaan turunan disebar dengan lisensi identik.'
  },
  {
    id: 4,
    question: 'Kapan AI BOLEH digunakan dalam tugas akademik?',
    options: [
      'Menulis seluruh tugas tanpa ide pribadi',
      'Membantu mencari ide awal dan parafrase',
      'Menggantikan pembuatan skripsi secara utuh',
      'Membuat kesimpulan palsu'
    ],
    correctAnswer: 1,
    explanation: 'AI diperbolehkan sebagai asisten riset, pemicu ide awal (brainstorming), dan perbaikan tata bahasa, selama diiringi transparansi dan verifikasi karya mandiri.'
  },
  {
    id: 5,
    question: 'Lama perlindungan hak cipta untuk buku adalah...',
    options: [
      '50 tahun setelah pencipta meninggal',
      '25 tahun setelah pencipta meninggal',
      '70 tahun setelah pencipta meninggal',
      'Selamanya'
    ],
    correctAnswer: 2,
    explanation: 'Sesuai UU Hak Cipta Indonesia, ciptaan buku, lagu, dan seni rupa dilindungi selama hidup pencipta ditambah 70 tahun setelah meninggal dunia.'
  }
];

export const UNIT_5_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Etika berkomentar di media sosial yang benar adalah...',
    options: [
      'Menghina orang yang berbeda pendapat',
      'Menggunakan bahasa yang sopan dan santun',
      'Menyebarkan gosip tentang teman',
      'Mengomentari semua postingan dengan ucapan kasar'
    ],
    correctAnswer: 1,
    explanation: 'Ruang media sosial adalah fasilitas publik. Berkomentar secara santun dan berbasis argumen rasional adalah cermin etika digital.'
  },
  {
    id: 2,
    question: 'Cyberbullying adalah...',
    options: [
      'Bullying di dunia nyata',
      'Bullying yang dilakukan melalui media digital',
      'Olahraga di internet',
      'Aplikasi untuk bermain game'
    ],
    correctAnswer: 1,
    explanation: 'Cyberbullying mencakup pelecehan, intimidasi, penghinaan, atau pengucilan sengaja di platform sosial atau komunikasi digital.'
  },
  {
    id: 3,
    question: 'Yang termasuk cyberbullying adalah...',
    options: [
      'Memberi like pada postingan teman',
      'Menyebarkan data pribadi orang lain (doxing)',
      'Mengirim pesan selamat ulang tahun',
      'Berbagi artikel bermanfaat'
    ],
    correctAnswer: 1,
    explanation: 'Doxing adalah tindakan perundungan siber berbahaya dengan sengaja menyebarluaskan dokumen/data pribadi orang lain untuk memicu persekusi.'
  },
  {
    id: 4,
    question: 'Prinsip 5P sebelum sharing adalah...',
    options: [
      'Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan',
      'Percaya, Pasti, Paham, Perbaiki, Pilih',
      'Puji, Pamer, Pilih, Pakai, Pulang',
      'Pikir, Pasti, Pilih, Pakai, Puas'
    ],
    correctAnswer: 0,
    explanation: 'Prinsip 5P: Pahami konteks, Periksa kebenaran, Perhatikan dampak, Pertimbangkan motif, Putuskan untuk berbagi secara bijak.'
  },
  {
    id: 5,
    question: 'Jika kamu melihat cyberbullying, yang harus dilakukan adalah...',
    options: [
      'Ikut membully korban',
      'Mendukung pelaku',
      'Membantu korban dan melaporkan pelaku',
      'Tidak peduli'
    ],
    correctAnswer: 2,
    explanation: 'Sebagai pahlawan digital (upstander), kita wajib memberikan simpati pada korban, menyimpan bukti, serta melaporkan akun pelaku ke pihak berwenang/platform.'
  }
];

export const FINAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa yang dimaksud dengan etika informasi?',
    options: [
      'Aturan tentang menggunakan internet',
      'Prinsip moral dalam mengelola dan menyebarkan informasi',
      'Panduan membuat media sosial',
      'Cara menggunakan komputer'
    ],
    correctAnswer: 1,
    explanation: 'Etika informasi adalah prinsip moral dan norma yang membimbing tindakan manusia saat mengelola, memproses, dan menyebarkan informasi.'
  },
  {
    id: 2,
    question: 'Manakah yang BUKAN merupakan ciri-ciri hoaks?',
    options: [
      'Judul sensasional',
      'Sumber jelas dan kredibel',
      'Bahasa emosional',
      'Tidak ada bukti pendukung'
    ],
    correctAnswer: 1,
    explanation: 'Adanya nama institusi resmi, nama penulis, dan rekam jejak yang jelas (sumber kredibel) merupakan tanda informasi yang valid, bukan hoaks.'
  },
  {
    id: 3,
    question: 'Metode S.I.F.T. untuk verifikasi informasi adalah...',
    options: [
      'Simple, Interactive, Fast, Trust',
      'Stop, Investigate, Find, Trace',
      'Search, Identify, Filter, Track',
      'Share, Inform, Forward, Transform'
    ],
    correctAnswer: 1,
    explanation: 'S.I.F.T: Stop (Berhenti), Investigate the source (Selidiki sumber), Find better coverage (Cari liputan lain), Trace claims (Telusuri konteks asli).'
  },
  {
    id: 4,
    question: 'Yang termasuk data pribadi spesifik adalah...',
    options: [
      'Nama lengkap',
      'Alamat rumah',
      'Data kesehatan',
      'Nomor telepon'
    ],
    correctAnswer: 2,
    explanation: 'Sesuai pasal UU PDP No. 27/2022, data kesehatan memiliki tingkat kerahasiaan paling tinggi (Data Pribadi Spesifik).'
  },
  {
    id: 5,
    question: 'Plagiarisme adalah...',
    options: [
      'Mengutip sumber dengan benar',
      'Mengambil karya orang lain tanpa izin dan mengakuinya',
      'Menulis daftar pustaka',
      'Membaca buku referensi'
    ],
    correctAnswer: 1,
    explanation: 'Plagiarisme adalah pencurian ide atau tulisan karya orang lain tanpa atribusi resmi.'
  },
  {
    id: 6,
    question: 'Lisensi Creative Commons BY-SA berarti...',
    options: [
      'Tidak boleh digunakan',
      'Boleh digunakan dengan mencantumkan pencipta dan lisensi yang sama',
      'Boleh digunakan untuk komersial',
      'Tidak perlu mencantumkan sumber'
    ],
    correctAnswer: 1,
    explanation: 'BY (Atribusi) dan SA (BerbagiSerupa/ShareAlike).'
  },
  {
    id: 7,
    question: 'Cyberbullying adalah...',
    options: [
      'Bullying di dunia nyata',
      'Bullying melalui media digital',
      'Permainan online',
      'Aplikasi edukasi'
    ],
    correctAnswer: 1,
    explanation: 'Tindakan perundungan yang diluncurkan menggunakan sarana komunikasi elektronik.'
  },
  {
    id: 8,
    question: 'Prinsip 5P sebelum membagikan informasi adalah...',
    options: [
      'Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan',
      'Pilih, Pakai, Percaya, Pasti, Puji',
      'Pikir, Paham, Pasti, Pakai, Pulang',
      'Pamer, Pilih, Pakai, Percaya, Pasti'
    ],
    correctAnswer: 0,
    explanation: 'Prosedur 5P dalam menyaring konten sebelum dibagikan.'
  },
  {
    id: 9,
    question: 'Deepfake adalah...',
    options: [
      'Video yang direkam secara profesional',
      'Video atau audio palsu yang dibuat dengan AI',
      'Film dokumenter',
      'Konten edukasi'
    ],
    correctAnswer: 1,
    explanation: 'Rekayasa kecerdasan buatan untuk mengubah wajah/suara seseorang secara hiper-realistis.'
  },
  {
    id: 10,
    question: 'Salah satu dampak negatif hoaks adalah...',
    options: [
      'Meningkatkan pengetahuan masyarakat',
      'Menimbulkan kepanikan dan kerugian',
      'Mempererat persaudaraan',
      'Membantu pengambilan keputusan'
    ],
    correctAnswer: 1,
    explanation: 'Hoaks merusak tatanan kepercayaan dan memicu kerugian nyata di masyarakat.'
  }
];

export const ETHICS_SURVEY_QUESTIONS = [
  { id: 1, statement: 'Saya selalu memeriksa kebenaran informasi sebelum mempercayainya' },
  { id: 2, statement: 'Saya dapat membedakan antara informasi valid dan hoaks' },
  { id: 3, statement: 'Saya memeriksa kredibilitas penulis sebelum menggunakan informasi' },
  { id: 4, statement: 'Saya menggunakan lebih dari satu sumber untuk memverifikasi informasi' },
  { id: 5, statement: 'Saya selalu mencantumkan sumber ketika mengutip dari internet' },
  { id: 6, statement: 'Saya memahami konsep plagiarisme dan berusaha menghindarinya' },
  { id: 7, statement: 'Saya memverifikasi berita sebelum membagikannya di media sosial' },
  { id: 8, statement: 'Saya memahami bahwa tidak semua informasi boleh digunakan secara bebas' }
];

export const FILTER_SHARE_SCENARIOS = [
  {
    id: 1,
    title: 'Skenario 1: Pesan Berantai Penemuan Obat',
    description: '“Temanmu mengirim pesan di grup tentang ‘penemuan obat COVID-19’ dari sumber tidak jelas. Dia meminta kamu untuk share ke semua kontakmu.”',
    correctAction: 'filter',
    explanation: 'FILTER! Informasi dari sumber tidak jelas berpotensi hoaks. Cek kebenarannya dari sumber kesehatan resmi seperti Kemenkes atau WHO sebelum share.'
  },
  {
    id: 2,
    title: 'Skenario 2: Status Medsos Teman',
    description: '“Kamu melihat postingan temanmu yang sedang sedih. Dia mengunggah status yang mengindikasikan depresi. Beberapa orang berkomentar negatif.”',
    correctAction: 'filter',
    explanation: 'FILTER! Jangan share status yang bisa mempermalukan atau menambah rasa tertekan temanmu. Lebih baik hubungi dia secara pribadi dan beri dukungan hangat.'
  },
  {
    id: 3,
    title: 'Skenario 3: Berita Resmi Terverifikasi',
    description: '“Kamu menemukan artikel dari media kredibel tentang kenaikan harga BBM yang sudah terverifikasi dan memiliki data valid dari pemerintah.”',
    correctAction: 'share',
    explanation: 'SHARE! Informasi akurat dan valid dari sumber terpercaya yang relevan bagi masyarakat boleh dibagikan untuk tujuan edukasi publik.'
  }
];
