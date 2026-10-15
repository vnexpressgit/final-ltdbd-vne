import { FixtureItem } from '../types/football';
import { formatRoundVN } from '../utils/footballUtils';
import realSaudiFixtures from '../data/realSaudiFixtures.json';
import realMlsFixtures from '../data/realMlsFixtures.json';
import realFaCupFixtures from '../data/realFaCupFixtures.json';
import realCarabaoCupFixtures from '../data/realCarabaoCupFixtures.json';

function transformVnExpressFixture(raw: any, leagueId: number, leagueName: string, country: string, flagUrl: string, tier: 1 | 2 | 3 | 4 = 2): FixtureItem {
  if (!raw) return {} as FixtureItem;
  if (raw.fixture && raw.teams && raw.league) {
    return {
      ...raw,
      league: {
        ...raw.league,
        round: formatRoundVN(raw.league.round)
      }
    };
  }

  let venueName = raw.venue ? raw.venue.split(',')[0].trim() : 'Sân vận động';
  let venueCity = raw.venue && raw.venue.includes(',') ? raw.venue.split(',').slice(1).join(',').trim() : country;

  let htHome: number | null = null;
  let htAway: number | null = null;
  if (raw.score && raw.score.halftime) {
    if (typeof raw.score.halftime === 'string') {
      const p = raw.score.halftime.split('-');
      if (p.length === 2) { htHome = parseInt(p[0], 10); htAway = parseInt(p[1], 10); }
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
      if (p.length === 2) { ftHome = parseInt(p[0], 10); ftAway = parseInt(p[1], 10); }
    } else if (typeof raw.score.fulltime === 'object') {
      ftHome = raw.score.fulltime.home ?? null;
      ftAway = raw.score.fulltime.away ?? null;
    }
  }

  const isFinished = ['FT', 'AET'].includes(raw.status_short) || raw.status === 'Match Finished' || (raw.status_short === 'PEN' && raw.status === 'Match Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(raw.status_short);
  const homeGoals = isFinished || isLive ? raw.goals_home_team : null;
  const awayGoals = isFinished || isLive ? raw.goals_away_team : null;

  let winnerHome: boolean | null = null;
  let winnerAway: boolean | null = null;
  if (isFinished && homeGoals !== null && awayGoals !== null) {
    winnerHome = homeGoals > awayGoals ? true : homeGoals < awayGoals ? false : null;
    winnerAway = awayGoals > homeGoals ? true : awayGoals < homeGoals ? false : null;
  }

  const homeName = raw.home_team.team_name_full || raw.home_team.team_name;
  const awayName = raw.away_team.team_name_full || raw.away_team.team_name;

  return {
    fixture: {
      id: raw.fixture_id,
      referee: raw.referee || null,
      timezone: 'UTC',
      date: raw.event_date,
      timestamp: raw.event_timestamp,
      periods: { first: raw.first_half_start || null, second: raw.second_half_start || null },
      venue: { id: null, name: venueName, city: venueCity },
      status: { long: raw.status || 'Not Started', short: raw.status_short || 'NS', elapsed: raw.elapsed || null, extra: null }
    },
    league: {
      id: leagueId,
      name: leagueName,
      country: country,
      logo: raw.league?.logo || `https://is.vnecdn.net/objects/leagues/${leagueId}.png?v=1`,
      flag: flagUrl,
      season: 2026,
      round: formatRoundVN(raw.round, raw.round_int || 1),
      standings: leagueId !== 45 && leagueId !== 48,
      tier: tier,
      vietnameseName: leagueName
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: homeName,
        shortName: raw.home_team.team_name,
        logo: raw.home_team.logo || `https://is.vnecdn.net/objects/teams/${raw.home_team.team_id}.png?v=1`,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: awayName,
        shortName: raw.away_team.team_name,
        logo: raw.away_team.logo || `https://is.vnecdn.net/objects/teams/${raw.away_team.team_id}.png?v=1`,
        winner: winnerAway
      }
    },
    goals: { home: homeGoals, away: awayGoals },
    score: {
      halftime: { home: htHome, away: htAway },
      fulltime: { home: ftHome, away: ftAway },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    },
    is_hot: false,
    has_preview: !isFinished,
    has_recap: isFinished,
    has_highlight: isFinished
  };
}

async function fetchFromVnExpress(leagueId: number, leagueName: string, country: string, flagUrl: string, tier: 1 | 2 | 3 | 4 = 2): Promise<FixtureItem[]> {
  try {
    const res = await fetch(`/api/vnexpress/football/fixture?league_id=${leagueId}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data[leagueId] && Array.isArray(json.data[leagueId].data)) {
        return json.data[leagueId].data.map((f: any) => transformVnExpressFixture(f, leagueId, leagueName, country, flagUrl, tier));
      }
    }
  } catch {}

  try {
    const res = await fetch(`https://gw.vnexpress.net/football/fixture?league_id=${leagueId}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data[leagueId] && Array.isArray(json.data[leagueId].data)) {
        return json.data[leagueId].data.map((f: any) => transformVnExpressFixture(f, leagueId, leagueName, country, flagUrl, tier));
      }
    }
  } catch {}

  return [];
}

export function getInitialSaudiFixtures(): FixtureItem[] {
  return (realSaudiFixtures as any[]).map((f: any) => transformVnExpressFixture(f, 307, 'Saudi Pro League', 'Ả Rập Xê Út', 'https://is.vnecdn.net/objects/flags/sa.svg?v=1', 2));
}

export function getInitialMlsFixtures(): FixtureItem[] {
  return (realMlsFixtures as any[]).map((f: any) => transformVnExpressFixture(f, 253, 'MLS', 'Mỹ', 'https://is.vnecdn.net/objects/flags/us.svg?v=1', 2));
}

export function getInitialFaCupFixtures(): FixtureItem[] {
  return (realFaCupFixtures as any[]).map((f: any) => transformVnExpressFixture(f, 45, 'FA Cup', 'Anh', 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1', 1));
}

export function getInitialCarabaoCupFixtures(): FixtureItem[] {
  return (realCarabaoCupFixtures as any[]).map((f: any) => transformVnExpressFixture(f, 48, 'Carabao Cup', 'Anh', 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1', 1));
}

export async function fetchRealSaudiFixtures(): Promise<FixtureItem[]> {
  const fresh = await fetchFromVnExpress(307, 'Saudi Pro League', 'Ả Rập Xê Út', 'https://is.vnecdn.net/objects/flags/sa.svg?v=1', 2);
  return fresh.length > 0 ? fresh : getInitialSaudiFixtures();
}

export async function fetchRealMlsFixtures(): Promise<FixtureItem[]> {
  const fresh = await fetchFromVnExpress(253, 'MLS', 'Mỹ', 'https://is.vnecdn.net/objects/flags/us.svg?v=1', 2);
  return fresh.length > 0 ? fresh : getInitialMlsFixtures();
}

export async function fetchRealFaCupFixtures(): Promise<FixtureItem[]> {
  const fresh = await fetchFromVnExpress(45, 'FA Cup', 'Anh', 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1', 1);
  return fresh.length > 0 ? fresh : getInitialFaCupFixtures();
}

export async function fetchRealCarabaoCupFixtures(): Promise<FixtureItem[]> {
  const fresh = await fetchFromVnExpress(48, 'Carabao Cup', 'Anh', 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1', 1);
  return fresh.length > 0 ? fresh : getInitialCarabaoCupFixtures();
}
