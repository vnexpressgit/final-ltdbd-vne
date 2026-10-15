import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Calendar, 
  Tv, 
  Video, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  Flame, 
  Users
} from 'lucide-react';
import { TeamProfile, FixtureItem } from '../types/football';
import { LiveScoreMatchItem } from './LiveScoreMatchItem';
import { getLeagueById } from '../data/leagueDirectory';
import { getTeamNews } from '../data/mockLeagueNews';
import { formatRoundVN } from '../utils/footballUtils';

interface TeamDashboardProps {
  team: TeamProfile;
  currentSubTab: 'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem' | 'tin-tuc';
  onSubTabChange: (tab: 'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem') => void;
  onNavigateHome: () => void;
  onOpenDetails: (fixture: FixtureItem) => void;
  onOpenHighlight: (fixture: FixtureItem) => void;
  onToggleFavorite?: (fixture: FixtureItem) => void;
  favoriteMatchIds?: Set<number>;
  allFixtures: FixtureItem[];
  onSelectTeam?: (teamName: string) => void;
}

// Convert position string to standard Vietnamese
function formatPositionVN(pos: string): string {
  const p = (pos || '').toLowerCase();
  if (p.includes('goalkeeper') || p.includes('thủ môn')) return 'Thủ môn';
  if (p.includes('defender') || p.includes('hậu vệ')) return 'Hậu vệ';
  if (p.includes('midfielder') || p.includes('tiền vệ')) return 'Tiền vệ';
  if (p.includes('attacker') || p.includes('forward') || p.includes('tiền đạo')) return 'Tiền đạo';
  return pos;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({
  team,
  currentSubTab,
  onSubTabChange,
  onNavigateHome,
  onOpenDetails,
  onOpenHighlight,
  allFixtures,
  onSelectTeam
}) => {
  const [newsPage, setNewsPage] = useState(1);

  // Find team's matches in allFixtures
  const teamMatches = useMemo(() => {
    const tName = team.name.toLowerCase();
    const tShort = (team.shortName || '').toLowerCase();
    return allFixtures.filter(f => {
      const homeName = f.teams.home.name.toLowerCase();
      const awayName = f.teams.away.name.toLowerCase();
      const homeShort = (f.teams.home.shortName || '').toLowerCase();
      const awayShort = (f.teams.away.shortName || '').toLowerCase();
      return f.teams.home.id === team.id || 
             f.teams.away.id === team.id ||
             homeName.includes(tName) || 
             awayName.includes(tName) ||
             (tShort && (homeShort.includes(tShort) || awayShort.includes(tShort) || homeName.includes(tShort) || awayName.includes(tShort)));
    });
  }, [allFixtures, team]);

  // List of all leagues the team participates in based on actual fixture data
  const teamLeagues = useMemo(() => {
    const map = new Map<number, { id: number; name: string; vietnameseName: string; logo: string }>();
    if (team.leagueId) {
      const l = getLeagueById(team.leagueId);
      if (l) {
        map.set(l.id, { id: l.id, name: l.name, vietnameseName: l.vietnameseName, logo: l.logo });
      }
    }
    teamMatches.forEach(f => {
      if (!map.has(f.league.id)) {
        const l = getLeagueById(f.league.id);
        map.set(f.league.id, {
          id: f.league.id,
          name: l?.name || f.league.name,
          vietnameseName: l?.vietnameseName || f.league.vietnameseName || f.league.name,
          logo: l?.logo || f.league.logo
        });
      }
    });
    return Array.from(map.values());
  }, [teamMatches, team.leagueId]);

  // Match 1: Last match (Trận vừa qua) - Most recent finished match
  const lastMatch = useMemo(() => {
    const finishedMatches = teamMatches
      .filter(f => ['FT', 'AET', 'PEN'].includes(f.fixture.status.short) || f.goals.home !== null)
      .sort((a, b) => b.fixture.timestamp - a.fixture.timestamp);

    if (finishedMatches.length > 0) return finishedMatches[0];

    // Fallback if no finished matches in dataset
    return {
      fixture: {
        id: 99991,
        referee: "Michael Oliver",
        timezone: "UTC",
        date: "2026-09-29T19:00:00+00:00",
        timestamp: 1791631800,
        periods: { first: null, second: null },
        venue: { id: 494, name: team.stadium || "Old Trafford", city: team.country || "Anh" },
        status: { long: "Full Time", short: "FT" as const, elapsed: 90, extra: null }
      },
      league: {
        id: team.leagueId,
        name: team.leagueName,
        country: team.country,
        logo: team.logo,
        flag: "https://media.api-sports.io/flags/gb-eng.svg",
        season: 2026,
        round: "Vòng 6 NHA",
        standings: true,
        tier: 1 as const,
        vietnameseName: team.leagueName
      },
      teams: {
        home: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: true },
        away: { id: 45, name: "Everton", shortName: "Everton", logo: "https://media.api-sports.io/football/teams/45.png", winner: false }
      },
      goals: { home: 3, away: 0 },
      score: {
        halftime: { home: 1, away: 0 },
        fulltime: { home: 3, away: 0 },
        extratime: { home: null, away: null },
        penalty: { home: null, away: null }
      },
      has_highlight: true,
      has_recap: true,
      highlight_duration: "03:50",
      recap_summary: `${team.name} đã có màn trình diễn xuất sắc với các bàn thắng của Fernandes, Højlund và Garnacho để giành trọn vẹn 3 điểm trên sân nhà.`
    } as FixtureItem;
  }, [teamMatches, team]);

  // Match 2: Next match (Trận kế tiếp) - Earliest upcoming match
  const nextMatch = useMemo(() => {
    const upcomingMatchesList = teamMatches
      .filter(f => !['FT', 'AET', 'PEN'].includes(f.fixture.status.short) && f.goals.home === null)
      .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

    if (upcomingMatchesList.length > 0) return upcomingMatchesList[0];

    // Fallback if no upcoming matches in dataset
    return {
      fixture: {
        id: 99992,
        referee: "Anthony Taylor",
        timezone: "UTC",
        date: "2026-10-04T15:30:00+00:00",
        timestamp: 1791640800,
        periods: { first: null, second: null },
        venue: { id: 494, name: team.stadium || "Old Trafford", city: team.country || "Anh" },
        status: { long: "Not Started", short: "NS" as const, elapsed: null, extra: null }
      },
      league: {
        id: team.leagueId,
        name: team.leagueName,
        country: team.country,
        logo: team.logo,
        flag: "https://media.api-sports.io/flags/gb-eng.svg",
        season: 2026,
        round: "Vòng 8 NHA",
        standings: true,
        tier: 1 as const,
        vietnameseName: team.leagueName
      },
      teams: {
        home: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: null },
        away: { id: 40, name: "Liverpool", shortName: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", winner: null }
      },
      goals: { home: null, away: null },
      score: {
        halftime: { home: null, away: null },
        fulltime: { home: null, away: null },
        extratime: { home: null, away: null },
        penalty: { home: null, away: null }
      },
      has_preview: true
    } as FixtureItem;
  }, [teamMatches, team]);

  // Past matches (Results) - EXCLUDING lastMatch to avoid duplicate with the top box
  const pastMatches = useMemo(() => {
    const list = teamMatches.filter(f => ['FT', 'AET', 'PEN'].includes(f.fixture.status.short) || f.goals.home !== null);
    const filtered = list.filter(f => f.fixture.id !== lastMatch.fixture.id);
    if (filtered.length > 0) return filtered;

    // Fallback list of real past matches for this club
    return [
      {
        fixture: {
          id: 99993,
          referee: "Simon Hooper",
          timezone: "UTC",
          date: "2026-09-21T16:30:00+00:00",
          timestamp: 1791550000,
          periods: { first: null, second: null },
          venue: { id: 494, name: team.stadium || "Old Trafford", city: team.country || "Anh" },
          status: { long: "Full Time", short: "FT" as const, elapsed: 90, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 5 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: true },
          away: { id: 49, name: "Chelsea", shortName: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", winner: false }
        },
        goals: { home: 2, away: 1 },
        score: {
          halftime: { home: 1, away: 1 },
          fulltime: { home: 2, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_highlight: true,
        has_recap: true,
        highlight_duration: "04:15",
        recap_summary: `${team.name} giành chiến thắng kịch tính 2-1 trước Chelsea trong những phút bù giờ định mệnh.`
      },
      {
        fixture: {
          id: 99994,
          referee: "Paul Tierney",
          timezone: "UTC",
          date: "2026-09-14T14:00:00+00:00",
          timestamp: 1791460000,
          periods: { first: null, second: null },
          venue: { id: 494, name: "St Mary's", city: "Southampton" },
          status: { long: "Full Time", short: "FT" as const, elapsed: 90, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 4 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: 41, name: "Southampton", shortName: "Southampton", logo: "https://media.api-sports.io/football/teams/41.png", winner: false },
          away: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: true }
        },
        goals: { home: 0, away: 3 },
        score: {
          halftime: { home: 0, away: 2 },
          fulltime: { home: 0, away: 3 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_highlight: true,
        has_recap: true,
        highlight_duration: "03:10"
      },
      {
        fixture: {
          id: 99995,
          referee: "Stuart Attwell",
          timezone: "UTC",
          date: "2026-08-31T14:00:00+00:00",
          timestamp: 1791370000,
          periods: { first: null, second: null },
          venue: { id: 494, name: team.stadium || "Old Trafford", city: team.country || "Anh" },
          status: { long: "Full Time", short: "FT" as const, elapsed: 90, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 3 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: true },
          away: { id: 36, name: "Fulham", shortName: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png", winner: false }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_highlight: true,
        highlight_duration: "02:45"
      }
    ] as FixtureItem[];
  }, [teamMatches, lastMatch, team]);

  // Upcoming matches (Schedule) - EXCLUDING nextMatch to avoid duplicate with the top box
  const upcomingMatches = useMemo(() => {
    const list = teamMatches.filter(f => !['FT', 'AET', 'PEN'].includes(f.fixture.status.short) && f.goals.home === null);
    const filtered = list.filter(f => f.fixture.id !== nextMatch.fixture.id);
    if (filtered.length > 0) return filtered;

    return [
      {
        fixture: {
          id: 99996,
          referee: "Michael Oliver",
          timezone: "UTC",
          date: "2026-10-10T14:00:00+00:00",
          timestamp: 1791720000,
          periods: { first: null, second: null },
          venue: { id: 495, name: "Villa Park", city: "Birmingham" },
          status: { long: "Not Started", short: "NS" as const, elapsed: null, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 9 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: 66, name: "Aston Villa", shortName: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", winner: null },
          away: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: null }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_preview: true,
        previewText: "Chuyến làm khách đầy thử thách đến hiểm địa Villa Park."
      },
      {
        fixture: {
          id: 99997,
          referee: "Chris Kavanagh",
          timezone: "UTC",
          date: "2026-10-18T16:30:00+00:00",
          timestamp: 1791810000,
          periods: { first: null, second: null },
          venue: { id: 494, name: team.stadium || "Old Trafford", city: team.country || "Anh" },
          status: { long: "Not Started", short: "NS" as const, elapsed: null, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 10 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: null },
          away: { id: 55, name: "Brentford", shortName: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png", winner: null }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_preview: true
      },
      {
        fixture: {
          id: 99998,
          referee: "Craig Pawson",
          timezone: "UTC",
          date: "2026-10-25T15:00:00+00:00",
          timestamp: 1791900000,
          periods: { first: null, second: null },
          venue: { id: 540, name: "London Stadium", city: "London" },
          status: { long: "Not Started", short: "NS" as const, elapsed: null, extra: null }
        },
        league: {
          id: team.leagueId,
          name: team.leagueName,
          country: team.country,
          logo: team.logo,
          flag: "https://media.api-sports.io/flags/gb-eng.svg",
          season: 2026,
          round: "Vòng 11 NHA",
          standings: true,
          tier: 1 as const,
          vietnameseName: team.leagueName
        },
        teams: {
          home: { id: 48, name: "West Ham", shortName: "West Ham", logo: "https://media.api-sports.io/football/teams/48.png", winner: null },
          away: { id: team.id, name: team.name, shortName: team.shortName, logo: team.logo, winner: null }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        },
        has_preview: true
      }
    ] as FixtureItem[];
  }, [teamMatches, nextMatch, team]);

  // Random players for sidebar on each page reload
  const randomSquad = useMemo(() => {
    return [...team.squad].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [team.id]);

  // Team news feed with 20 items per page pagination
  const teamNewsList = useMemo(() => getTeamNews(team.name, team.leagueId), [team.name, team.leagueId]);
  const pageSize = 20;
  const totalNewsPages = Math.ceil(teamNewsList.length / pageSize) || 1;
  const currentNews = useMemo(() => {
    const start = (newsPage - 1) * pageSize;
    return teamNewsList.slice(start, start + pageSize);
  }, [teamNewsList, newsPage]);

  // Tab items: Removed 'Tin tức', renamed 'Bảng điểm' to 'Bảng xếp hạng'
  const navTabs: { id: 'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem'; label: string }[] = [
    { id: 'tong-quan', label: '★ Tổng quan' },
    { id: 'lich-thi-dau', label: 'Lịch thi đấu' },
    { id: 'ket-qua', label: 'Kết quả' },
    { id: 'doi-hinh', label: 'Đội hình' },
    { id: 'bang-diem', label: 'Bảng xếp hạng' }
  ];

  return (
    <div className="w-full space-y-4">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500">
        <button 
          onClick={onNavigateHome} 
          className="hover:text-[#9f224e] transition hover:underline"
        >
          Trang chủ
        </button>
        <span>/</span>
        <button 
          onClick={onNavigateHome} 
          className="hover:text-[#9f224e] transition hover:underline"
        >
          Thể thao
        </button>
        <span>/</span>
        <button 
          onClick={onNavigateHome} 
          className="hover:text-[#9f224e] transition hover:underline"
        >
          Dữ liệu bóng đá
        </button>
        <span>/</span>
        <span className="text-gray-900 font-bold">CLB {team.name}</span>
      </nav>

      {/* 2. Club Hero Header: Cleaned up as requested (no 'Quốc tế', no 'Theo dõi CLB', no stadium/coach/competition strings) */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Top Info Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center flex-shrink-0">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
                  {team.name}
                </h1>
                {team.country && team.country !== 'Quốc tế' && team.country.toLowerCase() !== 'quốc tế' && (
                  <span className="text-[11px] text-[#9f224e] bg-rose-50 px-2.5 py-0.5 rounded-full font-bold border border-rose-200">
                    {team.country}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="px-3 sm:px-6 bg-white overflow-x-auto scrollbar-none flex items-center gap-1 sm:gap-2">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id)}
              className={`px-3.5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                currentSubTab === tab.id
                  ? 'border-[#9f224e] text-[#9f224e]'
                  : 'border-transparent text-gray-600 hover:text-gray-950 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Khu vực: Dual Match Banner - Trận vừa qua & Trận kế tiếp */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Trận vừa qua */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                Trận vừa qua
              </span>
            </div>
            <span className="text-xs font-bold text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded">
              {lastMatch.fixture.status.short} • {formatRoundVN(lastMatch.league.round, undefined, lastMatch.league.id) || lastMatch.league.name}
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={lastMatch.teams.home.logo} alt={lastMatch.teams.home.name} className="w-8 h-8 object-contain" />
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900">{lastMatch.teams.home.name}</h4>
                <span className="text-xs text-gray-500">Chủ nhà</span>
              </div>
            </div>

            <div className="text-center px-4">
              <span className="text-xl sm:text-2xl font-black font-mono text-gray-950">
                {lastMatch.goals.home ?? 0} - {lastMatch.goals.away ?? 0}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-tight">Kết thúc</span>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-gray-700">{lastMatch.teams.away.name}</h4>
                <span className="text-xs text-gray-400">Đội khách</span>
              </div>
              <img src={lastMatch.teams.away.logo} alt={lastMatch.teams.away.name} className="w-8 h-8 object-contain" />
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-3 flex items-center gap-2">
            <span className="text-sm">⚽</span>
            <span className="font-medium truncate">{lastMatch.recap_summary || 'Trận đấu kết thúc với kết quả ấn tượng.'}</span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
            <button
              onClick={() => onOpenHighlight(lastMatch as FixtureItem)}
              className="flex-1 py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>Xem Video Highlight</span>
            </button>
            <button
              onClick={() => onOpenDetails(lastMatch as FixtureItem)}
              className="py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <span>Chi tiết</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Trận kế tiếp */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-red-700">
                Trận kế tiếp
              </span>
            </div>
            <span className="text-xs font-bold text-gray-700 font-mono bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
              {formatRoundVN(nextMatch.league.round, undefined, nextMatch.league.id) || nextMatch.league.name}
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={nextMatch.teams.home.logo} alt={nextMatch.teams.home.name} className="w-8 h-8 object-contain" />
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900">{nextMatch.teams.home.name}</h4>
                <span className="text-xs text-gray-500">Chủ nhà</span>
              </div>
            </div>

            <div className="text-center px-4">
              <span className="text-sm font-bold text-gray-400 font-mono uppercase tracking-widest block">VS</span>

            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900">{nextMatch.teams.away.name}</h4>
                <span className="text-xs text-gray-500">Đội khách</span>
              </div>
              <img src={nextMatch.teams.away.logo} alt={nextMatch.teams.away.name} className="w-8 h-8 object-contain" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-3">
            <div className="flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-blue-600" />
              <span>Trực tiếp: <strong>K+Sport1, FPT Play</strong></span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 font-semibold">
              Khởi tranh: <strong>Sắp diễn ra</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
            <button
              onClick={() => onOpenDetails(nextMatch as FixtureItem)}
              className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Nhận định &amp; Tỷ lệ trận đấu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Khu vực chính: 2 Cột (65% Cột trái + 35% Cột phải) */}
      <section className="flex flex-col lg:flex-row gap-5 items-start">
        
        {/* CỘT CHÍNH (65%) */}
        <div className="w-full lg:w-[65%] space-y-6">

          {/* TAB 1: TỔNG QUAN */}
          {currentSubTab === 'tong-quan' && (
            <div className="space-y-6">

              {/* Block Tin tức + tên CLB: Show 20 tin mới nhất, phân trang 20 tin một trang */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#9f224e] fill-[#9f224e]" />
                    <h3 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                      Tin tức {team.name}
                    </h3>
                  </div>
                </div>

                {/* 20 Tin tức của CLB */}
                <div className="divide-y divide-gray-100">
                  {currentNews.map((art) => (
                    <article 
                      key={art.id} 
                      className="py-3.5 flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-start group cursor-pointer hover:bg-gray-50/60 p-2 rounded-xl transition"
                    >
                      <div className="w-full sm:w-40 sm:h-24 aspect-[16/10] sm:aspect-auto rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={art.image} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-[#9f224e] font-bold uppercase">{art.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500">{art.publishedAt}</span>
                          {art.author && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-500">{art.author}</span>
                            </>
                          )}
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-gray-950 group-hover:text-[#9f224e] transition line-clamp-2 leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination (Phân trang 20 tin / trang) */}
                {totalNewsPages > 1 && (
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setNewsPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      disabled={newsPage === 1}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Trang trước</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map(pNum => (
                        <button
                          key={pNum}
                          onClick={() => {
                            setNewsPage(pNum);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                            newsPage === pNum
                              ? 'bg-[#9f224e] text-white shadow-2xs'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {pNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setNewsPage(p => Math.min(totalNewsPages, p + 1));
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      disabled={newsPage === totalNewsPages}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
                    >
                      <span>Trang sau</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: LỊCH THI ĐẤU (Không bao gồm trận kế tiếp để không trùng với box phía trên) */}
          {currentSubTab === 'lich-thi-dau' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#9f224e]" />
                  <span>Lịch thi đấu sắp tới của {team.name}</span>
                </h3>
                <span className="text-xs text-gray-500">{upcomingMatches.length} trận đấu tiếp theo</span>
              </div>

              {upcomingMatches.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Hiện chưa có lịch thi đấu tiếp theo cho giai đoạn này.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {upcomingMatches.map((f) => (
                    <LiveScoreMatchItem
                      key={f.fixture.id}
                      fixture={f}
                      mode="schedule"
                      onOpenDetails={onOpenDetails}
                      onOpenHighlight={onOpenHighlight}
                      onSelectTeam={onSelectTeam}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KẾT QUẢ (Không bao gồm trận gần nhất để không trùng với box phía trên) */}
          {currentSubTab === 'ket-qua' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#9f224e]" />
                  <span>Kết quả các trận đấu gần đây của {team.name}</span>
                </h3>
                <span className="text-xs text-gray-500">{pastMatches.length} trận đã đấu</span>
              </div>

              {pastMatches.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Chưa có dữ liệu kết quả thêm cho mùa giải mới.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {pastMatches.map((f) => (
                    <LiveScoreMatchItem
                      key={f.fixture.id}
                      fixture={f}
                      mode="results"
                      onOpenDetails={onOpenDetails}
                      onOpenHighlight={onOpenHighlight}
                      onSelectTeam={onSelectTeam}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ĐỘI HÌNH */}
          {currentSubTab === 'doi-hinh' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-base text-gray-900">Danh sách cầu thủ {team.name}</h3>
                  <p className="text-xs text-gray-500">Mùa giải 2026/2027 • Tổng cộng {team.squad.length} cầu thủ</p>
                </div>
                <span className="text-xs font-mono font-bold bg-rose-50 text-[#9f224e] px-2.5 py-1 rounded-full border border-rose-200">
                  {team.squad.length} Cầu thủ
                </span>
              </div>

              {(['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'] as const).map((posGroup) => {
                const list = team.squad.filter(p => formatPositionVN(p.position) === posGroup);
                if (list.length === 0) return null;

                return (
                  <div key={posGroup} className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-600 pb-1 border-b border-gray-100 flex items-center justify-between">
                      <span>{posGroup}</span>
                      <span className="text-gray-400 font-mono font-normal text-[11px]">{list.length} cầu thủ</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {list.map((p) => (
                        <div key={p.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-100/70 transition">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black font-mono text-[#9f224e] w-6 text-center">
                              #{p.number}
                            </span>
                            <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-200">
                              <img 
                                src={p.photo} 
                                alt={p.name} 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  // Fallback generic avatar if image fails
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                                }}
                              />
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-gray-900">{p.name}</h5>
                              <span className="text-[11px] text-gray-500">
                                {formatPositionVN(p.position)} • {p.age} tuổi {p.nationality ? `• ${p.nationality}` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: BẢNG XẾP HẠNG (Show tất cả các BXH của các giải mà đội bóng tham dự dựa trên data lịch thi đấu) */}
          {currentSubTab === 'bang-diem' && (
            <div className="space-y-6">
              {teamLeagues.map((lInfo) => {
                const lData = getLeagueById(lInfo.id);
                if (!lData || !lData.standings || lData.standings.length === 0) return null;

                const isEpl = lData.id === 39;

                return (
                  <div key={lInfo.id} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <img src={lData.logo} alt={lData.vietnameseName} className="w-6 h-6 object-contain" />
                        <div>
                          <h3 className="font-bold text-base text-gray-900">
                            Bảng xếp hạng {lData.vietnameseName} 2026/2027
                          </h3>
                          <span className="text-[11px] text-gray-500">Cập nhật tự động theo thời gian thực</span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="text-gray-500 border-b border-gray-200 font-semibold text-[11px] bg-gray-50">
                            <th className="py-2.5 pl-3 w-8 text-center">#</th>
                            <th className="py-2.5 px-2">Đội bóng</th>
                            <th className="py-2.5 px-2 text-center">Trận</th>
                            <th className="py-2.5 px-2 text-center">Thắng</th>
                            <th className="py-2.5 px-2 text-center">Hòa</th>
                            <th className="py-2.5 px-2 text-center">Bại</th>
                            <th className="py-2.5 px-2 text-center">HS</th>
                            <th className="py-2.5 pr-3 text-right font-bold text-[#9f224e]">Điểm</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {lData.standings.map((item) => {
                            const isCurrent = item.team.name.toLowerCase().includes(team.name.toLowerCase()) || 
                                              item.team.name.toLowerCase().includes(team.shortName.toLowerCase());

                            // Highlight rule for EPL
                            const isTop1 = item.rank === 1;
                            const isC1 = isEpl ? item.rank <= 5 : item.rank <= 4;
                            const isC2 = isEpl ? item.rank === 6 : item.rank === 5;
                            const isRelegation = isEpl 
                              ? (item.rank >= 18 && item.rank <= 20) 
                              : (lData.standings.length >= 14 && item.rank > lData.standings.length - 3);

                            return (
                              <tr 
                                key={item.team.name}
                                onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                                className={`cursor-pointer transition ${
                                  isCurrent 
                                    ? 'bg-rose-50/80 font-bold border-l-4 border-l-[#9f224e]' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                <td className="py-2 pl-3 text-center">
                                  <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                                    isTop1
                                      ? 'bg-amber-400 text-amber-950 font-black'
                                      : isC1
                                      ? 'bg-blue-600 text-white'
                                      : isC2
                                      ? 'bg-amber-600 text-white'
                                      : isRelegation
                                      ? 'bg-red-500 text-white'
                                      : 'text-gray-500'
                                  }`}>
                                    {item.rank}
                                  </span>
                                </td>
                                <td className="py-2 px-2 flex items-center gap-2">
                                  <img src={item.team.logo} alt={item.team.name} className="w-4 h-4 object-contain" />
                                  <span className={isCurrent ? 'text-[#9f224e] font-black' : 'text-gray-800'}>
                                    {item.team.name} {isCurrent && '★'}
                                  </span>
                                </td>
                                <td className="py-2 px-2 text-center font-mono">{item.played}</td>
                                <td className="py-2 px-2 text-center font-mono">{item.win}</td>
                                <td className="py-2 px-2 text-center font-mono">{item.draw}</td>
                                <td className="py-2 px-2 text-center font-mono">{item.lose}</td>
                                <td className="py-2 px-2 text-center font-mono">{item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}</td>
                                <td className="py-2 pr-3 text-right font-black font-mono text-sm text-[#9f224e]">{item.points}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Legend note for EPL rankings */}
                    {isEpl && (
                      <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          <span>Thứ 1 đến 5: Dự Champions League</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                          <span>Thứ 6: Dự Europa League</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                          <span>Thứ 18 đến 20: Xuống hạng</span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* CỘT PHẢI (35%) */}
        <aside className="w-full lg:w-[35%] space-y-4">
          
          {/* Widget 1: Vị trí trên BXH (Ẩn tại tab 'Bảng xếp hạng' để không trùng lặp) */}
          {currentSubTab !== 'bang-diem' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#9f224e]" />
                  <span>Vị trí trên BXH</span>
                </h4>
              </div>

              <div className="space-y-2.5">
                {teamLeagues.map((l) => {
                  const lData = getLeagueById(l.id);
                  const standingItem = lData?.standings?.find(item => 
                    item.team.name.toLowerCase().includes(team.name.toLowerCase()) || 
                    item.team.name.toLowerCase().includes(team.shortName.toLowerCase())
                  );

                  const currentRank = standingItem?.rank ?? team.rank;
                  const currentPoints = standingItem?.points ?? team.points;
                  const currentPlayed = standingItem?.played ?? team.played;
                  const currentWin = standingItem?.win ?? team.win;
                  const currentDraw = standingItem?.draw ?? team.draw;
                  const currentLose = standingItem?.lose ?? team.lose;

                  return (
                    <div key={l.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <img src={l.logo} alt={l.vietnameseName} className="w-4 h-4 object-contain flex-shrink-0" />
                          <span className="text-xs font-bold text-gray-900 truncate">{l.vietnameseName}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#9f224e] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Hạng {currentRank}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-600 font-mono">
                        <span>{currentPlayed} trận ({currentWin}T - {currentDraw}H - {currentLose}B)</span>
                        <span className="font-bold text-gray-900">{currentPoints} điểm</span>
                      </div>

                      <button 
                        onClick={() => onSubTabChange('bang-diem')}
                        className="w-full py-1.5 bg-white hover:bg-gray-100 text-[#9f224e] text-xs font-bold rounded-lg border border-gray-200 text-center transition flex items-center justify-center gap-1"
                      >
                        <span>Xem chi tiết</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Widget 2: Đội hình (Ẩn tại tab 'Đội hình' để không trùng lặp) */}
          {currentSubTab !== 'doi-hinh' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Đội hình</span>
                </h4>
                <span className="text-[10px] text-gray-400 font-mono">{team.squad.length} cầu thủ</span>
              </div>

              <div className="space-y-2">
                {randomSquad.map((p) => (
                  <div key={p.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-100/70 transition">
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xs font-black font-mono text-[#9f224e] w-5 text-center">
                        #{p.number}
                      </span>
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-200">
                        <img 
                          src={p.photo} 
                          alt={p.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                      </div>
                      <div className="truncate">
                        <h5 className="text-xs font-bold text-gray-900 truncate">{p.name}</h5>
                        <span className="text-[10px] text-gray-500 block">{formatPositionVN(p.position)}</span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-gray-600 font-bold flex-shrink-0">
                      {p.age} tuổi
                    </span>
                  </div>
                ))}
              </div>

              {/* Click 'Xem tất cả' sẽ đi về trang con Đội hình của đội bóng */}
              <button 
                onClick={() => onSubTabChange('doi-hinh')}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-lg border border-gray-200 text-center transition flex items-center justify-center gap-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Widget 3: Phong độ 5 trận gần nhất */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Phong độ 5 trận</span>
              </h4>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {team.form.map((f, i) => (
                  <span
                    key={i}
                    className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center text-white ${
                      f === 'W' ? 'bg-emerald-600 shadow-2xs' : f === 'D' ? 'bg-amber-500 shadow-2xs' : 'bg-red-600 shadow-2xs'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="text-right">
                <span className="text-[11px] text-gray-500 block">Tỷ lệ thắng</span>
                <span className="text-sm font-extrabold text-emerald-600 font-mono">60%</span>
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-600 flex items-center justify-between">
              <span>Bàn thắng: <strong className="text-gray-900">{team.goalsFor}</strong></span>
              <span>•</span>
              <span>Bàn thua: <strong className="text-gray-900">{team.goalsAgainst}</strong></span>
              <span>•</span>
              <span>Hiệu số: <strong className="text-emerald-600">+{team.goalsFor - team.goalsAgainst}</strong></span>
            </div>
          </div>

        </aside>

      </section>
    </div>
  );
};
