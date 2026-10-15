import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Clock, 
  Share2, 
  Check,
  ChevronRight
} from 'lucide-react';
import { FixtureItem } from '../types/football';

interface VideoHighlightModalProps {
  fixture: FixtureItem | null;
  onClose: () => void;
}

export const VideoHighlightModal: React.FC<VideoHighlightModalProps> = ({
  fixture,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [fixture]);

  if (!fixture) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const jumpToTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goals = fixture.events?.filter(e => e.type === 'Goal') || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-5">
      <div 
        className="bg-white text-gray-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#f8f9fa] px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">
              [Video Bàn Thắng] {fixture.teams.home.name} {fixture.goals.home} - {fixture.goals.away} {fixture.teams.away.name}
            </h3>
            <span className="text-xs text-gray-500 hidden md:inline">
              ({fixture.league.vietnameseName})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition text-xs flex items-center gap-1 border border-gray-200"
              title="Chia sẻ video"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Đã sao chép' : 'Chia sẻ'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition border border-gray-200"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={fixture.highlight_video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* VnExpress Watermark */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-90 flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded">
            <span className="text-xs font-serif font-black text-rose-300">VnExpress</span>
            <span className="text-[10px] text-white font-bold uppercase">Thể Thao HD</span>
          </div>

          {/* Center Play/Pause button on hover */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border border-white/20"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col gap-2">
            {/* Scrubber */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
            />

            <div className="flex items-center justify-between text-xs text-gray-200">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="hover:text-white transition">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={toggleMute} className="hover:text-white transition">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-gray-300">
                  {fixture.highlight_duration || "03:45"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">1080p HD</span>
                <button 
                  onClick={() => {
                    if (videoRef.current) {
                      if (!document.fullscreenElement) {
                        videoRef.current.requestFullscreen();
                      } else {
                        document.exitFullscreen();
                      }
                    }
                  }} 
                  className="hover:text-white transition"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Chapters / Key Moments */}
        <div className="p-4 bg-gray-50 overflow-y-auto space-y-3">
          {goals.length > 0 && (
            <div>
              <span className="text-xs uppercase font-bold text-gray-600 tracking-wider flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#9f224e]" />
                Nhảy nhanh đến các bàn thắng:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {goals.map((goal, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToTime((idx + 1) * 35)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 text-xs text-gray-800 border border-gray-200 flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <span>⚽</span>
                    <span className="font-semibold text-gray-900">{goal.player.name}</span>
                    <span className="text-[#9f224e] font-mono font-bold">({goal.time.elapsed}')</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Editorial Match Summary */}
          <div className="bg-white p-3 rounded-lg border border-gray-200 text-xs shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-gray-900">Nhận định sau trận đấu:</span>
              <span className="text-[10px] text-gray-500">Nguồn: VnExpress Thể Thao</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {fixture.recap_summary || `${fixture.teams.home.name} đã thi đấu cống hiến trước ${fixture.teams.away.name}. Những cơ hội nguy hiểm liên tục được tạo ra trước khi tiếng còi mãn cuộc vang lên.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
