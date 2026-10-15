import React, { useState } from 'react';
import { 
  X, 
  Tv, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Flame, 
  BarChart2, 
  Shield, 
  Video, 
  TrendingUp, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { FixtureItem } from '../types/football';
import { formatKickoffVN, formatRoundVN } from '../utils/footballUtils';

interface MatchDetailModalProps {
  fixture: FixtureItem | null;
  onClose: () => void;
  onOpenHighlight: (fixture: FixtureItem) => void;
  onToggleReminder: (fixture: FixtureItem) => void;
  isReminded: boolean;
  onNavigateToFullMatch?: (fixture: FixtureItem) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  fixture,
  onClose,
  onOpenHighlight,
  onToggleReminder,
  isReminded,
  onNavigateToFullMatch
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'stats' | 'lineups' | 'odds'>('events');

  if (!fixture) return null;

  const { time, dateVN, fullDateVN, isLateNight } = formatKickoffVN(fixture.fixture.date);
  const isFinished = ['FT', 'AET'].includes(fixture.fixture.status.short) || fixture.fixture.status.long === 'Match Finished' || fixture.fixture.status.long === 'Finished';
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);
  const homeGoals = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayGoals = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#9f224e] text-white p-4 sm:p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-1 mb-3">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-bold">
              {fixture.league.vietnameseName} • {formatRoundVN(fixture.league.round, undefined, fixture.league.id)}
            </span>
            <div className="text-xs text-white/80 flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{time}, {fullDateVN} (Giờ VN - UTC+7)</span>
            </div>
          </div>

          {/* Teams and Score / Kickoff */}
          <div className="grid grid-cols-7 items-center">
            {/* Home */}
            <div className="col-span-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white rounded-full shadow-md mb-2 flex items-center justify-center">
                <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <span className="font-bold text-sm sm:text-base line-clamp-1">{fixture.teams.home.name}</span>
            </div>

            {/* Middle */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              {isFinished ? (
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  {homeGoals} - {awayGoals}
                </div>
              ) : isLive ? (
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-black text-white animate-pulse">
                    {homeGoals} - {awayGoals}
                  </div>
                  <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full mt-1 font-bold">
                    {fixture.fixture.status.elapsed}'
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-black text-amber-300">{time}</span>
                  <span className="text-[10px] text-white/80 uppercase font-semibold">Chưa đá</span>
                </div>
              )}
            </div>

            {/* Away */}
            <div className="col-span-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white rounded-full shadow-md mb-2 flex items-center justify-center">
                <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <span className="font-bold text-sm sm:text-base line-clamp-1">{fixture.teams.away.name}</span>
            </div>
          </div>

          {/* Quick Action bar inside header */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="font-medium">{fixture.fixture.venue?.name || 'Sân trung lập'}</span>
            </div>

            <div className="flex items-center gap-2">
              {!isFinished && !isLive && (
                <button
                  onClick={() => onToggleReminder(fixture)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                    isReminded ? 'bg-amber-400 text-gray-950 font-bold' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isReminded ? 'Đã đặt nhắc' : 'Nhắc tôi'}</span>
                </button>
              )}

              {fixture.highlight_video_url && isFinished && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenHighlight(fixture);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video bàn thắng</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'events' ? 'border-[#9f224e] text-[#9f224e] bg-white' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Diễn biến & Bàn thắng
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'stats' ? 'border-[#9f224e] text-[#9f224e] bg-white' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Thống kê trận đấu
          </button>
          <button
            onClick={() => setActiveTab('odds')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'odds' ? 'border-[#9f224e] text-[#9f224e] bg-white' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Nhận định & Tỷ lệ
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[50vh]">
          {activeTab === 'events' && (
            <div className="space-y-4">
              {fixture.events && fixture.events.length > 0 ? (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                    Dòng thời gian sự kiện (Timeline)
                  </h4>
                  <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    {fixture.events.map((event, idx) => (
                      <div key={idx} className="relative flex items-center justify-between text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200/80">
                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#9f224e] text-white text-[9px] flex items-center justify-center font-bold">
                          •
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-gray-700 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                            {event.time.elapsed}'
                          </span>
                          <span className="text-sm">
                            {event.type === 'Goal' ? '⚽' : event.detail === 'Red Card' ? '🟥' : '🟨'}
                          </span>
                          <span className="font-bold text-gray-900">{event.player.name}</span>
                          <span className="text-gray-500 text-[11px]">({event.team.name})</span>
                          {event.detail === 'Penalty' && (
                            <span className="text-amber-600 font-semibold">(Phạt đền Pen)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  {isFinished ? 'Không có sự kiện ghi bàn nào.' : 'Trận đấu chưa diễn ra. Sự kiện và bàn thắng sẽ được cập nhật trực tiếp theo thời gian thực khi bóng lăn.'}
                </div>
              )}

              {/* Match Venue & Referee info */}
              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 grid grid-cols-2 gap-2 border border-gray-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Sân: <strong>{fixture.fixture.venue.name}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>Trọng tài: <strong>{fixture.fixture.referee || 'Michael Oliver (Anh)'}</strong></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              {fixture.statistics ? (
                <div className="space-y-3">
                  {/* Possession */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{fixture.statistics.possessionHome}%</span>
                      <span className="text-gray-500 font-normal">Kiểm soát bóng</span>
                      <span>{fixture.statistics.possessionAway}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 flex overflow-hidden">
                      <div className="bg-[#9f224e]" style={{ width: `${fixture.statistics.possessionHome}%` }}></div>
                      <div className="bg-blue-600" style={{ width: `${fixture.statistics.possessionAway}%` }}></div>
                    </div>
                  </div>

                  {/* Shots */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{fixture.statistics.shotsHome}</span>
                      <span className="text-gray-500 font-normal">Tổng số cú sút</span>
                      <span>{fixture.statistics.shotsAway}</span>
                    </div>
                  </div>

                  {/* Shots on target */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{fixture.statistics.shotsOnTargetHome}</span>
                      <span className="text-gray-500 font-normal">Sút trúng đích</span>
                      <span>{fixture.statistics.shotsOnTargetAway}</span>
                    </div>
                  </div>

                  {/* xG Expected Goals */}
                  {fixture.statistics.xGHome && (
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>{fixture.statistics.xGHome}</span>
                        <span className="text-gray-500 font-normal">Bàn thắng kỳ vọng (xG)</span>
                        <span>{fixture.statistics.xGAway}</span>
                      </div>
                    </div>
                  )}

                  {/* Corners */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{fixture.statistics.cornersHome}</span>
                      <span className="text-gray-500 font-normal">Phạt góc</span>
                      <span>{fixture.statistics.cornersAway}</span>
                    </div>
                  </div>

                  {/* Fouls */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{fixture.statistics.foulsHome}</span>
                      <span className="text-gray-500 font-normal">Phạm lỗi</span>
                      <span>{fixture.statistics.foulsAway}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Dữ liệu thống kê kiểm soát bóng và dứt điểm sẽ hiển thị ngay khi trận đấu bắt đầu.
                </div>
              )}
            </div>
          )}

          {activeTab === 'odds' && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-sm mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Chuyên gia nhận định trận đấu (VnExpress)</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {fixture.previewText || `${fixture.teams.home.name} và ${fixture.teams.away.name} đều có lực lượng mạnh nhất. Trận đấu được dự đoán sẽ diễn ra chặt chẽ với những tình huống đột biến từ các ngôi sao.`}
                </p>
              </div>

              {fixture.odds && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block mb-2">
                    Tỷ lệ cược tham khảo (1x2 Châu Âu)
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">{fixture.teams.home.shortName || fixture.teams.home.name} thắng</span>
                      <span className="text-sm font-bold text-gray-900">{fixture.odds.homeWin}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">Hòa</span>
                      <span className="text-sm font-bold text-gray-900">{fixture.odds.draw}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">{fixture.teams.away.shortName || fixture.teams.away.name} thắng</span>
                      <span className="text-sm font-bold text-gray-900">{fixture.odds.awayWin}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2 text-center italic">
                    {fixture.odds.prediction}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with full Match Center button */}
        {onNavigateToFullMatch && (
          <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-medium">
              VnExpress Thể thao · Sa bàn & Thống kê
            </span>
            <button
              onClick={() => {
                onClose();
                onNavigateToFullMatch(fixture);
              }}
              className="px-3.5 py-1.5 bg-[#9f224e] hover:bg-[#831b40] text-white text-xs font-bold rounded-lg transition shadow-2xs flex items-center gap-1.5"
            >
              <span>Xem trang chi tiết chuyên sâu</span>
              <span>➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
