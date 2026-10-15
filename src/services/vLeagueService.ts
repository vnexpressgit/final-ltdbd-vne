import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realVLeagueData from '../data/realVLeagueFixtures.json';
import realVLeagueStandings from '../data/realVLeagueStandings.json';

const VNEXPRESS_VLEAGUE_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=340';
const PROXIED_VLEAGUE_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=340';

const VNEXPRESS_VLEAGUE_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=340';
const PROXIED_VLEAGUE_STANDING_URL = '/api/vnexpress/football/standing?league_id=340';

export const VLEAGUE_TEAM_INFO: Record<number, { name: string; shortName: string; venue: string }> = {
  16400: { name: 'Công An Hà Nội', shortName: 'CAHN', venue: 'SVĐ Hàng Đẫy, Hà Nội' },
  9167: { name: 'Phù Đổng Ninh Bình', shortName: 'Ninh Bình', venue: 'SVĐ Ninh Bình' },
  3678: { name: 'Sông Lam Nghệ An', shortName: 'SLNA', venue: 'SVĐ Vinh, Nghệ An' },
  3680: { name: 'Đông Á Thanh Hóa', shortName: 'Thanh Hóa', venue: 'SVĐ Thanh Hóa' },
  11134: { name: 'Hồng Lĩnh Hà Tĩnh', shortName: 'Hà Tĩnh', venue: 'SVĐ Hà Tĩnh' },
  3674: { name: 'Thép Xanh Nam Định', shortName: 'Nam Định', venue: 'SVĐ Thiên Trường, Nam Định' },
  3672: { name: 'Công An TP. Hồ Chí Minh', shortName: 'CA TP.HCM', venue: 'SVĐ Thống Nhất, TP.HCM' },
  3669: { name: 'SHB Đà Nẵng', shortName: 'Đà Nẵng', venue: 'SVĐ Hòa Xuân, Đà Nẵng' },
  3681: { name: 'Thể Công - Viettel', shortName: 'Thể Công Viettel', venue: 'SVĐ Mỹ Đình, Hà Nội' },
  26601: { name: 'Bắc Ninh FC', shortName: 'Bắc Ninh', venue: 'SVĐ Việt Yên / Từ Sơn' },
  3671: { name: 'Hải Phòng FC', shortName: 'Hải Phòng', venue: 'SVĐ Lạch Tray, Hải Phòng' },
  3673: { name: 'Hoàng Anh Gia Lai', shortName: 'HAGL', venue: 'SVĐ Pleiku, Gia Lai' },
  3670: { name: 'Hà Nội FC', shortName: 'Hà Nội FC', venue: 'SVĐ Hàng Đẫy, Hà Nội' },
  9161: { name: 'Trường Tươi Bình Phước', shortName: 'Bình Phước', venue: 'SVĐ Bình Phước, Đồng Xoài' }
};

const HOT_TEAMS = [16400, 3670, 3674, 3681, 3673, 9167, 3678];

export function transformVnExpressVLeagueFixture(raw: any): FixtureItem {
  const homeInfo = VLEAGUE_TEAM_INFO[raw.home_team.team_id] || {
    name: (raw.home_team.team_name_full || raw.home_team.team_name).trim(),
    shortName: raw.home_team.team_name.trim(),
    venue: 'Sân vận động'
  };
  const awayInfo = VLEAGUE_TEAM_INFO[raw.away_team.team_id] || {
    name: (raw.away_team.team_name_full || raw.away_team.team_name).trim(),
    shortName: raw.away_team.team_name.trim(),
    venue: 'Sân vận động'
  };

  let venueName = homeInfo.venue;
  let venueCity = 'Việt Nam';
  if (raw.venue) {
    const parts = raw.venue.split(',');
    venueName = parts[0].trim();
    if (parts.length > 1) venueCity = parts.slice(1).join(',').trim();
  }

  let htHome: number | null = null;
  let htAway: number | null = null;
  if (raw.score && raw.score.halftime) {
    const p = raw.score.halftime.split('-');
    if (p.length === 2) {
      htHome = parseInt(p[0], 10);
      htAway = parseInt(p[1], 10);
    }
  }

  let ftHome: number | null = null;
  let ftAway: number | null = null;
  if (raw.score && raw.score.fulltime) {
    const p = raw.score.fulltime.split('-');
    if (p.length === 2) {
      ftHome = parseInt(p[0], 10);
      ftAway = parseInt(p[1], 10);
    }
  }

  const isFinished = raw.status_short === 'FT' || raw.status_short === 'AET' || raw.status === 'Match Finished' || (raw.status_short === 'PEN' && raw.status === 'Match Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(raw.status_short);

  const homeGoals = isFinished || isLive ? raw.goals_home_team : null;
  const awayGoals = isFinished || isLive ? raw.goals_away_team : null;

  let winnerHome: boolean | null = null;
  let winnerAway: boolean | null = null;
  if (isFinished && homeGoals !== null && awayGoals !== null) {
    winnerHome = homeGoals > awayGoals ? true : homeGoals < awayGoals ? false : null;
    winnerAway = awayGoals > homeGoals ? true : awayGoals < homeGoals ? false : null;
  }

  const isHot = HOT_TEAMS.includes(raw.home_team.team_id) || HOT_TEAMS.includes(raw.away_team.team_id);

  return {
    fixture: {
      id: raw.fixture_id,
      referee: raw.referee || null,
      timezone: 'Asia/Ho_Chi_Minh',
      date: raw.event_date,
      timestamp: raw.event_timestamp,
      periods: {
        first: raw.first_half_start || null,
        second: raw.second_half_start || null
      },
      venue: {
        id: null,
        name: venueName,
        city: venueCity
      },
      status: {
        long: raw.status || 'Not Started',
        short: raw.status_short || 'NS',
        elapsed: raw.elapsed || null,
        extra: null
      }
    },
    league: {
      id: 340,
      name: 'V-League',
      country: 'Việt Nam',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/340.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/vn.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int),
      standings: true,
      tier: 1,
      vietnameseName: 'V-League'
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: homeInfo.name,
        shortName: homeInfo.shortName,
        logo: raw.home_team.logo,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: awayInfo.name,
        shortName: awayInfo.shortName,
        logo: raw.away_team.logo,
        winner: winnerAway
      }
    },
    goals: {
      home: homeGoals,
      away: awayGoals
    },
    score: {
      halftime: { home: htHome, away: htAway },
      fulltime: { home: ftHome, away: ftAway },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    },
    is_hot: isHot,
    has_preview: !isFinished,
    has_recap: isFinished,
    has_highlight: isFinished
  };
}

export function getInitialVLeagueFixtures(): FixtureItem[] {
  return realVLeagueData as unknown as FixtureItem[];
}

export function getInitialVLeagueStandings(): StandingTeam[] {
  return realVLeagueStandings as unknown as StandingTeam[];
}

export async function fetchRealVLeagueFixtures(): Promise<FixtureItem[]> {
  try {
    const res = await fetch(PROXIED_VLEAGUE_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['340'] && Array.isArray(json.data['340'].data)) {
        return json.data['340'].data.map(transformVnExpressVLeagueFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_VLEAGUE_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['340'] && Array.isArray(json.data['340'].data)) {
        return json.data['340'].data.map(transformVnExpressVLeagueFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  return getInitialVLeagueFixtures();
}

export async function fetchRealVLeagueStandings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_VLEAGUE_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['340'] && Array.isArray(json.data['340'].data)) {
        return formatStandings(json.data['340'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_VLEAGUE_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['340'] && Array.isArray(json.data['340'].data)) {
        return formatStandings(json.data['340'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialVLeagueStandings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => {
    const info = VLEAGUE_TEAM_INFO[item.team_id] || { name: item.team_name, shortName: item.team_name };
    const played = item.all?.matchs_played || 0;
    const win = item.all?.win || 0;
    const draw = item.all?.draw || 0;
    const lose = item.all?.lose || 0;
    const goalsFor = item.all?.goals_for || 0;
    const goalsAgainst = item.all?.goals_against || 0;
    const gd = (item.goals_diff !== undefined && item.goals_diff !== null)
      ? item.goals_diff
      : (goalsFor - goalsAgainst);
    const points = item.points !== undefined && item.points !== null ? item.points : 0;
    const form = (item.forme || '').split('').filter(Boolean);

    return {
      rank: item.rank,
      team: {
        id: item.team_id,
        name: info.name,
        shortName: info.shortName,
        logo: item.logo || `https://is.vnecdn.net/objects/teams/${item.team_id}.png?v=1`,
        winner: null
      },
      played,
      win,
      draw,
      lose,
      goalsFor,
      goalsAgainst,
      goalDifference: gd,
      points,
      form
    };
  });
}
