import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Video, 
  Clock, 
  ChevronRight, 
  MessageSquare, 
  Flame, 
  ArrowRight,
  TrendingUp,
  BarChart2,
  Tv,
  Star,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { LeagueDetails, FixtureItem, ArticleItem, StandingTeam } from '../types/football';
import { getNewsByLeague } from '../data/mockLeagueNews';
import { getLeagueTopScorers } from '../data/leagueTopScorers';
import { formatKickoffVN, getFootballDayString, formatRoundVN } from '../utils/footballUtils';
import { FullLeagueStandings } from './FullLeagueStandings';

export type LeagueSubTab = 'overview' | 'lich-thi-dau' | 'ket-qua' | 'standings' | 'stats';

interface LeagueDetailViewProps {
  league: LeagueDetails;
  fixtures: FixtureItem[];
  currentSubTab?: LeagueSubTab;
  onSubTabChange?: (tab: LeagueSubTab) => void;
  onBackToHome: () => void;
  onOpenMatchDetails: (fixture: FixtureItem) => void;
  onOpenHighlight: (fixture: FixtureItem) => void;
  onSelectTeam?: (teamName: string) => void;
}

export const LeagueDetailView: React.FC<LeagueDetailViewProps> = ({
  league,
  fixtures,
  currentSubTab = 'overview',
  onSubTabChange,
  onBackToHome,
  onOpenMatchDetails,
  onOpenHighlight,
  onSelectTeam
}) => {
  const [internalTab, setInternalTab] = useState<LeagueSubTab>(currentSubTab);
  const activeTab = onSubTabChange ? currentSubTab : internalTab;

  const handleTabClick = (tab: LeagueSubTab) => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // Get news for this league
  const newsList = getNewsByLeague(league.id, league.vietnameseName);
  const leadArticle = newsList[0];
  const opinionArticles = newsList.slice(1, 4);
  const newsStream = newsList.slice(4, 10);

  // Top scorers data
  const topScorers = getLeagueTopScorers(league.id);

  // All league fixtures
  const leagueFixtures = useMemo(() => {
    return fixtures.filter(f => f.league.id === league.id);
  }, [fixtures, league.id]);

  // Current Football Day ("today" string in GMT+7)
  const todayDayStr = useMemo(() => {
    return getFootballDayString(new Date().toISOString());
  }, []);

  // Filter Schedule: matches on or after today (Today into future), sorted ascending by date
  const scheduleFixtures = useMemo(() => {
    return leagueFixtures
      .filter(f => {
        const matchDay = getFootballDayString(f.fixture.date);
        return matchDay >= todayDayStr;
      })
      .sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime());
  }, [leagueFixtures, todayDayStr]);

  // Filter Results: matches on or before today (Today into past), sorted descending by date
  const resultsFixtures = useMemo(() => {
    return leagueFixtures
      .filter(f => {
        const matchDay = getFootballDayString(f.fixture.date);
        return matchDay <= todayDayStr;
      })
      .sort((a, b) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime());
  }, [leagueFixtures, todayDayStr]);

  // Summary ticker matches for this tournament
  const tickerFixtures = useMemo(() => {
    if (!leagueFixtures || leagueFixtures.length === 0) return [];
    const sorted = [...leagueFixtures].sort(
      (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    );
    const todayIndex = sorted.findIndex(f => getFootballDayString(f.fixture.date) >= todayDayStr);
    if (todayIndex === -1) {
      return sorted.slice(-14);
    }
    const start = Math.max(0, todayIndex - 5);
    const end = Math.min(sorted.length, todayIndex + 10);
    const slice = sorted.slice(start, end);
    if (slice.length < 8) {
      return sorted.slice(0, 14);
    }
    return slice;
  }, [leagueFixtures, todayDayStr]);

  const tickerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTickerScroll = () => {
    if (tickerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tickerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkTickerScroll();
  }, [tickerFixtures]);

  const handleTickerScroll = (direction: 'left' | 'right') => {
    if (tickerRef.current) {
      const amount = direction === 'left' ? -360 : 360;
      tickerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkTickerScroll, 350);
    }
  };

  const formatTickerDate = (dateIso: string) => {
    const day = getFootballDayString(dateIso);
    if (day === todayDayStr) return 'Hôm nay';
    try {
      const d = new Date(dateIso);
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      return `${dayNum}/${monthNum}`;
    } catch {
      return day;
    }
  };

  const renderTickerStatus = (fixture: FixtureItem) => {
    const { short, elapsed, long } = fixture.fixture.status;
    if (['FT', 'AET', 'PEN'].includes(short) || long.includes('Finished')) {
      return <span className="font-semibold text-[#757575]">KT</span>;
    }
    if (['1H', '2H', 'HT', 'ET', 'LIVE'].includes(short)) {
      return (
        <span className="text-[#DF4670] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DF4670] animate-vne-live"></span>
          <span>{elapsed ? `${elapsed}'` : 'LIVE'}</span>
        </span>
      );
    }
    const { time } = formatKickoffVN(fixture.fixture.date);
    return <span className="font-mono text-[#757575]">{time}</span>;
  };

  // Standings data
  const standings: StandingTeam[] = league.standings || [];
  const miniStandings = standings.slice(0, 6);

  return (
    <div className="w-full space-y-4">
      {/* 1. HERO HEADER: Logo, League Name, Tabs */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs overflow-hidden font-bai">
        {/* Hero Title & Identity */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg p-1.5 bg-[#fbfcfd] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <img 
                src={league.logo} 
                alt={league.name} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#222222] tracking-tight">
                {league.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs (VnExpress Sub-nav style) */}
        <div className="border-t border-[#e5e5e5] px-3.5 flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap bg-white font-bai">
          <button
            onClick={() => handleTabClick('overview')}
            className={`py-2.5 text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#9f224e] text-[#9f224e] font-bold'
                : 'border-transparent text-[#636B79] hover:text-[#222222]'
            }`}
          >
            <span>Tổng quan &amp; Tin tức</span>
          </button>

          <button
            onClick={() => handleTabClick('lich-thi-dau')}
            className={`py-2.5 text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'lich-thi-dau'
                ? 'border-[#9f224e] text-[#9f224e] font-bold'
                : 'border-transparent text-[#636B79] hover:text-[#222222]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Lịch thi đấu</span>
          </button>

          <button
            onClick={() => handleTabClick('ket-qua')}
            className={`py-2.5 text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'ket-qua'
                ? 'border-[#9f224e] text-[#9f224e] font-bold'
                : 'border-transparent text-[#636B79] hover:text-[#222222]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Kết quả</span>
          </button>

          <button
            onClick={() => handleTabClick('standings')}
            className={`py-2.5 text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'standings'
                ? 'border-[#9f224e] text-[#9f224e] font-bold'
                : 'border-transparent text-[#636B79] hover:text-[#222222]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Bảng xếp hạng</span>
          </button>

          <button
            onClick={() => handleTabClick('stats')}
            className={`py-2.5 text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'stats'
                ? 'border-[#9f224e] text-[#9f224e] font-bold'
                : 'border-transparent text-[#636B79] hover:text-[#222222]'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Thống kê</span>
          </button>
        </div>
      </div>

      {/* 2 & 3. MAIN CONTENT (70%) + RIGHT SIDEBAR (30%) */}
      {activeTab === 'overview' && (
        <div className="space-y-3.5 sm:space-y-4">
          {/* TÓM TẮT LỊCH THI ĐẤU (Horizontal Match Strip Ticker) */}
          {tickerFixtures.length > 0 && (
            <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs relative overflow-hidden font-bai">
              <div
                ref={tickerRef}
                onScroll={checkTickerScroll}
                className="flex items-stretch overflow-x-auto scrollbar-none"
              >
                {tickerFixtures.map((match) => (
                  <div
                    key={match.fixture.id}
                    onClick={() => onOpenMatchDetails(match)}
                    className="min-w-[155px] sm:min-w-[175px] max-w-[190px] p-2.5 sm:px-3.5 sm:py-2.5 border-r border-[#e5e5e5] flex-shrink-0 flex flex-col justify-between hover:bg-[#fbfcfd] cursor-pointer transition-colors group select-none"
                  >
                    {/* Top status & date row */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#757575] mb-2 font-bai">
                      {renderTickerStatus(match)}
                      <span className="text-[#757575] font-normal">{formatTickerDate(match.fixture.date)}</span>
                    </div>

                    {/* Home Team */}
                    <div className="flex items-center justify-between gap-1.5 py-0.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <img
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          className="w-4 h-4 object-contain flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="text-xs sm:text-[13px] text-[#222222] truncate font-medium group-hover:text-[#9f224e] transition-colors">
                          {match.teams.home.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#222222] flex-shrink-0 ml-1">
                        {['FT', 'AET', 'PEN', '1H', '2H', 'HT', 'ET', 'LIVE'].includes(match.fixture.status.short) || match.fixture.status.long.includes('Finished')
                          ? match.goals.home
                          : '-'}
                      </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-between gap-1.5 py-0.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <img
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          className="w-4 h-4 object-contain flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="text-xs sm:text-[13px] text-[#222222] truncate font-medium group-hover:text-[#9f224e] transition-colors">
                          {match.teams.away.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#222222] flex-shrink-0 ml-1">
                        {['FT', 'AET', 'PEN', '1H', '2H', 'HT', 'ET', 'LIVE'].includes(match.fixture.status.short) || match.fixture.status.long.includes('Finished')
                          ? match.goals.away
                          : '-'}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Nút Xem chi tiết ở cuối dãy lịch thi đấu */}
                <div
                  onClick={() => handleTabClick('lich-thi-dau')}
                  className="min-w-[110px] sm:min-w-[125px] flex-shrink-0 p-3 bg-[#fafafa] hover:bg-rose-50/70 border-l border-[#e5e5e5] flex flex-col items-center justify-center text-center cursor-pointer transition-colors group select-none"
                  title="Xem toàn bộ lịch thi đấu của giải"
                >
                  <div className="w-7 h-7 rounded-full bg-white border border-[#e5e5e5] group-hover:border-[#9f224e] group-hover:bg-[#9f224e] flex items-center justify-center transition-all mb-1 shadow-2xs">
                    <ChevronRight className="w-4 h-4 text-[#636B79] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors whitespace-nowrap">
                    Xem chi tiết
                  </span>
                </div>
              </div>

              {/* Scroll buttons */}
              {canScrollLeft && (
                <button
                  onClick={() => handleTickerScroll('left')}
                  aria-label="Cuộn sang trái"
                  className="absolute left-0 top-0 bottom-0 z-10 w-7 sm:w-8 bg-gradient-to-r from-white via-white/95 to-transparent flex items-center justify-start pl-1 text-[#666666] hover:text-[#222222] transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              )}

              {canScrollRight && (
                <button
                  onClick={() => handleTickerScroll('right')}
                  aria-label="Cuộn sang phải"
                  className="absolute right-0 top-0 bottom-0 z-10 w-7 sm:w-8 bg-gradient-to-l from-white via-white/95 to-transparent flex items-center justify-end pr-1 text-[#666666] hover:text-[#222222] transition cursor-pointer"
                >
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              )}
            </div>
          )}

          {/* 2-Column Grid: Main Content (70%) + Right Sidebar (30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
            
            {/* MAIN CONTENT COLUMN (70% ~ 8 cols on LG) */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">

            {/* BLOCK 2: PHÂN TÍCH CHUYÊN SÂU (Deep-dive Analysis) */}
            <section className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-4">
              <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#9f224e] rounded-full"></div>
                  <h2 className="font-bai text-sm sm:text-base font-bold text-[#222222] uppercase tracking-tight">
                    Phân tích chuyên sâu &amp; Nhận định
                  </h2>
                </div>
                <span className="font-bai text-xs text-[#636B79] font-medium hidden sm:inline">Góc nhìn chuyên gia</span>
              </div>

              {/* Lead Article + 2-3 Opinion Side Articles */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                {/* Lead Article (Left 7 cols) */}
                {leadArticle && (
                  <article className="md:col-span-7 group cursor-pointer space-y-2">
                    <div className="aspect-[16/10] overflow-hidden rounded-md bg-gray-100 relative">
                      <img 
                        src={leadArticle.image} 
                        alt={leadArticle.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#9f224e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-bai">
                        {leadArticle.category || 'CHIẾN THUẬT'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#757575]">
                        <Clock className="w-3 h-3 text-[#757575]" />
                        <span>{leadArticle.publishedAt}</span>
                        {leadArticle.author && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-[#38404D]">Tác giả: {leadArticle.author}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif-vne text-base sm:text-lg font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug">
                        {leadArticle.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-[#636B79] line-clamp-3 leading-relaxed">
                        {leadArticle.summary}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-xs font-bai">
                        <span className="text-[#9f224e] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Xem phân tích</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[#757575] flex items-center gap-1 text-[11px]">
                          <MessageSquare className="w-3 h-3" />
                          <span>{leadArticle.commentCount || 42}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 2-3 Opinion Articles (Right 5 cols) */}
                <div className="md:col-span-5 flex flex-col justify-between divide-y divide-[#f0f0f0]">
                  {opinionArticles.map((art, idx) => (
                    <article 
                      key={art.id}
                      className={`group cursor-pointer space-y-1 ${idx > 0 ? 'pt-3' : 'pb-3'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-[#757575] font-bai">
                        <span className="text-[#9f224e] font-bold uppercase">{art.category}</span>
                        <span>•</span>
                        <span>{art.publishedAt}</span>
                      </div>
                      <h4 className="font-serif-vne text-xs sm:text-[13px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#636B79] line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-[#757575] pt-0.5 font-bai">
                        <span className="italic">{art.author || 'VnExpress'}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-2.5 h-2.5" />
                          <span>{art.commentCount || 18}</span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* BLOCK 3: DÒNG SỰ KIỆN (News Stream) */}
            <section className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-4">
              <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#222222] rounded-full"></div>
                  <h2 className="font-bai text-sm sm:text-base font-bold text-[#222222] uppercase tracking-tight">
                    Dòng sự kiện {league.vietnameseName}
                  </h2>
                </div>
                <span className="font-bai text-xs text-[#636B79] font-medium">Cập nhật 24/7</span>
              </div>

              {/* News Stream Articles */}
              <div className="divide-y divide-[#f0f0f0]">
                {newsStream.map((article) => (
                  <article 
                    key={article.id}
                    className="py-3 first:pt-0 last:pb-0 group cursor-pointer flex gap-3 sm:gap-3.5 items-start"
                  >
                    {/* Left Thumbnail */}
                    <div className="w-28 sm:w-36 aspect-[4/3] rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Right Info: Title, Sapo, Metadata */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#757575] font-bai">
                        <span className="text-[#9f224e] font-bold">{article.category}</span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                      </div>

                      <h3 className="text-xs sm:text-[13px] font-bold text-[#222222] group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#636B79] line-clamp-2 leading-relaxed hidden sm:block">
                        {article.summary}
                      </p>

                      <div className="flex items-center gap-3 pt-0.5 text-[11px] text-[#757575] font-bai">
                        {article.author && <span>{article.author}</span>}
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-2.5 h-2.5" />
                          <span>{article.commentCount || 25} bình luận</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR COLUMN (30% ~ 4 cols on LG) */}
          <aside className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            
            {/* WIDGET 1: BẢNG XẾP HẠNG THU GỌN */}
            <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs overflow-hidden">
              {/* Header */}
              <div className="bg-[#fafafa] px-3.5 py-2.5 border-b border-[#e5e5e5] flex items-center justify-between font-bai">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <h3 className="font-bold text-xs sm:text-sm text-[#222222] uppercase tracking-tight">
                    Bảng xếp hạng
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#636B79]">Mùa {league.season}</span>
              </div>

              {/* Table Columns: #, CLB, Tr, HS, Đ */}
              <div className="p-2 sm:p-2.5">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#636B79] border-b border-[#f0f0f0] font-bai font-medium text-[10px]">
                      <th className="py-1.5 pl-1.5 w-6 text-center">#</th>
                      <th className="py-1.5 px-1.5">CLB</th>
                      <th className="py-1.5 px-1.5 text-center w-6" title="Số trận">Tr</th>
                      <th className="py-1.5 px-1.5 text-center w-7" title="Hiệu số">HS</th>
                      <th className="py-1.5 pr-1.5 text-right w-7 font-bold text-[#38404D]" title="Điểm số">Đ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {miniStandings.map((team) => {
                      const isTop1 = team.rank === 1;
                      const isTop4 = team.rank >= 2 && team.rank <= 4;

                      return (
                        <tr 
                          key={team.team.name}
                          onClick={() => onSelectTeam && onSelectTeam(team.team.name)}
                          className="hover:bg-[#f7f8f9] cursor-pointer transition-colors"
                        >
                          {/* Rank with Highlight: #1 Gold, #2-4 Blue */}
                          <td className="py-1.5 pl-1.5 text-center">
                            <span className={`w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px] font-bold ${
                              isTop1 
                                ? 'bg-amber-400 text-amber-950 shadow-2xs font-black' 
                                : isTop4 
                                ? 'bg-[#306EE5] text-white' 
                                : 'text-[#636B79] font-medium'
                            }`}>
                              {team.rank}
                            </span>
                          </td>

                          {/* Club Name & Logo */}
                          <td className="py-1.5 px-1.5">
                            <div className="flex items-center gap-1.5 truncate">
                              <img 
                                src={team.team.logo} 
                                alt={team.team.name} 
                                className="w-3.5 h-3.5 object-contain flex-shrink-0"
                                loading="lazy"
                              />
                              <span className="font-medium text-[#222222] truncate hover:text-[#9f224e] max-w-[110px] text-xs">
                                {team.team.name}
                              </span>
                            </div>
                          </td>

                          {/* Played */}
                          <td className="py-1.5 px-1.5 text-center font-mono text-[#636B79] text-xs">
                            {team.played}
                          </td>

                          {/* Goal Difference */}
                          <td className="py-1.5 px-1.5 text-center font-mono text-[#636B79] text-[10px]">
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>

                          {/* Points */}
                          <td className="py-1.5 pr-1.5 text-right font-bold font-mono text-[#9f224e] text-xs">
                            {team.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bottom Action: Xem chi tiết > màu đỏ đô */}
              <div className="p-2 bg-[#fbfcfd] border-t border-[#e5e5e5] text-right font-bai">
                <button
                  onClick={() => handleTabClick('standings')}
                  className="text-xs text-[#9f224e] hover:text-[#831b40] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Xem chi tiết</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* WIDGET 2: TOP GHI BÀN (Top Scorers from API) */}
            <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs overflow-hidden">
              <div className="bg-[#fafafa] px-3.5 py-2.5 border-b border-[#e5e5e5] flex items-center justify-between font-bai">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#DF4670] flex-shrink-0" />
                  <h3 className="font-bold text-xs sm:text-sm text-[#222222] uppercase tracking-tight">
                    Top ghi bàn
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#636B79]">Mùa {league.season}</span>
              </div>

              {/* Scorers List */}
              <div className="divide-y divide-[#f0f0f0] p-2 sm:p-2.5">
                {topScorers.map((scorer) => (
                  <div 
                    key={scorer.name}
                    className="py-2 px-1.5 hover:bg-[#f7f8f9] rounded flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${
                        scorer.rank === 1 ? 'bg-amber-400 text-amber-950 font-black' : 'text-[#757575]'
                      }`}>
                        {scorer.rank}
                      </span>

                      {/* Headshot image */}
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-[#e5e5e5] flex-shrink-0">
                        <img 
                          src={scorer.photo} 
                          alt={scorer.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Club */}
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-[#222222] truncate">
                          {scorer.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-[#636B79]">
                          <img 
                            src={scorer.clubLogo} 
                            alt={scorer.clubName} 
                            className="w-3 h-3 object-contain"
                          />
                          <span className="truncate">{scorer.clubName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Goals Badge */}
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-[#9f224e]">
                        {scorer.goals}
                      </span>
                      <span className="text-[10px] text-[#757575] block -mt-1 font-bai">bàn</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-[#fbfcfd] border-t border-[#e5e5e5] text-right font-bai">
                <button
                  onClick={() => handleTabClick('stats')}
                  className="text-xs text-[#9f224e] hover:text-[#831b40] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Xem đầy đủ danh sách</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>
    )}

      {/* TAB 2: LỊCH THI ĐẤU (Hôm nay đi về tương lai) */}
      {activeTab === 'lich-thi-dau' && (
        <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#f0f0f0] font-bai">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-rose-50 text-[#9f224e] flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#222222] flex items-center gap-2">
                  <span>Lịch thi đấu {league.vietnameseName}</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                    Sắp diễn ra
                  </span>
                </h2>
                <p className="text-xs text-[#636B79]">
                  Các trận đấu từ hôm nay trở về sau ({scheduleFixtures.length} trận đấu)
                </p>
              </div>
            </div>
            <span className="text-xs text-[#636B79] font-mono hidden sm:inline">Mùa {league.season}</span>
          </div>

          {scheduleFixtures.length === 0 ? (
            <div className="py-12 text-center text-[#636B79] space-y-2 font-bai">
              <Calendar className="w-8 h-8 mx-auto text-[#c7c7c7]" />
              <p className="text-xs sm:text-sm font-medium">Hiện không có trận đấu sắp diễn ra nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scheduleFixtures.map((fixture) => {
                const { time, dateVN } = formatKickoffVN(fixture.fixture.date);
                const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || 
                                   fixture.fixture.status.long.includes('Finished');
                const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);

                return (
                  <div 
                    key={fixture.fixture.id}
                    className="p-3 bg-[#fbfcfd] hover:bg-white rounded-md border border-[#e5e5e5] hover:border-[#c7c7c7] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#636B79] pb-2 mb-2 border-b border-[#f0f0f0] font-bai">
                      <span className="font-semibold text-[#38404D]">{formatRoundVN(fixture.league.round, undefined, league.id)}</span>
                      {isLive ? (
                        <span className="text-[#DF4670] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DF4670] animate-vne-live"></span>
                          Trực tiếp {fixture.fixture.status.elapsed}'
                        </span>
                      ) : (
                        <span className="font-mono text-[#9f224e] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#757575]" />
                          {time} • {dateVN}
                        </span>
                      )}
                    </div>

                    <div 
                      onClick={() => onOpenMatchDetails(fixture)}
                      className="cursor-pointer space-y-2 py-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={fixture.teams.home.logo} alt="" className="w-5 h-5 object-contain" />
                          <span className="text-xs sm:text-[13px] font-semibold text-[#222222] group-hover:text-[#9f224e] transition-colors">{fixture.teams.home.name}</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#222222]">{isFinished || isLive ? fixture.goals.home : '-'}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={fixture.teams.away.logo} alt="" className="w-5 h-5 object-contain" />
                          <span className="text-xs sm:text-[13px] font-semibold text-[#222222] group-hover:text-[#9f224e] transition-colors">{fixture.teams.away.name}</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#222222]">{isFinished || isLive ? fixture.goals.away : '-'}</span>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bai">
                      <span className="text-[11px] text-[#757575] truncate max-w-[170px]">
                        {fixture.fixture.venue?.name || 'Sân vận động'}
                      </span>
                      <button
                        onClick={() => onOpenMatchDetails(fixture)}
                        className="text-[11px] text-[#9f224e] hover:underline font-semibold flex items-center gap-0.5 ml-auto cursor-pointer"
                      >
                        <span>Nhận định &amp; Tỷ lệ</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KẾT QUẢ (Hôm nay trở về quá khứ) */}
      {activeTab === 'ket-qua' && (
        <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#f0f0f0] font-bai">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-rose-50 text-[#9f224e] flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#222222] flex items-center gap-2">
                  <span>Kết quả bóng đá {league.vietnameseName}</span>
                  <span className="text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
                    Đã hoàn thành
                  </span>
                </h2>
                <p className="text-xs text-[#636B79]">
                  Dữ liệu tỷ số từ hôm nay trở về quá khứ ({resultsFixtures.length} trận đấu)
                </p>
              </div>
            </div>
            <span className="text-xs text-[#636B79] font-mono hidden sm:inline">Mùa {league.season}</span>
          </div>

          {resultsFixtures.length === 0 ? (
            <div className="py-12 text-center text-[#636B79] space-y-2 font-bai">
              <Trophy className="w-8 h-8 mx-auto text-[#c7c7c7]" />
              <p className="text-xs sm:text-sm font-medium">Chưa có kết quả trận đấu nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resultsFixtures.map((fixture) => {
                const { time, dateVN } = formatKickoffVN(fixture.fixture.date);
                const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || 
                                   fixture.fixture.status.long.includes('Finished');
                const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);

                return (
                  <div 
                    key={fixture.fixture.id}
                    className="p-3 bg-[#fbfcfd] hover:bg-white rounded-md border border-[#e5e5e5] hover:border-[#c7c7c7] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#636B79] pb-2 mb-2 border-b border-[#f0f0f0] font-bai">
                      <span className="font-semibold text-[#38404D]">{formatRoundVN(fixture.league.round, undefined, league.id)}</span>
                      <span className="font-mono text-[#636B79] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#757575]" />
                        {time} • {dateVN}
                      </span>
                    </div>

                    <div 
                      onClick={() => onOpenMatchDetails(fixture)}
                      className="cursor-pointer space-y-2 py-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={fixture.teams.home.logo} alt="" className="w-5 h-5 object-contain" />
                          <span className={`text-xs sm:text-[13px] font-semibold transition-colors ${
                            isFinished && fixture.teams.home.winner ? 'text-[#111111] font-bold' : 'text-[#38404D]'
                          } group-hover:text-[#9f224e]`}>
                            {fixture.teams.home.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#222222] bg-[#f2f2f3] px-2 py-0.5 rounded border border-[#e5e5e5]">
                          {fixture.goals.home ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={fixture.teams.away.logo} alt="" className="w-5 h-5 object-contain" />
                          <span className={`text-xs sm:text-[13px] font-semibold transition-colors ${
                            isFinished && fixture.teams.away.winner ? 'text-[#111111] font-bold' : 'text-[#38404D]'
                          } group-hover:text-[#9f224e]`}>
                            {fixture.teams.away.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#222222] bg-[#f2f2f3] px-2 py-0.5 rounded border border-[#e5e5e5]">
                          {fixture.goals.away ?? 0}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bai">
                      <button
                        onClick={() => onOpenHighlight(fixture)}
                        className="px-2.5 py-1 bg-white hover:bg-rose-50 text-[#9f224e] border border-[#9f224e] text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-[#9f224e]" />
                        <span>Highlight</span>
                      </button>

                      <button
                        onClick={() => onOpenMatchDetails(fixture)}
                        className="text-[11px] text-[#636B79] hover:text-[#9f224e] font-semibold flex items-center gap-0.5 ml-auto cursor-pointer"
                      >
                        <span>Chi tiết</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BẢNG XẾP HẠNG TOÀN DIỆN */}
      {activeTab === 'standings' && (
        <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-5">
          <FullLeagueStandings 
            league={league}
            onSelectTeam={onSelectTeam}
          />
        </div>
      )}

      {/* TAB 4: THỐNG KÊ */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-xs p-3.5 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#f0f0f0] font-bai">
            <h2 className="text-sm sm:text-base font-bold text-[#222222] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#9f224e]" />
              <span>Thống kê &amp; Vua phá lưới {league.vietnameseName}</span>
            </h2>
            <span className="text-xs text-[#636B79] font-mono">Mùa {league.season}</span>
          </div>

          <div className="overflow-x-auto rounded border border-[#e5e5e5]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#636B79] font-bai font-medium">
                  <th className="py-2 px-2.5 w-10 text-center">#</th>
                  <th className="py-2 px-2.5">Cầu thủ</th>
                  <th className="py-2 px-2.5">Câu lạc bộ</th>
                  <th className="py-2 px-2.5 text-center">Số trận</th>
                  <th className="py-2 px-2.5 text-center">Kiến tạo</th>
                  <th className="py-2 px-2.5 text-center">Penalty</th>
                  <th className="py-2 px-2.5 text-right font-bold text-[#38404D]">Số bàn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {topScorers.map((scorer) => (
                  <tr key={scorer.name} className="hover:bg-[#f7f8f9] transition-colors">
                    <td className="py-2.5 px-2.5 text-center font-bold text-[#38404D]">{scorer.rank}</td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex items-center gap-2">
                        <img src={scorer.photo} alt={scorer.name} className="w-6 h-6 rounded-full object-cover border border-[#e5e5e5]" />
                        <span className="font-semibold text-[#222222]">{scorer.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex items-center gap-1.5">
                        <img src={scorer.clubLogo} alt={scorer.clubName} className="w-3.5 h-3.5 object-contain" />
                        <span className="text-[#38404D]">{scorer.clubName}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5 text-center font-mono text-[#636B79]">{scorer.matches || 6}</td>
                    <td className="py-2.5 px-2.5 text-center font-mono text-[#636B79]">{scorer.assists || 0}</td>
                    <td className="py-2.5 px-2.5 text-center font-mono text-[#636B79]">{scorer.penalties || 0}</td>
                    <td className="py-2.5 px-2.5 text-right font-bold font-mono text-sm text-[#9f224e]">{scorer.goals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
