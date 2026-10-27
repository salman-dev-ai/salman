// الملف: JourneyVideoModal.tsx
// الوظيفة: نافذة منبثقة لمشغّل فيديو حقيقي (تشغيل/إيقاف/تقديم/وقت فعلي) يعرض مقطع مسيرة المهندس.
// المحتوى: مكوّن JourneyVideoModal مربوط بعنصر <video> عبر useRef مع حالات isPlaying وisMuted وcurrentTime وduration.
// الاعتماديات: مكوّن عميل يعتمد useLanguage للترجمة ويستورد Play وPause وRotateCcw وVolume2 وVolumeX وX من lucide-react.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface JourneyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIDEO_SRC = '/assets/videos/salman_alansi_profile.mp4';
const VIDEO_POSTER = '/assets/images/about_developer_work_1792383940477.jpg';

const formatTime = (value: number) => {
  const total = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const JourneyVideoModal: React.FC<JourneyVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isAr = locale === 'ar';

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const max = Number.isFinite(video.duration) ? video.duration : 0;
    video.currentTime = Math.min(Math.max(seconds, 0), max);
    setCurrentTime(video.currentTime);
  }, []);

  const restart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setCurrentTime(0);
    void video.play().catch(() => setIsPlaying(false));
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // مزامنة حالة الواجهة مع أحداث الفيديو الحقيقية
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(Number.isFinite(video.duration) ? video.duration : 0);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('durationchange', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('durationchange', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isOpen]);

  // عند الفتح: إعادة الضبط والتشغيل الصامت + إغلاق بمفتاح Escape + منع تمرير الخلفية
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    setCurrentTime(0);
    setIsPlaying(false);
    if (video) {
      video.muted = true;
      setIsMuted(true);
      void video.play().catch(() => setIsPlaying(false));
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const chapters = [
    { label: isAr ? 'البدايات والشغف' : 'Early Passion' },
    { label: isAr ? 'المشاريع والأنظمة' : 'Building Systems' },
    { label: isAr ? 'المستقبل والفرص' : 'What is Next' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-video-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#080D12] border border-[#1E2630] rounded-2xl p-6 text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1E2630] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FF641C]/20 text-[#FF641C] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 id="journey-video-title" className="text-lg font-bold text-white">
                {t('about.myJourney')} — Salman Al-Ansi
              </h2>
              <p className="text-xs text-gray-400">
                {t('about.watchVideo')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-full bg-[#131D2A] border border-[#1E2630] hover:border-[#FF641C] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player — إطار رأسي 9:16 يطابق أبعاد الفيديو بدون اقتطاع */}
        <div className="group relative self-center aspect-[9/16] h-[58vh] max-h-[560px] min-h-[320px] w-auto max-w-full rounded-xl overflow-hidden bg-black border border-[#1E2630]">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            playsInline
            preload="metadata"
            onClick={togglePlay}
            className="absolute inset-0 h-full w-full object-contain bg-black cursor-pointer"
          />

          {/* Top badge */}
          <div className="pointer-events-none absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-2 p-3 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded bg-[#080D12]/80 backdrop-blur-md text-[#FF641C] border border-white/10">
              {isAr ? 'فيديو مسيرة التطوير' : 'Developer Journey Documentary'}
            </span>
            <span className="font-mono text-gray-200 px-2 py-1 rounded bg-[#080D12]/80 backdrop-blur-md border border-white/10">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={togglePlay}
              className={`w-16 h-16 rounded-full bg-[#FF641C] hover:bg-[#E05312] text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
              aria-label={isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : isAr ? 'تشغيل' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ms-1" />
              )}
            </button>
          </div>

          {/* Bottom Progress Bar & Controls */}
          <div className="absolute bottom-0 inset-x-0 z-10 space-y-2 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
            <div
              role="slider"
              aria-label={isAr ? 'شريط التقدم' : 'Progress'}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              className="w-full bg-white/25 h-1.5 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
                if (duration > 0) seekTo(percent * duration);
              }}
            >
              <div
                className="bg-[#FF641C] h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="font-semibold hover:text-white cursor-pointer"
                >
                  {isPlaying ? (isAr ? 'إيقاف' : 'Pause') : isAr ? 'تشغيل' : 'Play'}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  aria-label={isAr ? 'إعادة من البداية' : 'Restart'}
                  className="hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? (isAr ? 'تشغيل الصوت' : 'Unmute') : isAr ? 'كتم الصوت' : 'Mute'}
                  className="hover:text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-handwriting text-base">
                Code · Learn · Build · Repeat
              </div>
            </div>
          </div>
        </div>

        {/* Story chapters — تُحسب من المدة الحقيقية للفيديو */}
        {duration > 0 && (
          <div className="mt-4 pt-4 border-t border-[#1E2630] grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.label}
                type="button"
                onClick={() => seekTo((duration / chapters.length) * index)}
                className="p-2 rounded-lg bg-[#0E151E] border border-[#1E2630] hover:border-[#FF641C]/60 transition-colors cursor-pointer"
              >
                <span className="block text-[#FF641C] font-bold">
                  {formatTime((duration / chapters.length) * index)} - {formatTime((duration / chapters.length) * (index + 1))}
                </span>
                <span className="text-[11px]">{chapter.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
