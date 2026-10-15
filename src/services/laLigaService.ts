import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realLaLigaData from '../data/realLaLigaFixtures.json';
import realLaLigaStandings from '../data/realLaLigaStandings.json';

const VNEXPRESS_LALIGA_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=140';
const PROXIED_LALIGA_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=140';

const VNEXPRESS_LALIGA_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=140';
const PROXIED_LALIGA_STANDING_URL = '/api/vnexpress/football/standing?league_id=140';

const BIG_TEAMS = [541, 529, 530, 531, 533, 536, 543, 548];

export function transformVnExpressLaLigaFixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Tây Ban Nha';
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

  const homeName = (raw.home_team.team_name_full || raw.home_team.team_name).trim();
  const awayName = (raw.away_team.team_name_full || raw.away_team.team_name).trim();

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
      id: 140,
      name: raw.league?.name || 'La Liga',
      country: 'Tây Ban Nha',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/140.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/es.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int),
      standings: true,
      tier: 1,
      vietnameseName: 'La Liga'
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: homeName,
        shortName: raw.home_team.team_name.trim(),
        logo: raw.home_team.logo,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: awayName,
        shortName: raw.away_team.team_name.trim(),
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

export function getInitialLaLigaFixtures(): FixtureItem[] {
  return realLaLigaData as unknown as FixtureItem[];
}

export function getInitialLaLigaStandings(): StandingTeam[] {
  return realLaLigaStandings as unknown as StandingTeam[];
}

export async function fetchRealLaLigaFixtures(): Promise<FixtureItem[]> {
  try {
    const res = await fetch(PROXIED_LALIGA_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['140'] && Array.isArray(json.data['140'].data)) {
        return json.data['140'].data.map(transformVnExpressLaLigaFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_LALIGA_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['140'] && Array.isArray(json.data['140'].data)) {
        return json.data['140'].data.map(transformVnExpressLaLigaFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  return getInitialLaLigaFixtures();
}

export async function fetchRealLaLigaStandings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_LALIGA_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['140'] && Array.isArray(json.data['140'].data)) {
        return formatStandings(json.data['140'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_LALIGA_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['140'] && Array.isArray(json.data['140'].data)) {
        return formatStandings(json.data['140'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialLaLigaStandings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => {
    const gd = (item.goals_diff !== undefined && item.goals_diff !== null)
      ? item.goals_diff
      : ((item.all?.goals_for || 0) - (item.all?.goals_against || 0));

    let cleanName = (item.team_name || '').trim();
    if (cleanName === 'Barca') cleanName = 'Barcelona';
    if (cleanName === 'Atletico') cleanName = 'Atletico Madrid';
    if (cleanName === 'Sociedad') cleanName = 'Real Sociedad';

    return {
      rank: item.rank,
      team: {
        id: item.team_id,
        name: cleanName,
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
