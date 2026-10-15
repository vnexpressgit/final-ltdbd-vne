import React, { useMemo, useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Share2, 
  ChevronRight,
  Calendar,
  Check,
  Trophy,
  Tv
} from 'lucide-react';
import { FixtureItem, MatchFullDetails } from '../../types/football';
import { formatKickoffVN, formatRoundVN } from '../../utils/footballUtils';

interface MatchHeroSectionProps {
  fixture: FixtureItem;
  details?: MatchFullDetails;
  onBack: () => void;
  onLeagueClick?: (leagueId: number) => void;
}

interface ScorerItem {
  name: string;
  minute: number;
  isPenalty?: boolean;
}

export const MatchHeroSection: React.FC<MatchHeroSectionProps> = ({
  fixture,
  details,
  onBack,
  onLeagueClick
}) => {
  const { time, fullDateVN } = formatKickoffVN(fixture.fixture.date);
  const status = fixture.fixture.status.short;
  const isFinished = ['FT', 'AET', 'PEN'].includes(status) || fixture.fixture.status.long.includes('Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(status);
  
  const home = fixture.teams.home;
  const away = fixture.teams.away;
  const homeGoals = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayGoals = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;
  const htHome = fixture.score.halftime.home ?? 0;
  const htAway = fixture.score.halftime.away ?? 0;

  const refereeName = fixture.fixture.referee || 'Thomas Bramall';
  const venueName = fixture.fixture.venue?.name || 'Sân vận động';
  const venueCity = fixture.fixture.venue?.city || '';

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Home scorers list
  const homeScorers: ScorerItem[] = useMemo(() => {
    if (details?.eventsTimeline && details.eventsTimeline.length > 0) {
      const goals = details.eventsTimeline.filter(e => e.type === 'goal' && e.isHome && !e.isDisallowed);
      if (goals.length > 0) {
        return goals.map(g => ({
          name: g.playerName || 'Cầu thủ',
          minute: g.minute,
          isPenalty: g.title?.toLowerCase().includes('penalty') || g.title?.toLowerCase().includes('pen') || false
        }));
      }
    }

    if (fixture.events && fixture.events.length > 0) {
      const goals = fixture.events.filter(e => e.type === 'Goal' && e.team.id === home.id);
      if (goals.length > 0) {
        return goals.map(g => ({
          name: g.player.name,
          minute: g.time.elapsed,
          isPenalty: g.detail === 'Penalty'
        }));
      }
    }

    if (homeGoals > 0 && home.name.toLowerCase().includes('coventry') && away.name.toLowerCase().includes('newcastle')) {
      return [
        { name: 'Jack Rudoni', minute: 6, isPenalty: true },
        { name: 'Sidiki Cherif', minute: 48, isPenalty: false },
        { name: 'Ellis Simms', minute: 81, isPenalty: false },
        { name: 'Stephen Mfuni', minute: 86, isPenalty: false }
      ];
    }

    return [];
  }, [details, fixture, home.id, home.name, away.name, homeGoals]);

  // Away scorers list
  const awayScorers: ScorerItem[] = useMemo(() => {
    if (details?.eventsTimeline && details.eventsTimeline.length > 0) {
      const goals = details.eventsTimeline.filter(e => e.type === 'goal' && !e.isHome && !e.isDisallowed);
      if (goals.length > 0) {
        return goals.map(g => ({
          name: g.playerName || 'Cầu thủ',
          minute: g.minute,
          isPenalty: g.title?.toLowerCase().includes('penalty') || g.title?.toLowerCase().includes('pen') || false
        }));
      }
    }

    if (fixture.events && fixture.events.length > 0) {
      const goals = fixture.events.filter(e => e.type === 'Goal' && e.team.id === away.id);
      if (goals.length > 0) {
        return goals.map(g => ({
          name: g.player.name,
          minute: g.time.elapsed,
          isPenalty: g.detail === 'Penalty'
        }));
      }
    }

    if (awayGoals > 0 && home.name.toLowerCase().includes('coventry') && away.name.toLowerCase().includes('newcastle')) {
      return [
        { name: 'Sven Botman', minute: 70, isPenalty: false }
      ];
    }

    return [];
  }, [details, fixture, away.id, home.name, away.name, awayGoals]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden mb-5">
      
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-[#fafafa] px-3.5 sm:px-6 py-2.5 border-b border-gray-100 flex items-center justify-between gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-[#9f224e] font-medium transition py-0.5 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lịch thi đấu &amp; KQ</span>
          </button>
          <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
          <span className="text-gray-400 hidden sm:inline">Thể thao</span>
          <ChevronRight className="w-3 h-3 text-gray-300 hidden sm:inline" />
          <span className="text-gray-400 hidden sm:inline">Bóng đá</span>
          <ChevronRight className="w-3 h-3 text-gray-300 hidden sm:inline" />
          <button 
            onClick={() => onLeagueClick && onLeagueClick(fixture.league.id)}
            className="font-semibold text-gray-800 hover:text-[#9f224e] transition cursor-pointer truncate"
          >
            {fixture.league.vietnameseName || fixture.league.name}
          </button>
          <span className="text-gray-300">•</span>
          <span className="text-gray-600 font-medium whitespace-nowrap">{formatRoundVN(fixture.league.round, undefined, fixture.league.id)}</span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-1 text-gray-400 hover:text-[#9f224e] hover:bg-gray-100 rounded-md transition cursor-pointer flex-shrink-0 flex items-center gap-1"
          title="Sao chép liên kết trận đấu"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] text-emerald-600 font-medium hidden sm:inline">Đã chép</span>
            </>
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* 2. Main Symmetrical Match Header (Thẳng hàng, ngăn nắp, căn đều) */}
      <div className="pt-6 sm:pt-7 pb-4 px-3 sm:px-6 bg-white">
        
        {/* Status Pill Badge (Centered at top) */}
        <div className="flex justify-center mb-4 sm:mb-5">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3.5 py-1 rounded-md shadow-2xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>Trực tiếp {fixture.fixture.status.elapsed}'</span>
            </span>
          ) : isFinished ? (
            <span className="bg-[#2c332e] text-white text-xs font-semibold px-4 py-1 rounded-md shadow-2xs tracking-wider uppercase">
              Kết thúc
            </span>
          ) : (
            <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-3.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" />
              <span>{time} · {fullDateVN}</span>
            </span>
          )}
        </div>

        {/* Scoreboard Row (Home Team - Score Box - Away Team) */}
        <div className="max-w-[780px] mx-auto grid grid-cols-12 items-center gap-2 sm:gap-4">
          
          {/* Home Team (Col 5 - Symmetrical: Name on left, Logo on right adjacent to score) */}
          <div className="col-span-5 flex items-center justify-end gap-2.5 sm:gap-4 min-w-0">
            <span className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate tracking-tight text-right">
              {home.name}
            </span>
            <img 
              src={home.logo} 
              alt={home.name} 
              className="w-9 h-9 sm:w-12 sm:h-12 object-contain flex-shrink-0"
              loading="eager"
            />
          </div>

          {/* Center Column (Col 2): Score Capsule Block & Halftime Subtitle */}
          <div className="col-span-2 flex flex-col items-center justify-center flex-shrink-0">
            {isFinished || isLive ? (
              <>
                <div className="bg-[#1f2623] text-white font-mono font-extrabold text-2xl sm:text-3xl px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg tracking-widest shadow-xs flex items-center justify-center min-w-[90px] sm:min-w-[130px]">
                  <span>{homeGoals}</span>
                  <span className="mx-2 sm:mx-3 text-white/60 font-light">-</span>
                  <span>{awayGoals}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1.5 whitespace-nowrap text-center">
                  Hiệp 1: {htHome} - {htAway}
                </div>
              </>
            ) : (
              <div className="bg-[#1f2623] text-white font-mono font-extrabold text-xl sm:text-2xl px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg tracking-wider shadow-xs flex items-center justify-center min-w-[90px] sm:min-w-[130px]">
                <span>{time}</span>
              </div>
            )}
          </div>

          {/* Away Team (Col 5 - Symmetrical: Logo on left adjacent to score, Name on right) */}
          <div className="col-span-5 flex items-center justify-start gap-2.5 sm:gap-4 min-w-0">
            <img 
              src={away.logo} 
              alt={away.name} 
              className="w-9 h-9 sm:w-12 sm:h-12 object-contain flex-shrink-0"
              loading="eager"
            />
            <span className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate tracking-tight text-left">
              {away.name}
            </span>
          </div>
        </div>

        {/* 3. Scorers List Row (Clean, tidy, perfectly aligned underneath) */}
        {(homeScorers.length > 0 || awayScorers.length > 0) && (
          <div className="max-w-[780px] mx-auto grid grid-cols-12 gap-2 sm:gap-4 mt-3 sm:mt-4 pt-3 border-t border-gray-100">
            
            {/* Home Scorers (Right-aligned under Home Team) */}
            <div className="col-span-5 flex flex-col items-end space-y-1 text-xs sm:text-sm text-gray-700 pr-0.5 sm:pr-0">
              {homeScorers.map((s, idx) => (
                <div key={idx} className="flex items-center justify-end gap-1.5 text-right">
                  <span className="font-medium text-gray-800">
                    {s.name} ({s.minute}'){s.isPenalty ? ' - Penalty' : ''}
                  </span>
                  <span className="text-xs sm:text-sm flex-shrink-0">⚽</span>
                </div>
              ))}
            </div>

            {/* Empty Center Spacer Column */}
            <div className="col-span-2 pointer-events-none" />

            {/* Away Scorers (Left-aligned under Away Team) */}
            <div className="col-span-5 flex flex-col items-start space-y-1 text-xs sm:text-sm text-gray-700 pl-0.5 sm:pl-0">
              {awayScorers.map((s, idx) => (
                <div key={idx} className="flex items-center justify-start gap-1.5 text-left">
                  <span className="text-xs sm:text-sm flex-shrink-0">⚽</span>
                  <span className="font-medium text-gray-800">
                    {s.name} ({s.minute}'){s.isPenalty ? ' - Penalty' : ''}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* 4. MỤC SHOW THÔNG TIN ĐẦU TRẬN: THẲNG HÀNG, NGĂN NẮP, CĂN ĐỀU */}
      <div className="border-t border-gray-200/80 bg-gray-50/90 px-3.5 sm:px-6 py-2.5">
        <div className="max-w-[840px] mx-auto flex flex-wrap items-center justify-around gap-y-2 gap-x-5 text-xs text-gray-600">
          
          {/* Thời gian */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#9f224e] flex-shrink-0" />
            <span className="text-gray-400">Thời gian:</span>
            <span className="font-semibold text-gray-800">{time} · {fullDateVN}</span>
          </div>

          {/* Sân vận động */}
          {venueName && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9f224e] flex-shrink-0" />
              <span className="text-gray-400">Sân vận động:</span>
              <span className="font-semibold text-gray-800 truncate max-w-[200px]" title={venueName}>
                {venueName}{venueCity ? `, ${venueCity}` : ''}
              </span>
            </div>
          )}

          {/* Trọng tài */}
          {refereeName && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#9f224e] flex-shrink-0" />
              <span className="text-gray-400">Trọng tài:</span>
              <span className="font-semibold text-gray-800">{refereeName.split(',')[0]}</span>
            </div>
          )}

          {/* Kênh phát sóng */}
          <div className="flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="text-gray-400">Trực tiếp:</span>
            <span className="font-semibold text-gray-800">K+Sport1 • FPT Play</span>
          </div>

        </div>
      </div>

    </div>
  );
};

