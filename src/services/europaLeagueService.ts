import { FixtureItem, StandingTeam } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realEuropaLeagueData from '../data/realEuropaLeagueFixtures.json';
import realEuropaLeagueStandings from '../data/realEuropaLeagueStandings.json';

const VNEXPRESS_EL_FIXTURE_URL = 'https://gw.vnexpress.net/football/fixture?league_id=3';
const PROXIED_EL_FIXTURE_URL = '/api/vnexpress/football/fixture?league_id=3';

const VNEXPRESS_EL_STANDING_URL = 'https://gw.vnexpress.net/football/standing?league_id=3';
const PROXIED_EL_STANDING_URL = '/api/vnexpress/football/standing?league_id=3';

const BIG_TEAMS = [496, 489, 168, 80, 81, 211, 548, 247, 549, 52];

const TEAM_MAP: Record<number, { name: string; shortName: string }> = {
  496: { name: 'Juventus', shortName: 'Juventus' },
  489: { name: 'AC Milan', shortName: 'Milan' },
  168: { name: 'Bayer Leverkusen', shortName: 'Leverkusen' },
  80: { name: 'Lyon', shortName: 'Lyon' },
  81: { name: 'Marseille', shortName: 'Marseille' },
  211: { name: 'Benfica', shortName: 'Benfica' },
  548: { name: 'Real Sociedad', shortName: 'Sociedad' },
  538: { name: 'Celta Vigo', shortName: 'Celta Vigo' },
  52: { name: 'Crystal Palace', shortName: 'Crystal Palace' },
  35: { name: 'Bournemouth', shortName: 'Bournemouth' },
  746: { name: 'Sunderland', shortName: 'Sunderland' },
  247: { name: 'Celtic', shortName: 'Celtic' },
  549: { name: 'Beşiktaş', shortName: 'Beşiktaş' },
  553: { name: 'Olympiakos', shortName: 'Olympiakos' },
  554: { name: 'Anderlecht', shortName: 'Anderlecht' },
  571: { name: 'Salzburg', shortName: 'Salzburg' },
  167: { name: 'Hoffenheim', shortName: 'Hoffenheim' },
  620: { name: 'Dinamo Zagreb', shortName: 'Dinamo Zagreb' },
  628: { name: 'Sparta Praha', shortName: 'Sparta Praha' },
  567: { name: 'Viktoria Plzen', shortName: 'Plzen' },
  1393: { name: 'Union St. Gilloise', shortName: 'Union SG' },
  201: { name: 'AZ Alkmaar', shortName: 'AZ Alkmaar' },
  413: { name: 'NEC Nijmegen', shortName: 'NEC' },
  347: { name: 'Lech Poznan', shortName: 'Lech Poznan' },
  336: { name: 'Jagiellonia', shortName: 'Jagiellonia' },
  651: { name: 'Ferencvaros', shortName: 'Ferencvaros' },
  637: { name: 'Sturm Graz', shortName: 'Sturm Graz' },
  94: { name: 'Rennes', shortName: 'Rennes' },
  3402: { name: 'Omonia Nicosia', shortName: 'Omonia' },
  3683: { name: 'Ararat-Armenia', shortName: 'Ararat' },
  4360: { name: 'NK Celje', shortName: 'Celje' },
  4799: { name: 'Torreense', shortName: 'Torreense' },
  563: { name: 'Hapoel Beer Sheva', shortName: 'H. Beer Sheva' },
  646: { name: 'Levski Sofia', shortName: 'Levski Sofia' },
  1124: { name: 'OFI Crete', shortName: 'OFI' },
  321: { name: 'Lillestrom', shortName: 'Lillestrom' }
};

export function transformVnExpressEuropaLeagueFixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Châu Âu';
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

  const homeInfo = TEAM_MAP[raw.home_team.team_id] || {
    name: (raw.home_team.team_name_full || raw.home_team.team_name).trim(),
    shortName: raw.home_team.team_name.trim()
  };
  const awayInfo = TEAM_MAP[raw.away_team.team_id] || {
    name: (raw.away_team.team_name_full || raw.away_team.team_name).trim(),
    shortName: raw.away_team.team_name.trim()
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
      id: 3,
      name: 'Europa League',
      country: 'UEFA',
      logo: raw.league?.logo || 'https://is.vnecdn.net/objects/leagues/3.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/eu.svg?v=1',
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int, 3),
      standings: true,
      tier: 1,
      vietnameseName: 'Cúp C2 Châu Âu'
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

export function getInitialEuropaLeagueFixtures(): FixtureItem[] {
  return realEuropaLeagueData as unknown as FixtureItem[];
}

export function getInitialEuropaLeagueStandings(): StandingTeam[] {
  return realEuropaLeagueStandings as unknown as StandingTeam[];
}

export async function fetchRealEuropaLeagueFixtures(): Promise<FixtureItem[]> {
  try {
    const res = await fetch(PROXIED_EL_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['3'] && Array.isArray(json.data['3'].data)) {
        return json.data['3'].data.map(transformVnExpressEuropaLeagueFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_EL_FIXTURE_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['3'] && Array.isArray(json.data['3'].data)) {
        return json.data['3'].data.map(transformVnExpressEuropaLeagueFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  return getInitialEuropaLeagueFixtures();
}

export async function fetchRealEuropaLeagueStandings(): Promise<StandingTeam[]> {
  try {
    const res = await fetch(PROXIED_EL_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['3'] && Array.isArray(json.data['3'].data)) {
        return formatStandings(json.data['3'].data);
      }
    }
  } catch {
    // fallback
  }

  try {
    const res = await fetch(VNEXPRESS_EL_STANDING_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['3'] && Array.isArray(json.data['3'].data)) {
        return formatStandings(json.data['3'].data);
      }
    }
  } catch {
    // fallback
  }

  return getInitialEuropaLeagueStandings();
}

function formatStandings(list: any[]): StandingTeam[] {
  return list.map(item => {
    const gd = (item.goals_diff !== undefined && item.goals_diff !== null)
      ? item.goals_diff
      : ((item.all?.goals_for || 0) - (item.all?.goals_against || 0));

    const tInfo = TEAM_MAP[item.team_id] || {
      name: item.team_name.trim(),
      shortName: item.team_name.trim()
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
