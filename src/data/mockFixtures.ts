import { FixtureItem, StandingTeam } from '../types/football';
import { getInitialPremierLeagueFixtures } from '../services/premierLeagueService';
import { getInitialChampionsLeagueFixtures, getInitialChampionsLeagueStandings } from '../services/championsLeagueService';
import { getInitialLaLigaFixtures, getInitialLaLigaStandings } from '../services/laLigaService';
import { getInitialVLeagueFixtures, getInitialVLeagueStandings } from '../services/vLeagueService';
import { getInitialSerieAFixtures, getInitialSerieAStandings } from '../services/serieAService';
import { getInitialBundesligaFixtures, getInitialBundesligaStandings } from '../services/bundesligaService';
import { getInitialEuropaLeagueFixtures, getInitialEuropaLeagueStandings } from '../services/europaLeagueService';
import { getInitialLigue1Fixtures, getInitialLigue1Standings } from '../services/ligue1Service';
import { 
  getInitialSaudiFixtures, 
  getInitialMlsFixtures, 
  getInitialFaCupFixtures, 
  getInitialCarabaoCupFixtures 
} from '../services/extendedLeaguesService';
import realPremierLeagueStandings from './realPremierLeagueStandings.json';
import realSaudiStandings from './realSaudiStandings.json';
import realMlsStandings from './realMlsStandings.json';

// Real Premier League data is loaded directly from VnExpress API (https://gw.vnexpress.net/football/fixture?league_id=39)
export const EXACT_PROMPT_FIXTURES: FixtureItem[] = [];

export const LEAGUES_CONFIG = [
  {
    id: 39,
    name: "Premier League",
    country: "Anh",
    vietnameseName: "Premier League",
    logo: "https://is.vnecdn.net/objects/leagues/39.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 42, name: "Arsenal", shortName: "Arsenal", logo: "https://is.vnecdn.net/objects/teams/42.png?v=1", venue: "Emirates Stadium" },
      { id: 50, name: "Man City", shortName: "Manchester City", logo: "https://is.vnecdn.net/objects/teams/50.png?v=1", venue: "Etihad Stadium" },
      { id: 40, name: "Liverpool", shortName: "Liverpool", logo: "https://is.vnecdn.net/objects/teams/40.png?v=1", venue: "Anfield" },
      { id: 33, name: "Man Utd", shortName: "Manchester United", logo: "https://is.vnecdn.net/objects/teams/33.png?v=1", venue: "Old Trafford" },
      { id: 49, name: "Chelsea", shortName: "Chelsea", logo: "https://is.vnecdn.net/objects/teams/49.png?v=1", venue: "Stamford Bridge" },
      { id: 47, name: "Tottenham", shortName: "Tottenham", logo: "https://is.vnecdn.net/objects/teams/47.png?v=1", venue: "Tottenham Hotspur Stadium" },
      { id: 34, name: "Newcastle", shortName: "Newcastle", logo: "https://is.vnecdn.net/objects/teams/34.png?v=1", venue: "St. James' Park" },
      { id: 66, name: "Aston Villa", shortName: "Aston Villa", logo: "https://is.vnecdn.net/objects/teams/66.png?v=1", venue: "Villa Park" },
      { id: 51, name: "Brighton", shortName: "Brighton", logo: "https://is.vnecdn.net/objects/teams/51.png?v=1", venue: "Amex Stadium" },
      { id: 55, name: "Brentford", shortName: "Brentford", logo: "https://is.vnecdn.net/objects/teams/55.png?v=1", venue: "Gtech Community Stadium" },
      { id: 45, name: "Everton", shortName: "Everton", logo: "https://is.vnecdn.net/objects/teams/45.png?v=1", venue: "Goodison Park" },
      { id: 63, name: "Leeds", shortName: "Leeds", logo: "https://is.vnecdn.net/objects/teams/63.png?v=1", venue: "Elland Road" },
      { id: 64, name: "Hull City", shortName: "Hull City", logo: "https://is.vnecdn.net/objects/teams/64.png?v=1", venue: "MKM Stadium" },
      { id: 57, name: "Ipswich", shortName: "Ipswich", logo: "https://is.vnecdn.net/objects/teams/57.png?v=1", venue: "Portman Road" },
      { id: 52, name: "Crystal Palace", shortName: "Crystal Palace", logo: "https://is.vnecdn.net/objects/teams/52.png?v=1", venue: "Selhurst Park" },
      { id: 1346, name: "Coventry", shortName: "Coventry", logo: "https://is.vnecdn.net/objects/teams/1346.png?v=1", venue: "Coventry Building Society Arena" },
      { id: 65, name: "Nottingham Forest", shortName: "Nottingham Forest", logo: "https://is.vnecdn.net/objects/teams/65.png?v=1", venue: "City Ground" },
      { id: 746, name: "Sunderland", shortName: "Sunderland", logo: "https://is.vnecdn.net/objects/teams/746.png?v=1", venue: "Stadium of Light" },
      { id: 35, name: "Bournemouth", shortName: "Bournemouth", logo: "https://is.vnecdn.net/objects/teams/35.png?v=1", venue: "Vitality Stadium" },
      { id: 36, name: "Fulham", shortName: "Fulham", logo: "https://is.vnecdn.net/objects/teams/36.png?v=1", venue: "Craven Cottage" }
    ],
    scorers: ["Erling Haaland", "Mohamed Salah", "Bukayo Saka", "Cole Palmer", "Bruno Fernandes", "Son Heung-min", "Declan Rice", "Alexander Isak"]
  },
  {
    id: 2,
    name: "Champions League",
    country: "Châu Âu",
    vietnameseName: "Champions League",
    logo: "https://is.vnecdn.net/objects/leagues/2.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/eu.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 541, name: "Real Madrid", shortName: "Real Madrid", logo: "https://is.vnecdn.net/objects/teams/541.png?v=1", venue: "Santiago Bernabéu" },
      { id: 50, name: "Man City", shortName: "Manchester City", logo: "https://is.vnecdn.net/objects/teams/50.png?v=1", venue: "Etihad Stadium" },
      { id: 529, name: "Barca", shortName: "Barcelona", logo: "https://is.vnecdn.net/objects/teams/529.png?v=1", venue: "Camp Nou" },
      { id: 157, name: "Bayern", shortName: "Bayern München", logo: "https://is.vnecdn.net/objects/teams/157.png?v=1", venue: "Allianz Arena" },
      { id: 42, name: "Arsenal", shortName: "Arsenal", logo: "https://is.vnecdn.net/objects/teams/42.png?v=1", venue: "Emirates Stadium" },
      { id: 40, name: "Liverpool", shortName: "Liverpool", logo: "https://is.vnecdn.net/objects/teams/40.png?v=1", venue: "Anfield" },
      { id: 85, name: "PSG", shortName: "Paris Saint Germain", logo: "https://is.vnecdn.net/objects/teams/85.png?v=1", venue: "Parc des Princes" },
      { id: 505, name: "Inter", shortName: "Inter", logo: "https://is.vnecdn.net/objects/teams/505.png?v=1", venue: "San Siro" },
      { id: 165, name: "Dortmund", shortName: "Borussia Dortmund", logo: "https://is.vnecdn.net/objects/teams/165.png?v=1", venue: "Signal Iduna Park" },
      { id: 530, name: "Atletico ", shortName: "Atletico Madrid", logo: "https://is.vnecdn.net/objects/teams/530.png?v=1", venue: "Metropolitano Stadium" },
      { id: 492, name: "Napoli", shortName: "Napoli", logo: "https://is.vnecdn.net/objects/teams/492.png?v=1", venue: "Stadio Diego Armando Maradona" },
      { id: 66, name: "Aston Villa", shortName: "Aston Villa", logo: "https://is.vnecdn.net/objects/teams/66.png?v=1", venue: "Villa Park" },
      { id: 33, name: "Man Utd", shortName: "Manchester United", logo: "https://is.vnecdn.net/objects/teams/33.png?v=1", venue: "Old Trafford" },
      { id: 173, name: "RB Leipzig", shortName: "RB Leipzig", logo: "https://is.vnecdn.net/objects/teams/173.png?v=1", venue: "Red Bull Arena" },
      { id: 228, name: "Sporting CP", shortName: "Sporting CP", logo: "https://is.vnecdn.net/objects/teams/228.png?v=1", venue: "José Alvalade" },
      { id: 212, name: "FC Porto", shortName: "FC Porto", logo: "https://is.vnecdn.net/objects/teams/212.png?v=1", venue: "Estádio do Dragão" },
      { id: 209, name: "Feyenoord", shortName: "Feyenoord", logo: "https://is.vnecdn.net/objects/teams/209.png?v=1", venue: "De Kuip" },
      { id: 197, name: "PSV ", shortName: "PSV Eindhoven", logo: "https://is.vnecdn.net/objects/teams/197.png?v=1", venue: "Philips Stadion" },
      { id: 569, name: "Club Brugge", shortName: "Club Brugge KV", logo: "https://is.vnecdn.net/objects/teams/569.png?v=1", venue: "Jan Breydel Stadion" },
      { id: 543, name: "Real Betis", shortName: "Real Betis", logo: "https://is.vnecdn.net/objects/teams/543.png?v=1", venue: "Benito Villamarín" },
      { id: 533, name: "Villarreal", shortName: "Villarreal", logo: "https://is.vnecdn.net/objects/teams/533.png?v=1", venue: "Estadio de la Cerámica" },
      { id: 79, name: "Lille", shortName: "Lille", logo: "https://is.vnecdn.net/objects/teams/79.png?v=1", venue: "Decathlon Arena" },
      { id: 116, name: "Lens", shortName: "Lens", logo: "https://is.vnecdn.net/objects/teams/116.png?v=1", venue: "Stade Bollaert-Delelis" },
      { id: 172, name: "Stuttgart", shortName: "VfB Stuttgart", logo: "https://is.vnecdn.net/objects/teams/172.png?v=1", venue: "MHPArena" },
      { id: 497, name: "AS Roma", shortName: "AS Roma", logo: "https://is.vnecdn.net/objects/teams/497.png?v=1", venue: "Stadio Olimpico" },
      { id: 895, name: "Como", shortName: "Como", logo: "https://is.vnecdn.net/objects/teams/895.png?v=1", venue: "Stadio Giuseppe Sinigaglia" },
      { id: 645, name: "Galatasaray", shortName: "Galatasaray", logo: "https://is.vnecdn.net/objects/teams/645.png?v=1", venue: "Rams Park" },
      { id: 611, name: "Fenerbahçe", shortName: "Fenerbahçe", logo: "https://is.vnecdn.net/objects/teams/611.png?v=1", venue: "Şükrü Saracoğlu Stadium" },
      { id: 550, name: "Shakhtar", shortName: "Shakhtar Donetsk", logo: "https://is.vnecdn.net/objects/teams/550.png?v=1", venue: "Volksparkstadion" },
      { id: 560, name: "Slavia Praha", shortName: "Slavia Praha", logo: "https://is.vnecdn.net/objects/teams/560.png?v=1", venue: "Fortuna Arena" },
      { id: 656, name: "Slovan Bratislava", shortName: "Slovan Bratislava", logo: "https://is.vnecdn.net/objects/teams/656.png?v=1", venue: "Tehelné pole" },
      { id: 327, name: "Bodo/Glimt", shortName: "Bodo/Glimt", logo: "https://is.vnecdn.net/objects/teams/327.png?v=1", venue: "Aspmyra Stadion" },
      { id: 759, name: "Viking", shortName: "Viking", logo: "https://is.vnecdn.net/objects/teams/759.png?v=1", venue: "SR-Bank Arena" },
      { id: 1026, name: "Lask Linz", shortName: "Lask Linz", logo: "https://is.vnecdn.net/objects/teams/1026.png?v=1", venue: "Raiffeisen Arena" },
      { id: 575, name: "AEK Athens", shortName: "AEK Athens FC", logo: "https://is.vnecdn.net/objects/teams/575.png?v=1", venue: "OPAP Arena" },
      { id: 13976, name: "Sabah FA", shortName: "Sabah FA", logo: "https://is.vnecdn.net/objects/teams/13976.png?v=1", venue: "Bank Respublika Arena" }
    ],
    scorers: ["Kylian Mbappe", "Vinicius Junior", "Harry Kane", "Erling Haaland", "Lamine Yamal", "Robert Lewandowski", "Bukayo Saka", "Antoine Griezmann"]
  },
  {
    id: 3,
    name: "UEFA Europa League",
    country: "Châu Âu",
    vietnameseName: "Europa League",
    logo: "https://is.vnecdn.net/objects/leagues/3.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/eu.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 496, name: "Juventus", shortName: "Juventus", logo: "https://is.vnecdn.net/objects/teams/496.png?v=1", venue: "Allianz Stadium, Turin" },
      { id: 489, name: "AC Milan", shortName: "Milan", logo: "https://is.vnecdn.net/objects/teams/489.png?v=1", venue: "San Siro/Giuseppe Meazza, Milano" },
      { id: 168, name: "Bayer Leverkusen", shortName: "Leverkusen", logo: "https://is.vnecdn.net/objects/teams/168.png?v=1", venue: "BayArena, Leverkusen" },
      { id: 80, name: "Lyon", shortName: "Lyon", logo: "https://is.vnecdn.net/objects/teams/80.png?v=1", venue: "Groupama Stadium, Lyon" },
      { id: 81, name: "Marseille", shortName: "Marseille", logo: "https://is.vnecdn.net/objects/teams/81.png?v=1", venue: "Orange Vélodrome, Marseille" },
      { id: 211, name: "Benfica", shortName: "Benfica", logo: "https://is.vnecdn.net/objects/teams/211.png?v=1", venue: "Estádio da Luz, Lisbon" },
      { id: 548, name: "Real Sociedad", shortName: "Sociedad", logo: "https://is.vnecdn.net/objects/teams/548.png?v=1", venue: "Anoeta Stadium, San Sebastian" },
      { id: 52, name: "Crystal Palace", shortName: "Crystal Palace", logo: "https://is.vnecdn.net/objects/teams/52.png?v=1", venue: "Selhurst Park, London" },
      { id: 247, name: "Celtic", shortName: "Celtic", logo: "https://is.vnecdn.net/objects/teams/247.png?v=1", venue: "Celtic Park, Glasgow" },
      { id: 549, name: "Beşiktaş", shortName: "Beşiktaş", logo: "https://is.vnecdn.net/objects/teams/549.png?v=1", venue: "Tüpraş Stadium, Istanbul" }
    ],
    scorers: ["Dušan Vlahović", "Rafael Leão", "Victor Boniface", "Alexandre Lacazette", "Mason Greenwood", "Ángel Di María"]
  },
  {
    id: 340,
    name: "V-League",
    country: "Việt Nam",
    vietnameseName: "V-League",
    logo: "https://is.vnecdn.net/objects/leagues/340.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/vn.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 16400, name: "Công An Hà Nội", shortName: "CAHN", logo: "https://is.vnecdn.net/objects/teams/16400.png?v=1", venue: "SVĐ Hàng Đẫy" },
      { id: 9167, name: "Phù Đổng Ninh Bình", shortName: "Ninh Bình", logo: "https://is.vnecdn.net/objects/teams/9167.png?v=1", venue: "SVĐ Ninh Bình" },
      { id: 3678, name: "Sông Lam Nghệ An", shortName: "SLNA", logo: "https://is.vnecdn.net/objects/teams/3678.png?v=1", venue: "SVĐ Vinh" },
      { id: 3680, name: "Đông Á Thanh Hóa", shortName: "Thanh Hóa", logo: "https://is.vnecdn.net/objects/teams/3680.png?v=1", venue: "SVĐ Thanh Hóa" },
      { id: 11134, name: "Hồng Lĩnh Hà Tĩnh", shortName: "Hà Tĩnh", logo: "https://is.vnecdn.net/objects/teams/11134.png?v=1", venue: "SVĐ Hà Tĩnh" },
      { id: 3674, name: "Thép Xanh Nam Định", shortName: "Nam Định", logo: "https://is.vnecdn.net/objects/teams/3674.png?v=1", venue: "SVĐ Thiên Trường" },
      { id: 3672, name: "Công An TP. Hồ Chí Minh", shortName: "CA TP.HCM", logo: "https://is.vnecdn.net/objects/teams/3672.png?v=1", venue: "SVĐ Thống Nhất" },
      { id: 3669, name: "SHB Đà Nẵng", shortName: "Đà Nẵng", logo: "https://is.vnecdn.net/objects/teams/3669.png?v=1", venue: "SVĐ Hòa Xuân" },
      { id: 3681, name: "Thể Công - Viettel", shortName: "Thể Công", logo: "https://is.vnecdn.net/objects/teams/3681.png?v=1", venue: "SVĐ Mỹ Đình" },
      { id: 26601, name: "Bắc Ninh FC", shortName: "Bắc Ninh", logo: "https://is.vnecdn.net/objects/teams/26601.png?v=1", venue: "SVĐ Việt Yên" },
      { id: 3671, name: "Hải Phòng FC", shortName: "Hải Phòng", logo: "https://is.vnecdn.net/objects/teams/3671.jpg?v=1", venue: "SVĐ Lạch Tray" },
      { id: 3673, name: "Hoàng Anh Gia Lai", shortName: "HAGL", logo: "https://is.vnecdn.net/objects/teams/3673.jpg?v=1", venue: "SVĐ Pleiku" },
      { id: 3670, name: "Hà Nội FC", shortName: "Hà Nội FC", logo: "https://is.vnecdn.net/objects/teams/3670.png?v=1", venue: "SVĐ Hàng Đẫy" },
      { id: 9161, name: "Trường Tươi Bình Phước", shortName: "Bình Phước", logo: "https://is.vnecdn.net/objects/teams/9161.png?v=1", venue: "SVĐ Bình Phước" }
    ],
    scorers: ["Nguyễn Quang Hải", "Nguyễn Tiến Linh", "Nguyễn Hoàng Đức", "Phạm Tuấn Hải", "Rafaelson", "Léo Artur"]
  },
  {
    id: 140,
    name: "LaLiga",
    country: "Tây Ban Nha",
    vietnameseName: "La Liga",
    logo: "https://is.vnecdn.net/objects/leagues/140.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/es.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 529, name: "Barcelona", shortName: "Barcelona", logo: "https://is.vnecdn.net/objects/teams/529.png?v=1", venue: "Camp Nou" },
      { id: 530, name: "Atletico Madrid", shortName: "Atletico Madrid", logo: "https://is.vnecdn.net/objects/teams/530.png?v=1", venue: "Metropolitano Stadium" },
      { id: 543, name: "Real Betis", shortName: "Real Betis", logo: "https://is.vnecdn.net/objects/teams/543.png?v=1", venue: "Estadio de La Cartuja" },
      { id: 541, name: "Real Madrid", shortName: "Real Madrid", logo: "https://is.vnecdn.net/objects/teams/541.png?v=1", venue: "Santiago Bernabéu Stadium" },
      { id: 536, name: "Sevilla", shortName: "Sevilla", logo: "https://is.vnecdn.net/objects/teams/536.png?v=1", venue: "Estadio Ramón Sánchez-Pizjuán" },
      { id: 548, name: "Real Sociedad", shortName: "Real Sociedad", logo: "https://is.vnecdn.net/objects/teams/548.png?v=1", venue: "Anoeta" },
      { id: 542, name: "Alaves", shortName: "Alaves", logo: "https://is.vnecdn.net/objects/teams/542.png?v=1", venue: "Estadio Mendizorrotza" },
      { id: 544, name: "Deportivo La Coruna", shortName: "Deportivo La Coruna", logo: "https://is.vnecdn.net/objects/teams/544.png?v=1", venue: "Estadio Municipal de Riazor" },
      { id: 538, name: "Celta Vigo", shortName: "Celta Vigo", logo: "https://is.vnecdn.net/objects/teams/538.png?v=1", venue: "Municipal de Balaídos" },
      { id: 531, name: "Athletic Club", shortName: "Athletic Club", logo: "https://is.vnecdn.net/objects/teams/531.png?v=1", venue: "San Mamés Stadium" },
      { id: 533, name: "Villarreal", shortName: "Villarreal", logo: "https://is.vnecdn.net/objects/teams/533.png?v=1", venue: "Estadio de la Ceramica" },
      { id: 540, name: "Espanyol", shortName: "Espanyol", logo: "https://is.vnecdn.net/objects/teams/540.png?v=1", venue: "RCDE Stadium" },
      { id: 728, name: "Rayo Vallecano", shortName: "Rayo Vallecano", logo: "https://is.vnecdn.net/objects/teams/728.png?v=1", venue: "Campo de Futbol de Vallecas" },
      { id: 546, name: "Getafe", shortName: "Getafe", logo: "https://is.vnecdn.net/objects/teams/546.png?v=1", venue: "Coliseum" },
      { id: 4665, name: "Racing Santander", shortName: "Racing Santander", logo: "https://is.vnecdn.net/objects/teams/4665.png?v=1", venue: "Estadio El Sardinero" },
      { id: 727, name: "Osasuna", shortName: "Osasuna", logo: "https://is.vnecdn.net/objects/teams/727.png?v=1", venue: "Estadio El Sadar" },
      { id: 539, name: "Levante", shortName: "Levante", logo: "https://is.vnecdn.net/objects/teams/539.png?v=1", venue: "Estadio Ciudad de Valencia" },
      { id: 797, name: "Elche", shortName: "Elche", logo: "https://is.vnecdn.net/objects/teams/797.png?v=1", venue: "Estadio Manuel Martínez Valero" },
      { id: 532, name: "Valencia", shortName: "Valencia", logo: "https://is.vnecdn.net/objects/teams/532.png?v=1", venue: "Estadio de Mestalla" },
      { id: 535, name: "Malaga", shortName: "Malaga", logo: "https://is.vnecdn.net/objects/teams/535.png?v=1", venue: "Estadio La Rosaleda" }
    ],
    scorers: ["Kylian Mbappe", "Vinicius Jr", "Lamine Yamal", "Robert Lewandowski", "Antoine Griezmann", "Raphinha"]
  },
  {
    id: 135,
    name: "Serie A",
    country: "Italy",
    vietnameseName: "Serie A",
    logo: "https://is.vnecdn.net/objects/leagues/135.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/it.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 505, name: "Inter Milan", shortName: "Inter", logo: "https://is.vnecdn.net/objects/teams/505.png?v=1", venue: "San Siro/Giuseppe Meazza, Milan" },
      { id: 487, name: "Lazio", shortName: "Lazio", logo: "https://is.vnecdn.net/objects/teams/487.png?v=1", venue: "Stadio Olimpico, Rome" },
      { id: 497, name: "AS Roma", shortName: "Roma", logo: "https://is.vnecdn.net/objects/teams/497.png?v=1", venue: "Stadio Olimpico, Rome" },
      { id: 490, name: "Cagliari", shortName: "Cagliari", logo: "https://is.vnecdn.net/objects/teams/490.png?v=1", venue: "Unipol Domus, Cagliari" },
      { id: 489, name: "AC Milan", shortName: "Milan", logo: "https://is.vnecdn.net/objects/teams/489.png?v=1", venue: "San Siro/Giuseppe Meazza, Milano" },
      { id: 496, name: "Juventus", shortName: "Juventus", logo: "https://is.vnecdn.net/objects/teams/496.png?v=1", venue: "Allianz Stadium, Turin" },
      { id: 895, name: "Como", shortName: "Como", logo: "https://is.vnecdn.net/objects/teams/895.png?v=1", venue: "Stadio Giuseppe Sinigaglia, Como" },
      { id: 492, name: "Napoli", shortName: "Napoli", logo: "https://is.vnecdn.net/objects/teams/492.png?v=1", venue: "Stadio Diego Armando Maradona, Naples" },
      { id: 512, name: "Frosinone", shortName: "Frosinone", logo: "https://is.vnecdn.net/objects/teams/512.png?v=1", venue: "Stadio Benito Stirpe, Frosinone" },
      { id: 499, name: "Atalanta", shortName: "Atalanta", logo: "https://is.vnecdn.net/objects/teams/499.png?v=1", venue: "New Balance Arena, Bergamo" },
      { id: 488, name: "Sassuolo", shortName: "Sassuolo", logo: "https://is.vnecdn.net/objects/teams/488.png?v=1", venue: "Mapei Stadium, Reggio Emilia" },
      { id: 503, name: "Torino", shortName: "Torino", logo: "https://is.vnecdn.net/objects/teams/503.png?v=1", venue: "Stadio Olimpico Grande Torino, Turin" },
      { id: 867, name: "Lecce", shortName: "Lecce", logo: "https://is.vnecdn.net/objects/teams/867.png?v=1", venue: "Via del Mare, Lecce" },
      { id: 500, name: "Bologna", shortName: "Bologna", logo: "https://is.vnecdn.net/objects/teams/500.png?v=1", venue: "Renato Dall'Ara, Bologna" },
      { id: 494, name: "Udinese", shortName: "Udinese", logo: "https://is.vnecdn.net/objects/teams/494.png?v=1", venue: "Bluenergy Stadium - Stadio Friuli, Udine" },
      { id: 1579, name: "Monza", shortName: "Monza", logo: "https://is.vnecdn.net/objects/teams/1579.png?v=1", venue: "U-Power Stadium, Monza" },
      { id: 495, name: "Genoa", shortName: "Genoa", logo: "https://is.vnecdn.net/objects/teams/495.png?v=1", venue: "Luigi Ferraris, Genova" },
      { id: 523, name: "Parma", shortName: "Parma", logo: "https://is.vnecdn.net/objects/teams/523.png?v=1", venue: "Stadio Ennio Tardini, Parma" },
      { id: 502, name: "Fiorentina", shortName: "Fiorentina", logo: "https://is.vnecdn.net/objects/teams/502.png?v=1", venue: "Stadio Artemio Franchi, Florence" },
      { id: 517, name: "Venezia", shortName: "Venezia", logo: "https://is.vnecdn.net/objects/teams/517.png?v=1", venue: "Stadio Pierluigi Penzo, Venice" }
    ],
    scorers: ["Lautaro Martinez", "Dusan Vlahovic", "Rafael Leao", "Marcus Thuram", "Khvicha Kvaratskhelia", "Ciro Immobile"]
  },
  {
    id: 78,
    name: "Bundesliga",
    country: "Đức",
    vietnameseName: "Bundesliga",
    logo: "https://is.vnecdn.net/objects/leagues/78.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/de.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 160, name: "Freiburg", shortName: "Freiburg", logo: "https://is.vnecdn.net/objects/teams/160.png?v=1", venue: "Europa-Park Stadion, Freiburg" },
      { id: 165, name: "Borussia Dortmund", shortName: "Dortmund", logo: "https://is.vnecdn.net/objects/teams/165.png?v=1", venue: "Signal Iduna Park, Dortmund" },
      { id: 157, name: "Bayern Munich", shortName: "Bayern", logo: "https://is.vnecdn.net/objects/teams/157.png?v=1", venue: "Allianz Arena, Munich" },
      { id: 168, name: "Bayer Leverkusen", shortName: "Leverkusen", logo: "https://is.vnecdn.net/objects/teams/168.png?v=1", venue: "BayArena, Leverkusen" },
      { id: 173, name: "RB Leipzig", shortName: "Leipzig", logo: "https://is.vnecdn.net/objects/teams/173.png?v=1", venue: "Red Bull Arena, Leipzig" },
      { id: 170, name: "FC Augsburg", shortName: "Augsburg", logo: "https://is.vnecdn.net/objects/teams/170.png?v=1", venue: "WWK Arena, Augsburg" },
      { id: 162, name: "Werder Bremen", shortName: "Bremen", logo: "https://is.vnecdn.net/objects/teams/162.png?v=1", venue: "Weserstadion, Bremen" },
      { id: 164, name: "Mainz 05", shortName: "Mainz", logo: "https://is.vnecdn.net/objects/teams/164.png?v=1", venue: "Mewa Arena, Mainz" },
      { id: 1660, name: "SV Elversberg", shortName: "Elversberg", logo: "https://is.vnecdn.net/objects/teams/1660.png?v=1", venue: "Waldstadion Kaiserlinde, Spiesen-Elversberg" },
      { id: 192, name: "1. FC Köln", shortName: "Köln", logo: "https://is.vnecdn.net/objects/teams/192.png?v=1", venue: "RheinEnergieStadion, Cologne" },
      { id: 172, name: "VfB Stuttgart", shortName: "Stuttgart", logo: "https://is.vnecdn.net/objects/teams/172.png?v=1", venue: "MHPArena, Stuttgart" },
      { id: 175, name: "Hamburger SV", shortName: "Hamburg", logo: "https://is.vnecdn.net/objects/teams/175.png?v=1", venue: "Volksparkstadion, Hamburg" },
      { id: 174, name: "Schalke 04", shortName: "Schalke", logo: "https://is.vnecdn.net/objects/teams/174.png?v=1", venue: "Veltins Arena, Gelsenkirchen" },
      { id: 169, name: "Eintracht Frankfurt", shortName: "Frankfurt", logo: "https://is.vnecdn.net/objects/teams/169.png?v=1", venue: "Deutsche Bank Park, Frankfurt" },
      { id: 185, name: "SC Paderborn 07", shortName: "Paderborn", logo: "https://is.vnecdn.net/objects/teams/185.png?v=1", venue: "Home Deluxe Arena, Paderborn" },
      { id: 182, name: "Union Berlin", shortName: "Union Berlin", logo: "https://is.vnecdn.net/objects/teams/182.png?v=1", venue: "An der Alten Försterei, Berlin" },
      { id: 167, name: "Hoffenheim", shortName: "Hoffenheim", logo: "https://is.vnecdn.net/objects/teams/167.png?v=1", venue: "PreZero Arena, Sinsheim" },
      { id: 163, name: "Borussia M'gladbach", shortName: "M'gladbach", logo: "https://is.vnecdn.net/objects/teams/163.png?v=1", venue: "Borussia-Park, Monchengladbach" }
    ],
    scorers: ["Harry Kane", "Florian Wirtz", "Jamal Musiala", "Victor Boniface", "Serhou Guirassy", "Benjamin Sesko"]
  },
  {
    id: 61,
    name: "Ligue 1",
    country: "Pháp",
    vietnameseName: "Ligue 1",
    logo: "https://is.vnecdn.net/objects/leagues/61.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/fr.svg?v=1",
    tier: 1 as const,
    teams: [
      { id: 85, name: "Paris Saint-Germain", shortName: "PSG", logo: "https://is.vnecdn.net/objects/teams/85.png?v=1", venue: "Parc des Princes, Paris" },
      { id: 81, name: "Marseille", shortName: "Marseille", logo: "https://is.vnecdn.net/objects/teams/81.png?v=1", venue: "Stade Vélodrome, Marseille" },
      { id: 80, name: "Lyon", shortName: "Lyon", logo: "https://is.vnecdn.net/objects/teams/80.png?v=1", venue: "Groupama Stadium, Lyon" },
      { id: 91, name: "Monaco", shortName: "Monaco", logo: "https://is.vnecdn.net/objects/teams/91.png?v=1", venue: "Stade Louis II, Monaco" },
      { id: 79, name: "Lille", shortName: "Lille", logo: "https://is.vnecdn.net/objects/teams/79.png?v=1", venue: "Decathlon Arena, Lille" },
      { id: 94, name: "Rennes", shortName: "Rennes", logo: "https://is.vnecdn.net/objects/teams/94.png?v=1", venue: "Roazhon Park, Rennes" },
      { id: 84, name: "Nice", shortName: "Nice", logo: "https://is.vnecdn.net/objects/teams/84.png?v=1", venue: "Allianz Riviera, Nice" },
      { id: 116, name: "Lens", shortName: "Lens", logo: "https://is.vnecdn.net/objects/teams/116.png?v=1", venue: "Stade Bollaert-Delelis, Lens" },
      { id: 106, name: "Brest", shortName: "Brest", logo: "https://is.vnecdn.net/objects/teams/106.png?v=1", venue: "Stade Francis-Le Blé, Brest" },
      { id: 95, name: "Strasbourg", shortName: "Strasbourg", logo: "https://is.vnecdn.net/objects/teams/95.png?v=1", venue: "Stade de la Meinau, Strasbourg" },
      { id: 96, name: "Toulouse", shortName: "Toulouse", logo: "https://is.vnecdn.net/objects/teams/96.png?v=1", venue: "Stadium de Toulouse, Toulouse" },
      { id: 108, name: "Auxerre", shortName: "Auxerre", logo: "https://is.vnecdn.net/objects/teams/108.png?v=1", venue: "Stade de l'Abbé-Deschamps, Auxerre" },
      { id: 97, name: "Lorient", shortName: "Lorient", logo: "https://is.vnecdn.net/objects/teams/97.png?v=1", venue: "Stade du Moustoir, Lorient" },
      { id: 114, name: "Paris FC", shortName: "Paris FC", logo: "https://is.vnecdn.net/objects/teams/114.png?v=1", venue: "Stade Charléty, Paris" },
      { id: 77, name: "Angers", shortName: "Angers", logo: "https://is.vnecdn.net/objects/teams/77.png?v=1", venue: "Stade Raymond Kopa, Angers" },
      { id: 110, name: "Troyes", shortName: "Troyes", logo: "https://is.vnecdn.net/objects/teams/110.png?v=1", venue: "Stade de l'Aube, Troyes" },
      { id: 111, name: "Le Havre", shortName: "Le Havre", logo: "https://is.vnecdn.net/objects/teams/111.png?v=1", venue: "Stade Océane, Le Havre" },
      { id: 1298, name: "Le Mans", shortName: "Le Mans", logo: "https://is.vnecdn.net/objects/teams/1298.png?v=1", venue: "Stade Marie-Marvingt, Le Mans" }
    ],
    scorers: ["Bradley Barcola", "Ousmane Dembélé", "Mason Greenwood", "Jonathan David", "Alexandre Lacazette"]
  },
  {
    id: 307,
    name: "Saudi Pro League",
    country: "Ả Rập Xê Út",
    vietnameseName: "Saudi Pro League",
    logo: "https://media.api-sports.io/football/leagues/307.png",
    flag: "https://media.api-sports.io/flags/sa.svg",
    tier: 3 as const,
    teams: [
      { id: 1022, name: "Al Nassr", shortName: "Al Nassr", logo: "https://media.api-sports.io/football/teams/1022.png", venue: "Al-Awwal Park" },
      { id: 1023, name: "Al Hilal", shortName: "Al Hilal", logo: "https://media.api-sports.io/football/teams/1023.png", venue: "Kingdom Arena" },
      { id: 1024, name: "Al Ittihad", shortName: "Al Ittihad", logo: "https://media.api-sports.io/football/teams/1024.png", venue: "King Abdullah Sports City" }
    ],
    scorers: ["Cristiano Ronaldo", "Karim Benzema", "Aleksandar Mitrovic"]
  },
  {
    id: 253,
    name: "MLS",
    country: "Mỹ",
    vietnameseName: "MLS",
    logo: "https://media.api-sports.io/football/leagues/253.png",
    flag: "https://media.api-sports.io/flags/us.svg",
    tier: 3 as const,
    teams: [
      { id: 1598, name: "Inter Miami", shortName: "Inter Miami", logo: "https://media.api-sports.io/football/teams/1598.png", venue: "Chase Stadium" },
      { id: 1599, name: "LA Galaxy", shortName: "LA Galaxy", logo: "https://media.api-sports.io/football/teams/1599.png", venue: "Dignity Health Sports Park" }
    ],
    scorers: ["Lionel Messi", "Luis Suarez"]
  }
];

const HIGHLIGHT_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
];

function generateMatchEvents(
  homeTeam: { id: number; name: string; logo: string },
  awayTeam: { id: number; name: string; logo: string },
  homeGoals: number,
  awayGoals: number,
  scorersList: string[]
) {
  const events = [];
  for (let i = 0; i < homeGoals; i++) {
    const elapsed = Math.floor(10 + Math.random() * 78);
    const scorer = scorersList[Math.floor(Math.random() * scorersList.length)] || "Cầu thủ";
    events.push({
      time: { elapsed, extra: null },
      team: homeTeam,
      player: { id: 1000 + i, name: scorer },
      type: 'Goal' as const,
      detail: (i === 1 && Math.random() > 0.7 ? 'Penalty' : 'Normal Goal') as any
    });
  }
  for (let i = 0; i < awayGoals; i++) {
    const elapsed = Math.floor(15 + Math.random() * 74);
    const scorer = scorersList[Math.floor(Math.random() * scorersList.length)] || "Tiền đạo";
    events.push({
      time: { elapsed, extra: null },
      team: awayTeam,
      player: { id: 2000 + i, name: scorer },
      type: 'Goal' as const,
      detail: 'Normal Goal' as const
    });
  }
  return events.sort((a, b) => a.time.elapsed - b.time.elapsed);
}

export function generateAllFixtures(): FixtureItem[] {
  // Real Premier League, Champions League, Europa League, LaLiga, V-League, Serie A & Bundesliga data from VnExpress API
  const realPremierLeague = getInitialPremierLeagueFixtures();
  const realChampionsLeague = getInitialChampionsLeagueFixtures();
  const realEuropaLeague = getInitialEuropaLeagueFixtures();
  const realLaLiga = getInitialLaLigaFixtures();
  const realVLeague = getInitialVLeagueFixtures();
  const realSerieA = getInitialSerieAFixtures();
  const realBundesliga = getInitialBundesligaFixtures();
  const realLigue1 = getInitialLigue1Fixtures();
  const allFixtures: FixtureItem[] = [
    ...realPremierLeague, 
    ...realChampionsLeague, 
    ...realEuropaLeague,
    ...realLaLiga, 
    ...realVLeague, 
    ...realSerieA,
    ...realBundesliga,
    ...realLigue1,
    ...getInitialSaudiFixtures(),
    ...getInitialMlsFixtures(),
    ...getInitialFaCupFixtures(),
    ...getInitialCarabaoCupFixtures()
  ];

  const dates = [
    "2026-09-28",
    "2026-09-29",
    "2026-09-30",
    "2026-10-01",
    "2026-10-02",
    "2026-10-03",
    "2026-10-04",
    "2026-10-05",
    "2026-10-06",
    "2026-10-07",
    "2026-10-08",
    "2026-10-09",
    "2026-10-10",
    "2026-10-11",
    "2026-10-12",
    "2026-10-13",
    "2026-10-14",
    "2026-10-15"
  ];

  const REAL_LEAGUE_IDS = new Set([39, 2, 3, 140, 340, 382, 135, 78, 61, 307, 253, 45, 48, 40, 94, 88]);
  let idCounter = 1558000;

  dates.forEach((dateStr, dayIndex) => {
    LEAGUES_CONFIG.forEach((league, leagueIdx) => {
      // 100% REAL data from VnExpress & official leagues
      if (REAL_LEAGUE_IDS.has(league.id)) return;

      const teams = league.teams;
      if (teams.length < 2) return;

      const pairsCount = (league.tier as number) === 1 ? 4 : (league.tier as number) === 2 ? 3 : 2;

      for (let p = 0; p < pairsCount; p++) {
        const homeIdx = (dayIndex * 3 + p * 2) % teams.length;
        let awayIdx = (homeIdx + 1 + p) % teams.length;
        if (awayIdx === homeIdx) awayIdx = (homeIdx + 2) % teams.length;

        const homeTeam = teams[homeIdx];
        const awayTeam = teams[awayIdx];

        idCounter++;

        let hourUtc: number;
        let minuteUtc: number;

        if (league.country === "Vietnam") {
          const times = [10, 11, 12];
          hourUtc = times[(p + dayIndex) % times.length];
          minuteUtc = (p === 2) ? 15 : 0;
        } else if (league.id === 2) {
          hourUtc = (p % 2 === 0) ? 19 : 16;
          minuteUtc = (p % 2 === 0) ? 0 : 45;
        } else if (league.country === "Saudi Arabia") {
          hourUtc = 18;
          minuteUtc = 0;
        } else if (league.country === "USA") {
          hourUtc = 23;
          minuteUtc = 30;
        } else {
          const times = [11, 14, 16, 19];
          hourUtc = times[(p + leagueIdx) % times.length];
          minuteUtc = (hourUtc === 11 || hourUtc === 16) ? 30 : 0;
        }

        const dateIso = `${dateStr}T${String(hourUtc).padStart(2, '0')}:${String(minuteUtc).padStart(2, '0')}:00+00:00`;
        const timestamp = Math.floor(new Date(dateIso).getTime() / 1000);

        let statusShort: any = "NS";
        let statusLong = "Not Started";
        let elapsed: number | null = null;
        let homeGoals: number | null = null;
        let awayGoals: number | null = null;
        let htHome: number | null = null;
        let htAway: number | null = null;
        let winnerHome: boolean | null = null;
        let winnerAway: boolean | null = null;

        const isPast = dateStr < "2026-10-13";
        const isToday = dateStr === "2026-10-13";

        if (isPast) {
          statusShort = "FT";
          statusLong = "Match Finished";
          homeGoals = (idCounter + p) % 4;
          awayGoals = (idCounter * 2 + p) % 3;
          htHome = Math.min(homeGoals, Math.floor(homeGoals / 2));
          htAway = Math.min(awayGoals, Math.floor(awayGoals / 2));
          winnerHome = homeGoals > awayGoals ? true : homeGoals < awayGoals ? false : null;
          winnerAway = awayGoals > homeGoals ? true : awayGoals < homeGoals ? false : null;
        } else if (isToday) {
          if (p === 0 && (league.id === 39 || league.id === 140 || league.id === 382 || league.id === 2)) {
            const liveStates = [
              { short: "1H", long: "First Half", elapsed: 38 },
              { short: "HT", long: "Halftime", elapsed: 45 },
              { short: "2H", long: "Second Half", elapsed: 72 },
              { short: "2H", long: "Second Half", elapsed: 88 }
            ];
            const liveState = liveStates[leagueIdx % liveStates.length];
            statusShort = liveState.short;
            statusLong = liveState.long;
            elapsed = liveState.elapsed;
            homeGoals = (leagueIdx % 2) + 1;
            awayGoals = (leagueIdx % 3);
            htHome = 1;
            htAway = 0;
          } else if (hourUtc < 14) {
            statusShort = "FT";
            statusLong = "Match Finished";
            homeGoals = (idCounter % 3) + 1;
            awayGoals = (idCounter % 2);
            htHome = 1;
            htAway = 0;
            winnerHome = homeGoals > awayGoals;
            winnerAway = awayGoals > homeGoals;
          } else if (hourUtc === 14 && minuteUtc === 0) {
            statusShort = "COUNTDOWN";
            statusLong = "Starting in 12 min";
          } else {
            statusShort = "NS";
            statusLong = "Not Started";
          }
        } else {
          statusShort = "NS";
          statusLong = "Not Started";
        }

        const isBigClub = 
          homeTeam.name.includes("Manchester") || 
          homeTeam.name.includes("Arsenal") || 
          homeTeam.name.includes("Liverpool") || 
          homeTeam.name.includes("Real Madrid") || 
          homeTeam.name.includes("Barcelona") || 
          homeTeam.name.includes("Chelsea") ||
          homeTeam.name.includes("Bayern") ||
          homeTeam.name.includes("Al Nassr") ||
          homeTeam.name.includes("Inter Miami") ||
          homeTeam.name.includes("Công An") ||
          homeTeam.name.includes("Hà Nội");

        const isHot = isBigClub && (p === 0 || p === 1);

        // User requirement:
        // "Vẫn show button Nhận định & Phong độ ở các trận đấu lớn mà có sản xuất nội dung tin bài."
        // "Show button 'Video highlight' và 'Tường thuật & Thống kê' ở các trận đấu mà có sản xuất các tin bài tương ứng, không phải tất cả các trận đều có các tin bài này."
        const hasPreview = isHot || (league.tier === 1 && p === 0);
        const hasHighlight = (statusShort === "FT" && (isHot || (idCounter % 3 === 0)));
        const hasRecap = (statusShort === "FT" && (isHot || (idCounter % 2 === 0)));

        let events = undefined;
        let highlightVideo = undefined;
        let highlightDuration = undefined;
        let recap = undefined;

        if (statusShort === "FT" || statusShort === "1H" || statusShort === "2H" || statusShort === "HT") {
          events = generateMatchEvents(
            { id: homeTeam.id, name: homeTeam.name, logo: homeTeam.logo },
            { id: awayTeam.id, name: awayTeam.name, logo: awayTeam.logo },
            homeGoals || 0,
            awayGoals || 0,
            league.scorers
          );
        }

        if (hasHighlight) {
          highlightVideo = HIGHLIGHT_VIDEOS[idCounter % HIGHLIGHT_VIDEOS.length];
          highlightDuration = ["03:45", "04:12", "02:55"][idCounter % 3];
        }

        if (hasRecap) {
          recap = `${homeTeam.name} và ${awayTeam.name} cống hiến 90 phút đôi công hấp dẫn. Tỷ số chung cuộc ${homeGoals} - ${awayGoals} phản ánh đúng cục diện trận đấu.`;
        }

        allFixtures.push({
          fixture: {
            id: idCounter,
            referee: "Trọng tài FIFA",
            timezone: "UTC",
            date: dateIso,
            timestamp,
            periods: { first: null, second: null },
            venue: {
              id: 100 + (idCounter % 50),
              name: homeTeam.venue || "Sân vận động",
              city: league.country
            },
            status: {
              long: statusLong,
              short: statusShort,
              elapsed,
              extra: null
            }
          },
          league: {
            id: league.id,
            name: league.name,
            country: league.country,
            logo: league.logo,
            flag: league.flag,
            season: 2026,
            round: (league.id === 2 || league.id === 3) 
              ? "Vòng phân hạng - " + (Math.floor(dayIndex / 3) + 1)
              : "Vòng " + (Math.floor(dayIndex / 2) + 6),
            standings: true,
            tier: league.tier,
            vietnameseName: league.vietnameseName
          },
          teams: {
            home: {
              id: homeTeam.id,
              name: homeTeam.name,
              shortName: homeTeam.shortName,
              logo: homeTeam.logo,
              winner: winnerHome
            },
            away: {
              id: awayTeam.id,
              name: awayTeam.name,
              shortName: awayTeam.shortName,
              logo: awayTeam.logo,
              winner: winnerAway
            }
          },
          goals: {
            home: homeGoals,
            away: awayGoals
          },
          score: {
            halftime: { home: htHome, away: htAway },
            fulltime: { home: homeGoals, away: awayGoals },
            extratime: { home: null, away: null },
            penalty: { home: null, away: null }
          },
          is_hot: isHot,
          has_preview: hasPreview,
          has_recap: hasRecap,
          has_highlight: hasHighlight,
          highlight_video_url: highlightVideo,
          highlight_duration: highlightDuration,
          recap_summary: recap,
          previewText: isHot ? `Nhận định tâm điểm: ${homeTeam.name} đối đầu ${awayTeam.name}. Phong độ và đội hình tối ưu của hai đội.` : undefined,
          events,
          statistics: (statusShort === "FT" || statusShort === "2H" || statusShort === "1H") ? {
            possessionHome: 53,
            possessionAway: 47,
            shotsHome: 14,
            shotsAway: 9,
            shotsOnTargetHome: (homeGoals || 0) + 4,
            shotsOnTargetAway: (awayGoals || 0) + 3,
            cornersHome: 6,
            cornersAway: 4,
            foulsHome: 10,
            foulsAway: 12,
            xGHome: Number(((homeGoals || 0) * 0.8 + 0.5).toFixed(2)),
            xGAway: Number(((awayGoals || 0) * 0.7 + 0.3).toFixed(2))
          } : undefined,
          odds: {
            homeWin: 1.85,
            draw: 3.40,
            awayWin: 3.10,
            overUnder: 2.75,
            prediction: `${homeTeam.name} được đánh giá cao hơn với khả năng thắng 56%`
          }
        });
      }
    });
  });

  return allFixtures;
}

export const PREMIER_LEAGUE_STANDINGS: StandingTeam[] = realPremierLeagueStandings as unknown as StandingTeam[];

export const VLEAGUE_STANDINGS: StandingTeam[] = getInitialVLeagueStandings();
export const CHAMPIONS_LEAGUE_STANDINGS: StandingTeam[] = getInitialChampionsLeagueStandings();
export const EUROPA_LEAGUE_STANDINGS: StandingTeam[] = getInitialEuropaLeagueStandings();
export const LALIGA_STANDINGS: StandingTeam[] = getInitialLaLigaStandings();
export const SERIEA_STANDINGS: StandingTeam[] = getInitialSerieAStandings();
export const BUNDESLIGA_STANDINGS: StandingTeam[] = getInitialBundesligaStandings();
export const LIGUE1_STANDINGS: StandingTeam[] = getInitialLigue1Standings();
export const SAUDI_STANDINGS: StandingTeam[] = realSaudiStandings as unknown as StandingTeam[];
export const MLS_STANDINGS: StandingTeam[] = realMlsStandings as unknown as StandingTeam[];

