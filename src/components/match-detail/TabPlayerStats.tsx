import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Users,
  Target,
  ArrowUpDown
} from 'lucide-react';
import { MatchFullDetails, MatchLineupPlayer, MatchLineupTeam } from '../../types/football';

interface TabPlayerStatsProps {
  details: MatchFullDetails;
}

export const TabPlayerStats: React.FC<TabPlayerStatsProps> = ({ details }) => {
  const { motm, lineups, fixture } = details;
  const { home, away } = lineups;

  // Selected team tab: 'home' | 'away'
  const [selectedTeamTab, setSelectedTeamTab] = useState<'home' | 'away'>('home');

  const currentTeamLineup: MatchLineupTeam = selectedTeamTab === 'home' ? home : away;

  // Rating badge color helper
  const getRatingBadge = (rating?: number) => {
    if (!rating) return <span className="text-gray-400 font-mono text-xs">--</span>;
    let colorClass = 'bg-red-500 text-white';
    if (rating >= 8.0) {
      colorClass = 'bg-emerald-700 text-white ring-1 ring-emerald-500 font-black';
    } else if (rating >= 7.0) {
      colorClass = 'bg-emerald-500 text-white font-bold';
    } else if (rating >= 6.0) {
      colorClass = 'bg-amber-500 text-white font-bold';
    }

    return (
      <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-bold shadow-2xs ${colorClass}`}>
        {rating.toFixed(1)}
      </span>
    );
  };

  // Group players by line: Thủ môn, Hậu vệ, Tiền vệ, Tiền đạo
  const groupPlayersByPosition = (players: MatchLineupPlayer[]) => {
    const groups: { label: string; players: MatchLineupPlayer[] }[] = [
      { label: 'Thủ môn', players: players.filter(p => p.position === 'Goalkeeper' || p.position === 'G') },
      { label: 'Hậu vệ', players: players.filter(p => p.position === 'Defender' || p.position === 'D') },
      { label: 'Tiền vệ', players: players.filter(p => p.position === 'Midfielder' || p.position === 'M') },
      { label: 'Tiền đạo', players: players.filter(p => p.position === 'Attacker' || p.position === 'F') }
    ];
    return groups.filter(g => g.players.length > 0);
  };

  const playerGroups = groupPlayersByPosition(currentTeamLineup.startXI);

  return (
    <div className="space-y-6">
      
      {/* 1. Man of the Match (MOTM) Banner */}
      {motm && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white p-5 sm:p-6 shadow-md border border-amber-400/50">
          {/* Decorative glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-6">
            {/* Player Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white/20 p-1 border-3 border-amber-200 shadow-lg">
                <img 
                  src={motm.photo || motm.player.photo || 'https://media.api-sports.io/football/players/37127.png'} 
                  alt={motm.player.name}
                  className="w-full h-full object-cover rounded-full bg-slate-900" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-md">
                <Star className="w-4 h-4 fill-amber-950" />
              </div>
            </div>

            {/* Content & Stats */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-black/25 text-amber-100 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{motm.badgeText}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  {motm.player.name}
                </h3>
                <span className="text-sm font-semibold text-amber-100">
                  ({motm.team.name} · #{motm.player.number})
                </span>
                <span className="inline-flex items-center gap-1 bg-white text-emerald-800 text-xs font-black font-mono px-2 py-0.5 rounded-md shadow-xs self-center md:self-auto">
                  ★ {motm.rating.toFixed(1)} / 10
                </span>
              </div>

              <p className="text-xs text-amber-100/90 mt-1 font-medium">
                {motm.headlineStat}
              </p>

              {/* Key Metrics Grid */}
              <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {motm.metrics.map((m, idx) => (
                  <div key={idx} className="bg-black/20 backdrop-blur-xs rounded-xl p-2 text-center border border-white/10">
                    <span className="block text-[10px] text-amber-200 font-medium truncate">{m.label}</span>
                    <span className="block text-sm sm:text-base font-black font-mono text-white mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Player Ratings Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-6">
        
        {/* Table Header & Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9f224e]"></span>
              Bảng điểm số & Chỉ số chi tiết từng cầu thủ
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Chấm điểm theo thang điểm 10 chuẩn quốc tế dựa trên thuật toán phân tích hiệu suất trận đấu
            </p>
          </div>

          {/* Toggle between Home and Away */}
          <div className="flex items-center p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setSelectedTeamTab('home')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedTeamTab === 'home'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <img src={home.team.logo} alt={home.team.name} className="w-4 h-4 object-contain" />
              <span>{home.team.shortName || home.team.name}</span>
            </button>
            <button
              onClick={() => setSelectedTeamTab('away')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedTeamTab === 'away'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <img src={away.team.logo} alt={away.team.name} className="w-4 h-4 object-contain" />
              <span>{away.team.shortName || away.team.name}</span>
            </button>
          </div>
        </div>

        {/* Rating Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
          <span className="font-semibold text-gray-700">Quy chuẩn điểm:</span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-700"></span>
            <span>≥ 8.0: Xuất sắc</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span>7.0 - 7.9: Tốt</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span>6.0 - 6.9: Trung bình</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500"></span>
            <span>&lt; 6.0: Kém</span>
          </span>
        </div>

        {/* Responsive Table with Sticky Player Name Column */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gray-100/90 text-gray-700 uppercase font-bold text-[11px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3 sticky left-0 bg-gray-100 z-10 min-w-[150px] sm:min-w-[180px] shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)]">
                  Cầu thủ
                </th>
                <th className="py-2.5 px-2 text-center min-w-[50px]">Phút</th>
                <th className="py-2.5 px-2 text-center min-w-[70px]">Bàn / KT</th>
                <th className="py-2.5 px-2 text-center min-w-[75px]">Dứt điểm</th>
                <th className="py-2.5 px-2 text-center min-w-[110px]">Chuyền bóng</th>
                <th className="py-2.5 px-2 text-center min-w-[80px]">Tranh chấp</th>
                <th className="py-2.5 px-2 text-center min-w-[85px]">Tắc / Cắt</th>
                <th className="py-2.5 px-3 text-center min-w-[70px]">Điểm số</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {playerGroups.map((grp, grpIdx) => (
                <React.Fragment key={grpIdx}>
                  {/* Position line header */}
                  <tr className="bg-gray-50/75">
                    <td 
                      colSpan={8} 
                      className="py-1.5 px-3 font-bold text-[11px] text-gray-600 uppercase tracking-wider sticky left-0"
                    >
                      {grp.label} ({grp.players.length})
                    </td>
                  </tr>

                  {/* Player rows */}
                  {grp.players.map((p) => {
                    const stats = p.stats;
                    const hasGoal = (stats?.goals || 0) > 0;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        {/* Sticky Player Name Column */}
                        <td className="py-2.5 px-3 sticky left-0 bg-white hover:bg-gray-50/80 z-10 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)]">
                          <div className="flex items-center gap-2">
                            <span className="w-5 text-gray-400 font-mono text-[11px] font-bold">
                              {p.number}
                            </span>
                            <div className="flex-1 truncate">
                              <span className="font-bold text-gray-900 block truncate">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {p.position}
                              </span>
                            </div>
                            {hasGoal && <span className="text-xs">⚽</span>}
                          </div>
                        </td>

                        {/* Phút */}
                        <td className="py-2.5 px-2 text-center font-mono text-gray-600">
                          {stats?.minutes || 90}'
                        </td>

                        {/* Bàn / KT */}
                        <td className="py-2.5 px-2 text-center font-mono">
                          <span className={stats?.goals ? 'font-black text-emerald-600' : 'text-gray-500'}>
                            {stats?.goals || 0}
                          </span>
                          <span className="text-gray-300 mx-1">/</span>
                          <span className={stats?.assists ? 'font-bold text-blue-600' : 'text-gray-500'}>
                            {stats?.assists || 0}
                          </span>
                        </td>

                        {/* Dứt điểm (Trúng đích) */}
                        <td className="py-2.5 px-2 text-center font-mono text-gray-700">
                          {stats ? `${stats.shotsTotal} (${stats.shotsOnTarget})` : '0 (0)'}
                        </td>

                        {/* Chuyền bóng (Tổng, Key passes, Chính xác %) */}
                        <td className="py-2.5 px-2 text-center font-mono text-gray-700">
                          {stats ? `${stats.passesTotal} · KP: ${stats.keyPasses} (${stats.passAccuracy}%)` : '0 · 0 (0%)'}
                        </td>

                        {/* Tranh chấp */}
                        <td className="py-2.5 px-2 text-center font-mono text-gray-700">
                          {stats ? `${stats.duelsWon}/${stats.duelsTotal}` : '0/0'}
                        </td>

                        {/* Tắc / Cắt bóng */}
                        <td className="py-2.5 px-2 text-center font-mono text-gray-700">
                          {stats ? `${stats.tackles} / ${stats.interceptions}` : '0 / 0'}
                        </td>

                        {/* Rating */}
                        <td className="py-2.5 px-3 text-center">
                          {getRatingBadge(p.rating)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
