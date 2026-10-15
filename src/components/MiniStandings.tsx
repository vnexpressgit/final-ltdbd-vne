import React, { useState } from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { 
  PREMIER_LEAGUE_STANDINGS, 
  VLEAGUE_STANDINGS, 
  LALIGA_STANDINGS, 
  SERIEA_STANDINGS, 
  BUNDESLIGA_STANDINGS, 
  EUROPA_LEAGUE_STANDINGS, 
  LIGUE1_STANDINGS,
  SAUDI_STANDINGS,
  MLS_STANDINGS
} from '../data/mockFixtures';
import { StandingTeam } from '../types/football';

interface MiniStandingsProps {
  onSelectTeam?: (teamName: string) => void;
}

export const MiniStandings: React.FC<MiniStandingsProps> = ({ onSelectTeam }) => {
  const [selectedLeague, setSelectedLeague] = useState<
    'epl' | 'vleague' | 'laliga' | 'seriea' | 'bundesliga' | 'c2' | 'ligue1' | 'saudi' | 'mls'
  >('epl');

  const standings: StandingTeam[] = 
    selectedLeague === 'epl' ? PREMIER_LEAGUE_STANDINGS :
    selectedLeague === 'vleague' ? VLEAGUE_STANDINGS :
    selectedLeague === 'laliga' ? LALIGA_STANDINGS :
    selectedLeague === 'seriea' ? SERIEA_STANDINGS :
    selectedLeague === 'bundesliga' ? BUNDESLIGA_STANDINGS :
    selectedLeague === 'ligue1' ? LIGUE1_STANDINGS :
    selectedLeague === 'saudi' ? SAUDI_STANDINGS :
    selectedLeague === 'mls' ? MLS_STANDINGS :
    EUROPA_LEAGUE_STANDINGS;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="bg-[#fcfcfd] p-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 uppercase tracking-tight">
            Bảng xếp hạng
          </h3>
        </div>

        {/* League Selector Switch */}
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-[11px] font-semibold flex-wrap">
          <button
            onClick={() => setSelectedLeague('epl')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'epl' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            NHA
          </button>
          <button
            onClick={() => setSelectedLeague('vleague')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'vleague' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            V-League
          </button>
          <button
            onClick={() => setSelectedLeague('laliga')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'laliga' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            La Liga
          </button>
          <button
            onClick={() => setSelectedLeague('seriea')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'seriea' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Serie A
          </button>
          <button
            onClick={() => setSelectedLeague('bundesliga')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'bundesliga' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bundesliga
          </button>
          <button
            onClick={() => setSelectedLeague('c2')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'c2' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cúp C2
          </button>
          <button
            onClick={() => setSelectedLeague('ligue1')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'ligue1' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ligue 1
          </button>
          <button
            onClick={() => setSelectedLeague('saudi')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'saudi' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Saudi
          </button>
          <button
            onClick={() => setSelectedLeague('mls')}
            className={`px-2 py-0.5 rounded-md transition ${
              selectedLeague === 'mls' ? 'bg-[#9f224e] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            MLS
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 font-semibold">
              <th className="py-2.5 pl-3 pr-1 w-8 text-center">#</th>
              <th className="py-2.5 px-2">Đội bóng</th>
              <th className="py-2.5 px-1.5 text-center">Trận</th>
              <th className="py-2.5 px-1.5 text-center">HS</th>
              <th className="py-2.5 px-2 text-center font-bold text-gray-800">Điểm</th>
              <th className="py-2.5 pr-3 pl-1 text-center hidden sm:table-cell">Phong độ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {standings.map((team) => {
              const isEpl = selectedLeague === 'epl';
              const isC1 = isEpl ? team.rank <= 5 : team.rank <= 4;
              const isC2 = isEpl ? team.rank === 6 : (team.rank <= 6 && team.rank > 4);
              const isRelegation = isEpl ? (team.rank >= 18 && team.rank <= 20) : false;

              return (
                <tr 
                  key={team.rank}
                  onClick={() => onSelectTeam && onSelectTeam(team.team.name)}
                  className={`hover:bg-amber-50/40 cursor-pointer transition ${
                    isC1 ? 'bg-blue-50/20' : isRelegation ? 'bg-red-50/20' : ''
                  }`}
                >
                  <td className="py-2 pl-3 pr-1 text-center font-bold">
                    <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] ${
                      isC1 
                        ? 'bg-blue-600 text-white font-extrabold' 
                        : isC2 
                        ? 'bg-amber-600 text-white font-bold'
                        : isRelegation
                        ? 'bg-red-500 text-white font-bold'
                        : 'text-gray-600'
                    }`}>
                      {team.rank}
                    </span>
                  </td>
                  <td className="py-2 px-2 flex items-center gap-2 font-medium text-gray-900">
                    <img src={team.team.logo} alt={team.team.name} className="w-5 h-5 object-contain" />
                    <span className="truncate max-w-[130px] sm:max-w-[170px] hover:text-[#9f224e]">
                      {team.team.name}
                    </span>
                  </td>
                  <td className="py-2 px-1.5 text-center text-gray-600">{team.played}</td>
                  <td className="py-2 px-1.5 text-center font-mono text-[11px] text-gray-600">
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </td>
                  <td className="py-2 px-2 text-center font-extrabold text-[#9f224e] text-sm">
                    {team.points}
                  </td>
                  <td className="py-2 pr-3 pl-1 text-center hidden sm:table-cell">
                    <div className="flex items-center justify-center gap-0.5">
                      {team.form.map((f, i) => (
                        <span
                          key={i}
                          className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold text-white ${
                            f === 'W' ? 'bg-emerald-600' : f === 'D' ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 flex-wrap gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          {selectedLeague === 'epl' ? (
            <>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> 1-5: Cúp C1
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span> 6: Cúp C2
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> 18-20: Xuống hạng
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> Top 4 dự Champions League
            </span>
          )}
        </div>
        <span className="text-[#9f224e] font-semibold hover:underline flex items-center gap-0.5">
          Xem BXH đầy đủ <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
