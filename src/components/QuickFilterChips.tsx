import React from 'react';
import { Flame, Video, Zap, Moon, Search, X, Shield } from 'lucide-react';

export type FilterType = 'all' | 'live' | 'tonight' | 'lateNight' | 'hot' | 'video';

interface QuickFilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  liveCount: number;
  hotCount: number;
  videoCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedClub: string | null;
  onSelectClub: (club: string | null) => void;
  mode: 'schedule' | 'results';
}

const TOP_CLUBS = [
  { name: "Arsenal", short: "Arsenal" },
  { name: "Manchester United", short: "Man Utd" },
  { name: "Chelsea", short: "Chelsea" },
  { name: "Liverpool", short: "Liverpool" },
  { name: "Manchester City", short: "Man City" },
  { name: "Real Madrid", short: "Real Madrid" },
  { name: "Barcelona", short: "Barca" },
  { name: "Paris Saint-Germain", short: "PSG" },
  { name: "Công An Hà Nội", short: "CAHN" },
  { name: "Hà Nội FC", short: "Hà Nội" },
  { name: "Al Nassr", short: "Al Nassr" },
  { name: "Inter Miami", short: "Inter Miami" }
];

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = ({
  activeFilter,
  onFilterChange,
  liveCount,
  hotCount,
  videoCount,
  searchQuery,
  onSearchChange,
  selectedClub,
  onSelectClub,
  mode
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-2.5 px-3 md:px-4">
      <div className="max-w-7xl mx-auto space-y-2.5">
        {/* Main Quick Filters */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
            {/* All */}
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>Tất cả</span>
            </button>

            {/* LIVE */}
            <button
              onClick={() => onFilterChange('live')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === 'live'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>Đang đá (Live)</span>
              {liveCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeFilter === 'live' ? 'bg-red-800 text-white' : 'bg-red-600 text-white'
                }`}>
                  {liveCount}
                </span>
              )}
            </button>

            {/* Tối nay (18:00 - 23:59) */}
            {mode === 'schedule' && (
              <button
                onClick={() => onFilterChange('tonight')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === 'tonight'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Tối nay (18h-24h)</span>
              </button>
            )}

            {/* Rạng sáng mai (00:00 - 05:59) */}
            {mode === 'schedule' && (
              <button
                onClick={() => onFilterChange('lateNight')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === 'lateNight'
                    ? 'bg-purple-800 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Rạng sáng mai (0h-6h)</span>
              </button>
            )}

            {/* Trận HOT */}
            <button
              onClick={() => onFilterChange('hot')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === 'hot'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Trận HOT</span>
              {hotCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeFilter === 'hot' ? 'bg-amber-700 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {hotCount}
                </span>
              )}
            </button>

            {/* Video Highlight (KQBD Mode) */}
            {mode === 'results' && (
              <button
                onClick={() => onFilterChange('video')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === 'video'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Có Video Highlight</span>
                {videoCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeFilter === 'video' ? 'bg-emerald-800 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {videoCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Search bar inside header filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm tên CLB (MU, Arsenal...)"
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9f224e]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Level 3: CLB Quick Filters (Team Hubs - SEO & User intent) */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 border-t border-gray-100">
          <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
            <Shield className="w-3 h-3 text-gray-400" /> CLB nổi bật:
          </span>
          {TOP_CLUBS.map((club) => {
            const isClubActive = selectedClub === club.name;
            return (
              <button
                key={club.name}
                onClick={() => onSelectClub(isClubActive ? null : club.name)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                  isClubActive
                    ? 'bg-[#9f224e] text-white font-bold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {club.short}
              </button>
            );
          })}
          {selectedClub && (
            <button
              onClick={() => onSelectClub(null)}
              className="text-[11px] text-red-600 hover:underline px-1.5 whitespace-nowrap"
            >
              Xóa lọc CLB
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
