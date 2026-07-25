import React, { useState } from 'react';
import { Play, AlertCircle, RefreshCw } from 'lucide-react';

interface UniversalVideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
}

export const formatUniversalVideoEmbedUrl = (inputUrl: string): string => {
  if (!inputUrl || !inputUrl.trim()) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const str = inputUrl.trim();

  // Data URLs / Blob URLs / direct MP4s returned directly
  if (
    str.startsWith('data:video/') ||
    str.startsWith('blob:') ||
    str.endsWith('.mp4') ||
    str.endsWith('.webm') ||
    str.endsWith('.mov') ||
    str.endsWith('.m4v')
  ) {
    return str;
  }

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

export const isDirectVideoSource = (url: string): boolean => {
  if (!url) return false;
  const str = url.trim().toLowerCase();
  return (
    str.startsWith('data:video/') ||
    str.startsWith('blob:') ||
    str.endsWith('.mp4') ||
    str.endsWith('.webm') ||
    str.endsWith('.mov') ||
    str.endsWith('.m4v') ||
    str.endsWith('.ogv') ||
    str.includes('/uploads/')
  );
};

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  url,
  title = 'Video E-Modul',
  className = 'w-full h-full'
}) => {
  const [hasError, setHasError] = useState(false);
  const formattedUrl = formatUniversalVideoEmbedUrl(url);
  const isDirect = isDirectVideoSource(url) || isDirectVideoSource(formattedUrl);

  if (!url || !url.trim()) {
    return (
      <div className="w-full h-full bg-stone-900 text-stone-400 flex flex-col items-center justify-center p-6 text-center text-xs space-y-2 font-sans">
        <Play className="w-8 h-8 text-amber-500 opacity-60" />
        <p className="font-semibold text-stone-300">Belum ada video yang disubmit.</p>
        <p className="text-[11px] text-stone-500">Silakan submit link URL atau upload file video di panel admin.</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full bg-stone-950 text-stone-300 flex flex-col items-center justify-center p-6 text-center text-xs space-y-3 font-sans border border-red-900/50">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <div>
          <p className="font-bold text-red-300 text-sm">Gagal memuat video</p>
          <p className="text-[11px] text-stone-400 mt-1 max-w-sm">
            Pastikan URL video publik atau file video yang diunggah dapat diakses oleh sistem.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHasError(false)}
          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Putar Ulang</span>
        </button>
      </div>
    );
  }

  if (isDirect) {
    return (
      <video
        controls
        controlsList="nodownload"
        playsInline
        src={formattedUrl}
        onError={() => setHasError(true)}
        className={`${className} object-contain bg-black`}
      >
        Browser Anda tidak mendukung pemutaran video langsung.
      </video>
    );
  }

  return (
    <iframe
      className={className}
      src={formattedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onError={() => setHasError(true)}
    />
  );
};
