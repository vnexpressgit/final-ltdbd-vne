import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realLigue1Data from '../data/realLigue1Fixtures.json';
import realLigue1Standings from '../data/realLigue1Standings.json';

const VNEXPRESS_LIGUE1_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=61';
const PROXIED_LIGUE1_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=61';

const VNEXPRESS_LIGUE1_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=61';
const PROXIED_LIGUE1_STANDING_URL = '/api/vnexpress/football/standing?league_id=61';

const BIG_TEAMS = [85, 81, 80, 91, 79];

export const LIGUE1_TEAM_MAP: Record<number, { name: string; shortName: string }> = {
  85: { name: 'Paris Saint-Germain', shortName: 'PSG' },
  81: { name: 'Marseille', shortName: 'Marseille' },
  80: { name: 'Lyon', shortName: 'Lyon' },
  91: { name: 'Monaco', shortName: 'Monaco' },
  79: { name: 'Lille', shortName: 'Lille' },
  94: { name: 'Rennes', shortName: 'Rennes' },
  84: { name: 'Nice', shortName: 'Nice' },
  116: { name: 'Lens', shortName: 'Lens' },
  106: { name: 'Brest', shortName: 'Brest' },
  95: { name: 'Strasbourg', shortName: 'Strasbourg' },
  96: { name: 'Toulouse', shortName: 'Toulouse' },
  108: { name: 'Auxerre', shortName: 'Auxerre' },
  97: { name: 'Lorient', shortName: 'Lorient' },
  114: { name: 'Paris FC', shortName: 'Paris FC' },
  77: { name: 'Angers', shortName: 'Angers' },
  110: { name: 'Troyes', shortName: 'Troyes' },
  111: { name: 'Le Havre', shortName: 'Le Havre' },
  1298: { name: 'Le Mans', shortName: 'Le Mans' }
};

export function transformVnExpressLigue1Fixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Pháp';
  if (raw.venue) {
    const parts = raw.venue.split(',');
    venueName = parts[0].trim() || 'Sân vận động';
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

  const homeInfo = LIGUE1_TEAM_MAP[raw.home_team.team_id] || {
    name: raw.home_team.team_name_full || raw.home_team.team_name,
    shortName: raw.home_team.team_name
  };
  const awayInfo = LIGUE1_TEAM_MAP[raw.away_team.team_id] || {
    name: raw.away_team.team_name_full || raw.away_team.team_name,
    shortName: raw.away_team.team_name
  };

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
      id: 61,
      name: 'Ligue 1',
      country: 'Pháp',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/61.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/fr.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int),
      standings: true,
      tier: 1,
      vietnameseName: 'Ligue 1'
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: homeInfo.name,
        shortName: homeInfo.shortName,
        logo: raw.home_team.logo || `https://is.vnecdn.net/objects/teams/${raw.home_team.team_id}.png?v=1`,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: awayInfo.name,
        shortName: awayInfo.shortName,
        logo: raw.away_team.logo || `https://is.vnecdn.net/objects/teams/${raw.away_team.team_id}.png?v=1`,
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

export function getInitialLigue1Fixtures(): FixtureItem[] {
  return realLigue1Data as unknown as FixtureItem[];
}

export function getInitialLigue1Standings(): StandingTeam[] {
  return realLigue1Standings as unknown as StandingTeam[];
}

export async function fetchRealLigue1Fixtures(): Promise<FixtureItem[]> {
  try {
    const res = await fetch(PROXIED_LIGUE1_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['61'] && Array.isArray(json.data['61'].data)) {
        return json.data['61'].data.map(transformVnExpressLigue1Fixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_LIGUE1_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['61'] && Array.isArray(json.data['61'].data)) {
        return json.data['61'].data.map(transformVnExpressLigue1Fixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  return getInitialLigue1Fixtures();
}

export async function fetchRealLigue1Standings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_LIGUE1_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['61'] && Array.isArray(json.data['61'].data)) {
        return formatStandings(json.data['61'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_LIGUE1_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['61'] && Array.isArray(json.data['61'].data)) {
        return formatStandings(json.data['61'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialLigue1Standings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => {
    const gd = (item.goals_diff !== undefined && item.goals_diff !== null)
      ? item.goals_diff
      : ((item.all?.goals_for || 0) - (item.all?.goals_against || 0));

    const tInfo = LIGUE1_TEAM_MAP[item.team_id] || {
      name: item.team_name,
      shortName: item.team_name
    };

    return {
      rank: item.rank,
      team: {
        id: item.team_id,
        name: tInfo.name,
        shortName: tInfo.shortName,
        logo: item.logo || `https://is.vnecdn.net/objects/teams/${item.team_id}.png?v=1`,
        winner: null
      },
      played: item.all?.matchs_played || 0,
      win: item.all?.win || 0,
      draw: item.all?.draw || 0,
      lose: item.all?.lose || 0,
      goalsFor: item.all?.goals_for || 0,
      goalsAgainst: item.all?.goals_against || 0,
      goalDifference: gd,
      points: item.points || 0,
      form: (item.forme || '').split('').filter(Boolean)
    };
  });
}
