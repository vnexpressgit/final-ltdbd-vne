import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FixtureItem } from '../../types/football';

export type MatchSubTab = 'overview' | 'lineups' | 'stats' | 'news';

interface MatchStickyBarProps {
  visible: boolean;
  fixture: FixtureItem;
  activeTab: MatchSubTab;
  onTabChange: (tab: MatchSubTab) => void;
  onBack: () => void;
}

export const MatchStickyBar: React.FC<MatchStickyBarProps> = ({
  visible,
  fixture,
  activeTab,
  onTabChange,
  onBack
}) => {
  if (!visible) return null;

  const home = fixture.teams.home;
  const away = fixture.teams.away;
  const homeGoals = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayGoals = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;
  const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || fixture.fixture.status.long.includes('Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);

  const tabs: { id: MatchSubTab; label: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    ...(isFinished || isLive ? [{ id: 'lineups' as const, label: 'Đội hình' }] : []),
    { id: 'stats', label: 'Thống kê' },
    { id: 'news', label: 'Tin tức' }
  ];

  return (
    <div className="fixed top-12 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs h-12 flex items-center transition-all animate-in fade-in duration-150">
      <div className="max-w-[1130px] w-full mx-auto px-3 sm:px-4 flex items-center justify-between gap-3">
        {/* Left: Back + Score */}
        <div className="flex items-center gap-2.5 truncate">
          <button
            onClick={onBack}
            className="p-1 rounded-md text-gray-500 hover:text-[#9f224e] hover:bg-gray-100 transition"
            title="Quay lại danh sách"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900">
            <img src={home.logo} alt={home.name} className="w-5 h-5 object-contain" />
            <span className="hidden sm:inline font-semibold">{home.shortName || home.name}</span>
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs sm:text-sm">
              {isFinished || isLive ? `${homeGoals} - ${awayGoals}` : 'vs'}
            </span>
            <img src={away.logo} alt={away.name} className="w-5 h-5 object-contain" />
            <span className="hidden sm:inline font-semibold">{away.shortName || away.name}</span>

            {isLive ? (
              <span className="ml-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                {fixture.fixture.status.elapsed}'
              </span>
            ) : isFinished ? (
              <span className="ml-1 text-[10px] text-gray-500 font-medium">FT</span>
            ) : null}
          </div>
        </div>

        {/* Right: Quick Tab strip */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded-md font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#9f224e] text-white shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
