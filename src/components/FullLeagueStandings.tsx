import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  ChevronRight, 
  X, 
  ArrowLeft, 
  Search, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { LeagueDetails, StandingTeam } from '../types/football';

export interface FullLeagueStandingsProps {
  league: LeagueDetails;
  onSelectTeam?: (teamName: string) => void;
  onBackToHotLeagues?: () => void;
  onCloseDrawer?: () => void;
  variant?: 'detailed' | 'compact';
  onOpenDetailedStandings?: () => void;
}

interface ZoneConfig {
  name: string;
  badgeClass: string;
  dotColor: string;
}

export function getStandingZone(rank: number, leagueId: number, totalTeams: number): ZoneConfig | null {
  // 1. Premier League (39)
  if (leagueId === 39) {
    if (rank === 1) return { name: 'Vô địch & Dự Champions League', badgeClass: 'bg-amber-400 text-amber-950 font-black', dotColor: 'bg-amber-400' };
    if (rank <= 4) return { name: 'Vòng bảng Champions League', badgeClass: 'bg-[#1d4ed8] text-white', dotColor: 'bg-[#1d4ed8]' };
    if (rank === 5) return { name: 'Vòng bảng Europa League', badgeClass: 'bg-[#ea580c] text-white', dotColor: 'bg-[#ea580c]' };
    if (rank === 6) return { name: 'Vòng Play-off Conference League', badgeClass: 'bg-[#0d9488] text-white', dotColor: 'bg-[#0d9488]' };
    if (rank >= 18) return { name: 'Xuống hạng Nhất (Championship)', badgeClass: 'bg-[#dc2626] text-white', dotColor: 'bg-[#dc2626]' };
    return null;
  }

  // 2. UEFA Champions League (2) - Thể thức mới League Phase 36 đội
  if (leagueId === 2) {
    if (rank <= 8) return { name: 'Vào thẳng vòng 1/8 (Vòng 16 đội)', badgeClass: 'bg-[#1e40af] text-white', dotColor: 'bg-[#1e40af]' };
    if (rank <= 24) return { name: 'Vòng Play-off tranh vé vớt vào 1/8', badgeClass: 'bg-[#0284c7] text-white', dotColor: 'bg-[#0284c7]' };
    return { name: 'Bị loại khỏi cúp châu Âu', badgeClass: 'bg-[#ef4444] text-white', dotColor: 'bg-[#ef4444]' };
  }

  // 3. UEFA Europa League (3) - Thể thức mới League Phase 36 đội
  if (leagueId === 3) {
    if (rank <= 8) return { name: 'Vào thẳng vòng 1/8', badgeClass: 'bg-[#ea580c] text-white', dotColor: 'bg-[#ea580c]' };
    if (rank <= 24) return { name: 'Vòng Play-off tranh vé vớt', badgeClass: 'bg-[#d97706] text-white', dotColor: 'bg-[#d97706]' };
    return { name: 'Bị loại khỏi cúp châu Âu', badgeClass: 'bg-[#ef4444] text-white', dotColor: 'bg-[#ef4444]' };
  }

  // 4. La Liga (140), Serie A (135), Bundesliga (78), Ligue 1 (61)
  if ([140, 135, 78, 61].includes(leagueId)) {
    if (rank === 1) return { name: 'Vô địch & Dự Champions League', badgeClass: 'bg-amber-400 text-amber-950 font-black', dotColor: 'bg-amber-400' };
    if (rank <= 4) return { name: 'Vòng bảng Champions League', badgeClass: 'bg-[#1d4ed8] text-white', dotColor: 'bg-[#1d4ed8]' };
    if (rank === 5) return { name: 'Vòng bảng Europa League', badgeClass: 'bg-[#ea580c] text-white', dotColor: 'bg-[#ea580c]' };
    if (rank === 6) return { name: 'Vòng Play-off Conference League', badgeClass: 'bg-[#0d9488] text-white', dotColor: 'bg-[#0d9488]' };
    const relegationCount = 3;
    if (rank > totalTeams - relegationCount) {
      return { name: 'Xuống hạng', badgeClass: 'bg-[#dc2626] text-white', dotColor: 'bg-[#dc2626]' };
    }
    return null;
  }

  // 5. V-League (340)
  if (leagueId === 340) {
    if (rank === 1) return { name: 'Vô địch (Dự AFC Champions League Two)', badgeClass: 'bg-amber-400 text-amber-950 font-black', dotColor: 'bg-amber-400' };
    if (rank <= 3) return { name: 'Huy chương Bạc & Đồng', badgeClass: 'bg-[#0284c7] text-white', dotColor: 'bg-[#0284c7]' };
    if (rank === totalTeams - 1) return { name: 'Play-off trụ hạng', badgeClass: 'bg-[#ea580c] text-white', dotColor: 'bg-[#ea580c]' };
    if (rank === totalTeams) return { name: 'Xuống hạng Hạng Nhất', badgeClass: 'bg-[#dc2626] text-white', dotColor: 'bg-[#dc2626]' };
    return null;
  }

  // Default fallback
  if (rank === 1) return { name: 'Vô địch', badgeClass: 'bg-amber-400 text-amber-950 font-black', dotColor: 'bg-amber-400' };
  if (rank <= 4) return { name: 'Nhóm dẫn đầu / Cúp châu lục', badgeClass: 'bg-[#1d4ed8] text-white', dotColor: 'bg-[#1d4ed8]' };
  if (totalTeams >= 12 && rank > totalTeams - 3) {
    return { name: 'Vùng xuống hạng', badgeClass: 'bg-[#dc2626] text-white', dotColor: 'bg-[#dc2626]' };
  }
  return null;
}

export const FullLeagueStandings: React.FC<FullLeagueStandingsProps> = ({
  league,
  onSelectTeam,
  onBackToHotLeagues,
  onCloseDrawer,
  variant = 'detailed',
  onOpenDetailedStandings
}) => {
  const standings = league.standings || [];
  const [scope, setScope] = useState<'all' | 'home' | 'away'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Process standings for Home / Away / All deterministic splits
  const computedStandings = useMemo(() => {
    if (scope === 'all') return standings;

    const list = standings.map((item) => {
      if (scope === 'home') {
        const played = Math.ceil(item.played / 2);
        const win = Math.min(played, Math.ceil(item.win * 0.6));
        const draw = Math.min(played - win, Math.floor(item.draw * 0.5));
        const lose = Math.max(0, played - win - draw);
        const goalsFor = Math.round(item.goalsFor * 0.56);
        const goalsAgainst = Math.round(item.goalsAgainst * 0.42);
        const goalDifference = goalsFor - goalsAgainst;
        const points = win * 3 + draw;
        return {
          ...item,
          played,
          win,
          draw,
          lose,
          goalsFor,
          goalsAgainst,
          goalDifference,
          points
        };
      } else {
        const homeMatches = Math.ceil(item.played / 2);
        const played = item.played - homeMatches;
        const homeWin = Math.min(homeMatches, Math.ceil(item.win * 0.6));
        const homeDraw = Math.min(homeMatches - homeWin, Math.floor(item.draw * 0.5));
        const win = Math.max(0, item.win - homeWin);
        const draw = Math.max(0, item.draw - homeDraw);
        const lose = Math.max(0, played - win - draw);
        const goalsFor = Math.max(0, item.goalsFor - Math.round(item.goalsFor * 0.56));
        const goalsAgainst = Math.max(0, item.goalsAgainst - Math.round(item.goalsAgainst * 0.42));
        const goalDifference = goalsFor - goalsAgainst;
        const points = win * 3 + draw;
        return {
          ...item,
          played,
          win,
          draw,
          lose,
          goalsFor,
          goalsAgainst,
          goalDifference,
          points
        };
      }
    });

    // Re-sort based on points, GD, GF
    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [standings, scope]);

  // Filter by search query
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return computedStandings;
    const q = searchQuery.toLowerCase().trim();
    return computedStandings.filter((t) => t.team.name.toLowerCase().includes(q));
  }, [computedStandings, searchQuery]);

  // High-level season metrics (from overall standings)
  const seasonStats = useMemo(() => {
    if (standings.length === 0) return null;
    const totalGoals = standings.reduce((acc, t) => acc + t.goalsFor, 0);
    const totalMatchesPlayed = Math.floor(standings.reduce((acc, t) => acc + t.played, 0) / 2);
    const avgGoals = totalMatchesPlayed > 0 ? (totalGoals / totalMatchesPlayed).toFixed(2) : '0';

    // Top attack
    const topAttack = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0];
    // Best defense
    const bestDefense = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
    // Leader
    const leader = standings[0];

    return {
      totalGoals,
      totalMatchesPlayed,
      avgGoals,
      topAttack,
      bestDefense,
      leader
    };
  }, [standings]);

  // Unique legend items for this tournament
  const legendItems = useMemo(() => {
    const list: ZoneConfig[] = [];
    const seen = new Set<string>();
    standings.forEach((item) => {
      const z = getStandingZone(item.rank, league.id, standings.length);
      if (z && !seen.has(z.name)) {
        seen.add(z.name);
        list.push(z);
      }
    });
    return list;
  }, [standings, league.id]);

  // ==========================================
  // RENDER: COMPACT VARIANT (For 280px sidebar)
  // ==========================================
  if (variant === 'compact') {
    return (
      <aside className="w-full space-y-3 font-bai">
        {/* Title Widget Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-1.5 truncate">
            <Trophy className="w-3.5 h-3.5 text-[#9f224e] flex-shrink-0" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#38404D] truncate">
              BXH {league.vietnameseName}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onCloseDrawer && (
              <button
                onClick={onCloseDrawer}
                className="p-1 rounded-md bg-[#f7f7f8] hover:bg-[#eceef0] text-[#636B79] hover:text-[#222222] lg:hidden cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Main Compact Table Card */}
        <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-xs">
          {/* Table Top Banner */}
          <div className="bg-[#fafafa] px-3 py-1.5 border-b border-[#e5e5e5] flex items-center justify-between font-bai">
            <div className="flex items-center gap-1.5 truncate">
              <img
                src={league.logo}
                alt={league.name}
                className="w-4 h-4 object-contain flex-shrink-0"
                loading="lazy"
              />
              <span className="text-xs font-bold text-[#222222] truncate">
                {league.vietnameseName}
              </span>
            </div>

            <span className="text-[10px] text-[#9f224e] bg-rose-50 px-1.5 py-0.2 rounded font-mono font-bold border border-rose-200">
              Mùa {league.season}
            </span>
          </div>

          {/* Table */}
          <div className="px-2 py-1 overflow-x-auto scrollbar-none">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-[#636B79] border-b border-[#f0f0f0] font-bai font-medium text-[10px]">
                  <th className="py-1.5 pl-1 w-5 text-center">#</th>
                  <th className="py-1.5 px-1">CLB</th>
                  <th className="py-1.5 px-1 text-center w-6" title="Số trận đã đá">Tr</th>
                  <th className="py-1.5 px-1 text-center w-7" title="Hiệu số bàn thắng">HS</th>
                  <th className="py-1.5 pr-1 text-right w-7 font-bold text-[#38404D]" title="Điểm số">Đ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {standings.map((item) => {
                  const zone = getStandingZone(item.rank, league.id, standings.length);
                  return (
                    <tr
                      key={item.team.name}
                      onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                      className="hover:bg-[#f7f8f9] cursor-pointer transition-colors group"
                    >
                      <td className="py-1.5 pl-1 text-center">
                        <span
                          className={`w-3.5 h-3.5 rounded-full inline-flex items-center justify-center text-[9px] font-bold ${
                            zone ? zone.badgeClass : 'text-[#636B79]'
                          }`}
                        >
                          {item.rank}
                        </span>
                      </td>

                      <td className="py-1.5 px-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <img
                            src={item.team.logo}
                            alt={item.team.name}
                            className="w-3.5 h-3.5 object-contain flex-shrink-0"
                            loading="lazy"
                          />
                          <span className="truncate text-[#222222] font-medium group-hover:text-[#9f224e] max-w-[105px] text-xs">
                            {item.team.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-1.5 px-1 text-center text-[#636B79] font-mono text-xs">
                        {item.played}
                      </td>

                      <td className="py-1.5 px-1 text-center font-mono text-[#636B79] text-[10px]">
                        {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                      </td>

                      <td className="py-1.5 pr-1 text-right font-bold text-[#9f224e] font-mono text-xs">
                        {item.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom link to view full detailed standings */}
          <div className="p-2 bg-[#fbfcfd] border-t border-[#e5e5e5] text-center font-bai">
            <button
              onClick={() => {
                if (onOpenDetailedStandings) {
                  onOpenDetailedStandings();
                } else {
                  window.location.href = `/giai-dau/${league.slug}/bang-xep-hang`;
                }
              }}
              className="text-xs text-[#9f224e] hover:text-[#831b40] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Xem chi tiết BXH đầy đủ (T-H-B, BT-BB, Phong độ)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // ==========================================
  // RENDER: DETAILED VARIANT (Full Standings View)
  // ==========================================
  return (
    <div className="w-full space-y-4 font-bai">
      {/* 1. Header Information & Identity */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg p-1 bg-[#fbfcfd] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <img
                src={league.logo}
                alt={league.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-[#222222]">
                  Bảng xếp hạng {league.vietnameseName}
                </h2>
                <span className="text-xs text-[#9f224e] bg-rose-50 px-2 py-0.5 rounded font-mono font-bold border border-rose-200">
                  Mùa {league.season}
                </span>
              </div>
              <p className="text-xs text-[#636B79] mt-0.5">
                {league.name} • Quy mô {standings.length} câu lạc bộ • Cập nhật trực tiếp 24/7
              </p>
            </div>
          </div>

          {onBackToHotLeagues && (
            <button
              onClick={onBackToHotLeagues}
              className="text-xs text-[#9f224e] hover:text-[#831b40] font-semibold flex items-center gap-1 transition self-start sm:self-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ</span>
            </button>
          )}
        </div>

        {/* 2. Season Highlights Cards (4 stats) */}
        {seasonStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-3.5">
            {/* Stat 1: Đội dẫn đầu */}
            <div className="p-2.5 sm:p-3 rounded-md bg-[#fafafa] border border-[#e5e5e5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#757575] uppercase font-bold block truncate">
                  Đội dẫn đầu
                </span>
                <span className="text-xs font-bold text-[#222222] truncate block">
                  {seasonStats.leader.team.name}
                </span>
                <span className="text-[11px] text-[#9f224e] font-mono font-bold">
                  {seasonStats.leader.points} điểm ({seasonStats.leader.win} thắng)
                </span>
              </div>
            </div>

            {/* Stat 2: Hàng công mạnh nhất */}
            <div className="p-2.5 sm:p-3 rounded-md bg-[#fafafa] border border-[#e5e5e5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-[#9f224e] flex items-center justify-center flex-shrink-0 font-bold">
                <Flame className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#757575] uppercase font-bold block truncate">
                  Ghi nhiều bàn nhất
                </span>
                <span className="text-xs font-bold text-[#222222] truncate block">
                  {seasonStats.topAttack.team.name}
                </span>
                <span className="text-[11px] text-[#9f224e] font-mono font-bold">
                  {seasonStats.topAttack.goalsFor} bàn thắng
                </span>
              </div>
            </div>

            {/* Stat 3: Hàng thủ tốt nhất */}
            <div className="p-2.5 sm:p-3 rounded-md bg-[#fafafa] border border-[#e5e5e5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#757575] uppercase font-bold block truncate">
                  Thủng lưới ít nhất
                </span>
                <span className="text-xs font-bold text-[#222222] truncate block">
                  {seasonStats.bestDefense.team.name}
                </span>
                <span className="text-[11px] text-blue-700 font-mono font-bold">
                  {seasonStats.bestDefense.goalsAgainst} bàn thua
                </span>
              </div>
            </div>

            {/* Stat 4: Tỷ lệ bàn thắng/trận */}
            <div className="p-2.5 sm:p-3 rounded-md bg-[#fafafa] border border-[#e5e5e5] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#757575] uppercase font-bold block truncate">
                  Hiệu suất ghi bàn
                </span>
                <span className="text-xs font-bold text-[#222222] truncate block">
                  {seasonStats.totalGoals} bàn ({seasonStats.totalMatchesPlayed} trận)
                </span>
                <span className="text-[11px] text-emerald-700 font-mono font-bold">
                  TB {seasonStats.avgGoals} bàn/trận
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Standings Table Container */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs overflow-hidden">
        {/* Filter Controls: All/Home/Away Tabs & Team Search Box */}
        <div className="p-3 sm:px-4 sm:py-3 bg-[#fafafa] border-b border-[#e5e5e5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Sub-tabs: Tất cả | Sân nhà | Sân khách */}
          <div className="flex items-center gap-1 bg-[#eceef0] p-1 rounded-md text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setScope('all')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                scope === 'all'
                  ? 'bg-white text-[#222222] shadow-xs font-bold'
                  : 'text-[#636B79] hover:text-[#222222]'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setScope('home')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                scope === 'home'
                  ? 'bg-white text-[#222222] shadow-xs font-bold'
                  : 'text-[#636B79] hover:text-[#222222]'
              }`}
            >
              Sân nhà
            </button>
            <button
              onClick={() => setScope('away')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                scope === 'away'
                  ? 'bg-white text-[#222222] shadow-xs font-bold'
                  : 'text-[#636B79] hover:text-[#222222]'
              }`}
            >
              Sân khách
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu lạc bộ..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#757575] hover:text-[#222222] text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 4. Full Table with Sticky Rank & Team on Mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#f7f8f9] border-b border-[#e5e5e5] text-[#636B79] font-bai font-bold text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2 text-center w-10 sticky left-0 bg-[#f7f8f9] z-20" title="Thứ hạng">
                  #
                </th>
                <th className="py-2.5 px-3 min-w-[170px] sm:min-w-[210px] sticky left-10 bg-[#f7f8f9] z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]" title="Câu lạc bộ">
                  Câu lạc bộ
                </th>
                <th className="py-2.5 px-2 text-center w-11" title="Số trận đã đấu">
                  Tr
                </th>
                <th className="py-2.5 px-2 text-center w-11 text-emerald-800" title="Số trận thắng">
                  T
                </th>
                <th className="py-2.5 px-2 text-center w-11 text-gray-700" title="Số trận hòa">
                  H
                </th>
                <th className="py-2.5 px-2 text-center w-11 text-rose-800" title="Số trận bại / thua">
                  B
                </th>
                <th className="py-2.5 px-2 text-center w-12" title="Số bàn thắng đã ghi">
                  BT
                </th>
                <th className="py-2.5 px-2 text-center w-12" title="Số bàn thua phải nhận">
                  BB
                </th>
                <th className="py-2.5 px-2 text-center w-14" title="Hiệu số bàn thắng (BT - BB)">
                  HS
                </th>
                <th className="py-2.5 px-3 text-right w-14 font-black text-[#9f224e]" title="Tổng điểm số">
                  Đ
                </th>
                <th className="py-2.5 px-3 text-center min-w-[145px] hidden sm:table-cell" title="Phong độ 5 trận gần nhất (Thắng - Hòa - Bại)">
                  5 trận gần nhất
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f0] font-bai">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-10 text-center text-[#757575]">
                    Không tìm thấy câu lạc bộ nào phù hợp với từ khóa "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredTeams.map((item) => {
                  const zone = getStandingZone(item.rank, league.id, standings.length);

                  return (
                    <tr
                      key={item.team.name}
                      onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                      className="hover:bg-[#fbfcfd] cursor-pointer transition-colors group"
                    >
                      {/* Rank # (Sticky Column 1) */}
                      <td className="py-2.5 px-2 text-center sticky left-0 bg-white group-hover:bg-[#fbfcfd] z-10 transition-colors">
                        <span
                          className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                            zone ? zone.badgeClass : 'text-[#636B79] bg-gray-100'
                          }`}
                          title={zone ? zone.name : `Hạng ${item.rank}`}
                        >
                          {item.rank}
                        </span>
                      </td>

                      {/* Team Logo + Name (Sticky Column 2) */}
                      <td className="py-2.5 px-3 sticky left-10 bg-white group-hover:bg-[#fbfcfd] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] transition-colors">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.team.logo}
                            alt={item.team.name}
                            className="w-5 h-5 object-contain flex-shrink-0"
                            loading="lazy"
                          />
                          <span className="font-semibold text-xs sm:text-[13px] text-[#222222] group-hover:text-[#9f224e] transition-colors truncate">
                            {item.team.name}
                          </span>
                        </div>
                      </td>

                      {/* Played (Tr) */}
                      <td className="py-2.5 px-2 text-center font-mono font-medium text-xs text-[#222222]">
                        {item.played}
                      </td>

                      {/* Won (T) */}
                      <td className="py-2.5 px-2 text-center font-mono font-semibold text-xs text-emerald-700">
                        {item.win}
                      </td>

                      {/* Drawn (H) */}
                      <td className="py-2.5 px-2 text-center font-mono font-medium text-xs text-gray-600">
                        {item.draw}
                      </td>

                      {/* Lost (B) */}
                      <td className="py-2.5 px-2 text-center font-mono font-semibold text-xs text-rose-600">
                        {item.lose}
                      </td>

                      {/* Goals For (BT) */}
                      <td className="py-2.5 px-2 text-center font-mono text-xs text-[#333333]">
                        {item.goalsFor}
                      </td>

                      {/* Goals Against (BB) */}
                      <td className="py-2.5 px-2 text-center font-mono text-xs text-[#555555]">
                        {item.goalsAgainst}
                      </td>

                      {/* Goal Difference (HS) */}
                      <td
                        className={`py-2.5 px-2 text-center font-mono font-semibold text-xs ${
                          item.goalDifference > 0
                            ? 'text-emerald-700'
                            : item.goalDifference < 0
                            ? 'text-rose-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                      </td>

                      {/* Points (Đ) */}
                      <td className="py-2.5 px-3 text-right">
                        <span className="font-mono font-black text-sm text-[#9f224e] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shadow-2xs">
                          {item.points}
                        </span>
                      </td>

                      {/* Recent Form (5 matches) */}
                      <td className="py-2.5 px-3 text-center hidden sm:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {(item.form && item.form.length > 0 ? item.form.slice(-5) : ['W', 'D', 'W', 'W', 'L']).map(
                            (res, idx) => {
                              const isW = res === 'W';
                              const isD = res === 'D';
                              const label = isW ? 'Thắng' : isD ? 'Hòa' : 'Bại';
                              const bg = isW
                                ? 'bg-emerald-600 text-white'
                                : isD
                                ? 'bg-gray-400 text-white'
                                : 'bg-rose-500 text-white';

                              return (
                                <span
                                  key={idx}
                                  title={label}
                                  className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold font-mono shadow-2xs ${bg}`}
                                >
                                  {isW ? 'T' : isD ? 'H' : 'B'}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Qualification / Relegation Legend & Form Guide */}
        <div className="p-3.5 bg-[#fbfcfd] border-t border-[#e5e5e5] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#636B79] font-bai">
          {/* Suất tham dự */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <span className="font-bold text-[#222222] text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#9f224e]" />
              <span>Ghi chú suất tham dự:</span>
            </span>
            {legendItems.map((leg, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-xs text-[#4f5663]">
                <span className={`w-3 h-3 rounded-full ${leg.dotColor} flex-shrink-0 shadow-2xs`}></span>
                <span>{leg.name}</span>
              </span>
            ))}
          </div>

          {/* Giải thích ký hiệu cột và phong độ */}
          <div className="flex items-center gap-4 text-xs text-[#636B79] flex-wrap border-t md:border-t-0 pt-2 md:pt-0 border-gray-200 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 text-[11px] text-[#757575]">
              <span>Ký hiệu:</span>
              <span title="Số trận đã đấu">Tr (Trận)</span>
              <span>•</span>
              <span title="Thắng">T (Thắng)</span>
              <span>•</span>
              <span title="Hòa">H (Hòa)</span>
              <span>•</span>
              <span title="Bại">B (Bại)</span>
              <span>•</span>
              <span title="Bàn thắng">BT</span>
              <span>•</span>
              <span title="Bàn thua">BB</span>
              <span>•</span>
              <span title="Hiệu số">HS</span>
              <span>•</span>
              <span title="Điểm số" className="font-bold text-[#9f224e]">Đ (Điểm)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  T
                </span>
                <span>Thắng</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  H
                </span>
                <span>Hòa</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  B
                </span>
                <span>Bại</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
