import React from 'react';
import { 
  Calendar, 
  Trophy, 
  Filter,
  BarChart2
} from 'lucide-react';

interface VnExpressHeaderProps {
  currentTab: 'schedule' | 'results' | 'live' | 'standings' | null;
  onTabChange: (tab: 'schedule' | 'results' | 'live' | 'standings') => void;
  liveCount: number;
  highlightCount?: number;
  onOpenLeaguesDrawer?: () => void;
  onOpenStandingsDrawer?: () => void;
  hasActiveFilters?: boolean;
  onNavigateHome?: () => void;
}

export const VnExpressHeader: React.FC<VnExpressHeaderProps> = ({
  currentTab,
  onTabChange,
  liveCount,
  onOpenLeaguesDrawer,
  onOpenStandingsDrawer,
  hasActiveFilters,
  onNavigateHome,
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#e5e5e5] shadow-xs">
      <div className="max-w-[1130px] mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 h-11">
        {/* Main Tabs: Lịch thi đấu & Kết quả & LIVE with Breadcrumb in front */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 whitespace-nowrap min-w-0 font-bai">
          {/* Breadcrumb: VnExpress / Thể thao / Bóng đá */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 text-xs sm:text-[13px]">
            <button
              onClick={onNavigateHome}
              className="font-serif font-black text-[#9f224e] text-sm sm:text-base tracking-tight hover:opacity-85 transition cursor-pointer"
              title="VnExpress Trang chủ"
            >
              VnExpress
            </button>
            <span className="text-[#b5b5b5] text-[11px] select-none font-light">/</span>
            <button
              onClick={onNavigateHome}
              className="font-medium text-[#4f5663] hover:text-[#9f224e] transition cursor-pointer"
              title="Chuyên mục Thể thao"
            >
              Thể thao
            </button>
            <span className="text-[#b5b5b5] text-[11px] select-none font-light">/</span>
            <button
              onClick={onNavigateHome}
              className="font-bold text-[#222222] hover:text-[#9f224e] transition cursor-pointer"
              title="Bóng đá"
            >
              Bóng đá
            </button>
          </div>

          {/* Divider between breadcrumb and action tabs */}
          <div className="h-4 w-[1px] bg-[#d9d9d9] mx-1 sm:mx-1.5 flex-shrink-0" />

          <button
            onClick={() => onTabChange('schedule')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
              currentTab === 'schedule'
                ? 'bg-[#9f224e] text-white shadow-xs font-bold'
                : 'bg-[#f7f7f8] text-[#38404D] hover:bg-[#eceef0] hover:text-[#222222] border border-[#e5e5e5]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Lịch thi đấu</span>
          </button>

          <button
            onClick={() => onTabChange('results')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
              currentTab === 'results'
                ? 'bg-[#9f224e] text-white shadow-xs font-bold'
                : 'bg-[#f7f7f8] text-[#38404D] hover:bg-[#eceef0] hover:text-[#222222] border border-[#e5e5e5]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Kết quả</span>
          </button>

          <button 
            onClick={() => onTabChange('live')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-[13px] font-bold flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
              currentTab === 'live' 
                ? 'bg-[#DF4670] text-white shadow-xs ring-1 ring-rose-300' 
                : 'bg-rose-50 text-[#DF4670] hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${currentTab === 'live' ? 'bg-white' : 'bg-[#DF4670]'} animate-vne-live`}></span>
            <span>LIVE</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              currentTab === 'live' ? 'bg-[#b62f54] text-white' : 'bg-rose-100 text-[#DF4670]'
            }`}>
              {liveCount}
            </span>
          </button>
        </div>

        {/* Mobile & Tablet Quick Drawer Buttons (visible on screen < 1024px) */}
        <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0 pl-1 font-bai">
          {onOpenLeaguesDrawer && (
            <button
              onClick={onOpenLeaguesDrawer}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                hasActiveFilters
                  ? 'bg-rose-50 text-[#9f224e] border border-rose-300 font-bold'
                  : 'bg-[#f7f7f8] text-[#38404D] hover:bg-gray-100 border border-[#e5e5e5]'
              }`}
              title="Mở danh sách giải đấu & đội bóng"
            >
              <Filter className="w-3.5 h-3.5 text-[#9f224e]" />
              <span className="hidden md:inline">Giải &amp; Đội</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#9f224e]"></span>
              )}
            </button>
          )}

          {onOpenStandingsDrawer && (
            <button
              onClick={onOpenStandingsDrawer}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs font-semibold bg-[#f7f7f8] text-[#38404D] hover:bg-gray-100 border border-[#e5e5e5] flex items-center gap-1 transition cursor-pointer"
              title="Xem Bảng xếp hạng"
            >
              <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Bảng xếp hạng</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
