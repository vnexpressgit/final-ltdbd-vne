import React from 'react';
import { BarChart3, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { MatchFullDetails } from '../../types/football';

interface TabStatsProps {
  details: MatchFullDetails;
}

export const TabStats: React.FC<TabStatsProps> = ({ details }) => {
  const { stats, fixture } = details;
  const home = fixture.teams.home;
  const away = fixture.teams.away;

  // Single stat row item with dual-ended progress bar
  const renderStatRow = (
    label: string,
    homeVal: number | string,
    awayVal: number | string,
    homePercent: number,
    awayPercent: number,
    highlightHigher: boolean = true,
    isSubStat: boolean = false
  ) => {
    const isHomeHigher = typeof homeVal === 'number' && typeof awayVal === 'number' ? homeVal > awayVal : false;
    const isAwayHigher = typeof homeVal === 'number' && typeof awayVal === 'number' ? awayVal > homeVal : false;

    return (
      <div className={`py-3 sm:py-3.5 border-b border-gray-100 last:border-none ${isSubStat ? 'bg-gray-50/40 px-3 rounded-lg' : ''}`}>
        {/* Value row with metric name in center */}
        <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 font-medium">
          {/* Home value */}
          <span className={`w-16 sm:w-20 text-left font-mono ${
            highlightHigher && isHomeHigher ? 'font-black text-[#9f224e] text-sm sm:text-base' : 'text-gray-800'
          }`}>
            {homeVal}
          </span>

          {/* Metric label */}
          <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center flex-1 truncate px-2">
            {label}
          </span>

          {/* Away value */}
          <span className={`w-16 sm:w-20 text-right font-mono ${
            highlightHigher && isAwayHigher ? 'font-black text-sky-600 text-sm sm:text-base' : 'text-gray-800'
          }`}>
            {awayVal}
          </span>
        </div>

        {/* Dual Progress Bars (Home on left, Away on right) */}
        <div className="flex items-center gap-1.5 h-2 w-full">
          {/* Home bar (anchored to the right) */}
          <div className="flex-1 bg-gray-100 rounded-l-full overflow-hidden flex justify-end h-full">
            <div
              style={{ width: `${Math.min(100, Math.max(5, homePercent))}%` }}
              className={`h-full rounded-l-full transition-all duration-500 ${
                isHomeHigher ? 'bg-[#9f224e]' : 'bg-[#9f224e]/70'
              }`}
            />
          </div>

          {/* Center divider pip */}
          <div className="w-1 h-3 bg-gray-300 rounded-full flex-shrink-0" />

          {/* Away bar (anchored to the left) */}
          <div className="flex-1 bg-gray-100 rounded-r-full overflow-hidden flex justify-start h-full">
            <div
              style={{ width: `${Math.min(100, Math.max(5, awayPercent))}%` }}
              className={`h-full rounded-r-full transition-all duration-500 ${
                isAwayHigher ? 'bg-sky-500' : 'bg-sky-400/70'
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  // Helper percentages
  const getPercent = (v1: number, v2: number) => {
    const total = v1 + v2;
    if (total === 0) return { p1: 50, p2: 50 };
    return {
      p1: Math.round((v1 / total) * 100),
      p2: Math.round((v2 / total) * 100)
    };
  };

  const xGPercent = getPercent(stats.xG.home, stats.xG.away);
  const shotsPercent = getPercent(stats.totalShots.home, stats.totalShots.away);
  const onTargetPercent = getPercent(stats.shotsOnTarget.home, stats.shotsOnTarget.away);
  const insideBoxPercent = getPercent(stats.shotsInsideBox.home, stats.shotsInsideBox.away);
  const cornersPercent = getPercent(stats.corners.home, stats.corners.away);
  const foulsPercent = getPercent(stats.fouls.home, stats.fouls.away);
  const passesPercent = getPercent(stats.totalPasses.home, stats.totalPasses.away);
  const savesPercent = getPercent(stats.saves.home, stats.saves.away);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-6">
      {/* Header */}
      <div className="pb-4 mb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#9f224e]" />
            Thống kê trận đấu {home.name} vs {away.name}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Dữ liệu so sánh chỉ số chuyên môn chi tiết giữa hai câu lạc bộ
          </p>
        </div>

        {/* Team Legend */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#9f224e]"></span>
            <span className="text-gray-900">{home.shortName || home.name}</span>
          </div>
          <span className="text-gray-300">vs</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <span className="text-gray-900">{away.shortName || away.name}</span>
          </div>
        </div>
      </div>

      {/* Stats List */}
      <div className="space-y-1">
        
        {/* 1. Bàn thắng kỳ vọng (xG) - Metric then chốt */}
        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/70 mb-3">
          <div className="flex items-center justify-between text-xs text-amber-900 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Chỉ số bàn thắng kỳ vọng (xG)
            </span>
            <span className="text-[10px] text-amber-700 font-normal">Expected Goals Model</span>
          </div>
          {renderStatRow(
            'Bàn thắng kỳ vọng (xG)',
            stats.xG.home.toFixed(2),
            stats.xG.away.toFixed(2),
            xGPercent.p1,
            xGPercent.p2
          )}
        </div>

        {/* 2. Kiểm soát bóng */}
        {renderStatRow(
          'Kiểm soát bóng (Ball Possession)',
          `${stats.possession.home}%`,
          `${stats.possession.away}%`,
          stats.possession.home,
          stats.possession.away
        )}

        {/* 3. Tổng số cú sút */}
        {renderStatRow(
          'Tổng số cú sút (Total Shots)',
          stats.totalShots.home,
          stats.totalShots.away,
          shotsPercent.p1,
          shotsPercent.p2
        )}

        {/* 4. Sút trúng đích */}
        {renderStatRow(
          'Sút trúng đích (Shots on Goal)',
          stats.shotsOnTarget.home,
          stats.shotsOnTarget.away,
          onTargetPercent.p1,
          onTargetPercent.p2
        )}

        {/* 5. Sút ra ngoài / Bị chặn */}
        {renderStatRow(
          'Sút ra ngoài / Bị chặn (Shots off / Blocked)',
          `${stats.shotsOffTarget.home} / ${stats.blockedShots.home}`,
          `${stats.shotsOffTarget.away} / ${stats.blockedShots.away}`,
          getPercent(stats.shotsOffTarget.home + stats.blockedShots.home, stats.shotsOffTarget.away + stats.blockedShots.away).p1,
          getPercent(stats.shotsOffTarget.home + stats.blockedShots.home, stats.shotsOffTarget.away + stats.blockedShots.away).p2,
          false,
          true
        )}

        {/* 6. Sút trong vòng cấm */}
        {renderStatRow(
          'Sút trong vòng cấm (Inside Box)',
          stats.shotsInsideBox.home,
          stats.shotsInsideBox.away,
          insideBoxPercent.p1,
          insideBoxPercent.p2
        )}

        {/* 7. Đường chuyền & Độ chính xác */}
        {renderStatRow(
          'Tổng số đường chuyền & Độ chính xác',
          `${stats.totalPasses.home} (${stats.passAccuracy.home}%)`,
          `${stats.totalPasses.away} (${stats.passAccuracy.away}%)`,
          passesPercent.p1,
          passesPercent.p2
        )}

        {/* 8. Phạt góc */}
        {renderStatRow(
          'Phạt góc (Corner Kicks)',
          stats.corners.home,
          stats.corners.away,
          cornersPercent.p1,
          cornersPercent.p2
        )}

        {/* 9. Phạm lỗi */}
        {renderStatRow(
          'Phạm lỗi (Fouls)',
          stats.fouls.home,
          stats.fouls.away,
          foulsPercent.p1,
          foulsPercent.p2,
          false
        )}

        {/* 10. Thẻ vàng */}
        {renderStatRow(
          'Thẻ vàng (Yellow Cards)',
          stats.yellowCards.home,
          stats.yellowCards.away,
          getPercent(stats.yellowCards.home, stats.yellowCards.away).p1,
          getPercent(stats.yellowCards.home, stats.yellowCards.away).p2,
          false
        )}

        {/* 11. Cứu thua của thủ môn */}
        {renderStatRow(
          'Cứu thua của thủ môn (Goalkeeper Saves)',
          stats.saves.home,
          stats.saves.away,
          savesPercent.p1,
          savesPercent.p2
        )}

        {/* 12. Bàn thắng ngăn chặn được */}
        {renderStatRow(
          'Bàn thắng ngăn chặn được (Goals Prevented)',
          stats.goalsPrevented.home.toFixed(2),
          stats.goalsPrevented.away.toFixed(2),
          50,
          50,
          false,
          true
        )}

      </div>
    </div>
  );
};
