export type MatchStatusShort = 
  | 'NS'        // Not Started
  | 'COUNTDOWN' // <15 mins to kickoff
  | '1H'        // First Half
  | 'HT'        // Halftime
  | '2H'        // Second Half
  | 'ET'        // Extra Time
  | 'PEN'       // Penalty Shootout
  | 'FT'        // Full Time
  | 'AET'       // After Extra Time
  | 'POSTP'     // Postponed
  | 'CANC';     // Cancelled

export interface MatchPeriod {
  first: number | null;
  second: number | null;
}

export interface MatchVenue {
  id: number | null;
  name: string;
  city: string;
}

export interface MatchStatus {
  long: string;
  short: MatchStatusShort;
  elapsed: number | null;
  extra: number | null;
}

export interface MatchFixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string; // ISO UTC format
  timestamp: number;
  periods: MatchPeriod;
  venue: MatchVenue;
  status: MatchStatus;
}

export interface MatchLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings: boolean;
  tier: 1 | 2 | 3 | 4;
  vietnameseName: string;
}

export interface MatchTeam {
  id: number;
  name: string;
  shortName?: string;
  logo: string;
  winner: boolean | null;
}

export interface MatchGoals {
  home: number | null;
  away: number | null;
}

export interface MatchScoreDetails {
  home: number | null;
  away: number | null;
}

export interface MatchScore {
  halftime: MatchScoreDetails;
  fulltime: MatchScoreDetails;
  extratime: MatchScoreDetails;
  penalty: MatchScoreDetails;
}

export interface MatchEvent {
  time: {
    elapsed: number;
    extra?: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist?: {
    id: number | null;
    name: string | null;
  } | null;
  type: 'Goal' | 'Card' | 'subst';
  detail: 'Normal Goal' | 'Penalty' | 'Own Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
  comments?: string;
}

export interface MatchStatistic {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
  foulsHome: number;
  foulsAway: number;
  xGHome?: number;
  xGAway?: number;
}

export interface MatchOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  overUnder: number;
  prediction: string;
}

export interface BroadcasterInfo {
  name: string;
  badgeColor?: string;
  isExclusive?: boolean;
}

export interface FixtureItem {
  fixture: MatchFixture;
  league: MatchLeague;
  teams: {
    home: MatchTeam;
    away: MatchTeam;
  };
  goals: MatchGoals;
  score: MatchScore;
  
  // Broadcasters
  broadcasters?: BroadcasterInfo[];

  // Editorial coverage flags (as requested)
  has_preview?: boolean;     // Has "Nhận định & Phong độ" article
  has_recap?: boolean;       // Has "Tường thuật & Thống kê" article
  has_highlight?: boolean;   // Has "Video highlight"

  is_hot?: boolean;
  highlight_video_url?: string;
  highlight_duration?: string;
  recap_summary?: string;
  previewText?: string;
  events?: MatchEvent[];
  statistics?: MatchStatistic;
  odds?: MatchOdds;
}

export interface MatchLineupPlayer {
  id: number;
  name: string;
  shortName: string;
  number: number;
  position: 'G' | 'D' | 'M' | 'F' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker';
  gridX: number; // 0 - 100% horizontally on pitch
  gridY: number; // 0 - 100% vertically on pitch
  rating?: number;
  photo?: string;
  isCaptain?: boolean;
  events?: {
    type: 'goal' | 'card_yellow' | 'card_red' | 'sub_in' | 'sub_out';
    minute: number;
  }[];
  stats?: {
    minutes: number;
    goals: number;
    assists: number;
    shotsTotal: number;
    shotsOnTarget: number;
    passesTotal: number;
    keyPasses: number;
    passAccuracy: number; // e.g. 91
    duelsWon: number;
    duelsTotal: number;
    tackles: number;
    interceptions: number;
    saves?: number;
    touches?: number;
  };
}

export interface MatchLineupTeam {
  team: MatchTeam;
  formation: string; // e.g. '4-2-3-1'
  coach: {
    name: string;
    nationality?: string;
    photo?: string;
  };
  kitColor: {
    primary: string; // e.g. '#dc2626'
    number: string;  // e.g. '#ffffff'
    border?: string;
  };
  startXI: MatchLineupPlayer[];
  substitutes: {
    player: MatchLineupPlayer;
    subInMinute?: number;
    subOutFor?: string;
  }[];
}

export interface MatchComprehensiveStats {
  xG: { home: number; away: number };
  possession: { home: number; away: number };
  totalShots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  shotsOffTarget: { home: number; away: number };
  blockedShots: { home: number; away: number };
  shotsInsideBox: { home: number; away: number };
  totalPasses: { home: number; away: number };
  passAccuracy: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  saves: { home: number; away: number };
  goalsPrevented: { home: number; away: number };
}

export interface MatchTimelineEvent {
  minute: number;
  extraMinute?: number | null;
  period: '1H' | '2H' | 'HT' | 'FT';
  type: 'whistle_start' | 'goal' | 'card_yellow' | 'card_red' | 'subst' | 'var' | 'halftime' | 'fulltime';
  teamId?: number;
  isHome?: boolean;
  playerName?: string;
  playerInName?: string;
  playerOutName?: string;
  assistName?: string | null;
  scoreText?: string;
  title: string;
  description?: string;
  isDisallowed?: boolean;
}

export interface MatchPlayerOfTheMatch {
  player: MatchLineupPlayer;
  team: MatchTeam;
  rating: number;
  photo: string;
  badgeText: string;
  headlineStat: string;
  metrics: {
    label: string;
    value: string | number;
  }[];
}

export interface MatchFullDetails {
  fixture: FixtureItem;
  headline: string;
  recapArticle: {
    title: string;
    sapo: string;
    author: string;
    publishedAt: string;
    image: string;
    leadQuote: string;
  };
  highlightVideo?: {
    title: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
  };
  eventsTimeline: MatchTimelineEvent[];
  lineups: {
    home: MatchLineupTeam;
    away: MatchLineupTeam;
  };
  stats: MatchComprehensiveStats;
  motm?: MatchPlayerOfTheMatch;
  news: ArticleItem[];
}


export interface StandingTeam {
  rank: number;
  team: MatchTeam;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface ArticleItem {
  id: string;
  leagueId: number;
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
  category: string;
  author?: string;
  commentCount?: number;
  isHot?: boolean;
}

export interface PlayerItem {
  id: number;
  name: string;
  number: number;
  position: 'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker' | 'Forward' | string;
  nationality?: string;
  flag?: string;
  age: number;
  photo: string;
  appearances?: number;
  goals?: number;
  assists?: number;
  marketValue?: string;
}

export interface TeamProfile {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  fullName: string;
  logo: string;
  country: string;
  leagueId: number;
  leagueName: string;
  stadium: string;
  capacity: number;
  coach: string;
  founded: number;
  president?: string;
  marketValue?: string;
  mainCompetitions: string[];
  rank: number;
  points: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  form: ('W' | 'D' | 'L')[];
  topScorers: {
    name: string;
    photo: string;
    goals: number;
    assists: number;
    rank: number;
  }[];
  squad: PlayerItem[];
  recentVideos: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    date: string;
    views: string;
  }[];
  news: ArticleItem[];
}

export interface LeagueDetails {
  id: number;
  slug: string;
  name: string;
  vietnameseName: string;
  country: string;
  logo: string;
  flag: string;
  season: string;
  standings: StandingTeam[];
}
