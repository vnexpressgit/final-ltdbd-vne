import { FixtureItem, MatchFullDetails } from '../types/football';
import { formatRoundVN } from './footballUtils';

/**
 * Convert string to SEO slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate standard clean SEO URL for a match:
 * /the-thao/truc-tiep/[team-home]-vs-[team-away]-[fixture-id].html
 * Example: /the-thao/truc-tiep/arsenal-vs-coventry-1557367.html
 */
export function getMatchDetailUrl(fixture: FixtureItem): string {
  const homeSlug = slugify(fixture.teams.home.name);
  const awaySlug = slugify(fixture.teams.away.name);
  return `/the-thao/truc-tiep/${homeSlug}-vs-${awaySlug}-${fixture.fixture.id}.html`;
}

/**
 * Parse match ID from clean URL:
 * /the-thao/truc-tiep/[anything]-[fixture-id].html
 */
export function parseMatchIdFromPath(pathname: string): number | null {
  const regex = /\/the-thao\/truc-tiep\/.*?-(\d+)\.html/i;
  const match = pathname.match(regex);
  if (match && match[1]) {
    const id = parseInt(match[1], 10);
    return isNaN(id) ? null : id;
  }
  return null;
}

/**
 * Inject or update Schema.org SportsEvent & NewsArticle structured data in <head>
 */
export function updateMatchSEO(fixture: FixtureItem, details?: MatchFullDetails | null) {
  if (typeof document === 'undefined') return;

  const home = fixture.teams.home.name;
  const away = fixture.teams.away.name;
  const homeScore = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayScore = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;
  const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || fixture.fixture.status.long.includes('Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);
  
  const scoreText = isFinished ? `${homeScore}-${awayScore}` : isLive ? `LIVE ${homeScore}-${awayScore}` : 'vs';
  const roundText = formatRoundVN(fixture.league.round, undefined, fixture.league.id);
  const leagueText = fixture.league.vietnameseName || fixture.league.name;

  // Title tag strategy
  // Example: Trực tiếp Arsenal vs Coventry: 3-0, Vòng 1 Ngoại hạng Anh 2026/2027 - VnExpress Thể thao
  const pageTitle = isFinished 
    ? `Trực tiếp ${home} vs ${away}: ${scoreText}, ${roundText} ${leagueText} 2026/2027 - VnExpress Thể thao`
    : `Trực tiếp ${home} vs ${away}, ${roundText} ${leagueText} 2026/2027 - VnExpress Thể thao`;

  document.title = pageTitle;

  // Meta description
  const metaDesc = `Xem kết quả, diễn biến trực tiếp, đội hình ra sân, thống kê và chấm điểm cầu thủ trận ${home} vs ${away} tại ${roundText} ${leagueText} 2026/2027 trên VnExpress.`;
  
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', metaDesc);

  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', pageTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', metaDesc);

  // Schema.org SportsEvent JSON-LD
  const schemaId = 'match-schema-sports-event';
  let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = schemaId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${home} vs ${away}`,
    startDate: fixture.fixture.date,
    sport: 'Soccer',
    eventStatus: isFinished 
      ? 'https://schema.org/EventFinished' 
      : isLive 
      ? 'https://schema.org/EventScheduled' 
      : 'https://schema.org/EventScheduled',
    competitor: [
      {
        '@type': 'SportsTeam',
        name: home,
        logo: fixture.teams.home.logo
      },
      {
        '@type': 'SportsTeam',
        name: away,
        logo: fixture.teams.away.logo
      }
    ],
    homeTeam: {
      '@type': 'SportsTeam',
      name: home
    },
    awayTeam: {
      '@type': 'SportsTeam',
      name: away
    },
    location: {
      '@type': 'Place',
      name: fixture.fixture.venue?.name || 'Sân vận động',
      address: {
        '@type': 'PostalAddress',
        addressLocality: fixture.fixture.venue?.city || 'London'
      }
    }
  };

  scriptTag.textContent = JSON.stringify(structuredData, null, 2);
}
