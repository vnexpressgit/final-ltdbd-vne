import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  Sparkles,
  Menu,
  X,
  Star,
  ArrowLeft
} from 'lucide-react';
import { FixtureItem } from './types/football';
import { generateAllFixtures } from './data/mockFixtures';
import { fetchRealPremierLeagueFixtures } from './services/premierLeagueService';
import { fetchRealChampionsLeagueFixtures } from './services/championsLeagueService';
import { fetchRealEuropaLeagueFixtures } from './services/europaLeagueService';
import { fetchRealLaLigaFixtures } from './services/laLigaService';
import { fetchRealVLeagueFixtures } from './services/vLeagueService';
import { fetchRealSerieAFixtures } from './services/serieAService';
import { fetchRealBundesligaFixtures } from './services/bundesligaService';
import { fetchRealLigue1Fixtures } from './services/ligue1Service';
import { fetchRealSaudiFixtures, fetchRealMlsFixtures, fetchRealFaCupFixtures, fetchRealCarabaoCupFixtures } from './services/extendedLeaguesService';
import { 
  getFootballDayString, 
  sortFixtures, 
  groupFixturesByLeague,
  LeagueGroup,
  isFixtureLive,
  formatCountryVN,
  formatRoundVN
} from './utils/footballUtils';
import { 
  getLeagueById, 
  getLeagueSlug, 
  parseLeagueFromPath,
  parseLeagueDetailsFromPath,
  getLeagueUrl
} from './data/leagueDirectory';
import { 
  getTeamBySlugOrId, 
  parseTeamFromPath, 
  getTeamUrl 
} from './data/teamDirectory';
import { TeamProfile } from './types/football';

// Components
import { VnExpressHeader } from './components/VnExpressHeader';
import { LiveScoreSidebar } from './components/LiveScoreSidebar';
import { LiveScoreTopBar } from './components/LiveScoreTopBar';
import { LiveScoreMatchItem } from './components/LiveScoreMatchItem';
import { VideoHighlightModal } from './components/VideoHighlightModal';
import { MatchDetailModal } from './components/MatchDetailModal';
import { MiniStandings } from './components/MiniStandings';
import { HotLeaguesSidebar } from './components/HotLeaguesSidebar';
import { LeagueStandingsModal } from './components/LeagueStandingsModal';
import { LeagueNewsSection } from './components/LeagueNewsSection';
import { FullLeagueStandings } from './components/FullLeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { GeneralFootballNewsSection } from './components/GeneralFootballNewsSection';
import { MatchDetailView } from './components/match-detail/MatchDetailView';
import { LeagueDetailView, LeagueSubTab } from './components/LeagueDetailView';
import { getMatchDetailUrl, parseMatchIdFromPath } from './utils/matchRouting';
import { ARSENAL_COVENTRY_DETAIL } from './data/matchDetailData';

export default function App() {
  const [allFixtures, setAllFixtures] = useState<FixtureItem[]>(() => generateAllFixtures());

  // App Tabs: 'schedule' (Lịch thi đấu) | 'results' (KQBD) | 'live' | 'favorites' | 'standings'
  const [currentTab, setCurrentTab] = useState<'schedule' | 'results' | 'live' | 'favorites'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const isLeague = Boolean(parseLeagueFromPath(window.location.pathname, window.location.search));
      const teamParsed = Boolean(parseTeamFromPath(window.location.pathname));
      const matchId = Boolean(parseMatchIdFromPath(window.location.pathname));
      if (!isLeague && !teamParsed && !matchId) {
        if (path.includes('ket-qua') || path.includes('results')) {
          return 'results';
        }
        if (path.includes('truc-tiep') || path.includes('live')) {
          return 'live';
        }
      }
    }
    return 'schedule';
  });

  // Dates config - Season 2026-2027 as of October 13, 2026
  const todayDateStr = "2026-10-13";
  const yesterdayDateStr = "2026-10-12";
  const tomorrowDateStr = "2026-10-14";

  const [selectedDate, setSelectedDate] = useState<string>(todayDateStr);

  // Full calendar dates pool dynamically derived from all fixtures across the season
  const allDatePool = useMemo(() => {
    const datesSet = new Set<string>();
    // Seed contiguous dates around today
    const baseDays = [
      "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10",
      "2026-10-11", "2026-10-12", "2026-10-13", "2026-10-14", "2026-10-15",
      "2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"
    ];
    baseDays.forEach(d => datesSet.add(d));
    allFixtures.forEach(f => {
      datesSet.add(getFootballDayString(f.fixture.date));
    });
    if (selectedDate) {
      datesSet.add(selectedDate);
    }
    return Array.from(datesSet).sort();
  }, [allFixtures, selectedDate]);

  // Requirements:
  // - Tại trang Lịch thi đấu: chỉ show data của hôm nay và các ngày tương lai
  const scheduleDateList = useMemo(() => {
    return allDatePool.filter(d => d >= todayDateStr);
  }, [allDatePool, todayDateStr]);

  // - Tại trang Kết quả: chỉ show data của các ngày cũ và ngày hôm nay
  const resultsDateList = useMemo(() => {
    return allDatePool.filter(d => d <= todayDateStr);
  }, [allDatePool, todayDateStr]);

  // Active dateList based on current tab
  const activeDateList = useMemo(() => {
    if (currentTab === 'results') return resultsDateList;
    return scheduleDateList;
  }, [currentTab, resultsDateList, scheduleDateList]);

  // Left sidebar filters & League routing
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(() => {
    // If not a team path, check league path
    const teamParsed = parseTeamFromPath(window.location.pathname);
    if (teamParsed) return null;
    return parseLeagueFromPath(window.location.pathname, window.location.search);
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [expandedMatches, setExpandedMatches] = useState(false);

  // Dedicated Match Center State (Clean SEO URL: /the-thao/truc-tiep/[home]-vs-[away]-[fixtureId].html)
  const [selectedMatchFixture, setSelectedMatchFixture] = useState<FixtureItem | null>(() => {
    if (typeof window !== 'undefined') {
      const matchId = parseMatchIdFromPath(window.location.pathname);
      if (matchId === 1557367) {
        return ARSENAL_COVENTRY_DETAIL.fixture;
      }
    }
    return null;
  });

  // Team Dashboard State (SEO URL & Sub-tabs)
  const [selectedTeamProfile, setSelectedTeamProfile] = useState<TeamProfile | null>(() => {
    const teamParsed = parseTeamFromPath(window.location.pathname);
    if (teamParsed) {
      return getTeamBySlugOrId(teamParsed.teamSlug);
    }
    return null;
  });

  const [teamSubTab, setTeamSubTab] = useState<'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem'>(() => {
    const teamParsed = parseTeamFromPath(window.location.pathname);
    if (teamParsed && teamParsed.subTab && teamParsed.subTab !== 'tin-tuc') {
      return teamParsed.subTab as any;
    }
    return 'tong-quan';
  });

  // Dedicated League Detail View State
  const [isLeagueDetailView, setIsLeagueDetailView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isLeagueUrl = Boolean(parseLeagueFromPath(window.location.pathname, window.location.search));
      return isLeagueUrl;
    }
    return false;
  });
  const [leagueSubTab, setLeagueSubTab] = useState<LeagueSubTab>(() => {
    if (typeof window !== 'undefined') {
      const parsed = parseLeagueDetailsFromPath(window.location.pathname, window.location.search);
      if (parsed && parsed.subTab) {
        if (parsed.subTab === 'lich-thi-dau' || parsed.subTab === 'ket-qua') return parsed.subTab;
        if (parsed.subTab === 'bang-xep-hang') return 'standings';
        if (parsed.subTab === 'thong-ke') return 'stats';
      }
    }
    return 'overview';
  });

  // League object if viewing a specific league
  const selectedLeague = useMemo(() => {
    if (!selectedLeagueId) return null;
    return getLeagueById(selectedLeagueId);
  }, [selectedLeagueId]);

  // Navigate to Match Center
  const navigateToMatch = (fixture: FixtureItem) => {
    setSelectedMatchFixture(fixture);
    setSelectedTeamProfile(null);
    const targetUrl = getMatchDetailUrl(fixture);
    window.history.pushState({ matchId: fixture.fixture.id }, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromMatch = () => {
    setSelectedMatchFixture(null);
    if (selectedTeamProfile) {
      const targetUrl = getTeamUrl(selectedTeamProfile.id, selectedTeamProfile.slug, teamSubTab);
      window.history.pushState({ teamId: selectedTeamProfile.id, subTab: teamSubTab }, '', targetUrl);
      document.title = `${selectedTeamProfile.name} (${selectedTeamProfile.shortName}) - Tin tức, Lịch thi đấu, Kết quả & Đội hình | VnExpress Thể Thao`;
    } else if (selectedLeagueId) {
      const slug = getLeagueSlug(selectedLeagueId);
      window.history.pushState({ leagueId: selectedLeagueId }, '', `/giai-dau/${slug}`);
      const leagueObj = getLeagueById(selectedLeagueId);
      if (leagueObj) {
        document.title = `${leagueObj.vietnameseName} - Lịch thi đấu, Kết quả, BXH & Tin tức | VnExpress Thể Thao`;
      }
    } else {
      window.history.pushState({}, '', '/');
      document.title = "Lịch Thi Đấu & Kết Quả Bóng Đá VnExpress - Thể Thao 24/7";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Team Dashboard with SEO URL
  const navigateToTeam = (
    teamIdentifier: string | number, 
    subTab: 'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem' = 'tong-quan'
  ) => {
    setSelectedMatchFixture(null);
    const profile = getTeamBySlugOrId(teamIdentifier);
    setSelectedTeamProfile(profile);
    const validSubTab = subTab === ('tin-tuc' as any) ? 'tong-quan' : subTab;
    setTeamSubTab(validSubTab);
    setSelectedLeagueId(null);
    setSelectedTeam(profile.name);
    setSelectedCountry(null);
    setSearchQuery('');

    const targetUrl = getTeamUrl(profile.id, profile.slug, validSubTab);
    window.history.pushState({ teamId: profile.id, subTab: validSubTab }, '', targetUrl);
    document.title = `${profile.name} (${profile.shortName}) - Tin tức, Lịch thi đấu, Kết quả & Đội hình | VnExpress Thể Thao`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubTabChange = (newSubTab: 'tong-quan' | 'lich-thi-dau' | 'ket-qua' | 'doi-hinh' | 'bang-diem') => {
    const validSubTab = newSubTab === ('tin-tuc' as any) ? 'tong-quan' : newSubTab;
    setTeamSubTab(validSubTab);
    if (selectedTeamProfile) {
      const targetUrl = getTeamUrl(selectedTeamProfile.id, selectedTeamProfile.slug, validSubTab);
      window.history.pushState({ teamId: selectedTeamProfile.id, subTab: validSubTab }, '', targetUrl);
      
      const tabTitleMap: Record<string, string> = {
        'tong-quan': `${selectedTeamProfile.name} (${selectedTeamProfile.shortName}) - Tin tức, Lịch thi đấu, Kết quả & Đội hình | VnExpress Thể Thao`,
        'lich-thi-dau': `Lịch thi đấu ${selectedTeamProfile.name} mới nhất - Lịch đá ${selectedTeamProfile.shortName} hôm nay | VnExpress`,
        'ket-qua': `Kết quả ${selectedTeamProfile.name} - Tỷ số ${selectedTeamProfile.shortName} đêm qua | VnExpress`,
        'doi-hinh': `Đội hình ${selectedTeamProfile.name} 2026/2027 - Danh sách cầu thủ ${selectedTeamProfile.shortName} | VnExpress`,
        'bang-diem': `Bảng xếp hạng ${selectedTeamProfile.name} tại ${selectedTeamProfile.leagueName} | VnExpress`
      };
      if (tabTitleMap[validSubTab]) {
        document.title = tabTitleMap[validSubTab];
      }
    }
  };

  const handleNavigateHome = () => {
    setSelectedMatchFixture(null);
    setSelectedTeamProfile(null);
    setIsLeagueDetailView(false);
    setSelectedLeagueId(null);
    setSelectedTeam(null);
    setSelectedCountry(null);
    setSearchQuery('');
    setExpandedMatches(false);
    window.history.pushState({}, '', '/');
    document.title = "Lịch Thi Đấu & Kết Quả Bóng Đá VnExpress - Thể Thao 24/7";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to league sub-URL and sync browser history
  const handleLeagueChange = (id: number | null, openDetail: boolean = false, subTab: LeagueSubTab = 'overview') => {
    setSelectedMatchFixture(null);
    setSelectedTeamProfile(null);
    setSelectedLeagueId(id);
    setIsLeagueDetailView(openDetail || Boolean(id));
    setLeagueSubTab(subTab);
    setSelectedTeam(null);
    setSelectedCountry(null);
    setExpandedMatches(false);

    if (id) {
      const slug = getLeagueSlug(id);
      const targetUrl = getLeagueUrl(id, slug, subTab);
      window.history.pushState({ leagueId: id, subTab }, '', targetUrl);
      const leagueObj = getLeagueById(id);
      if (leagueObj) {
        const titleSuffix = 
          subTab === 'lich-thi-dau' ? `Lịch thi đấu ${leagueObj.vietnameseName} mới nhất` :
          subTab === 'ket-qua' ? `Kết quả bóng đá ${leagueObj.vietnameseName} - Tỷ số mới nhất` :
          subTab === 'standings' ? `Bảng xếp hạng ${leagueObj.vietnameseName}` :
          subTab === 'stats' ? `Thống kê & Vua phá lưới ${leagueObj.vietnameseName}` :
          `${leagueObj.vietnameseName} - Lịch thi đấu, Kết quả, BXH & Tin tức`;
        document.title = `${titleSuffix} | VnExpress Thể Thao`;
      }
    } else {
      setIsLeagueDetailView(false);
      window.history.pushState({}, '', '/');
      document.title = "Lịch Thi Đấu & Kết Quả Bóng Đá VnExpress - Thể Thao 24/7";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeagueSubTabChange = (newSubTab: LeagueSubTab) => {
    setLeagueSubTab(newSubTab);
    if (selectedLeagueId) {
      const slug = getLeagueSlug(selectedLeagueId);
      const targetUrl = getLeagueUrl(selectedLeagueId, slug, newSubTab);
      window.history.pushState({ leagueId: selectedLeagueId, subTab: newSubTab }, '', targetUrl);
      const leagueObj = getLeagueById(selectedLeagueId);
      if (leagueObj) {
        const titleSuffix = 
          newSubTab === 'lich-thi-dau' ? `Lịch thi đấu ${leagueObj.vietnameseName} mới nhất` :
          newSubTab === 'ket-qua' ? `Kết quả bóng đá ${leagueObj.vietnameseName} - Tỷ số mới nhất` :
          newSubTab === 'standings' ? `Bảng xếp hạng ${leagueObj.vietnameseName}` :
          newSubTab === 'stats' ? `Thống kê & Vua phá lưới ${leagueObj.vietnameseName}` :
          `${leagueObj.vietnameseName} - Lịch thi đấu, Kết quả, BXH & Tin tức`;
        document.title = `${titleSuffix} | VnExpress Thể Thao`;
      }
    }
  };

  // Browser back/forward button (popstate) & initial title sync
  useEffect(() => {
    if (selectedMatchFixture) {
      // SEO update is managed inside MatchDetailView or updateMatchSEO
    } else if (selectedTeamProfile) {
      document.title = `${selectedTeamProfile.name} (${selectedTeamProfile.shortName}) - Tin tức, Lịch thi đấu, Kết quả & Đội hình | VnExpress Thể Thao`;
    } else if (selectedLeagueId) {
      const leagueObj = getLeagueById(selectedLeagueId);
      if (leagueObj) {
        document.title = `${leagueObj.vietnameseName} - Lịch thi đấu, Kết quả, BXH & Tin tức | VnExpress Thể Thao`;
      }
    }

    const handlePopState = () => {
      // 1. Check match path first
      const matchId = parseMatchIdFromPath(window.location.pathname);
      if (matchId) {
        if (matchId === 1557367) {
          setSelectedMatchFixture(ARSENAL_COVENTRY_DETAIL.fixture);
          setSelectedTeamProfile(null);
          setIsLeagueDetailView(false);
          return;
        }
        const found = allFixtures.find(f => f.fixture.id === matchId);
        if (found) {
          setSelectedMatchFixture(found);
          setSelectedTeamProfile(null);
          setIsLeagueDetailView(false);
          return;
        }
      }
      setSelectedMatchFixture(null);

      // 2. Check team path
      const teamParsed = parseTeamFromPath(window.location.pathname);
      if (teamParsed) {
        const profile = getTeamBySlugOrId(teamParsed.teamSlug);
        setSelectedTeamProfile(profile);
        setTeamSubTab((teamParsed.subTab as any) || 'tong-quan');
        setSelectedLeagueId(null);
        setIsLeagueDetailView(false);
        document.title = `${profile.name} (${profile.shortName}) - Tin tức, Lịch thi đấu, Kết quả & Đội hình | VnExpress Thể Thao`;
        return;
      }

      // If not team, clear team profile
      setSelectedTeamProfile(null);

      // 3. Check league path
      const leagueDetails = parseLeagueDetailsFromPath(window.location.pathname, window.location.search);
      const leagueId = leagueDetails ? leagueDetails.leagueId : null;
      setSelectedLeagueId(leagueId);
      setIsLeagueDetailView(Boolean(leagueId));
      if (leagueDetails && leagueDetails.subTab) {
        if (leagueDetails.subTab === 'lich-thi-dau' || leagueDetails.subTab === 'ket-qua') {
          setLeagueSubTab(leagueDetails.subTab);
        } else if (leagueDetails.subTab === 'bang-xep-hang') {
          setLeagueSubTab('standings');
        } else if (leagueDetails.subTab === 'thong-ke') {
          setLeagueSubTab('stats');
        } else {
          setLeagueSubTab('overview');
        }
      } else {
        setLeagueSubTab('overview');
      }
      setSelectedTeam(null);
      setSelectedCountry(null);
      setExpandedMatches(false);
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('ket-qua') && !leagueId) {
        setCurrentTab('results');
        document.title = "Kết quả bóng đá hôm nay - Tỷ số, KQBD mới nhất | VnExpress";
      } else if (currentPath.includes('truc-tiep') && !leagueId) {
        setCurrentTab('live');
        document.title = "Trực tiếp bóng đá hôm nay - Tỷ số trực tuyến 24/7 | VnExpress";
      } else if (leagueId) {
        const leagueObj = getLeagueById(leagueId);
        if (leagueObj) {
          const sTab = leagueDetails?.subTab || 'tong-quan';
          const titleSuffix = 
            sTab === 'lich-thi-dau' ? `Lịch thi đấu ${leagueObj.vietnameseName} mới nhất` :
            sTab === 'ket-qua' ? `Kết quả bóng đá ${leagueObj.vietnameseName} - Tỷ số mới nhất` :
            sTab === 'bang-xep-hang' ? `Bảng xếp hạng ${leagueObj.vietnameseName}` :
            sTab === 'thong-ke' ? `Thống kê & Vua phá lưới ${leagueObj.vietnameseName}` :
            `${leagueObj.vietnameseName} - Lịch thi đấu, Kết quả, BXH & Tin tức`;
          document.title = `${titleSuffix} | VnExpress Thể Thao`;
        }
      } else {
        setCurrentTab('schedule');
        document.title = "Lịch thi đấu bóng đá hôm nay - Lịch bóng đá, KQBD mới nhất | VnExpress";
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedMatchFixture, selectedTeamProfile, selectedLeagueId, allFixtures]);

  // Mobile sidebar drawers
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isStandingsDrawerOpen, setIsStandingsDrawerOpen] = useState(false);

  // Favorites / Starred matches
  const [favoriteMatchIds, setFavoriteMatchIds] = useState<Set<number>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [activeHighlightMatch, setActiveHighlightMatch] = useState<FixtureItem | null>(null);
  const [activeDetailMatch, setActiveDetailMatch] = useState<FixtureItem | null>(null);
  const [selectedStandingLeagueId, setSelectedStandingLeagueId] = useState<number | null>(null);

  // Real-time synchronization with VnExpress APIs: Premier League (39) & Champions League (2)
  useEffect(() => {
    let active = true;

    async function syncRealData() {
      try {
        const [realPL, realCL, realEL, realLL, realVL, realSA, realBL, realL1, realSaudi, realMls, realFa, realCar] = await Promise.all([
          fetchRealPremierLeagueFixtures().catch(() => []),
          fetchRealChampionsLeagueFixtures().catch(() => []),
          fetchRealEuropaLeagueFixtures().catch(() => []),
          fetchRealLaLigaFixtures().catch(() => []),
          fetchRealVLeagueFixtures().catch(() => []),
          fetchRealSerieAFixtures().catch(() => []),
          fetchRealBundesligaFixtures().catch(() => []),
          fetchRealLigue1Fixtures().catch(() => []),
          fetchRealSaudiFixtures().catch(() => []),
          fetchRealMlsFixtures().catch(() => []),
          fetchRealFaCupFixtures().catch(() => []),
          fetchRealCarabaoCupFixtures().catch(() => [])
        ]);

        if (active) {
          setAllFixtures(prev => {
            let updated = prev;
            if (realPL.length > 0) updated = [...updated.filter(f => f.league.id !== 39), ...realPL];
            if (realCL.length > 0) updated = [...updated.filter(f => f.league.id !== 2), ...realCL];
            if (realEL.length > 0) updated = [...updated.filter(f => f.league.id !== 3), ...realEL];
            if (realLL.length > 0) updated = [...updated.filter(f => f.league.id !== 140), ...realLL];
            if (realVL.length > 0) updated = [...updated.filter(f => f.league.id !== 340 && f.league.id !== 382), ...realVL];
            if (realSA.length > 0) updated = [...updated.filter(f => f.league.id !== 135), ...realSA];
            if (realBL.length > 0) updated = [...updated.filter(f => f.league.id !== 78), ...realBL];
            if (realL1.length > 0) updated = [...updated.filter(f => f.league.id !== 61), ...realL1];
            if (realSaudi.length > 0) updated = [...updated.filter(f => f.league.id !== 307), ...realSaudi];
            if (realMls.length > 0) updated = [...updated.filter(f => f.league.id !== 253), ...realMls];
            if (realFa.length > 0) updated = [...updated.filter(f => f.league.id !== 45), ...realFa];
            if (realCar.length > 0) updated = [...updated.filter(f => f.league.id !== 48), ...realCar];
            return updated;
          });
        }
      } catch (e) {
        console.error("VnExpress real fixtures fetch error:", e);
      }
    }

    syncRealData();
    const interval = setInterval(syncRealData, 60000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleTabChange = (tab: 'schedule' | 'results' | 'live' | 'favorites') => {
    setSelectedMatchFixture(null);
    setSelectedTeamProfile(null);
    setIsLeagueDetailView(false);
    setSelectedLeagueId(null);
    setSelectedTeam(null);
    setSelectedCountry(null);
    setCurrentTab(tab);
    setExpandedMatches(false);
    if (tab === 'results') {
      // Kết quả: chỉ show data của các ngày cũ và ngày hôm nay
      setSelectedDate(todayDateStr);
      window.history.pushState({ tab: 'results' }, '', '/ket-qua');
      document.title = "Kết quả bóng đá hôm nay - Tỷ số, KQBD mới nhất | VnExpress";
    } else if (tab === 'schedule') {
      // Lịch thi đấu: chỉ show data của hôm nay và các ngày tương lai
      setSelectedDate(todayDateStr);
      window.history.pushState({ tab: 'schedule' }, '', '/');
      document.title = "Lịch thi đấu bóng đá hôm nay - Lịch bóng đá, KQBD mới nhất | VnExpress";
    } else if (tab === 'live') {
      setSelectedDate(todayDateStr);
      window.history.pushState({ tab: 'live' }, '', '/truc-tiep');
      document.title = "Trực tiếp bóng đá hôm nay - Tỷ số trực tuyến 24/7 | VnExpress";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (fixture: FixtureItem) => {
    const id = fixture.fixture.id;
    setFavoriteMatchIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToastMessage(`Đã hủy theo dõi trận ${fixture.teams.home.name} vs ${fixture.teams.away.name}`);
      } else {
        next.add(id);
        setToastMessage(`Đã thêm vào danh sách theo dõi: ${fixture.teams.home.name} vs ${fixture.teams.away.name} ⭐`);
      }
      return next;
    });

    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const liveCount = useMemo(() => {
    return allFixtures.filter(f => isFixtureLive(f, todayDateStr)).length;
  }, [allFixtures, todayDateStr]);

  const highlightCount = useMemo(() => {
    return allFixtures.filter(f => f.has_highlight).length;
  }, [allFixtures]);

  // Main Filtered matches list
  const filteredMatches = useMemo(() => {
    let list = [...allFixtures];

    // Sidebar: Team filter
    if (selectedTeam) {
      list = list.filter(f => 
        f.teams.home.name.toLowerCase().includes(selectedTeam.toLowerCase()) ||
        f.teams.away.name.toLowerCase().includes(selectedTeam.toLowerCase())
      );
    }

    // Sidebar: League filter
    if (selectedLeagueId) {
      list = list.filter(f => f.league.id === selectedLeagueId);
    }

    // Sidebar: Region/Country filter
    if (selectedCountry) {
      list = list.filter(f => 
        f.league.country.toLowerCase() === selectedCountry.toLowerCase() ||
        (selectedCountry === "UEFA" && f.league.id === 2)
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(f => 
        f.teams.home.name.toLowerCase().includes(q) ||
        f.teams.away.name.toLowerCase().includes(q) ||
        f.league.name.toLowerCase().includes(q) ||
        f.league.vietnameseName.toLowerCase().includes(q)
      );
      return sortFixtures(list, currentTab === 'results' ? 'results' : 'schedule');
    }

    // User requirement:
    // Khi ấn xem 'Live' show data các trận đang Live lên trên đầu, 
    // đồng thời show các trận tiếp theo trong 24h tới kể từ thời điểm đang xem.
    if (currentTab === 'live') {
      const currentSimTime = new Date("2026-10-13T08:00:00+07:00").getTime();
      const in24hTime = currentSimTime + 24 * 60 * 60 * 1000;

      list = list.filter(f => {
        const isLive = isFixtureLive(f, todayDateStr);
        if (isLive) return true;
        // Trận tiếp theo trong 24h tới (chưa đấu hoặc sắp đá)
        const matchTime = new Date(f.fixture.date).getTime();
        const isUpcoming = ['NS', 'COUNTDOWN'].includes(f.fixture.status.short) && f.fixture.status.long !== 'Match Finished';
        return isUpcoming && matchTime >= currentSimTime && matchTime <= in24hTime;
      });

      return list.sort((a, b) => {
        const isLiveA = isFixtureLive(a, todayDateStr);
        const isLiveB = isFixtureLive(b, todayDateStr);
        if (isLiveA && !isLiveB) return -1;
        if (!isLiveA && isLiveB) return 1;
        if (isLiveA && isLiveB) {
          return (b.fixture.status.elapsed || 0) - (a.fixture.status.elapsed || 0);
        }
        // Các trận tiếp theo sắp xếp theo giờ đá sớm nhất (Kickoff Time ASC)
        return a.fixture.timestamp - b.fixture.timestamp;
      });
    }

    if (currentTab === 'favorites') {
      list = list.filter(f => favoriteMatchIds.has(f.fixture.id));
      return sortFixtures(list, 'schedule');
    }

    if (currentTab === 'results') {
      // Trang Kết quả: chỉ show data của các ngày cũ và ngày hôm nay
      list = list.filter(f => {
        const matchDay = getFootballDayString(f.fixture.date);
        return matchDay <= todayDateStr && (isFixtureLive(f, todayDateStr) || f.fixture.status.short === 'FT' || f.fixture.status.short === 'AET' || f.fixture.status.long === 'Match Finished');
      });
    } else if (currentTab === 'schedule') {
      // Trang Lịch thi đấu: chỉ show data của hôm nay và các ngày tương lai
      list = list.filter(f => {
        const matchDay = getFootballDayString(f.fixture.date);
        return matchDay >= todayDateStr;
      });
    }

    // Filter by selected date on date bar
    list = list.filter(f => getFootballDayString(f.fixture.date) === selectedDate);

    return sortFixtures(list, currentTab === 'results' ? 'results' : 'schedule');
  }, [allFixtures, currentTab, selectedDate, selectedTeam, selectedLeagueId, selectedCountry, searchQuery, favoriteMatchIds, todayDateStr]);

  // Group by league for LiveScore view
  const groupedByLeague = useMemo(() => {
    const map = new Map<number, LeagueGroup>();
    filteredMatches.forEach(f => {
      const lId = f.league.id;
      if (!map.has(lId)) {
        map.set(lId, {
          leagueId: lId,
          leagueName: f.league.name,
          leagueVietnameseName: f.league.vietnameseName,
          logo: f.league.logo,
          flag: f.league.flag,
          tier: f.league.tier,
          fixtures: []
        });
      }
      map.get(lId)!.fixtures.push(f);
    });
    const groups = Array.from(map.values());
    if (currentTab === 'live') {
      // In LIVE tab: prioritize leagues with currently live matches
      return groups.sort((a, b) => {
        const hasLiveA = a.fixtures.some(f => isFixtureLive(f, todayDateStr));
        const hasLiveB = b.fixtures.some(f => isFixtureLive(f, todayDateStr));
        if (hasLiveA && !hasLiveB) return -1;
        if (!hasLiveA && hasLiveB) return 1;
        return a.tier - b.tier;
      });
    }
    return groups.sort((a, b) => a.tier - b.tier);
  }, [filteredMatches, currentTab, todayDateStr]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#222222] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-white text-gray-900 text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xl border border-gray-200 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VnExpress Header */}
      <VnExpressHeader
        currentTab={
          isLeagueDetailView || selectedTeamProfile || selectedMatchFixture
            ? null
            : (currentTab === 'favorites' ? 'schedule' : currentTab)
        }
        onTabChange={(tab) => {
          setSelectedMatchFixture(null);
          setSelectedTeamProfile(null);
          setIsLeagueDetailView(false);
          setSelectedLeagueId(null);
          setSelectedTeam(null);
          setSelectedCountry(null);
          handleTabChange(tab as any);
        }}
        liveCount={liveCount}
        highlightCount={highlightCount}
        onOpenLeaguesDrawer={() => setMobileMenuOpen(true)}
        onOpenStandingsDrawer={() => setIsStandingsDrawerOpen(true)}
        hasActiveFilters={Boolean(selectedTeam || selectedLeagueId || selectedCountry || searchQuery)}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Container with 3-Column LiveScore layout or Dedicated Match Detail Center */}
      <div className="max-w-[1130px] w-full mx-auto px-2.5 sm:px-4 py-3 sm:py-4 flex-1">
        {selectedMatchFixture ? (
          <MatchDetailView
            fixture={selectedMatchFixture}
            onBack={handleBackFromMatch}
            onOpenHighlightModal={(f) => setActiveHighlightMatch(f)}
            onLeagueClick={(leagueId) => {
              setSelectedMatchFixture(null);
              handleLeagueChange(leagueId);
            }}
            allFixtures={allFixtures}
            onNavigateToMatch={navigateToMatch}
          />
        ) : selectedTeamProfile ? (
          <TeamDashboard
            team={selectedTeamProfile}
            currentSubTab={teamSubTab}
            onSubTabChange={handleSubTabChange}
            onNavigateHome={handleNavigateHome}
            onOpenDetails={navigateToMatch}
            onOpenHighlight={(f) => setActiveHighlightMatch(f)}
            onToggleFavorite={handleToggleFavorite}
            favoriteMatchIds={favoriteMatchIds}
            allFixtures={allFixtures}
            onSelectTeam={navigateToTeam}
          />
        ) : isLeagueDetailView && selectedLeague ? (
          <LeagueDetailView
            league={selectedLeague}
            fixtures={allFixtures}
            currentSubTab={leagueSubTab}
            onSubTabChange={handleLeagueSubTabChange}
            onBackToHome={handleNavigateHome}
            onOpenMatchDetails={navigateToMatch}
            onOpenHighlight={(f) => setActiveHighlightMatch(f)}
            onSelectTeam={navigateToTeam}
          />
        ) : (
          <>
            {/* Mobile & Tablet Quick Bar (Dual Filter & Standings Trigger) */}
            <div className="lg:hidden flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-lg border border-gray-200 shadow-2xs"
                >
                  <Filter className="w-3.5 h-3.5 text-[#9f224e]" />
                  <span>Giải đấu &amp; Đội bóng</span>
                  {(selectedTeam || selectedLeagueId || selectedCountry || searchQuery) && (
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  )}
                </button>

                <button
                  onClick={() => setIsStandingsDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-lg border border-gray-200 shadow-2xs"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#9f224e]" />
                  <span>{selectedLeague ? `BXH ${selectedLeague.vietnameseName}` : 'Bảng xếp hạng'}</span>
                </button>
              </div>

              {(selectedTeam || selectedLeagueId || selectedCountry || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTeam(null);
                    handleLeagueChange(null);
                    setSelectedCountry(null);
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-red-600 hover:text-red-700 font-bold underline truncate max-w-[140px] text-right"
                  title="Nhấn để bỏ lọc"
                >
                  Xóa lọc: {selectedTeam || (selectedLeague ? selectedLeague.vietnameseName : "") || selectedCountry || "Tìm kiếm"}
                </button>
              )}
            </div>

            {/* 3-Column Layout: Left Sidebar + Center Match Content + Right Hot Leagues Sidebar */}
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              
              {/* Column 1: LiveScore Left Sidebar (210px width) */}
              <div className="hidden lg:block w-[210px] xl:w-[220px] flex-shrink-0 sticky top-14">
                <LiveScoreSidebar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedTeam={selectedTeam}
                  onSelectTeam={(teamName) => {
                    if (teamName) {
                      navigateToTeam(teamName);
                    } else {
                      setSelectedTeam(null);
                    }
                  }}
                  selectedLeagueId={selectedLeagueId}
                  onSelectLeagueId={handleLeagueChange}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                />
              </div>

              {/* Column 2: Center Main Match Content (Narrowed/flexible width to accommodate right sidebar) */}
              <div className="flex-1 min-w-0 space-y-4">
                
                {/* Breadcrumbs & League Header Banner when viewing a specific league sub-URL */}
                {selectedLeague && (
                  <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-xs">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5">
                      <button 
                        onClick={() => handleLeagueChange(null)}
                        className="hover:text-[#9f224e] hover:underline"
                      >
                        Trang chủ
                      </button>
                      <span>/</span>
                      <span>Thể thao</span>
                      <span>/</span>
                      <span>Bóng đá</span>
                      <span>/</span>
                      <span className="text-gray-900 font-bold">{selectedLeague.vietnameseName}</span>
                    </div>

                    {/* League Title Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <img 
                          src={selectedLeague.logo} 
                          alt={selectedLeague.name} 
                          className="w-10 h-10 object-contain p-1 bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0"
                        />
                        <div>
                          <h1 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span>{selectedLeague.vietnameseName}</span>
                            <span className="text-xs text-[#9f224e] bg-rose-50 px-2 py-0.5 rounded font-mono font-bold border border-rose-200">
                              Mùa {selectedLeague.season}
                            </span>
                          </h1>
                          <p className="text-xs text-gray-500">
                            {formatCountryVN(selectedLeague.country)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLeagueChange(selectedLeague.id, true)}
                        className="self-start sm:self-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 flex items-center transition cursor-pointer"
                      >
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Top Bar with Date Carousel and LIVE button */}
                <LiveScoreTopBar
                  currentTab={currentTab}
                  onTabChange={handleTabChange}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setSearchQuery('');
                    setExpandedMatches(false);
                  }}
                  todayDate={todayDateStr}
                  yesterdayDate={yesterdayDateStr}
                  tomorrowDate={tomorrowDateStr}
                  dateList={activeDateList}
                  liveCount={liveCount}
                  minDate={currentTab === 'schedule' ? todayDateStr : undefined}
                  maxDate={currentTab === 'results' ? todayDateStr : undefined}
                />

                {/* Matches Grouped by League Header */}
                {groupedByLeague.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-xs space-y-3">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      {currentTab === 'live' 
                        ? `Hiện không có trận nào đang Live hoặc sắp diễn ra trong 24h tới` 
                        : currentTab === 'favorites' 
                        ? "Bạn chưa đánh dấu theo dõi trận đấu nào"
                        : `Không có trận đấu nào trong ngày được chọn`}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      {currentTab === 'live'
                        ? "Hệ thống sẽ tự động cập nhật ngay khi các trận đấu khởi tranh. Bạn có thể xem lịch thi đấu hoặc kết quả các trận gần nhất."
                        : currentTab === 'favorites' 
                        ? "Nhấn vào biểu tượng ngôi sao ☆ ở bên phải mỗi trận để lưu và theo dõi nhanh tại đây."
                        : "Hãy thử chọn ngày khác trên thanh ngày ở trên hoặc nhấn nút bên dưới để xem tất cả trận hôm nay."}
                    </p>
                    <div className="pt-2 flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTeam(null);
                          setSearchQuery('');
                          setCurrentTab('schedule');
                          setSelectedDate(todayDateStr);
                        }}
                        className="px-4 py-2 bg-[#9f224e] hover:bg-[#831b40] text-white text-xs font-bold rounded-lg transition"
                      >
                        Xem lịch thi đấu hôm nay
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {groupedByLeague.map((group) => {
                      const isLeagueView = Boolean(selectedLeagueId);
                      const fixtures = group.fixtures;
                      const hasMoreThan5 = isLeagueView && fixtures.length > 5;
                      const visibleFixtures = (hasMoreThan5 && !expandedMatches) ? fixtures.slice(0, 5) : fixtures;

                      return (
                        <div 
                          key={group.leagueId} 
                          className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden shadow-xs"
                        >
                          {/* League Header */}
                          <div className="bg-[#fafafa] px-3.5 py-2 border-b border-[#e5e5e5] flex items-center justify-between font-bai">
                            <div className="flex items-center gap-2">
                              <img 
                                src={group.logo} 
                                alt={group.leagueName} 
                                className="w-5 h-5 object-contain" 
                                loading="lazy" 
                              />
                              <div>
                                <h2 className="text-xs sm:text-[13px] font-bold text-[#222222] flex items-center gap-1.5 leading-tight">
                                  <span>{group.leagueName}</span>
                                </h2>
                                <span className="text-[10px] text-[#636B79] block font-normal">
                                  {formatRoundVN(group.fixtures[0]?.league.round, undefined, group.leagueId) || group.fixtures[0]?.league.country}
                                </span>
                              </div>
                            </div>

                            {selectedLeagueId !== group.leagueId && (
                              <button
                                onClick={() => handleLeagueChange(group.leagueId)}
                                className="text-xs text-[#9f224e] hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
                              >
                                <span>Xem chi tiết</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Match List for this league */}
                          <div className="divide-y divide-[#f0f0f0]">
                            {visibleFixtures.map((fixture) => (
                              <LiveScoreMatchItem
                                key={fixture.fixture.id}
                                fixture={fixture}
                                mode={currentTab}
                                onOpenDetails={navigateToMatch}
                                onOpenHighlight={(f) => setActiveHighlightMatch(f)}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={favoriteMatchIds.has(fixture.fixture.id)}
                                onSelectTeam={(teamName) => navigateToTeam(teamName)}
                              />
                            ))}
                          </div>

                          {/* Expand / Collapse Button (Show max 5 matches by default, expand on click) */}
                          {hasMoreThan5 && (
                            <div className="p-2.5 bg-[#fbfcfd] border-t border-[#f0f0f0] flex items-center justify-center font-bai">
                              <button
                                onClick={() => setExpandedMatches(!expandedMatches)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-[#9f224e] border border-[#e5e5e5] text-xs font-bold rounded-md shadow-2xs transition cursor-pointer"
                              >
                                {expandedMatches ? (
                                  <>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                    <span>Thu gọn (chỉ xem 5 trận đầu)</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                    <span>Xem thêm ({fixtures.length - 5} trận còn lại hôm nay)</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Trong 2 trang Lịch thi đấu, Kết quả: Show tin tức bóng đá dạng 1 hàng duy nhất theo mẫu VnExpress */}
                {(currentTab === 'schedule' || currentTab === 'results') ? (
                  <GeneralFootballNewsSection
                    leagueId={selectedLeagueId}
                    leagueName={selectedLeague?.vietnameseName || selectedLeague?.name}
                  />
                ) : (
                  selectedLeagueId && (
                    <LeagueNewsSection
                      leagueId={selectedLeagueId}
                      leagueName={selectedLeague?.vietnameseName || selectedLeague?.name || "Giải đấu"}
                    />
                  )
                )}

                {/* Mobile & Tablet Inline Standings Section (Always accessible when scrolling down on phone/tablet) */}
                <div className="lg:hidden mt-6 pt-5 border-t border-gray-200">
                  {selectedLeague ? (
                    <FullLeagueStandings
                      league={selectedLeague}
                      onSelectTeam={(teamName) => {
                        navigateToTeam(teamName);
                      }}
                      onBackToHotLeagues={() => handleLeagueChange(null)}
                      variant="compact"
                      onOpenDetailedStandings={() => handleLeagueChange(selectedLeague.id, true, 'standings')}
                    />
                  ) : (
                    <HotLeaguesSidebar
                      onViewLeague={(leagueId) => handleLeagueChange(leagueId)}
                      onSelectTeam={(teamName) => {
                        navigateToTeam(teamName);
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Column 3: Right Sidebar - Full Standings for Selected League OR 5 Hot Leagues Summary (280px-295px width) */}
              <div className="hidden lg:block w-[280px] xl:w-[295px] flex-shrink-0 sticky top-14">
                {selectedLeague ? (
                  <FullLeagueStandings
                    league={selectedLeague}
                    onSelectTeam={(teamName) => navigateToTeam(teamName)}
                    onBackToHotLeagues={() => handleLeagueChange(null)}
                    variant="compact"
                    onOpenDetailedStandings={() => handleLeagueChange(selectedLeague.id, true, 'standings')}
                  />
                ) : (
                  <HotLeaguesSidebar
                    onViewLeague={(leagueId) => handleLeagueChange(leagueId)}
                    onSelectTeam={(teamName) => navigateToTeam(teamName)}
                  />
                )}
              </div>

            </div>
          </>
        )}
      </div>

      {/* Floating Fast Action Bar for Mobile Phones (<640px) */}
      <div className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-gray-200 shadow-xl flex items-center gap-3 select-none text-gray-800">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black"
        >
          <Filter className="w-3.5 h-3.5 text-[#9f224e]" />
          <span>Giải &amp; Đội</span>
          {(selectedTeam || selectedLeagueId || selectedCountry || searchQuery) && (
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
          )}
        </button>
        <span className="w-px h-3.5 bg-gray-200"></span>
        <button
          onClick={() => setIsStandingsDrawerOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black"
        >
          <Trophy className="w-3.5 h-3.5 text-[#9f224e]" />
          <span>Bảng xếp hạng</span>
        </button>
      </div>



      {/* Mobile Sidebar Modal/Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-[85%] max-w-xs bg-white h-full overflow-y-auto p-3.5 space-y-3 shadow-2xl border-r border-gray-200">
            <LiveScoreSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTeam={selectedTeam}
              onSelectTeam={(t) => {
                if (t) {
                  navigateToTeam(t);
                } else {
                  setSelectedTeam(null);
                }
                setMobileMenuOpen(false);
              }}
              selectedLeagueId={selectedLeagueId}
              onSelectLeagueId={(id) => {
                handleLeagueChange(id);
                setMobileMenuOpen(false);
              }}
              selectedCountry={selectedCountry}
              onSelectCountry={(c) => {
                setSelectedCountry(c);
                setMobileMenuOpen(false);
              }}
              onCloseDrawer={() => setMobileMenuOpen(false)}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Mobile Standings Drawer */}
      {isStandingsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="flex-1" onClick={() => setIsStandingsDrawerOpen(false)}></div>
          <div className="w-[88%] max-w-sm sm:max-w-md bg-white h-full overflow-y-auto p-3.5 space-y-3 shadow-2xl border-l border-gray-200">
            {selectedLeague ? (
              <FullLeagueStandings
                league={selectedLeague}
                onSelectTeam={(teamName) => {
                  navigateToTeam(teamName);
                  setIsStandingsDrawerOpen(false);
                }}
                onBackToHotLeagues={() => handleLeagueChange(null)}
                onCloseDrawer={() => setIsStandingsDrawerOpen(false)}
                variant="compact"
                onOpenDetailedStandings={() => {
                  setIsStandingsDrawerOpen(false);
                  handleLeagueChange(selectedLeague.id, true, 'standings');
                }}
              />
            ) : (
              <HotLeaguesSidebar
                onViewLeague={(leagueId) => {
                  handleLeagueChange(leagueId);
                  setIsStandingsDrawerOpen(false);
                }}
                onSelectTeam={(teamName) => {
                  navigateToTeam(teamName);
                  setIsStandingsDrawerOpen(false);
                }}
                onCloseDrawer={() => setIsStandingsDrawerOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <VideoHighlightModal
        fixture={activeHighlightMatch}
        onClose={() => setActiveHighlightMatch(null)}
      />

      <MatchDetailModal
        fixture={activeDetailMatch}
        onClose={() => setActiveDetailMatch(null)}
        onOpenHighlight={(f) => setActiveHighlightMatch(f)}
        onToggleReminder={handleToggleFavorite}
        isReminded={activeDetailMatch ? favoriteMatchIds.has(activeDetailMatch.fixture.id) : false}
        onNavigateToFullMatch={navigateToMatch}
      />

      <LeagueStandingsModal
        leagueId={selectedStandingLeagueId}
        onClose={() => setSelectedStandingLeagueId(null)}
        onSelectTeam={(t) => setSelectedTeam(t)}
      />
    </div>
  );
}
