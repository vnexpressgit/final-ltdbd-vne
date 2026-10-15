import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realSerieAData from '../data/realSerieAFixtures.json';
import realSerieAStandings from '../data/realSerieAStandings.json';

const VNEXPRESS_SERIEA_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=135';
const PROXIED_SERIEA_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=135';

const VNEXPRESS_SERIEA_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=135';
const PROXIED_SERIEA_STANDING_URL = '/api/vnexpress/football/standing?league_id=135';

const BIG_TEAMS = [505, 489, 496, 492, 487, 497, 499, 502];

const TEAM_MAP: Record<number, { name: string; shortName: string }> = {
  505: { name: 'Inter Milan', shortName: 'Inter' },
  489: { name: 'AC Milan', shortName: 'Milan' },
  496: { name: 'Juventus', shortName: 'Juventus' },
  492: { name: 'Napoli', shortName: 'Napoli' },
  487: { name: 'Lazio', shortName: 'Lazio' },
  497: { name: 'AS Roma', shortName: 'Roma' },
  499: { name: 'Atalanta', shortName: 'Atalanta' },
  502: { name: 'Fiorentina', shortName: 'Fiorentina' },
  500: { name: 'Bologna', shortName: 'Bologna' },
  503: { name: 'Torino', shortName: 'Torino' },
  494: { name: 'Udinese', shortName: 'Udinese' },
  495: { name: 'Genoa', shortName: 'Genoa' },
  523: { name: 'Parma', shortName: 'Parma' },
  488: { name: 'Sassuolo', shortName: 'Sassuolo' },
  490: { name: 'Cagliari', shortName: 'Cagliari' },
  867: { name: 'Lecce', shortName: 'Lecce' },
  895: { name: 'Como', shortName: 'Como' },
  512: { name: 'Frosinone', shortName: 'Frosinone' },
  517: { name: 'Venezia', shortName: 'Venezia' },
  1579: { name: 'Monza', shortName: 'Monza' }
};

export function transformVnExpressSerieAFixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Ý';
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

  const homeInfo = TEAM_MAP[raw.home_team.team_id] || {
    name: raw.home_team.team_name_full || raw.home_team.team_name,
    shortName: raw.home_team.team_name
  };
  const awayInfo = TEAM_MAP[raw.away_team.team_id] || {
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
      id: 135,
      name: 'Serie A',
      country: 'Ý',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/135.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/it.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int),
      standings: true,
      tier: 1,
      vietnameseName: 'Serie A'
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

export function getInitialSerieAFixtures(): FixtureItem[] {
  return realSerieAData as unknown as FixtureItem[];
}

export function getInitialSerieAStandings(): StandingTeam[] {
  return realSerieAStandings as unknown as StandingTeam[];
}

export async function fetchRealSerieAFixtures(): Promise<FixtureItem[]> {
  try {
    const res = await fetch(PROXIED_SERIEA_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['135'] && Array.isArray(json.data['135'].data)) {
        return json.data['135'].data.map(transformVnExpressSerieAFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_SERIEA_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['135'] && Array.isArray(json.data['135'].data)) {
        return json.data['135'].data.map(transformVnExpressSerieAFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  return getInitialSerieAFixtures();
}

export async function fetchRealSerieAStandings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_SERIEA_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['135'] && Array.isArray(json.data['135'].data)) {
        return formatStandings(json.data['135'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_SERIEA_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['135'] && Array.isArray(json.data['135'].data)) {
        return formatStandings(json.data['135'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialSerieAStandings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => {
    const gd = (item.goals_diff !== undefined && item.goals_diff !== null)
      ? item.goals_diff
      : ((item.all?.goals_for || 0) - (item.all?.goals_against || 0));

    const tInfo = TEAM_MAP[item.team_id] || {
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
