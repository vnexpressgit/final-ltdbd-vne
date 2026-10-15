import React from 'react';
import { X, Trophy, Shield, ExternalLink } from 'lucide-react';
import { HOT_LEAGUES_DATA } from './HotLeaguesSidebar';

interface LeagueStandingsModalProps {
  leagueId: number | null;
  onClose: () => void;
  onSelectTeam?: (teamName: string) => void;
}

export const LeagueStandingsModal: React.FC<LeagueStandingsModalProps> = ({
  leagueId,
  onClose,
  onSelectTeam
}) => {
  if (!leagueId) return null;

  const leagueData = HOT_LEAGUES_DATA.find((l) => l.id === leagueId) || HOT_LEAGUES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#f8f9fa] px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={leagueData.logo} 
              alt={leagueData.name} 
              className="w-7 h-7 object-contain" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-gray-900">
                  Bảng xếp hạng {leagueData.vietnameseName}
                </h3>
                <span className="text-[11px] text-[#9f224e] bg-rose-50 px-2 py-0.5 rounded-full font-mono font-bold border border-rose-200">
                  Mùa {leagueData.season}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {leagueData.country} • Cập nhật tự động sau mỗi vòng đấu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Table */}
        <div className="p-4 overflow-y-auto flex-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-600 border-b border-gray-200 font-semibold text-[11px] bg-gray-50">
                <th className="py-2.5 pl-3 w-8 text-center">#</th>
                <th className="py-2.5 px-2">Đội bóng</th>
                <th className="py-2.5 px-2 text-center">Trận</th>
                <th className="py-2.5 px-2 text-center hidden sm:table-cell">Thắng</th>
                <th className="py-2.5 px-2 text-center hidden sm:table-cell">Hòa</th>
                <th className="py-2.5 px-2 text-center hidden sm:table-cell">Bại</th>
                <th className="py-2.5 px-2 text-center hidden sm:table-cell">BT-BB</th>
                <th className="py-2.5 px-2 text-center">HS</th>
                <th className="py-2.5 pr-3 text-right font-bold text-[#9f224e]">Điểm</th>
                <th className="py-2.5 px-2 text-center hidden md:table-cell">Phong độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leagueData.teams.map((item) => {
                const isEpl = leagueData.id === 39;
                const isTop1 = item.rank === 1;
                const isC1 = isEpl ? item.rank <= 5 : item.rank <= 4;
                const isC2 = isEpl ? item.rank === 6 : false;
                const isRelegation = isEpl 
                  ? (item.rank >= 18 && item.rank <= 20) 
                  : (leagueData.teams.length >= 14 && item.rank > leagueData.teams.length - 3);

                return (
                  <tr
                    key={item.team.name}
                    onClick={() => {
                      if (onSelectTeam) onSelectTeam(item.team.name);
                      onClose();
                    }}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="py-2.5 pl-3 text-center">
                      <span
                        className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                          isTop1
                            ? 'bg-amber-400 text-amber-950 font-black'
                            : isC1
                            ? 'bg-blue-600 text-white'
                            : isC2
                            ? 'bg-amber-600 text-white'
                            : isRelegation
                            ? 'bg-red-500 text-white'
                            : 'text-gray-500'
                        }`}
                        title={
                          isEpl
                            ? (item.rank <= 5 ? 'Dự Champions League' : item.rank === 6 ? 'Dự Europa League' : item.rank >= 18 ? 'Xuống hạng' : '')
                            : ''
                        }
                      >
                        {item.rank}
                      </span>
                    </td>

                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.team.logo}
                          alt={item.team.name}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                        />
                        <span className="font-semibold text-gray-900 hover:text-[#9f224e]">
                          {item.team.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-2 text-center text-gray-700 font-mono">
                      {item.played}
                    </td>

                    <td className="py-2.5 px-2 text-center text-gray-500 font-mono hidden sm:table-cell">
                      {item.win}
                    </td>

                    <td className="py-2.5 px-2 text-center text-gray-500 font-mono hidden sm:table-cell">
                      {item.draw}
                    </td>

                    <td className="py-2.5 px-2 text-center text-gray-500 font-mono hidden sm:table-cell">
                      {item.lose}
                    </td>

                    <td className="py-2.5 px-2 text-center text-gray-500 font-mono text-[11px] hidden sm:table-cell">
                      {item.goalsFor}-{item.goalsAgainst}
                    </td>

                    <td className="py-2.5 px-2 text-center font-mono font-medium text-gray-700">
                      {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                    </td>

                    <td className="py-2.5 pr-3 text-right font-black text-[#9f224e] font-mono text-sm">
                      {item.points}
                    </td>

                    <td className="py-2.5 px-2 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {item.form.map((f, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white ${
                              f === 'W'
                                ? 'bg-emerald-600'
                                : f === 'D'
                                ? 'bg-amber-500'
                                : 'bg-red-600'
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

        {/* Footer legend */}
        <div className="bg-[#f8f9fa] px-5 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between text-[11px] text-gray-600 gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            {leagueData.id === 39 ? (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Thứ 1-5: Dự Champions League
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Thứ 6: Dự Europa League
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Thứ 18-20: Xuống hạng
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Vô địch
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Vé dự cúp Châu Âu / Châu lục
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#9f224e] hover:bg-[#831b40] text-white font-semibold rounded-lg transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
