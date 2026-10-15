import { FixtureItem } from '../types/football';

/**
 * Football Day Cycle (Rule 1):
 * Day starts at 06:00:00 GMT+7 and ends at 05:59:59 GMT+7 the next morning.
 * For example: A match at 02:00 AM on Oct 1st GMT+7 belongs to Football Day Sep 30th!
 */
export function getFootballDayString(utcDateIso: string): string {
  // VnExpress API fixture dates are already ISO strings in GMT+7 (e.g. "2026-10-13T02:00:00+07:00")
  if (utcDateIso.includes('+07:00')) {
    return utcDateIso.slice(0, 10);
  }
  const d = new Date(utcDateIso);
  // Convert UTC date to GMT+7 timestamp
  const vnTimestamp = d.getTime() + 7 * 60 * 60 * 1000;
  const vnDate = new Date(vnTimestamp);

  const yyyy = vnDate.getUTCFullYear();
  const mm = String(vnDate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(vnDate.getUTCDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Format country name to Vietnamese
 */
export function formatCountryVN(country?: string): string {
  if (!country) return '';
  const trimmed = country.trim();
  const map: Record<string, string> = {
    'England': 'Anh',
    'France': 'Pháp',
    'Spain': 'Tây Ban Nha',
    'Germany': 'Đức',
    'Italy': 'Italy',
    'Ý': 'Italy',
    'USA': 'Mỹ',
    'United States': 'Mỹ',
    'Vietnam': 'Việt Nam',
    'Saudi Arabia': 'Ả Rập Xê Út',
    'UEFA': 'Châu Âu'
  };
  return map[trimmed] || trimmed;
}


/**
 * Format UTC ISO string to Vietnam Kickoff Time (GMT+7)
 */
export function formatKickoffVN(utcDateIso: string) {
  const d = new Date(utcDateIso);
  // Add 7 hours
  const vnTimestamp = d.getTime() + 7 * 60 * 60 * 1000;
  const vnDate = new Date(vnTimestamp);

  const hours = String(vnDate.getUTCHours()).padStart(2, '0');
  const minutes = String(vnDate.getUTCMinutes()).padStart(2, '0');
  const day = String(vnDate.getUTCDate()).padStart(2, '0');
  const month = String(vnDate.getUTCMonth() + 1).padStart(2, '0');
  const year = vnDate.getUTCFullYear();

  const isLateNight = vnDate.getUTCHours() < 6;
  const isEvening = vnDate.getUTCHours() >= 18;

  return {
    time: `${hours}:${minutes}`,
    dateVN: `${day}/${month}`,
    fullDateVN: `${day}/${month}/${year}`,
    isLateNight,
    isEvening,
    rawHour: vnDate.getUTCHours()
  };
}

/**
 * Format date label for Date Bar (e.g. "Hôm nay 30/09", "Thứ Hai 28/09")
 */
export function formatDayBarLabel(dateStr: string, activeTodayStr: string, yesterdayStr: string, tomorrowStr: string) {
  const parts = dateStr.split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dateObj = new Date(y, m, d);

  const dayOfWeek = dateObj.getDay();
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayName = days[dayOfWeek];

  const shortDate = `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}`;

  if (dateStr === activeTodayStr) {
    return { title: 'HÔM NAY', subtitle: shortDate, isToday: true, isSpecial: true };
  }
  if (dateStr === yesterdayStr) {
    return { title: 'Hôm qua', subtitle: shortDate, isToday: false, isSpecial: true };
  }
  if (dateStr === tomorrowStr) {
    return { title: 'Ngày mai', subtitle: shortDate, isToday: false, isSpecial: true };
  }

  return { title: dayName, subtitle: shortDate, isToday: false, isSpecial: false };
}

/**
 * Checks if a fixture is currently actively LIVE (in progress).
 * Excludes finished matches and matches from previous days.
 */
export function isFixtureLive(fixture: FixtureItem, todayDateStr: string = '2026-10-13'): boolean {
  if (fixture.fixture.status.long === 'Match Finished' || fixture.fixture.status.long === 'Finished') {
    return false;
  }
  const matchDay = getFootballDayString(fixture.fixture.date);
  if (matchDay < todayDateStr) {
    return false;
  }
  if (['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short)) {
    return true;
  }
  if (fixture.fixture.status.short === 'PEN' && fixture.fixture.status.long !== 'Match Finished') {
    return true;
  }
  return false;
}

export function isFixtureFinished(fixture: FixtureItem): boolean {
  if (fixture.fixture.status.long === 'Match Finished' || fixture.fixture.status.long === 'Finished') {
    return true;
  }
  return ['FT', 'AET'].includes(fixture.fixture.status.short) || (fixture.fixture.status.short === 'PEN' && fixture.fixture.status.long === 'Match Finished');
}

/**
 * Status priority weight for Sorting (Rule 3)
 * LIVE > COUNTDOWN > SCHEDULED > FINISHED > POSTPONED
 */
export function getStatusPriority(statusShort: string, statusLong?: string): number {
  if (statusLong === 'Match Finished' || statusLong === 'Finished') {
    return 4;
  }
  switch (statusShort) {
    case '1H':
    case '2H':
    case 'HT':
    case 'ET':
    case 'LIVE':
      return 1; // Highest
    case 'PEN':
      return statusLong && statusLong !== 'Match Finished' ? 1 : 4;
    case 'COUNTDOWN':
      return 2;
    case 'NS':
      return 3;
    case 'FT':
    case 'AET':
      return 4;
    case 'POSTP':
    case 'CANC':
      return 5;
    default:
      return 6;
  }
}

/**
 * Sort algorithm (Rule 3)
 */
export function sortFixtures(fixtures: FixtureItem[], mode: 'schedule' | 'results' = 'schedule'): FixtureItem[] {
  return [...fixtures].sort((a, b) => {
    if (mode === 'results') {
      // In results mode: LIVE first, then recent FT by timestamp desc, then Tier
      const pA = getStatusPriority(a.fixture.status.short, a.fixture.status.long);
      const pB = getStatusPriority(b.fixture.status.short, b.fixture.status.long);
      if (pA !== pB && (pA === 1 || pB === 1)) {
        return pA - pB;
      }
      // If both finished or both live, sort by timestamp DESC (most recent first)
      if (a.fixture.timestamp !== b.fixture.timestamp) {
        return b.fixture.timestamp - a.fixture.timestamp;
      }
      return a.league.tier - b.league.tier;
    }

    // Schedule mode: Status Priority -> League Tier -> Kickoff Time ASC
    const statusDiff = getStatusPriority(a.fixture.status.short, a.fixture.status.long) - getStatusPriority(b.fixture.status.short, b.fixture.status.long);
    if (statusDiff !== 0) return statusDiff;

    const tierDiff = a.league.tier - b.league.tier;
    if (tierDiff !== 0) return tierDiff;

    return a.fixture.timestamp - b.fixture.timestamp;
  });
}

/**
 * Group fixtures by League
 */
export interface LeagueGroup {
  leagueId: number;
  leagueName: string;
  leagueVietnameseName: string;
  logo: string;
  flag: string;
  tier: 1 | 2 | 3 | 4;
  fixtures: FixtureItem[];
}

export function groupFixturesByLeague(fixtures: FixtureItem[]): {
  tier1: LeagueGroup[];
  tier2: LeagueGroup[];
  tier3: LeagueGroup[];
  tier4: LeagueGroup[];
} {
  const map = new Map<number, LeagueGroup>();

  fixtures.forEach((f) => {
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

  const tier1: LeagueGroup[] = [];
  const tier2: LeagueGroup[] = [];
  const tier3: LeagueGroup[] = [];
  const tier4: LeagueGroup[] = [];

  map.forEach((grp) => {
    if (grp.tier === 1) tier1.push(grp);
    else if (grp.tier === 2) tier2.push(grp);
    else if (grp.tier === 3) tier3.push(grp);
    else tier4.push(grp);
  });

  return { tier1, tier2, tier3, tier4 };
}

/**
 * Format round name to Vietnamese:
 * - "Regular Season - 6" -> "Vòng 6"
 * - For UEFA Champions League & Europa League: "League Stage - 1" -> "Vòng phân hạng - 1", "Vòng phân hạng - 2", etc.
 */
export function formatRoundVN(
  round?: string | null, 
  roundInt?: number | null, 
  leagueId?: number | null
): string {
  const isUefa = leagueId === 2 || leagueId === 3;

  if (!round && !roundInt) return isUefa ? 'Vòng phân hạng' : 'Vòng đấu';
  if (!round && roundInt) return isUefa ? `Vòng phân hạng - ${roundInt}` : `Vòng ${roundInt}`;

  const r = String(round).trim();

  // 1. UEFA League Stage (Swiss model in Champions League & Europa League):
  // "League Stage - 1" -> "Vòng phân hạng - 1", "League Stage - 2" -> "Vòng phân hạng - 2"
  const leagueStageMatch = r.match(/^league\s+stage\s*[-–—:]?\s*(\d+)/i);
  if (leagueStageMatch) {
    return `Vòng phân hạng - ${leagueStageMatch[1]}`;
  }
  if (/^league\s+stage$/i.test(r)) {
    return roundInt ? `Vòng phân hạng - ${roundInt}` : 'Vòng phân hạng';
  }

  // If this is UEFA Champions League (2) or Europa League (3), format any group stage or regular round as "Vòng phân hạng - X"
  if (isUefa) {
    const groupMatch = r.match(/^(?:group\s+stage|vòng\s+bảng|regular\s+season|round|matchday)\s*[-–—:]?\s*(\d+)/i);
    if (groupMatch) {
      return `Vòng phân hạng - ${groupMatch[1]}`;
    }
    const numOnlyMatch = r.match(/^vòng\s+(\d+)$/i);
    if (numOnlyMatch) {
      return `Vòng phân hạng - ${numOnlyMatch[1]}`;
    }
    if (/^(?:group\s+stage|vòng\s+bảng)$/i.test(r)) {
      return roundInt ? `Vòng phân hạng - ${roundInt}` : 'Vòng phân hạng';
    }
  }

  // 2. Regular Season - X (e.g. "Regular Season - 6" -> "Vòng 6", "Regular Season - 7" -> "Vòng 7")
  const regSeasonMatch = r.match(/^regular\s+season\s*[-–—:]?\s*(\d+)/i);
  if (regSeasonMatch) {
    return `Vòng ${regSeasonMatch[1]}`;
  }

  // If just "Regular Season" without a number
  if (/^regular\s+season$/i.test(r)) {
    return roundInt ? `Vòng ${roundInt}` : 'Vòng đấu';
  }

  // 3. Round X / Round - X / Matchday X / Gameweek X / Week X
  const roundMatch = r.match(/^(?:round|matchday|gameweek|week)\s*[-–—:]?\s*(\d+)/i);
  if (roundMatch) {
    return `Vòng ${roundMatch[1]}`;
  }

  // 4. Ordinal rounds: "1st Round", "2nd Round", "3rd Round", "4th Round", etc.
  const ordinalMatch = r.match(/^(\d+)(?:st|nd|rd|th)\s+round/i);
  if (ordinalMatch) {
    return `Vòng ${ordinalMatch[1]}`;
  }

  // 5. Group Stage (for other tournaments like World Cup, etc.)
  const groupStageMatch = r.match(/^group\s+stage\s*[-–—:]?\s*(\d+)/i);
  if (groupStageMatch) {
    return `Vòng bảng - ${groupStageMatch[1]}`;
  }
  if (/^group\s+stage$/i.test(r)) {
    return roundInt ? `Vòng bảng - ${roundInt}` : 'Vòng bảng';
  }

  // 6. Tournament & Knockout stages
  if (/^round\s+of\s+16$/i.test(r) || /^1\/8\s+finals?$/i.test(r) || /^8th\s+finals?$/i.test(r)) {
    return 'Vòng 1/8';
  }
  if (/^round\s+of\s+32$/i.test(r) || /^1\/16\s+finals?$/i.test(r) || /^16th\s+finals?$/i.test(r)) {
    return 'Vòng 1/16';
  }
  if (/^round\s+of\s+64$/i.test(r)) {
    return 'Vòng 1/32';
  }
  if (/^quarter[- ]?finals?$/i.test(r)) {
    return 'Tứ kết';
  }
  if (/^semi[- ]?finals?$/i.test(r)) {
    return 'Bán kết';
  }
  if (/^(?:the\s+)?final$/i.test(r) || /^finals$/i.test(r)) {
    return 'Chung kết';
  }
  if (/^3rd\s+place(?:\s+final)?$/i.test(r)) {
    return 'Tranh hạng ba';
  }
  if (/^play[- ]?offs?(?:\s+round)?$/i.test(r)) {
    return 'Vòng Play-off';
  }
  if (/^preliminary\s+round$/i.test(r)) {
    return 'Vòng sơ loại';
  }
  const qualMatch = r.match(/^(\d+)(?:st|nd|rd|th)\s+qualifying\s+round$/i);
  if (qualMatch) {
    return `Vòng loại ${qualMatch[1]}`;
  }
  if (/^qualifying\s+round$/i.test(r)) {
    return 'Vòng loại';
  }

  return r;
}

