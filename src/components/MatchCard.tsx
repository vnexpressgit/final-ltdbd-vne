import React, { useState } from 'react';
import { 
  Bell, 
  BellRing, 
  Video, 
  ChevronRight, 
  Flame, 
  FileText, 
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';
import { FixtureItem } from '../types/football';
import { formatKickoffVN, formatRoundVN } from '../utils/footballUtils';

interface MatchCardProps {
  fixture: FixtureItem;
  mode: 'schedule' | 'results';
  onOpenHighlight: (fixture: FixtureItem) => void;
  onOpenDetails: (fixture: FixtureItem) => void;
  onToggleReminder: (fixture: FixtureItem) => void;
  isReminded: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  fixture,
  mode,
  onOpenHighlight,
  onOpenDetails,
  onToggleReminder,
  isReminded
}) => {
  const [imgErrorHome, setImgErrorHome] = useState(false);
  const [imgErrorAway, setImgErrorAway] = useState(false);

  const { time, dateVN, fullDateVN, isLateNight, isEvening } = formatKickoffVN(fixture.fixture.date);
  const status = fixture.fixture.status.short;
  const isFinished = ['FT', 'AET'].includes(status) || fixture.fixture.status.long === 'Match Finished' || fixture.fixture.status.long === 'Finished';
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(status);
  const isCountdown = status === 'COUNTDOWN';

  const homeTeam = fixture.teams.home;
  const awayTeam = fixture.teams.away;
  const homeGoals = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayGoals = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;

  // Scorers by team
  const homeScorers = fixture.events?.filter(
    e => e.type === 'Goal' && e.team.id === homeTeam.id
  ) || [];
  const awayScorers = fixture.events?.filter(
    e => e.type === 'Goal' && e.team.id === awayTeam.id
  ) || [];

  // Red cards by team
  const homeRedCards = fixture.events?.filter(
    e => e.type === 'Card' && e.detail === 'Red Card' && e.team.id === homeTeam.id
  ) || [];
  const awayRedCards = fixture.events?.filter(
    e => e.type === 'Card' && e.detail === 'Red Card' && e.team.id === awayTeam.id
  ) || [];

  return (
    <div className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-md ${
      fixture.is_hot 
        ? 'border-amber-300 ring-1 ring-amber-200/50' 
        : isLive 
        ? 'border-red-300 ring-1 ring-red-200' 
        : 'border-gray-200/90 hover:border-gray-300'
    }`}>
      {/* Row 1: Header with League, Round, Hot Badge, Reminder Bell */}
      <div className="bg-[#fbfcfd] px-3.5 py-1.5 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-gray-700 truncate">
            {fixture.league.vietnameseName || fixture.league.name}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-[11px] truncate">
            {formatRoundVN(fixture.league.round, undefined, fixture.league.id)}
          </span>



          {isCountdown && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
              <Clock className="w-3 h-3" />
              Sắp diễn ra
            </span>
          )}

          {isLive && (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              LIVE {fixture.fixture.status.elapsed}'
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {!isFinished && !isLive && (
            <button
              onClick={() => onToggleReminder(fixture)}
              className={`p-1 rounded-full transition-colors ${
                isReminded 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-gray-400 hover:text-amber-600 hover:bg-gray-100'
              }`}
              title={isReminded ? "Đã bật nhắc nhở trước trận" : "Bật thông báo nhắc trận đấu"}
            >
              {isReminded ? (
                <BellRing className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              ) : (
                <Bell className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <span className="text-[11px] text-gray-400 hidden sm:inline">
            {fixture.fixture.venue?.name || 'Sân trung lập'}
          </span>
        </div>
      </div>

      {/* Row 2: Main Match Center (Scores or Kickoff Time + Broadcasters) */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-12 items-center gap-2">
          
          {/* Home Team */}
          <div className="col-span-5 flex items-center justify-end gap-2.5 text-right">
            <span className={`text-xs sm:text-sm font-semibold truncate ${
              isFinished && homeTeam.winner ? 'font-bold text-gray-950' : 'text-gray-800'
            }`}>
              {homeTeam.shortName || homeTeam.name}
            </span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center p-0.5 bg-gray-50 rounded-full border border-gray-100">
              {!imgErrorHome ? (
                <img
                  src={homeTeam.logo}
                  alt={homeTeam.name}
                  onError={() => setImgErrorHome(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-[10px] font-bold text-gray-500">
                  {homeTeam.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Center: Kickoff Time OR Match Score */}
          <div className="col-span-2 flex flex-col items-center justify-center text-center px-1">
            {isFinished ? (
              // Finished Match Score
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 text-gray-900 px-2 sm:px-3 py-1 rounded-md text-base sm:text-lg font-extrabold tracking-wider border border-gray-200">
                  {homeGoals} - {awayGoals}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500 font-medium">
                  <span className="bg-gray-200 text-gray-700 px-1 rounded text-[10px] font-bold">FT</span>
                  {fixture.score.halftime.home !== null && (
                    <span className="hidden sm:inline text-[10px]">
                      (HT {fixture.score.halftime.home}-{fixture.score.halftime.away})
                    </span>
                  )}
                </div>
              </div>
            ) : isLive ? (
              // Live Match Score
              <div className="flex flex-col items-center">
                <div className="bg-red-50 text-red-600 px-2 sm:px-3 py-1 rounded-md text-base sm:text-lg font-extrabold tracking-wider border border-red-200 animate-pulse">
                  {homeGoals} - {awayGoals}
                </div>
                <span className="text-red-600 text-[11px] font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                  {status === 'HT' ? 'Nghỉ giữa hiệp' : `${fixture.fixture.status.elapsed}'`}
                </span>
              </div>
            ) : (
              // Upcoming Kickoff Time
              <div className="flex flex-col items-center">
                <span className="text-base sm:text-lg font-extrabold text-[#9f224e] tracking-tight">
                  {time}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {dateVN} {isLateNight ? '(Đêm)' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex items-center justify-start gap-2.5 text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center p-0.5 bg-gray-50 rounded-full border border-gray-100">
              {!imgErrorAway ? (
                <img
                  src={awayTeam.logo}
                  alt={awayTeam.name}
                  onError={() => setImgErrorAway(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-[10px] font-bold text-gray-500">
                  {awayTeam.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-semibold truncate ${
              isFinished && awayTeam.winner ? 'font-bold text-gray-950' : 'text-gray-800'
            }`}>
              {awayTeam.shortName || awayTeam.name}
            </span>
          </div>
        </div>

        {/* Goal Scorers & Red Cards (Critical for KQBD User Intent) */}
        {(homeScorers.length > 0 || awayScorers.length > 0 || homeRedCards.length > 0 || awayRedCards.length > 0) && (
          <div className="mt-2.5 pt-2 border-t border-dashed border-gray-200 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
            {/* Home events */}
            <div className="space-y-0.5 text-right pr-2">
              {homeScorers.map((e, idx) => (
                <div key={idx} className="flex items-center justify-end gap-1 text-gray-700">
                  <span className="font-medium truncate">{e.player.name} {e.time.elapsed}'</span>
                  {e.detail === 'Penalty' && <span className="text-[9px] text-amber-600 font-bold">(Pen)</span>}
                  <span>⚽</span>
                </div>
              ))}
              {homeRedCards.map((e, idx) => (
                <div key={idx} className="flex items-center justify-end gap-1 text-red-600 font-medium">
                  <span>{e.player.name} {e.time.elapsed}'</span>
                  <span className="text-xs">🟥</span>
                </div>
              ))}
            </div>

            {/* Away events */}
            <div className="space-y-0.5 text-left pl-2 border-l border-gray-100">
              {awayScorers.map((e, idx) => (
                <div key={idx} className="flex items-center justify-start gap-1 text-gray-700">
                  <span>⚽</span>
                  <span className="font-medium truncate">{e.player.name} {e.time.elapsed}'</span>
                  {e.detail === 'Penalty' && <span className="text-[9px] text-amber-600 font-bold">(Pen)</span>}
                </div>
              ))}
              {awayRedCards.map((e, idx) => (
                <div key={idx} className="flex items-center justify-start gap-1 text-red-600 font-medium">
                  <span className="text-xs">🟥</span>
                  <span>{e.player.name} {e.time.elapsed}'</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Row 3: Action Links (Video Highlight, Preview, Lineups, Details) */}
      <div className="bg-gray-50/80 px-3.5 py-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Highlight Button if video available */}
          {fixture.highlight_video_url && isFinished && (
            <button
              onClick={() => onOpenHighlight(fixture)}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-md transition shadow-2xs group"
            >
              <Video className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
              <span>Video Highlight</span>
              {fixture.highlight_duration && (
                <span className="text-[10px] opacity-90 font-mono">({fixture.highlight_duration})</span>
              )}
            </button>
          )}

          {/* Pre-match preview or Recap */}
          <button
            onClick={() => onOpenDetails(fixture)}
            className="text-gray-600 hover:text-[#9f224e] font-medium flex items-center gap-1 text-[11px]"
          >
            <FileText className="w-3 h-3 text-gray-400" />
            <span>{isFinished ? 'Tường thuật & Thống kê' : 'Nhận định & Phong độ'}</span>
          </button>
        </div>

        <button
          onClick={() => onOpenDetails(fixture)}
          className="text-[#9f224e] hover:text-[#78183a] font-semibold text-[11px] flex items-center gap-0.5 ml-auto"
        >
          <span>Chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
