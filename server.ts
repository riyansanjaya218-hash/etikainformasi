import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for Access Logs & Feedback Entries
let accessLogs: Array<{
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
}> = [
  {
    id: "log-101",
    studentName: "Aditya Pratama",
    studentClass: "Kelas XI IPA 2",
    studentInstitution: "SMA Negeri 1 Jakarta",
    accessedAt: "2026-07-24 20:15:22",
    lastVisitedSection: "kuis-akhir",
    completedSectionsCount: 12,
    progressPercent: 100,
    finalQuizScore: 90,
    certificateUnlocked: true,
    deviceInfo: "Chrome 126 (Windows)"
  },
  {
    id: "log-102",
    studentName: "Siti Nurhaliza",
    studentClass: "Mahasiswa Semester 4",
    studentInstitution: "Universitas Negeri Jakarta",
    accessedAt: "2026-07-24 21:05:10",
    lastVisitedSection: "unit-4",
    completedSectionsCount: 8,
    progressPercent: 65,
    finalQuizScore: null,
    certificateUnlocked: false,
    deviceInfo: "Safari (MacBook)"
  },
  {
    id: "log-103",
    studentName: "Budi Santoso",
    studentClass: "Kelas X IPS 1",
    studentInstitution: "SMA Negeri 8 Bandung",
    accessedAt: "2026-07-24 22:40:02",
    lastVisitedSection: "cek-fakta",
    completedSectionsCount: 11,
    progressPercent: 90,
    finalQuizScore: 85,
    certificateUnlocked: true,
    deviceInfo: "Chrome Mobile (Android)"
  },
  {
    id: "log-104",
    studentName: "Dewi Lestari",
    studentClass: "Masyarakat Umum",
    studentInstitution: "Komunitas Literasi Digital",
    accessedAt: "2026-07-24 23:10:45",
    lastVisitedSection: "unit-2",
    completedSectionsCount: 4,
    progressPercent: 35,
    finalQuizScore: null,
    certificateUnlocked: false,
    deviceInfo: "Edge (Windows)"
  }
];

let feedbackEntries: Array<{
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
}> = [
  {
    id: "fb-201",
    studentName: "Aditya Pratama",
    studentClass: "Kelas XI IPA 2",
    studentInstitution: "SMA Negeri 1 Jakarta",
    submittedAt: "2026-07-24 20:25:00",
    ratings: { 0: 5, 1: 5, 2: 4, 3: 5, 4: 5 },
    avgRating: 4.8,
    suggestionContent: "Sangat bagus, perlu diperbanyak contoh nyata hoaks AI di TikTok.",
    obstacles: "Tidak ada kendala, antarmuka sangat responsif dan ringan di HP.",
    futureIdeas: "Mohon ditambahkan simulasi analisis deepfake video di unit berikutnya."
  },
  {
    id: "fb-202",
    studentName: "Budi Santoso",
    studentClass: "Kelas X IPS 1",
    studentInstitution: "SMA Negeri 8 Bandung",
    submittedAt: "2026-07-24 22:50:18",
    ratings: { 0: 5, 1: 4, 2: 5, 3: 5, 4: 5 },
    avgRating: 4.8,
    suggestionContent: "Materi SIFT sangat aplikatif untuk membedakan berita asli dan hoaks di WA keluarga.",
    obstacles: "Beberapa istilah hukum di UU PDP agak tebal, namun glosarium sangat membantu.",
    futureIdeas: "Buat aplikasi mobile Android khusus agar bisa dibuka luring tanpa internet."
  }
];

// Admin Login Route
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if ((username === "admin" && password === "admin123") || (username === "admin" && password === "admin")) {
    return res.json({ 
      success: true, 
      token: "admin-secret-token-" + Date.now(),
      user: { name: "Pengelola E-Modul", role: "Administrator" }
    });
  }
  return res.status(401).json({ error: "Username atau Password Admin salah!" });
});

// Access Log Endpoints
app.get("/api/access-logs", (_req, res) => {
  res.json({ logs: accessLogs, total: accessLogs.length });
});

app.post("/api/access-log", (req, res) => {
  const { 
    studentName, 
    studentClass, 
    studentInstitution, 
    lastVisitedSection, 
    completedSectionsCount, 
    progressPercent, 
    finalQuizScore, 
    certificateUnlocked, 
    deviceInfo 
  } = req.body;

  if (!studentName) {
    return res.status(400).json({ error: "studentName required" });
  }

  // Find existing or update
  const existingIndex = accessLogs.findIndex(
    l => l.studentName.toLowerCase().trim() === studentName.toLowerCase().trim() &&
         l.studentClass.toLowerCase().trim() === (studentClass || '').toLowerCase().trim()
  );

  const now = new Date().toLocaleString("sv-SE").replace("T", " ");

  if (existingIndex >= 0) {
    accessLogs[existingIndex] = {
      ...accessLogs[existingIndex],
      studentInstitution: studentInstitution || accessLogs[existingIndex].studentInstitution,
      accessedAt: now,
      lastVisitedSection: lastVisitedSection || accessLogs[existingIndex].lastVisitedSection,
      completedSectionsCount: completedSectionsCount ?? accessLogs[existingIndex].completedSectionsCount,
      progressPercent: progressPercent ?? accessLogs[existingIndex].progressPercent,
      finalQuizScore: finalQuizScore !== undefined ? finalQuizScore : accessLogs[existingIndex].finalQuizScore,
      certificateUnlocked: certificateUnlocked ?? accessLogs[existingIndex].certificateUnlocked,
      deviceInfo: deviceInfo || accessLogs[existingIndex].deviceInfo
    };
  } else {
    const newLog = {
      id: "log-" + Date.now(),
      studentName,
      studentClass: studentClass || "Umum",
      studentInstitution: studentInstitution || "Literasi Digital Indonesia",
      accessedAt: now,
      lastVisitedSection: lastVisitedSection || "cover",
      completedSectionsCount: completedSectionsCount || 1,
      progressPercent: progressPercent || 10,
      finalQuizScore: finalQuizScore ?? null,
      certificateUnlocked: certificateUnlocked || false,
      deviceInfo: deviceInfo || "Web Browser"
    };
    accessLogs.unshift(newLog);
  }

  return res.json({ success: true, total: accessLogs.length });
});

// Feedback Endpoints
app.get("/api/feedbacks", (_req, res) => {
  res.json({ feedbacks: feedbackEntries, total: feedbackEntries.length });
});

app.post("/api/feedback", (req, res) => {
  const { 
    studentName, 
    studentClass, 
    studentInstitution, 
    ratings, 
    suggestionContent, 
    obstacles, 
    futureIdeas 
  } = req.body;

  const now = new Date().toLocaleString("sv-SE").replace("T", " ");

  // Calculate average rating
  const values = Object.values(ratings || {}) as number[];
  const avg = values.length > 0 ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)) : 5.0;

  const newFeedback = {
    id: "fb-" + Date.now(),
    studentName: studentName || "Anonim / Peserta",
    studentClass: studentClass || "Umum",
    studentInstitution: studentInstitution || "Literasi Digital",
    submittedAt: now,
    ratings: ratings || {},
    avgRating: avg,
    suggestionContent: suggestionContent || "-",
    obstacles: obstacles || "-",
    futureIdeas: futureIdeas || "-"
  };

  feedbackEntries.unshift(newFeedback);
  return res.json({ success: true, total: feedbackEntries.length });
});

// Clear Logs (Admin Action)
app.delete("/api/admin/clear-data", (req, res) => {
  accessLogs = [];
  feedbackEntries = [];
  return res.json({ success: true, message: "Seluruh data riwayat & umpan balik berhasil direset." });
});

// Lazy Gemini API Handler
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// AI Tutor Chat & Fact Check Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const ai = getGenAIClient();
    const systemInstruction = `Anda adalah "Asisten Literasi E-Modul Etika Informasi berbasis Literasi Digital". 
Tugas Anda adalah membimbing siswa, mahasiswa, dan masyarakat dalam memahami etika informasi, verifikasi hoaks, metode SIFT (Stop, Investigate, Find, Trace), privasi data (UU PDP No. 27/2022), hak cipta, lisensi Creative Commons, etika penggunaan AI dalam akademik, serta etika media sosial & anti-cyberbullying.
Jawablah pertanyaan pengguna dengan ramah, komunikatif, edukatif, jujur, serta menggunakan Bahasa Indonesia yang baik dan bijak.
Jika pengguna meminta bantuan memverifikasi atau menganalisis klaim berita/hoaks, berikan panduan langkah verifikasi SIFT secara terstruktur.`;

    const model = "gemini-2.5-flash";
    
    // Format prompt with brief context if history is provided
    let fullPrompt = message;
    if (history && Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-4).map(h => `${h.role === 'user' ? 'Siswa' : 'Asisten'}: ${h.content}`).join('\n');
      fullPrompt = `Riwayat Percakapan:\n${recentHistory}\n\nPertanyaan Siswa Terbaru: ${message}`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || "Maaf, saya tidak dapat memproses jawaban saat ini." });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ 
      error: "Gagal terhubung dengan Asisten AI.", 
      details: err?.message || "Internal server error" 
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server E-Modul Etika Informasi running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
