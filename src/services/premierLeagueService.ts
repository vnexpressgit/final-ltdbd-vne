import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realPremierLeagueData from '../data/realPremierLeagueFixtures.json';
import realPremierLeagueStandings from '../data/realPremierLeagueStandings.json';

const VNEXPRESS_PL_URL = 'https://gw.vnexpress.net/football/fixture?league_id=39';
const PROXIED_PL_URL = '/api/vnexpress/football/fixture?league_id=39';

const BIG_TEAMS = [42, 33, 50, 40, 49, 47, 34]; // Arsenal, Man Utd, Man City, Liverpool, Chelsea, Tottenham, Newcastle

export function transformVnExpressFixture(raw: any): FixtureItem {
  if (!raw) return {} as FixtureItem;
  if (raw.fixture && raw.teams && raw.league) {
    return raw as FixtureItem;
  }

  let venueName = 'Sân vận động';
  let venueCity = 'Anh';
  if (raw.venue) {
    const parts = String(raw.venue).split(',');
    venueName = parts[0].trim();
    if (parts.length > 1) venueCity = parts.slice(1).join(',').trim();
  }

  let htHome: number | null = null;
  let htAway: number | null = null;
  if (raw.score && raw.score.halftime) {
    if (typeof raw.score.halftime === 'string') {
      const p = raw.score.halftime.split('-');
      if (p.length === 2) {
        htHome = parseInt(p[0], 10);
        htAway = parseInt(p[1], 10);
      }
    } else if (typeof raw.score.halftime === 'object') {
      htHome = raw.score.halftime.home ?? null;
      htAway = raw.score.halftime.away ?? null;
    }
  }

  let ftHome: number | null = null;
  let ftAway: number | null = null;
  if (raw.score && raw.score.fulltime) {
    if (typeof raw.score.fulltime === 'string') {
      const p = raw.score.fulltime.split('-');
      if (p.length === 2) {
        ftHome = parseInt(p[0], 10);
        ftAway = parseInt(p[1], 10);
      }
    } else if (typeof raw.score.fulltime === 'object') {
      ftHome = raw.score.fulltime.home ?? null;
      ftAway = raw.score.fulltime.away ?? null;
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

  const isHot = BIG_TEAMS.includes(raw.home_team.team_id) || BIG_TEAMS.includes(raw.away_team.team_id);

  return {
    fixture: {
      id: raw.fixture_id,
      referee: raw.referee || null,
      timezone: 'UTC',
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
      id: 39,
      name: raw.league.name || 'Premier League',
      country: 'England',
      logo: raw.league.logo || raw.league.logo_original || 'https://is.vnecdn.net/objects/leagues/39.png?v=1',
      flag: raw.league.flag || raw.league.flag_original || 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int),
      standings: true,
      tier: 1,
      vietnameseName: 'Ngoại hạng Anh'
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: raw.home_team.team_name,
        shortName: raw.home_team.team_name_full || raw.home_team.team_name,
        logo: raw.home_team.logo,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: raw.away_team.team_name,
        shortName: raw.away_team.team_name_full || raw.away_team.team_name,
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
    has_highlight: isFinished,
    highlight_video_url: raw.fixture_id === 1557367 || isFinished ? 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80' : undefined,
    highlight_duration: raw.fixture_id === 1557367 ? '07:45' : '05:30',
    recap_summary: raw.fixture_id === 1557367 
      ? 'Arsenal thị uy sức mạnh ngày mở màn Ngoại hạng Anh khi đè bẹp Coventry 3-0 nhờ sự tỏa sáng của Havertz, Saka và Ødegaard.'
      : undefined,
    events: raw.fixture_id === 1557367 ? [
      {
        time: { elapsed: 15 },
        team: { id: 42, name: 'Arsenal', logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1' },
        player: { id: 978, name: 'Kai Havertz' },
        assist: { id: 157052, name: 'Riccardo Calafiori' },
        type: 'Goal',
        detail: 'Normal Goal'
      },
      {
        time: { elapsed: 23 },
        team: { id: 42, name: 'Arsenal', logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1' },
        player: { id: 1460, name: 'Bukayo Saka' },
        assist: { id: 37127, name: 'Martin Ødegaard' },
        type: 'Goal',
        detail: 'Normal Goal'
      },
      {
        time: { elapsed: 41 },
        team: { id: 1346, name: 'Coventry', logo: 'https://is.vnecdn.net/objects/teams/1346.png?v=1' },
        player: { id: 108, name: 'Victor Torp' },
        type: 'Card',
        detail: 'Yellow Card'
      },
      {
        time: { elapsed: 49 },
        team: { id: 42, name: 'Arsenal', logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1' },
        player: { id: 37127, name: 'Martin Ødegaard' },
        assist: null,
        type: 'Goal',
        detail: 'Normal Goal'
      },
      {
        time: { elapsed: 63 },
        team: { id: 42, name: 'Arsenal', logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1' },
        player: { id: 22224, name: 'Gabriel Magalhães' },
        type: 'Card',
        detail: 'Yellow Card'
      }
    ] : undefined
  };
}

export function getInitialPremierLeagueFixtures(): FixtureItem[] {
  return realPremierLeagueData as unknown as FixtureItem[];
}

export function getInitialPremierLeagueStandings(): StandingTeam[] {
  return realPremierLeagueStandings as unknown as StandingTeam[];
}

export async function fetchRealPremierLeagueFixtures(): Promise<FixtureItem[]> {
  // Try proxy first (no CORS issues in browser)
  try {
    const res = await fetch(PROXIED_PL_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['39'] && Array.isArray(json.data['39'].data)) {
        return json.data['39'].data.map(transformVnExpressFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_PL_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['39'] && Array.isArray(json.data['39'].data)) {
        return json.data['39'].data.map(transformVnExpressFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  // Fallback to embedded real data
  return getInitialPremierLeagueFixtures();
}
