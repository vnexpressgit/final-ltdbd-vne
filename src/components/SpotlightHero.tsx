import { Flame, Video, Clock, Calendar, Sparkles } from 'lucide-react';
import { FixtureItem } from '../types/football';
import { formatKickoffVN, formatRoundVN } from '../utils/footballUtils';

interface SpotlightHeroProps {
  hotFixtures: FixtureItem[];
  onOpenDetails: (fixture: FixtureItem) => void;
  onOpenHighlight: (fixture: FixtureItem) => void;
}

export const SpotlightHero: React.FC<SpotlightHeroProps> = ({
  hotFixtures,
  onOpenDetails,
  onOpenHighlight
}) => {
  if (!hotFixtures || hotFixtures.length === 0) return null;

  // Showcase top 2 hot matches
  const topMatches = hotFixtures.slice(0, 2);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500 text-white">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Trận cầu tâm điểm đáng chú ý
          </h2>
        </div>
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          Đại chiến các ông lớn châu Âu & V-League
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {topMatches.map((match) => {
          const { time, dateVN, isLateNight } = formatKickoffVN(match.fixture.date);
          const isFinished = match.fixture.status.short === 'FT';
          const isLive = ['1H', '2H', 'HT'].includes(match.fixture.status.short);

          return (
            <div
              key={match.fixture.id}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1e1b4b] text-white p-4 sm:p-5 shadow-md border border-indigo-950 flex flex-col justify-between"
            >
              {/* Decorative background glow */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header inside hero */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {match.league.vietnameseName} • {formatRoundVN(match.league.round, undefined, match.league.id)}
                </span>

                {isLive ? (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE {match.fixture.status.elapsed}'
                  </span>
                ) : isFinished ? (
                  <span className="bg-gray-700 text-gray-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    KẾT THÚC (FT)
                  </span>
                ) : (
                  <span className="text-indigo-200 text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {time} {dateVN}
                  </span>
                )}
              </div>

              {/* Match Face-off */}
              <div className="grid grid-cols-7 items-center my-2 text-center">
                {/* Home */}
                <div className="col-span-3 flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white/10 rounded-full backdrop-blur-xs border border-white/20 mb-2 flex items-center justify-center">
                    <img 
                      src={match.teams.home.logo} 
                      alt={match.teams.home.name} 
                      className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow" 
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {match.teams.home.name}
                  </span>
                </div>

                {/* Score / VS */}
                <div className="col-span-1 flex flex-col items-center">
                  {isFinished || isLive ? (
                    <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
                      {match.goals.home ?? 0} - {match.goals.away ?? 0}
                    </div>
                  ) : (
                    <div className="bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-bold text-xs sm:text-sm">
                      VS
                    </div>
                  )}
                  <span className="text-[10px] text-indigo-300 mt-1">
                    {isFinished ? 'Tỷ số FT' : 'Trực tiếp'}
                  </span>
                </div>

                {/* Away */}
                <div className="col-span-3 flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white/10 rounded-full backdrop-blur-xs border border-white/20 mb-2 flex items-center justify-center">
                    <img 
                      src={match.teams.away.logo} 
                      alt={match.teams.away.name} 
                      className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow" 
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {match.teams.away.name}
                  </span>
                </div>
              </div>

              {/* Preview excerpt */}
              <p className="text-[11px] text-gray-300 line-clamp-2 my-2 italic">
                "{match.previewText || match.recap_summary}"
              </p>

              {/* Footer inside hero: Action button */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-end text-xs">
                <div className="flex items-center gap-2">
                  {match.highlight_video_url && isFinished && (
                    <button
                      onClick={() => onOpenHighlight(match)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition"
                    >
                      <Video className="w-3.5 h-3.5" /> Xem bàn thắng
                    </button>
                  )}
                  <button
                    onClick={() => onOpenDetails(match)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
