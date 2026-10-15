import React, { useState } from 'react';
import { Star, Video, FileText, TrendingUp } from 'lucide-react';
import { FixtureItem } from '../types/football';
import { formatKickoffVN } from '../utils/footballUtils';

interface LiveScoreMatchItemProps {
  fixture: FixtureItem;
  mode: 'schedule' | 'results' | 'live' | 'favorites' | 'standings';
  onOpenDetails: (fixture: FixtureItem) => void;
  onOpenHighlight: (fixture: FixtureItem) => void;
  onToggleFavorite?: (fixture: FixtureItem) => void;
  isFavorite?: boolean;
  onSelectTeam?: (teamName: string) => void;
}

export const LiveScoreMatchItem: React.FC<LiveScoreMatchItemProps> = ({
  fixture,
  mode,
  onOpenDetails,
  onOpenHighlight,
  onToggleFavorite,
  isFavorite = false,
  onSelectTeam
}) => {
  const [imgErrHome, setImgErrHome] = useState(false);
  const [imgErrAway, setImgErrAway] = useState(false);

  const { time } = formatKickoffVN(fixture.fixture.date);
  const status = fixture.fixture.status.short;
  const isFinished = ['FT', 'AET'].includes(status) || fixture.fixture.status.long === 'Match Finished' || fixture.fixture.status.long === 'Finished';
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(status);
  const isCountdown = status === 'COUNTDOWN';

  const homeGoals = fixture.goals.home ?? fixture.score.fulltime.home;
  const awayGoals = fixture.goals.away ?? fixture.score.fulltime.away;

  const showScore = (isFinished || isLive) && homeGoals !== null && awayGoals !== null;

  return (
    <div 
      onClick={() => onOpenDetails(fixture)}
      className={`group relative bg-white hover:bg-[#f7f8f9] border-b border-[#f0f0f0] transition-colors cursor-pointer p-2 sm:py-2.5 sm:px-3.5 ${
        isLive ? 'border-l-4 border-l-[#DF4670] bg-[#fffbfd]' : ''
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 1. Left Status / Time Column (Fixed Width: 56px - 62px) */}
        <div className="w-14 sm:w-[60px] flex-shrink-0 flex flex-col items-center justify-center text-center">
          {isLive ? (
            <div className="flex flex-col items-center">
              <span className="text-[#DF4670] font-extrabold text-xs sm:text-[13px] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF4670] animate-vne-live"></span>
                {status === 'HT' ? 'HT' : `${fixture.fixture.status.elapsed}'`}
              </span>
              <span className="text-[9px] text-[#DF4670] font-bold uppercase tracking-tight font-bai">Live</span>
            </div>
          ) : isFinished ? (
            <div className="flex flex-col items-center">
              <span className="text-[#38404D] font-bold text-xs sm:text-[13px] font-mono">{status === 'PEN' ? 'PEN' : 'FT'}</span>
              <span className="text-[9px] text-[#636B79] uppercase font-medium">{status === 'PEN' ? 'Luân lưu' : 'Hết giờ'}</span>
            </div>
          ) : isCountdown ? (
            <div className="flex flex-col items-center">
              <span className="text-amber-700 font-bold text-xs font-mono">{time}</span>
              <span className="text-[9px] text-amber-700 font-semibold animate-pulse">Sắp đá</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[#222222] font-bold text-xs sm:text-[13px] tracking-tight font-mono">
                {time}
              </span>
              {mode === 'live' && (
                <span className="text-[9px] text-[#9f224e] font-bold">{formatKickoffVN(fixture.fixture.date).dateVN}</span>
              )}
            </div>
          )}
        </div>

        {/* 2. Teams Column (Flex-1: Takes remaining space, logos + names only) */}
        <div className="flex-1 min-w-0 border-l border-[#e5e5e5] pl-2.5 sm:pl-3">
          {/* Home Team Row */}
          <div 
            onClick={(e) => {
              if (onSelectTeam) {
                e.stopPropagation();
                onSelectTeam(fixture.teams.home.name);
              }
            }}
            className="flex items-center gap-2 truncate py-0.5 sm:py-1 h-[24px] sm:h-[26px] hover:text-[#9f224e] transition"
            title={`Xem chi tiết CLB ${fixture.teams.home.name}`}
          >
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              {!imgErrHome ? (
                <img
                  src={fixture.teams.home.logo}
                  alt={fixture.teams.home.name}
                  onError={() => setImgErrHome(true)}
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-[9px] font-bold text-[#636B79]">
                  {fixture.teams.home.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className={`text-xs sm:text-[13px] truncate hover:underline ${
              isFinished && fixture.teams.home.winner 
                ? 'text-[#111111] font-bold' 
                : isFinished 
                ? 'text-[#636B79] font-normal' 
                : 'text-[#222222] font-medium'
            }`}>
              {fixture.teams.home.shortName || fixture.teams.home.name}
            </span>
          </div>

          {/* Away Team Row */}
          <div 
            onClick={(e) => {
              if (onSelectTeam) {
                e.stopPropagation();
                onSelectTeam(fixture.teams.away.name);
              }
            }}
            className="flex items-center gap-2 truncate py-0.5 sm:py-1 h-[24px] sm:h-[26px] hover:text-[#9f224e] transition"
            title={`Xem chi tiết CLB ${fixture.teams.away.name}`}
          >
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              {!imgErrAway ? (
                <img
                  src={fixture.teams.away.logo}
                  alt={fixture.teams.away.name}
                  onError={() => setImgErrAway(true)}
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-[9px] font-bold text-[#636B79]">
                  {fixture.teams.away.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className={`text-xs sm:text-[13px] truncate hover:underline ${
              isFinished && fixture.teams.away.winner 
                ? 'text-[#111111] font-bold' 
                : isFinished 
                ? 'text-[#636B79] font-normal' 
                : 'text-[#222222] font-medium'
            }`}>
              {fixture.teams.away.shortName || fixture.teams.away.name}
            </span>
          </div>
        </div>

        {/* 3. Dedicated Scores Column (Fixed Width: 28px - 36px, Vertically Stacked & Centered) */}
        <div className="w-7 sm:w-8 flex-shrink-0 flex flex-col items-center justify-center text-center font-mono select-none">
          {/* Home Score */}
          <div className="h-[24px] sm:h-[26px] flex items-center justify-center w-full">
            {showScore ? (
              <span className={`text-xs sm:text-[13px] font-mono font-bold ${
                isLive 
                  ? 'text-[#DF4670] font-black' 
                  : isFinished && fixture.teams.home.winner 
                  ? 'text-[#111111] font-black' 
                  : 'text-[#636B79]'
              }`}>
                {homeGoals}
              </span>
            ) : (
              <span className="text-[#c7c7c7] text-xs sm:text-[13px]">-</span>
            )}
          </div>

          {/* Away Score */}
          <div className="h-[24px] sm:h-[26px] flex items-center justify-center w-full">
            {showScore ? (
              <span className={`text-xs sm:text-[13px] font-mono font-bold ${
                isLive 
                  ? 'text-[#DF4670] font-black' 
                  : isFinished && fixture.teams.away.winner 
                  ? 'text-[#111111] font-black' 
                  : 'text-[#636B79]'
              }`}>
                {awayGoals}
              </span>
            ) : (
              <span className="text-[#c7c7c7] text-xs sm:text-[13px]">-</span>
            )}
          </div>
        </div>

        {/* 4. Dedicated Fixed-Width Action Button Slot (Fixed Width: 76px on mobile, 130px on desktop) */}
        <div className="w-20 sm:w-32 flex-shrink-0 flex items-center justify-end font-bai">
          {/* Video Highlight */}
          {fixture.has_highlight && isFinished ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenHighlight(fixture);
              }}
              className="inline-flex items-center justify-center gap-1 bg-white hover:bg-rose-50 text-[#9f224e] border border-[#9f224e] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded transition shadow-2xs whitespace-nowrap cursor-pointer"
              title="Xem video highlight bàn thắng"
            >
              <Video className="w-3.5 h-3.5 text-[#9f224e] flex-shrink-0" />
              <span>Highlight</span>
              {fixture.highlight_duration && (
                <span className="text-[10px] text-[#9f224e]/80 font-mono hidden md:inline">({fixture.highlight_duration})</span>
              )}
            </button>
          ) : fixture.has_recap && isFinished ? (
            /* Tường thuật & Thống kê */
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(fixture);
              }}
              className="inline-flex items-center justify-center gap-1 bg-[#f7f7f8] hover:bg-[#eceef0] text-[#38404D] text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded transition border border-[#e5e5e5] whitespace-nowrap cursor-pointer"
              title="Xem tường thuật & thống kê trận đấu"
            >
              <FileText className="w-3.5 h-3.5 text-[#636B79] flex-shrink-0" />
              <span>Tường thuật</span>
            </button>
          ) : fixture.has_preview && !isFinished ? (
            /* Nhận định & Phong độ */
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(fixture);
              }}
              className="inline-flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded transition border border-amber-200 whitespace-nowrap cursor-pointer"
              title="Xem nhận định chuyên sâu & phong độ"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Nhận định</span>
            </button>
          ) : (
            /* Empty slot to preserve exact alignment across all rows */
            <div className="w-full h-1" aria-hidden="true" />
          )}
        </div>

        {/* 5. Right Star Favorite Icon (Only rendered if onToggleFavorite is provided) */}
        {onToggleFavorite && (
          <div className="w-7 sm:w-8 flex-shrink-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(fixture);
              }}
              className={`p-1.5 rounded-full transition ${
                isFavorite 
                  ? 'text-amber-500 hover:text-amber-600' 
                  : 'text-gray-300 hover:text-amber-400'
              }`}
              title={isFavorite ? "Đã lưu vào trận theo dõi" : "Theo dõi trận đấu này"}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
