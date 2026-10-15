import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realChampionsLeagueData from '../data/realChampionsLeagueFixtures.json';
import realChampionsLeagueStandings from '../data/realChampionsLeagueStandings.json';

const VNEXPRESS_CL_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=2';
const PROXIED_CL_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=2';

const VNEXPRESS_CL_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=2';
const PROXIED_CL_STANDING_URL = '/api/vnexpress/football/standing?league_id=2';

const BIG_TEAMS = [541, 50, 529, 157, 42, 40, 85, 505, 165, 496, 489, 49, 33];

export function transformVnExpressChampionsLeagueFixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Châu Âu';
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
      id: 2,
      name: raw.league?.name || 'Champions League',
      country: 'Châu Âu',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/2.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/eu.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int, 2),
      standings: true,
      tier: 1,
      vietnameseName: 'Champions League'
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
    has_highlight: isFinished
  };
}

export function getInitialChampionsLeagueFixtures(): FixtureItem[] {
  return realChampionsLeagueData as unknown as FixtureItem[];
}

export function getInitialChampionsLeagueStandings(): StandingTeam[] {
  return realChampionsLeagueStandings as unknown as StandingTeam[];
}

export async function fetchRealChampionsLeagueFixtures(): Promise<FixtureItem[]> {
  // Try proxy first (no CORS issues in browser)
  try {
    const res = await fetch(PROXIED_CL_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['2'] && Array.isArray(json.data['2'].data)) {
        return json.data['2'].data.map(transformVnExpressChampionsLeagueFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_CL_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['2'] && Array.isArray(json.data['2'].data)) {
        return json.data['2'].data.map(transformVnExpressChampionsLeagueFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  // Fallback to embedded real data
  return getInitialChampionsLeagueFixtures();
}

export async function fetchRealChampionsLeagueStandings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_CL_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['2'] && Array.isArray(json.data['2'].data)) {
        return formatStandings(json.data['2'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_CL_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['2'] && Array.isArray(json.data['2'].data)) {
        return formatStandings(json.data['2'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialChampionsLeagueStandings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => ({
    rank: item.rank,
    team: {
      id: item.team_id,
      name: item.team_name,
      logo: item.logo || `https://is.vnecdn.net/objects/teams/${item.team_id}.png?v=1`,
      winner: null
    },
    played: item.all?.matchs_played || 0,
    win: item.all?.win || 0,
    draw: item.all?.draw || 0,
    lose: item.all?.lose || 0,
    goalsFor: item.all?.goals_for || 0,
    goalsAgainst: item.all?.goals_against || 0,
    goalDifference: item.goals_diff || 0,
    points: item.points || 0,
    form: (item.forme || '').split('').filter(Boolean)
  }));
}
