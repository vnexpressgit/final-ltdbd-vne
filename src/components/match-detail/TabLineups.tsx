import React, { useState } from 'react';
import { 
  Users, 
  User, 
  MapPin, 
  ArrowRightLeft, 
  X,
  Sparkles
} from 'lucide-react';
import { MatchFullDetails, MatchLineupPlayer } from '../../types/football';

interface TabLineupsProps {
  details: MatchFullDetails;
}

// Convert position to Vietnamese as shown in user screenshot
function formatLineupPositionVN(pos: string): string {
  const p = (pos || '').toLowerCase();
  if (p === 'g' || p.includes('goal') || p.includes('thủ môn') || p.includes('gk')) return 'Thủ môn';
  if (p === 'd' || p.includes('def') || p.includes('hậu vệ') || p.includes('cb') || p.includes('lb') || p.includes('rb')) return 'Hậu vệ';
  if (p === 'm' || p.includes('mid') || p.includes('tiền vệ') || p.includes('dm') || p.includes('cm') || p.includes('am')) return 'Tiền vệ';
  if (p === 'f' || p === 'a' || p.includes('att') || p.includes('forw') || p.includes('tiền đạo') || p.includes('st') || p.includes('cf') || p.includes('lw') || p.includes('rw')) return 'Tiền đạo';
  return 'Tiền vệ';
}

export const TabLineups: React.FC<TabLineupsProps> = ({ details }) => {
  const { lineups, fixture } = details;
  const { home, away } = lineups;

  // Selected player for mobile or interactive stats popup
  const [activePlayer, setActivePlayer] = useState<MatchLineupPlayer | null>(null);

  // Mobile view selector: 'all' | 'pitch' | 'home' | 'away'
  const [mobileTab, setMobileTab] = useState<'all' | 'pitch' | 'home' | 'away'>('all');

  // Starting 11 players
  const homeStartXI = home.startXI || [];
  const awayStartXI = away.startXI || [];

  // Substitutes
  const homeSubs = home.substitutes || [];
  const awaySubs = away.substitutes || [];

  // Render a player on the 2D tactical pitch
  const renderPitchPlayer = (player: MatchLineupPlayer, isHome: boolean) => {
    const isSelected = activePlayer?.id === player.id;
    const hasGoal = (player.stats?.goals || 0) > 0 || player.events?.some(e => e.type === 'goal');
    const hasYellow = player.events?.some(e => e.type === 'card_yellow');
    const hasRed = player.events?.some(e => e.type === 'card_red');

    // Normalize coordinates so Home is in top half (8% - 44%) and Away is in bottom half (56% - 88%)
    let posX = player.gridX ?? 50;
    let posY = player.gridY ?? (isHome ? 25 : 75);

    if (isHome) {
      if (posY > 50) posY = 100 - posY;
      posY = Math.min(44, Math.max(7, posY));
    } else {
      if (posY < 50) posY = 100 - posY;
      posY = Math.min(88, Math.max(56, posY));
    }

    return (
      <div
        key={player.id}
        style={{
          left: `${posX}%`,
          top: `${posY}%`
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActivePlayer(activePlayer?.id === player.id ? null : player);
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group select-none transition-transform hover:scale-110 active:scale-95"
      >
        {/* Circle with shirt number */}
        <div className="relative">
          <div 
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b3a4b] border-[1.5px] text-white font-mono font-bold text-[10px] sm:text-[11px] flex items-center justify-center shadow-xs transition ${
              isSelected ? 'border-amber-300 ring-2 ring-amber-300/80 scale-110' : 'border-white'
            }`}
          >
            <span>{player.number}</span>
          </div>

          {/* Event indicators */}
          {(hasGoal || hasYellow || hasRed) && (
            <div className="absolute -top-1 -right-1 flex items-center text-[9px]">
              {hasGoal && <span>⚽</span>}
              {hasYellow && <span>🟨</span>}
              {hasRed && <span>🟥</span>}
            </div>
          )}
        </div>

        {/* Name tag pill below circle */}
        <div className="mt-0.5 bg-white text-gray-900 border border-gray-200/70 rounded px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-semibold whitespace-nowrap shadow-2xs max-w-[76px] sm:max-w-[92px] truncate text-center leading-tight">
          {player.shortName || player.name}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Mobile Segmented Switcher (Visible on screens < 1024px) */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-gray-100 rounded-xl gap-1 text-xs font-semibold">
        <button
          onClick={() => setMobileTab('all')}
          className={`flex-1 py-1.5 rounded-lg transition ${
            mobileTab === 'all' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setMobileTab('pitch')}
          className={`flex-1 py-1.5 rounded-lg transition ${
            mobileTab === 'pitch' ? 'bg-[#008f65] text-white shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sơ đồ sân
        </button>
        <button
          onClick={() => setMobileTab('home')}
          className={`flex-1 py-1.5 rounded-lg transition truncate px-1 ${
            mobileTab === 'home' ? 'bg-[#2b2f38] text-white shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {home.team.shortName || home.team.name}
        </button>
        <button
          onClick={() => setMobileTab('away')}
          className={`flex-1 py-1.5 rounded-lg transition truncate px-1 ${
            mobileTab === 'away' ? 'bg-[#2b2f38] text-white shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {away.team.shortName || away.team.name}
        </button>
      </div>

      {/* Main 3-Column Tactical Board Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4.5 items-start">
        
        {/* ========================================================= */}
        {/* COLUMN 1: HOME TEAM (Left Column) */}
        {/* ========================================================= */}
        <div className={`lg:col-span-4 flex flex-col gap-3.5 ${
          mobileTab !== 'all' && mobileTab !== 'home' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Top Team Header Bar */}
          <div className="bg-[#2b2f38] text-white rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xs border border-gray-700/40">
            <img 
              src={home.team.logo} 
              alt={home.team.name} 
              className="w-6 h-6 object-contain flex-shrink-0" 
            />
            <span className="font-bold text-sm text-white tracking-wide truncate">
              {home.team.name}
            </span>
          </div>

          {/* Đội hình ra sân Card */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/50 flex items-center justify-between">
              <span>Đội hình ra sân</span>
              <span className="text-xs text-gray-400 font-normal">11 cầu thủ</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              {homeStartXI.map((player) => (
                <div 
                  key={player.id}
                  onClick={() => setActivePlayer(activePlayer?.id === player.id ? null : player)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50/80 transition cursor-pointer ${
                    activePlayer?.id === player.id ? 'bg-amber-50/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="w-6 font-mono text-gray-500 font-normal flex-shrink-0 text-left">
                      {player.number}
                    </span>
                    <span className="font-medium text-gray-900 truncate">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm font-normal text-right flex-shrink-0">
                    {formatLineupPositionVN(player.position)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cầu thủ dự bị Card */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/50 flex items-center justify-between">
              <span>Cầu thủ dự bị</span>
              <span className="text-xs text-gray-400 font-normal">{homeSubs.length} cầu thủ</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              {homeSubs.map((sub, idx) => (
                <div 
                  key={sub.player?.id || idx}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50/80 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="w-6 font-mono text-gray-500 font-normal flex-shrink-0 text-left">
                      {sub.player?.number || idx + 12}
                    </span>
                    <span className="font-medium text-gray-900 truncate">
                      {sub.player?.name}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm font-normal text-right flex-shrink-0">
                    {formatLineupPositionVN(sub.player?.position || 'Midfielder')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: CENTER PITCH (Sa bàn chiến thuật sân bóng) */}
        {/* ========================================================= */}
        <div className={`lg:col-span-4 flex flex-col ${
          mobileTab !== 'all' && mobileTab !== 'pitch' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="rounded-xl overflow-hidden border border-emerald-900/30 shadow-md">
            
            {/* Top Team Header over pitch */}
            <div className="bg-[#008f65] px-3.5 sm:px-4 py-2.5 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2 truncate">
                <img 
                  src={home.team.logo} 
                  alt={home.team.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" 
                />
                <span className="font-bold text-xs sm:text-sm tracking-wide text-white truncate">
                  {home.team.name}
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm text-white/95 tracking-wide flex-shrink-0">
                {home.formation || '4-2-3-1'}
              </span>
            </div>

            {/* Tactical Pitch Canvas */}
            <div 
              onClick={() => setActivePlayer(null)}
              className="relative w-full aspect-[1/1.54] bg-[#00a876] overflow-hidden select-none"
            >
              {/* Outer boundary pitch marking line */}
              <div className="absolute inset-2 sm:inset-3 border-[1.5px] border-white/75 pointer-events-none">
                
                {/* Halfway Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/75 -translate-y-1/2" />
                
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[1.5px] border-white/75" />
                
                {/* Center Spot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />

                {/* Top Penalty Box (Home Team half) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-13 sm:h-16 border-b-[1.5px] border-x-[1.5px] border-white/75">
                  {/* Top Penalty arc */}
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-12 h-3.5 border-b-[1.5px] border-white/75 rounded-b-full pointer-events-none" />
                </div>
                {/* Top Goal Area */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 border-b-[1.5px] border-x-[1.5px] border-white/75" />

                {/* Bottom Penalty Box (Away Team half) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-13 sm:h-16 border-t-[1.5px] border-x-[1.5px] border-white/75">
                  {/* Bottom Penalty arc */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-12 h-3.5 border-t-[1.5px] border-white/75 rounded-t-full pointer-events-none" />
                </div>
                {/* Bottom Goal Area */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 border-t-[1.5px] border-x-[1.5px] border-white/75" />
              </div>

              {/* HOME TEAM PLAYERS (Top Half of pitch) */}
              <div className="absolute inset-0">
                {homeStartXI.map((p) => renderPitchPlayer(p, true))}
              </div>

              {/* AWAY TEAM PLAYERS (Bottom Half of pitch) */}
              <div className="absolute inset-0">
                {awayStartXI.map((p) => renderPitchPlayer(p, false))}
              </div>

              {/* Floating Player Info Modal/Tooltip if clicked */}
              {activePlayer && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 left-3 right-3 bg-gray-950/95 text-white p-3 rounded-xl shadow-2xl border border-gray-700 z-30 animate-in fade-in"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm">{activePlayer.name}</span>
                      <span className="text-xs text-amber-400 font-mono">#{activePlayer.number}</span>
                    </div>
                    <button 
                      onClick={() => setActivePlayer(null)}
                      className="text-gray-400 hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                    <div>
                      <span className="text-gray-400">Vị trí:</span>{' '}
                      <span className="font-medium text-white">{formatLineupPositionVN(activePlayer.position)}</span>
                    </div>
                    {activePlayer.rating && (
                      <div>
                        <span className="text-gray-400">Đánh giá:</span>{' '}
                        <span className="font-bold text-emerald-400">{activePlayer.rating.toFixed(1)}★</span>
                      </div>
                    )}
                    {activePlayer.stats?.goals !== undefined && (
                      <div>
                        <span className="text-gray-400">Bàn thắng:</span>{' '}
                        <span className="font-bold text-white">{activePlayer.stats.goals}</span>
                      </div>
                    )}
                    {activePlayer.stats?.passAccuracy !== undefined && (
                      <div>
                        <span className="text-gray-400">Độ chuẩn chuyền:</span>{' '}
                        <span className="font-medium text-white">{activePlayer.stats.passAccuracy}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Team Header under pitch */}
            <div className="bg-[#008f65] px-3.5 sm:px-4 py-2.5 flex items-center justify-between text-white border-t border-white/10">
              <div className="flex items-center gap-2 truncate">
                <img 
                  src={away.team.logo} 
                  alt={away.team.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" 
                />
                <span className="font-bold text-xs sm:text-sm tracking-wide text-white truncate">
                  {away.team.name}
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm text-white/95 tracking-wide flex-shrink-0">
                {away.formation || '4-3-3'}
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: AWAY TEAM (Right Column - Mirrored layout) */}
        {/* ========================================================= */}
        <div className={`lg:col-span-4 flex flex-col gap-3.5 ${
          mobileTab !== 'all' && mobileTab !== 'away' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Top Team Header Bar (aligned right as in screenshot) */}
          <div className="bg-[#2b2f38] text-white rounded-xl px-3.5 py-2.5 flex items-center justify-end gap-2.5 shadow-2xs border border-gray-700/40">
            <span className="font-bold text-sm text-white tracking-wide truncate">
              {away.team.name}
            </span>
            <img 
              src={away.team.logo} 
              alt={away.team.name} 
              className="w-6 h-6 object-contain flex-shrink-0" 
            />
          </div>

          {/* Đội hình ra sân Card (Mirrored: Position on left, Player & Number on right) */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/50 flex items-center justify-between">
              <span>Đội hình ra sân</span>
              <span className="text-xs text-gray-400 font-normal">11 cầu thủ</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              {awayStartXI.map((player) => (
                <div 
                  key={player.id}
                  onClick={() => setActivePlayer(activePlayer?.id === player.id ? null : player)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50/80 transition cursor-pointer ${
                    activePlayer?.id === player.id ? 'bg-amber-50/60' : ''
                  }`}
                >
                  <span className="text-gray-500 text-xs sm:text-sm font-normal text-left flex-shrink-0">
                    {formatLineupPositionVN(player.position)}
                  </span>
                  
                  <div className="flex items-center justify-end gap-2.5 min-w-0 pl-2">
                    <span className="font-medium text-gray-900 truncate text-right">
                      {player.name}
                    </span>
                    <span className="w-6 font-mono text-gray-400 font-normal text-right flex-shrink-0">
                      {player.number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cầu thủ dự bị Card (Mirrored: Position on left, Player & Number on right) */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/50 flex items-center justify-between">
              <span>Cầu thủ dự bị</span>
              <span className="text-xs text-gray-400 font-normal">{awaySubs.length} cầu thủ</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              {awaySubs.map((sub, idx) => (
                <div 
                  key={sub.player?.id || idx}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50/80 transition"
                >
                  <span className="text-gray-500 text-xs sm:text-sm font-normal text-left flex-shrink-0">
                    {formatLineupPositionVN(sub.player?.position || 'Midfielder')}
                  </span>
                  
                  <div className="flex items-center justify-end gap-2.5 min-w-0 pl-2">
                    <span className="font-medium text-gray-900 truncate text-right">
                      {sub.player?.name}
                    </span>
                    <span className="w-6 font-mono text-gray-400 font-normal text-right flex-shrink-0">
                      {sub.player?.number || idx + 12}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Meta Footer Bar: Coaches, Referee & Stadium info */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">HLV {home.team.shortName || home.team.name}:</span>
            <span className="font-semibold text-gray-900">{home.coach?.name || 'HLV Trưởng'}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">HLV {away.team.shortName || away.team.name}:</span>
            <span className="font-semibold text-gray-900">{away.coach?.name || 'HLV Trưởng'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-gray-500">
          {fixture.fixture?.referee && (
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span>Trọng tài: <strong>{fixture.fixture.referee}</strong></span>
            </div>
          )}
          {fixture.fixture?.venue?.name && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Sân: <strong>{fixture.fixture.venue.name}</strong></span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
