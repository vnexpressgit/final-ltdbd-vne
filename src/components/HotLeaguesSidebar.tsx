import React, { useState } from 'react';
import { Trophy, ChevronRight, ArrowUpRight, Award, Shield, X } from 'lucide-react';
import { StandingTeam } from '../types/football';
import realPremierLeagueStandings from '../data/realPremierLeagueStandings.json';
import realLaLigaStandings from '../data/realLaLigaStandings.json';
import realVLeagueStandings from '../data/realVLeagueStandings.json';
import realSerieAStandings from '../data/realSerieAStandings.json';
import realBundesligaStandings from '../data/realBundesligaStandings.json';
import realEuropaLeagueStandings from '../data/realEuropaLeagueStandings.json';
import realLigue1Standings from '../data/realLigue1Standings.json';
import realSaudiStandings from '../data/realSaudiStandings.json';
import realMlsStandings from '../data/realMlsStandings.json';

export interface HotLeagueSummary {
  id: number;
  name: string;
  vietnameseName: string;
  country: string;
  logo: string;
  flag: string;
  season: string;
  teams: StandingTeam[];
}

export const HOT_LEAGUES_DATA: HotLeagueSummary[] = [
  {
    id: 39,
    name: "Premier League",
    vietnameseName: "Ngoại Hạng Anh",
    country: "Anh",
    logo: "https://is.vnecdn.net/objects/leagues/39.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1",
    season: "2026/27",
    teams: realPremierLeagueStandings as StandingTeam[]
  },
  {
    id: 340,
    name: "V-League",
    vietnameseName: "V-League",
    country: "Việt Nam",
    logo: "https://is.vnecdn.net/objects/leagues/340.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/vn.svg?v=1",
    season: "2026/27",
    teams: realVLeagueStandings as StandingTeam[]
  },
  {
    id: 140,
    name: "LaLiga",
    vietnameseName: "La Liga",
    country: "Tây Ban Nha",
    logo: "https://is.vnecdn.net/objects/leagues/140.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/es.svg?v=1",
    season: "2026/27",
    teams: realLaLigaStandings as StandingTeam[]
  },
  {
    id: 135,
    name: "Serie A",
    vietnameseName: "Serie A",
    country: "Italy",
    logo: "https://is.vnecdn.net/objects/leagues/135.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/it.svg?v=1",
    season: "2026/27",
    teams: realSerieAStandings as StandingTeam[]
  },
  {
    id: 78,
    name: "Bundesliga",
    vietnameseName: "Bundesliga",
    country: "Đức",
    logo: "https://is.vnecdn.net/objects/leagues/78.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/de.svg?v=1",
    season: "2026/27",
    teams: realBundesligaStandings as StandingTeam[]
  },
  {
    id: 61,
    name: "Ligue 1",
    vietnameseName: "Ligue 1",
    country: "Pháp",
    logo: "https://is.vnecdn.net/objects/leagues/61.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/fr.svg?v=1",
    season: "2026/27",
    teams: realLigue1Standings as StandingTeam[]
  },
  {
    id: 307,
    name: "Saudi Pro League",
    vietnameseName: "Saudi Pro League",
    country: "Ả Rập Xê Út",
    logo: "https://is.vnecdn.net/objects/leagues/307.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/sa.svg?v=1",
    season: "2026/27",
    teams: realSaudiStandings as StandingTeam[]
  },
  {
    id: 253,
    name: "MLS",
    vietnameseName: "Nhà nghề Mỹ (MLS)",
    country: "Mỹ",
    logo: "https://is.vnecdn.net/objects/leagues/253.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/us.svg?v=1",
    season: "2026",
    teams: realMlsStandings as StandingTeam[]
  },
  {
    id: 3,
    name: "UEFA Europa League",
    vietnameseName: "Cúp C2 Châu Âu",
    country: "Châu Âu",
    logo: "https://is.vnecdn.net/objects/leagues/3.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/eu.svg?v=1",
    season: "2026/27",
    teams: realEuropaLeagueStandings as StandingTeam[]
  }
];

interface HotLeaguesSidebarProps {
  onViewLeague: (leagueId: number, leagueName: string) => void;
  onSelectTeam?: (teamName: string) => void;
  onCloseDrawer?: () => void;
}

export const HotLeaguesSidebar: React.FC<HotLeaguesSidebarProps> = ({
  onViewLeague,
  onSelectTeam,
  onCloseDrawer
}) => {
  return (
    <aside className="w-full space-y-3 font-bai">
      {/* Title Widget Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-[#9f224e]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#38404D]">
            Bảng xếp hạng
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#757575] font-normal">{HOT_LEAGUES_DATA.length} giải đấu</span>
          {onCloseDrawer && (
            <button
              onClick={onCloseDrawer}
              className="p-1 rounded-md bg-[#f7f7f8] hover:bg-[#eceef0] text-[#636B79] hover:text-[#222222] lg:hidden cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 5 Hot League Mini Tables */}
      <div className="space-y-2.5">
        {HOT_LEAGUES_DATA.map((league) => (
          <div
            key={league.id}
            className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-xs hover:border-[#c7c7c7] transition-colors"
          >
            {/* League Header */}
            <div className="bg-[#fafafa] px-3 py-1.5 border-b border-[#e5e5e5] flex items-center justify-between font-bai">
              <div className="flex items-center gap-1.5 truncate">
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-4 h-4 object-contain flex-shrink-0"
                  loading="lazy"
                />
                <div className="truncate">
                  <span className="text-xs font-bold text-[#222222] block truncate leading-tight">
                    {league.vietnameseName}
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-[#636B79] font-mono bg-white px-1.5 py-0.2 rounded border border-[#e5e5e5] shadow-2xs">
                {league.season}
              </span>
            </div>

            {/* Compact Standings Table */}
            <div className="px-2 py-1">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-[#636B79] border-b border-[#f0f0f0] font-bai font-medium text-[10px]">
                    <th className="py-1 pl-1 w-5 text-center">#</th>
                    <th className="py-1 px-1">CLB</th>
                    <th className="py-1 px-1 text-center w-6" title="Số trận đã đá">Tr</th>
                    <th className="py-1 px-1 text-center w-7" title="Hiệu số bàn thắng">HS</th>
                    <th className="py-1 pr-1 text-right w-7 font-bold text-[#38404D]" title="Điểm số">Đ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {league.teams.slice(0, 5).map((item) => {
                    const isTop1 = item.rank === 1;
                    const isTop4 = item.rank <= 4;

                    return (
                      <tr
                        key={item.team.name}
                        onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                        className="hover:bg-[#f7f8f9] cursor-pointer transition-colors"
                      >
                        {/* Rank */}
                        <td className="py-1 pl-1 text-center">
                          <span
                            className={`w-3.5 h-3.5 rounded-full inline-flex items-center justify-center text-[9px] font-bold ${
                              isTop1
                                ? 'bg-amber-400 text-amber-950 font-black'
                                : isTop4
                                ? 'bg-[#306EE5] text-white'
                                : 'text-[#636B79]'
                            }`}
                          >
                            {item.rank}
                          </span>
                        </td>

                        {/* Team name & logo */}
                        <td className="py-1 px-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <img
                              src={item.team.logo}
                              alt={item.team.name}
                              className="w-3.5 h-3.5 object-contain flex-shrink-0"
                              loading="lazy"
                            />
                            <span className="truncate text-[#222222] font-medium hover:text-[#9f224e] max-w-[95px] text-xs">
                              {item.team.name}
                            </span>
                          </div>
                        </td>

                        {/* Played */}
                        <td className="py-1 px-1 text-center text-[#636B79] font-mono text-xs">
                          {item.played}
                        </td>

                        {/* Goal difference */}
                        <td className="py-1 px-1 text-center font-mono text-[#636B79] text-[10px]">
                          {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                        </td>

                        {/* Points */}
                        <td className="py-1 pr-1 text-right font-bold text-[#9f224e] font-mono text-xs">
                          {item.points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Button "Xem chi tiết" */}
            <div className="px-2.5 py-1.5 bg-[#fbfcfd] border-t border-[#e5e5e5] flex items-center justify-end font-bai">
              <button
                onClick={() => onViewLeague(league.id, league.vietnameseName)}
                className="text-[11px] text-[#9f224e] hover:text-[#831b40] font-semibold flex items-center gap-0.5 transition cursor-pointer"
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
