import { TeamProfile, PlayerItem, ArticleItem } from '../types/football';

export const MAN_UTD_PROFILE: TeamProfile = {
  id: 33,
  slug: 'man-utd-33',
  name: 'Manchester United',
  shortName: 'Man Utd',
  fullName: 'Manchester United Football Club',
  logo: 'https://media.api-sports.io/football/teams/33.png',
  country: 'Anh',
  leagueId: 39,
  leagueName: 'Ngoại Hạng Anh (Premier League)',
  stadium: 'Old Trafford',
  capacity: 74310,
  coach: 'M. Carrick',
  founded: 1878,
  president: 'Sir Jim Ratcliffe',
  marketValue: '857 triệu Euro',
  mainCompetitions: ['Ngoại Hạng Anh', 'Cúp C2 châu Âu (Europa League)', 'Cúp FA', 'Carabao Cup'],
  rank: 5,
  points: 12,
  played: 6,
  win: 3,
  draw: 3,
  lose: 0,
  goalsFor: 12,
  goalsAgainst: 5,
  form: ['W', 'W', 'D', 'L', 'W'],
  topScorers: [
    { rank: 1, name: 'Rasmus Højlund', photo: 'https://media.api-sports.io/football/players/152982.png', goals: 5, assists: 2 },
    { rank: 2, name: 'Bruno Fernandes', photo: 'https://media.api-sports.io/football/players/1485.png', goals: 4, assists: 4 },
    { rank: 3, name: 'Alejandro Garnacho', photo: 'https://media.api-sports.io/football/players/284322.png', goals: 3, assists: 2 },
    { rank: 4, name: 'Marcus Rashford', photo: 'https://media.api-sports.io/football/players/909.png', goals: 2, assists: 1 }
  ],
  squad: [
    // Goalkeepers
    { id: 18885, name: "K. Darlow", age: 35, number: 12, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/18885.png", appearances: 0, goals: 0, assists: 0 },
    { id: 2931, name: "T. Heaton", age: 39, number: 22, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/2931.png", appearances: 0, goals: 0, assists: 0 },
    { id: 162511, name: "S. Lammens", age: 23, number: 1, position: "Goalkeeper", nationality: "Bỉ", photo: "https://media.api-sports.io/football/players/162511.png", appearances: 0, goals: 0, assists: 0 },
    { id: 284382, name: "Dermot William Mee", age: 23, number: 45, position: "Goalkeeper", nationality: "Bắc Ireland", photo: "https://media.api-sports.io/football/players/284382.png", appearances: 0, goals: 0, assists: 0 },
    // Defenders
    { id: 403064, name: "H. Amass", age: 18, number: 5, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/403064.png", appearances: 1, goals: 0, assists: 0 },
    { id: 407026, name: "Daniel Armer", age: 18, number: 4, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/407026.png", appearances: 0, goals: 0, assists: 0 },
    { id: 886, name: "Diogo Dalot", age: 27, number: 2, position: "Defender", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/886.png", appearances: 6, goals: 0, assists: 2 },
    { id: 382452, name: "P. Dorgu", age: 21, number: 13, position: "Defender", nationality: "Đan Mạch", photo: "https://media.api-sports.io/football/players/382452.png", appearances: 2, goals: 0, assists: 0 },
    { id: 402329, name: "A. Heaven", age: 19, number: 26, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/402329.png", appearances: 1, goals: 0, assists: 0 },
    { id: 402330, name: "J. Kamason", age: 19, number: 2, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/402330.png", appearances: 0, goals: 0, assists: 0 },
    { id: 2935, name: "H. Maguire", age: 32, number: 5, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/2935.png", appearances: 4, goals: 1, assists: 0 },
    { id: 2467, name: "Lisandro Martínez", age: 27, number: 6, position: "Defender", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/2467.png", appearances: 6, goals: 0, assists: 1 },
    { id: 545, name: "N. Mazraoui", age: 28, number: 3, position: "Defender", nationality: "Maroc", photo: "https://media.api-sports.io/football/players/545.png", appearances: 5, goals: 0, assists: 1 },
    { id: 891, name: "L. Shaw", age: 30, number: 23, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/891.png", appearances: 3, goals: 0, assists: 0 },
    { id: 342970, name: "L. Yoro", age: 20, number: 15, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/342970.png", appearances: 2, goals: 0, assists: 0 },
    // Midfielders
    { id: 305834, name: "Andrey Santos", age: 21, number: 17, position: "Midfielder", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/305834.png", appearances: 3, goals: 0, assists: 0 },
    { id: 356041, name: "C. Baleba", age: 21, number: 20, position: "Midfielder", nationality: "Cameroon", photo: "https://media.api-sports.io/football/players/356041.png", appearances: 4, goals: 0, assists: 0 },
    { id: 1485, name: "Bruno Fernandes", age: 31, number: 8, position: "Midfielder", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/1485.png", appearances: 6, goals: 4, assists: 4 },
    { id: 383770, name: "J. Fletcher", age: 18, number: 10, position: "Midfielder", nationality: "Scotland", photo: "https://media.api-sports.io/football/players/383770.png", appearances: 1, goals: 0, assists: 0 },
    { id: 557460, name: "T. Fletcher", age: 19, number: 6, position: "Midfielder", nationality: "Scotland", photo: "https://media.api-sports.io/football/players/557460.png", appearances: 1, goals: 0, assists: 0 },
    { id: 284322, name: "K. Mainoo", age: 20, number: 37, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/284322.png", appearances: 6, goals: 1, assists: 2 },
    { id: 19220, name: "M. Mount", age: 26, number: 7, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19220.png", appearances: 3, goals: 0, assists: 1 },
    { id: 2926, name: "Y. Tielemans", age: 28, number: 18, position: "Midfielder", nationality: "Bỉ", photo: "https://media.api-sports.io/football/players/2926.png", appearances: 5, goals: 1, assists: 1 },
    { id: 51494, name: "M. Ugarte", age: 25, number: 25, position: "Midfielder", nationality: "Uruguay", photo: "https://media.api-sports.io/football/players/51494.png", appearances: 5, goals: 0, assists: 0 },
    { id: 1165, name: "Matheus Cunha", age: 26, number: 10, position: "Midfielder", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/1165.png", appearances: 5, goals: 2, assists: 1 },
    { id: 157997, name: "A. Diallo", age: 23, number: 16, position: "Midfielder", nationality: "Bờ Biển Ngà", photo: "https://media.api-sports.io/football/players/157997.png", appearances: 5, goals: 1, assists: 1 },
    // Attackers
    { id: 517227, name: "J. Gabriel", age: 15, number: 77, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/517227.png", appearances: 0, goals: 0, assists: 0 },
    { id: 557462, name: "S. Lacey", age: 19, number: 31, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/557462.png", appearances: 1, goals: 0, assists: 0 },
    { id: 20589, name: "B. Mbeumo", age: 26, number: 19, position: "Attacker", nationality: "Cameroon", photo: "https://media.api-sports.io/football/players/20589.png", appearances: 6, goals: 3, assists: 1 },
    { id: 909, name: "M. Rashford", age: 28, number: 9, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/909.png", appearances: 6, goals: 2, assists: 1 },
    { id: 115589, name: "B. Šeško", age: 22, number: 30, position: "Attacker", nationality: "Slovenia", photo: "https://media.api-sports.io/football/players/115589.png", appearances: 5, goals: 3, assists: 0 },
    { id: 465942, name: "T. Thompson", age: 17, number: 17, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/465942.png", appearances: 1, goals: 0, assists: 0 },
    { id: 70100, name: "J. Zirkzee", age: 24, number: 11, position: "Attacker", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/70100.png", appearances: 5, goals: 1, assists: 1 }
  ],
  recentVideos: [
    {
      id: 'vid-mu-1',
      title: 'Man Utd 3 - 0 Everton: Fernandes và Rashford bùng nổ tại Nhà Hát',
      duration: '03:50',
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      date: 'Hôm qua',
      views: '128.4K'
    },
    {
      id: 'vid-mu-2',
      title: 'Man Utd 2 - 1 Chelsea: Kịch tính những phút bù giờ định mệnh',
      duration: '04:15',
      thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
      date: '3 ngày trước',
      views: '245.9K'
    }
  ],
  news: [
    {
      id: 'mu-news-1',
      leagueId: 39,
      title: "Bruno Fernandes: 'Man Utd đã tìm lại bản sắc tấn công tốc độ'",
      summary: "Thủ quân Quỷ Đỏ ca ngợi tinh thần thi đấu quả cảm và khả năng chuyển đổi trạng thái chớp nhoáng của các học trò sau chuỗi trận thăng hoa.",
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      publishedAt: '20 phút trước',
      category: 'Tiêu điểm',
      author: 'Đỗ Tuấn',
      commentCount: 165,
      isHot: true
    }
  ]
};

export const MAN_CITY_PROFILE: TeamProfile = {
  id: 50,
  slug: 'man-city-50',
  name: 'Manchester City',
  shortName: 'Man City',
  fullName: 'Manchester City Football Club',
  logo: 'https://media.api-sports.io/football/teams/50.png',
  country: 'Anh',
  leagueId: 39,
  leagueName: 'Ngoại Hạng Anh (Premier League)',
  stadium: 'Etihad Stadium',
  capacity: 53400,
  coach: 'Pep Guardiola',
  founded: 1880,
  president: 'Khaldoon Al Mubarak',
  marketValue: '1.26 tỷ Euro',
  mainCompetitions: ['Ngoại Hạng Anh', 'Cúp C1 Châu Âu (Champions League)', 'Cúp FA', 'Carabao Cup'],
  rank: 1,
  points: 16,
  played: 6,
  win: 5,
  draw: 1,
  lose: 0,
  goalsFor: 16,
  goalsAgainst: 5,
  form: ['W', 'W', 'W', 'D', 'W'],
  topScorers: [
    { rank: 1, name: 'E. Haaland', photo: 'https://media.api-sports.io/football/players/1100.png', goals: 10, assists: 1 },
    { rank: 2, name: 'P. Foden', photo: 'https://media.api-sports.io/football/players/631.png', goals: 3, assists: 4 },
    { rank: 3, name: 'J. Doku', photo: 'https://media.api-sports.io/football/players/1422.png', goals: 2, assists: 3 }
  ],
  squad: [
    // Goalkeepers
    { id: 19012, name: "M. Bettinelli", age: 33, number: 13, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19012.png", appearances: 0, goals: 0, assists: 0 },
    { id: 1622, name: "G. Donnarumma", age: 26, number: 1, position: "Goalkeeper", nationality: "Ý", photo: "https://media.api-sports.io/football/players/1622.png", appearances: 6, goals: 0, assists: 0 },
    { id: 47296, name: "G. Rulli", age: 33, number: 28, position: "Goalkeeper", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/47296.png", appearances: 0, goals: 0, assists: 0 },
    // Defenders
    { id: 21138, name: "R. Aït-Nouri", age: 24, number: 21, position: "Defender", nationality: "Algérie", photo: "https://media.api-sports.io/football/players/21138.png", appearances: 5, goals: 1, assists: 1 },
    { id: 451583, name: "K. Braithwaite", age: 17, number: 61, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/451583.png", appearances: 1, goals: 0, assists: 0 },
    { id: 567, name: "Rúben Dias", age: 29, number: 3, position: "Defender", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/567.png", appearances: 6, goals: 0, assists: 0 },
    { id: 67971, name: "M. Guéhi", age: 25, number: 6, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/67971.png", appearances: 6, goals: 0, assists: 0 },
    { id: 129033, name: "J. Gvardiol", age: 23, number: 24, position: "Defender", nationality: "Croatia", photo: "https://media.api-sports.io/football/players/129033.png", appearances: 6, goals: 2, assists: 1 },
    { id: 360114, name: "A. Khusanov", age: 21, number: 45, position: "Defender", nationality: "Uzbekistan", photo: "https://media.api-sports.io/football/players/360114.png", appearances: 3, goals: 0, assists: 0 },
    { id: 284230, name: "R. Lewis", age: 21, number: 82, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/284230.png", appearances: 5, goals: 0, assists: 2 },
    { id: 414359, name: "Vitor Nunes", age: 19, number: 22, position: "Defender", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/414359.png", appearances: 1, goals: 0, assists: 0 },
    { id: 41621, name: "Matheus Nunes", age: 27, number: 27, position: "Defender", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/41621.png", appearances: 4, goals: 1, assists: 1 },
    { id: 307123, name: "N. O'Reilly", age: 20, number: 33, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/307123.png", appearances: 2, goals: 0, assists: 0 },
    // Midfielders
    { id: 138908, name: "E. Anderson", age: 23, number: 5, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/138908.png", appearances: 4, goals: 0, assists: 1 },
    { id: 438688, name: "A. Bouaddi", age: 18, number: 32, position: "Midfielder", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/438688.png", appearances: 2, goals: 0, assists: 0 },
    { id: 156477, name: "R. Cherki", age: 22, number: 10, position: "Midfielder", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/156477.png", appearances: 5, goals: 2, assists: 3 },
    { id: 5996, name: "E. Fernández", age: 25, number: 17, position: "Midfielder", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/5996.png", appearances: 5, goals: 1, assists: 2 },
    { id: 631, name: "P. Foden", age: 25, number: 47, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/631.png", appearances: 6, goals: 3, assists: 4 },
    { id: 2291, name: "M. Kovačić", age: 31, number: 8, position: "Midfielder", nationality: "Croatia", photo: "https://media.api-sports.io/football/players/2291.png", appearances: 6, goals: 2, assists: 1 },
    { id: 442048, name: "R. McAidoo", age: 17, number: 56, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/442048.png", appearances: 1, goals: 0, assists: 0 },
    { id: 568008, name: "F. Samba", age: 16, number: 75, position: "Midfielder", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/568008.png", appearances: 0, goals: 0, assists: 0 },
    { id: 18592, name: "I. Ndiaye", age: 25, number: 7, position: "Midfielder", nationality: "Sénégal", photo: "https://media.api-sports.io/football/players/18592.png", appearances: 4, goals: 1, assists: 1 },
    { id: 19281, name: "A. Semenyo", age: 25, number: 42, position: "Midfielder", nationality: "Ghana", photo: "https://media.api-sports.io/football/players/19281.png", appearances: 5, goals: 2, assists: 2 },
    // Attackers
    { id: 425714, name: "Allan", age: 21, number: 37, position: "Attacker", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/425714.png", appearances: 2, goals: 0, assists: 0 },
    { id: 1422, name: "J. Doku", age: 23, number: 11, position: "Attacker", nationality: "Bỉ", photo: "https://media.api-sports.io/football/players/1422.png", appearances: 6, goals: 2, assists: 3 },
    { id: 1100, name: "E. Haaland", age: 25, number: 9, position: "Attacker", nationality: "Na Uy", photo: "https://media.api-sports.io/football/players/1100.png", appearances: 6, goals: 10, assists: 1 }
  ],
  recentVideos: [
    {
      id: 'vid-mc-1',
      title: 'Man City 4 - 1 Ipswich: Haaland lập hat-trick hủy diệt đối thủ',
      duration: '04:10',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
      date: 'Hôm qua',
      views: '280.1K'
    }
  ],
  news: [
    {
      id: 'mc-news-1',
      leagueId: 39,
      title: "Pep Guardiola ca ngợi cỗ máy làm bàn Erling Haaland",
      summary: "Chiến lược gia người Tây Ban Nha khẳng định phong độ của chân sút người Na Uy là không thể ngăn cản ở thời điểm hiện tại.",
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      publishedAt: '30 phút trước',
      category: 'Tiêu điểm',
      author: 'Anh Quân',
      commentCount: 112,
      isHot: true
    }
  ]
};

export const ARSENAL_PROFILE: TeamProfile = {
  id: 42,
  slug: 'arsenal-42',
  name: 'Arsenal',
  shortName: 'Arsenal',
  fullName: 'Arsenal Football Club',
  logo: 'https://media.api-sports.io/football/teams/42.png',
  country: 'Anh',
  leagueId: 39,
  leagueName: 'Ngoại Hạng Anh (Premier League)',
  stadium: 'Emirates Stadium',
  capacity: 60704,
  coach: 'Mikel Arteta',
  founded: 1886,
  president: 'Stan Kroenke',
  marketValue: '1.17 tỷ Euro',
  mainCompetitions: ['Ngoại Hạng Anh', 'Cúp C1 Châu Âu (Champions League)', 'Cúp FA', 'Carabao Cup'],
  rank: 2,
  points: 14,
  played: 6,
  win: 4,
  draw: 2,
  lose: 0,
  goalsFor: 13,
  goalsAgainst: 4,
  form: ['W', 'D', 'W', 'W', 'D'],
  topScorers: [
    { rank: 1, name: 'B. Saka', photo: 'https://media.api-sports.io/football/players/1460.png', goals: 4, assists: 5 },
    { rank: 2, name: 'K. Havertz', photo: 'https://media.api-sports.io/football/players/978.png', goals: 4, assists: 1 },
    { rank: 3, name: 'V. Gyökeres', photo: 'https://media.api-sports.io/football/players/18979.png', goals: 3, assists: 1 }
  ],
  squad: [
    // Goalkeepers
    { id: 2273, name: "Kepa", age: 31, number: 13, position: "Goalkeeper", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/2273.png", appearances: 0, goals: 0, assists: 0 },
    { id: 20619, name: "I. Meslier", age: 25, number: 30, position: "Goalkeeper", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/20619.png", appearances: 0, goals: 0, assists: 0 },
    { id: 403221, name: "K. Ranson", age: 18, number: 1, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/403221.png", appearances: 0, goals: 0, assists: 0 },
    { id: 19465, name: "David Raya", age: 30, number: 1, position: "Goalkeeper", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/19465.png", appearances: 6, goals: 0, assists: 0 },
    // Defenders
    { id: 157052, name: "R. Calafiori", age: 23, number: 33, position: "Defender", nationality: "Ý", photo: "https://media.api-sports.io/football/players/157052.png", appearances: 5, goals: 1, assists: 0 },
    { id: 348818, name: "B. Clarke", age: 18, number: 2, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/348818.png", appearances: 0, goals: 0, assists: 0 },
    { id: 22224, name: "Gabriel Magalhães", age: 28, number: 6, position: "Defender", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/22224.png", appearances: 6, goals: 2, assists: 0 },
    { id: 127817, name: "P. Hincapié", age: 23, number: 5, position: "Defender", nationality: "Ecuador", photo: "https://media.api-sports.io/football/players/127817.png", appearances: 4, goals: 0, assists: 0 },
    { id: 19354, name: "E. Konsa", age: 28, number: 15, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19354.png", appearances: 4, goals: 0, assists: 0 },
    { id: 313245, name: "M. Lewis-Skelly", age: 19, number: 49, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/313245.png", appearances: 3, goals: 0, assists: 1 },
    { id: 333682, name: "Cristhian Mosquera", age: 21, number: 3, position: "Defender", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/333682.png", appearances: 2, goals: 0, assists: 0 },
    { id: 22090, name: "W. Saliba", age: 24, number: 2, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/22090.png", appearances: 6, goals: 0, assists: 0 },
    { id: 482903, name: "M. Salmon", age: 16, number: 4, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/482903.png", appearances: 0, goals: 0, assists: 0 },
    { id: 38746, name: "J. Timber", age: 24, number: 12, position: "Defender", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/38746.png", appearances: 6, goals: 0, assists: 1 },
    { id: 19959, name: "B. White", age: 28, number: 4, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19959.png", appearances: 5, goals: 0, assists: 1 },
    // Midfielders
    { id: 10135, name: "Bruno Guimarães", age: 28, number: 39, position: "Midfielder", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/10135.png", appearances: 5, goals: 1, assists: 2 },
    { id: 409798, name: "Louie George Copley", age: 19, number: 30, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/409798.png", appearances: 0, goals: 0, assists: 0 },
    { id: 19586, name: "E. Eze", age: 27, number: 10, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19586.png", appearances: 5, goals: 2, assists: 2 },
    { id: 457730, name: "I. Ibrahim", age: 17, number: 6, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/457730.png", appearances: 0, goals: 0, assists: 0 },
    { id: 442045, name: "T. Julienne", age: 17, number: 16, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/442045.png", appearances: 0, goals: 0, assists: 0 },
    { id: 47311, name: "Mikel Merino", age: 29, number: 23, position: "Midfielder", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/47311.png", appearances: 4, goals: 1, assists: 0 },
    { id: 37127, name: "M. Ødegaard", age: 27, number: 8, position: "Midfielder", nationality: "Na Uy", photo: "https://media.api-sports.io/football/players/37127.png", appearances: 4, goals: 1, assists: 2 },
    { id: 2937, name: "D. Rice", age: 26, number: 41, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/2937.png", appearances: 6, goals: 1, assists: 3 },
    { id: 47315, name: "Martín Zubimendi", age: 26, number: 36, position: "Midfielder", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/47315.png", appearances: 5, goals: 0, assists: 1 },
    { id: 136723, name: "N. Madueke", age: 23, number: 20, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/136723.png", appearances: 4, goals: 2, assists: 0 },
    { id: 1460, name: "B. Saka", age: 24, number: 7, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/1460.png", appearances: 6, goals: 4, assists: 5 },
    // Attackers
    { id: 442044, name: "M. Dowman", age: 16, number: 56, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/442044.png", appearances: 1, goals: 0, assists: 0 },
    { id: 18979, name: "V. Gyökeres", age: 28, number: 14, position: "Attacker", nationality: "Thụy Điển", photo: "https://media.api-sports.io/football/players/18979.png", appearances: 5, goals: 3, assists: 1 },
    { id: 457731, name: "A. Annous", age: 18, number: 11, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/457731.png", appearances: 0, goals: 0, assists: 0 },
    { id: 978, name: "K. Havertz", age: 26, number: 29, position: "Attacker", nationality: "Đức", photo: "https://media.api-sports.io/football/players/978.png", appearances: 6, goals: 4, assists: 1 },
    { id: 161800, name: "C. Tzolis", age: 23, number: 17, position: "Attacker", nationality: "Hy Lạp", photo: "https://media.api-sports.io/football/players/161800.png", appearances: 3, goals: 1, assists: 0 }
  ],
  recentVideos: [
    { id: 'vid-ars-1', title: 'Arsenal 4 - 2 Leicester: Kịch tính nghẹt thở phút 90+4', duration: '03:45', thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=600&q=80', date: '2 ngày trước', views: '189.5K' }
  ],
  news: [
    {
      id: 'ars-news-1',
      leagueId: 39,
      title: "Mikel Arteta: 'Arsenal kiên định trên con đường chinh phục đỉnh cao'",
      summary: 'Pháo thủ thể hiện bản lĩnh tuyệt vời trong những pha bóng cố định và kiểm soát hoàn toàn thế trận trước các đối thủ khó chịu.',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
      publishedAt: '35 phút trước',
      category: 'Tiêu điểm',
      author: 'Quang Dũng',
      commentCount: 98,
      isHot: true
    }
  ]
};

export const LIVERPOOL_PROFILE: TeamProfile = {
  id: 40,
  slug: 'liverpool-40',
  name: 'Liverpool',
  shortName: 'Liverpool',
  fullName: 'Liverpool Football Club',
  logo: 'https://media.api-sports.io/football/teams/40.png',
  country: 'Anh',
  leagueId: 39,
  leagueName: 'Ngoại Hạng Anh (Premier League)',
  stadium: 'Anfield',
  capacity: 61276,
  coach: 'Arne Slot',
  founded: 1892,
  president: 'Tom Werner',
  marketValue: '1.05 tỷ Euro',
  mainCompetitions: ['Ngoại Hạng Anh', 'Cúp C1 Châu Âu (Champions League)', 'Cúp FA', 'Carabao Cup'],
  rank: 3,
  points: 13,
  played: 6,
  win: 4,
  draw: 1,
  lose: 1,
  goalsFor: 14,
  goalsAgainst: 6,
  form: ['W', 'W', 'W', 'L', 'W'],
  topScorers: [
    { rank: 1, name: 'A. Isak', photo: 'https://media.api-sports.io/football/players/2864.png', goals: 4, assists: 1 },
    { rank: 2, name: 'C. Gakpo', photo: 'https://media.api-sports.io/football/players/247.png', goals: 3, assists: 2 },
    { rank: 3, name: 'D. Szoboszlai', photo: 'https://media.api-sports.io/football/players/1096.png', goals: 2, assists: 3 }
  ],
  squad: [
    // Goalkeepers
    { id: 280, name: "Alisson Becker", age: 33, number: 1, position: "Goalkeeper", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/280.png", appearances: 6, goals: 0, assists: 0 },
    { id: 180316, name: "H. Davies", age: 22, number: 95, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/180316.png", appearances: 0, goals: 0, assists: 0 },
    { id: 24760, name: "G. Mamardashvili", age: 25, number: 25, position: "Goalkeeper", nationality: "Georgia", photo: "https://media.api-sports.io/football/players/24760.png", appearances: 0, goals: 0, assists: 0 },
    { id: 18889, name: "F. Woodman", age: 28, number: 28, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/18889.png", appearances: 0, goals: 0, assists: 0 },
    // Defenders
    { id: 101814, name: "R. Araújo", age: 26, number: 33, position: "Defender", nationality: "Uruguay", photo: "https://media.api-sports.io/football/players/101814.png", appearances: 5, goals: 0, assists: 0 },
    { id: 284366, name: "L. Chambers", age: 21, number: 44, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/284366.png", appearances: 1, goals: 0, assists: 0 },
    { id: 284, name: "J. Gomez", age: 28, number: 2, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/284.png", appearances: 4, goals: 0, assists: 0 },
    { id: 367636, name: "J. Jacquet", age: 20, number: 5, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/367636.png", appearances: 2, goals: 0, assists: 0 },
    { id: 206254, name: "M. Kerkez", age: 22, number: 6, position: "Defender", nationality: "Hungary", photo: "https://media.api-sports.io/football/players/206254.png", appearances: 5, goals: 0, assists: 1 },
    { id: 606814, name: "T. Ndiaye", age: 17, number: 75, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/606814.png", appearances: 0, goals: 0, assists: 0 },
    { id: 1600, name: "K. Tsimikas", age: 29, number: 21, position: "Defender", nationality: "Hy Lạp", photo: "https://media.api-sports.io/football/players/1600.png", appearances: 3, goals: 0, assists: 1 },
    { id: 290, name: "V. van Dijk", age: 34, number: 4, position: "Defender", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/290.png", appearances: 6, goals: 1, assists: 0 },
    { id: 152654, name: "J. Frimpong", age: 25, number: 30, position: "Defender", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/152654.png", appearances: 5, goals: 1, assists: 2 },
    // Midfielders
    { id: 8500, name: "W. Endo", age: 32, number: 3, position: "Midfielder", nationality: "Nhật Bản", photo: "https://media.api-sports.io/football/players/8500.png", appearances: 4, goals: 0, assists: 0 },
    { id: 542, name: "R. Gravenberch", age: 23, number: 38, position: "Midfielder", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/542.png", appearances: 6, goals: 0, assists: 2 },
    { id: 6716, name: "A. Mac Allister", age: 27, number: 10, position: "Midfielder", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/6716.png", appearances: 6, goals: 1, assists: 1 },
    { id: 287109, name: "J. McConnell", age: 21, number: 53, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/287109.png", appearances: 1, goals: 0, assists: 0 },
    { id: 397997, name: "T. Nyoni", age: 18, number: 42, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/397997.png", appearances: 2, goals: 0, assists: 0 },
    { id: 1096, name: "D. Szoboszlai", age: 25, number: 8, position: "Midfielder", nationality: "Hungary", photo: "https://media.api-sports.io/football/players/1096.png", appearances: 6, goals: 2, assists: 3 },
    { id: 203224, name: "F. Wirtz", age: 22, number: 7, position: "Midfielder", nationality: "Đức", photo: "https://media.api-sports.io/football/players/203224.png", appearances: 6, goals: 2, assists: 4 },
    { id: 161904, name: "B. Barcola", age: 23, number: 29, position: "Midfielder", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/161904.png", appearances: 5, goals: 2, assists: 1 },
    { id: 338751, name: "Víctor Muñoz", age: 22, number: 23, position: "Midfielder", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/338751.png", appearances: 1, goals: 0, assists: 0 },
    // Attackers
    { id: 588501, name: "Joshua Abe", age: 15, number: 40, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/588501.png", appearances: 0, goals: 0, assists: 0 },
    { id: 30410, name: "F. Chiesa", age: 28, number: 14, position: "Attacker", nationality: "Ý", photo: "https://media.api-sports.io/football/players/30410.png", appearances: 4, goals: 1, assists: 1 },
    { id: 314661, name: "J. Danns", age: 19, number: 76, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/314661.png", appearances: 1, goals: 0, assists: 0 },
    { id: 174565, name: "H. Ekitike", age: 23, number: 22, position: "Attacker", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/174565.png", appearances: 4, goals: 1, assists: 0 },
    { id: 247, name: "C. Gakpo", age: 26, number: 18, position: "Attacker", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/247.png", appearances: 6, goals: 3, assists: 2 },
    { id: 2864, name: "A. Isak", age: 26, number: 9, position: "Attacker", nationality: "Thụy Điển", photo: "https://media.api-sports.io/football/players/2864.png", appearances: 6, goals: 4, assists: 1 },
    { id: 328107, name: "L. Koumas", age: 20, number: 67, position: "Attacker", nationality: "Wales", photo: "https://media.api-sports.io/football/players/328107.png", appearances: 2, goals: 0, assists: 0 },
    { id: 452685, name: "R. Ngumoha", age: 17, number: 73, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/452685.png", appearances: 1, goals: 0, assists: 0 }
  ],
  recentVideos: [
    { id: 'vid-liv-1', title: 'Liverpool 3 - 0 Bournemouth: Diaz và Isak rực sáng tại Anfield', duration: '03:40', thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80', date: '3 ngày trước', views: '210.4K' }
  ],
  news: [
    {
      id: 'liv-news-1',
      leagueId: 39,
      title: "Arne Slot: 'Liverpool đang tiến bộ vững chắc qua từng tuần'",
      summary: 'Thuyền trưởng The Kop bày tỏ sự hài lòng về khả năng kiểm soát thế trận và sức ép tấn công đa dạng của toàn đội.',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      publishedAt: '1 giờ trước',
      category: 'Tiêu điểm',
      author: 'Vy Anh',
      commentCount: 75,
      isHot: true
    }
  ]
};

export const CHELSEA_PROFILE: TeamProfile = {
  id: 49,
  slug: 'chelsea-49',
  name: 'Chelsea',
  shortName: 'Chelsea',
  fullName: 'Chelsea Football Club',
  logo: 'https://media.api-sports.io/football/teams/49.png',
  country: 'Anh',
  leagueId: 39,
  leagueName: 'Ngoại Hạng Anh (Premier League)',
  stadium: 'Stamford Bridge',
  capacity: 40341,
  coach: 'Enzo Maresca',
  founded: 1905,
  president: 'Todd Boehly',
  marketValue: '960 triệu Euro',
  mainCompetitions: ['Ngoại Hạng Anh', 'Cúp C3 Châu Âu (Conference League)', 'Cúp FA', 'Carabao Cup'],
  rank: 4,
  points: 13,
  played: 6,
  win: 4,
  draw: 1,
  lose: 1,
  goalsFor: 15,
  goalsAgainst: 7,
  form: ['W', 'W', 'W', 'D', 'W'],
  topScorers: [
    { rank: 1, name: 'C. Palmer', photo: 'https://media.api-sports.io/football/players/152982.png', goals: 6, assists: 4 },
    { rank: 2, name: 'João Pedro', photo: 'https://media.api-sports.io/football/players/10329.png', goals: 3, assists: 2 },
    { rank: 3, name: 'Pedro Neto', photo: 'https://media.api-sports.io/football/players/1864.png', goals: 2, assists: 2 }
  ],
  squad: [
    // Goalkeepers
    { id: 19599, name: "E. Martínez", age: 33, number: 1, position: "Goalkeeper", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/19599.png", appearances: 6, goals: 0, assists: 0 },
    { id: 340151, name: "M. Penders", age: 20, number: 39, position: "Goalkeeper", nationality: "Bỉ", photo: "https://media.api-sports.io/football/players/340151.png", appearances: 0, goals: 0, assists: 0 },
    { id: 180940, name: "T. Sharman-Lowe", age: 22, number: 28, position: "Goalkeeper", nationality: "Anh", photo: "https://media.api-sports.io/football/players/180940.png", appearances: 0, goals: 0, assists: 0 },
    { id: 64167, name: "G. Słonina", age: 21, number: 44, position: "Goalkeeper", nationality: "Mỹ", photo: "https://media.api-sports.io/football/players/64167.png", appearances: 0, goals: 0, assists: 0 },
    // Defenders
    { id: 366735, name: "Joshua Kofi Acheampong", age: 19, number: 34, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/366735.png", appearances: 2, goals: 0, assists: 0 },
    { id: 422780, name: "A. Anselmino", age: 20, number: 30, position: "Defender", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/422780.png", appearances: 1, goals: 0, assists: 0 },
    { id: 152953, name: "L. Colwill", age: 22, number: 6, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/152953.png", appearances: 6, goals: 1, assists: 0 },
    { id: 22094, name: "W. Fofana", age: 25, number: 3, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/22094.png", appearances: 6, goals: 0, assists: 0 },
    { id: 161907, name: "M. Gusto", age: 22, number: 27, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/161907.png", appearances: 5, goals: 0, assists: 2 },
    { id: 341642, name: "J. Hato", age: 19, number: 21, position: "Defender", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/341642.png", appearances: 3, goals: 0, assists: 1 },
    { id: 19545, name: "R. James", age: 26, number: 24, position: "Defender", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19545.png", appearances: 4, goals: 1, assists: 1 },
    { id: 20995, name: "M. Lacroix", age: 25, number: 5, position: "Defender", nationality: "Pháp", photo: "https://media.api-sports.io/football/players/20995.png", appearances: 5, goals: 0, assists: 0 },
    { id: 383018, name: "M. Palestra", age: 20, number: 2, position: "Defender", nationality: "Ý", photo: "https://media.api-sports.io/football/players/383018.png", appearances: 2, goals: 0, assists: 0 },
    // Midfielders
    { id: 181734, name: "Pep Chavarría", age: 27, number: 29, position: "Midfielder", nationality: "Tây Ban Nha", photo: "https://media.api-sports.io/football/players/181734.png", appearances: 3, goals: 0, assists: 0 },
    { id: 319572, name: "V. Barco", age: 21, number: 4, position: "Midfielder", nationality: "Argentina", photo: "https://media.api-sports.io/football/players/319572.png", appearances: 4, goals: 0, assists: 1 },
    { id: 116117, name: "M. Caicedo", age: 24, number: 25, position: "Midfielder", nationality: "Ecuador", photo: "https://media.api-sports.io/football/players/116117.png", appearances: 6, goals: 1, assists: 2 },
    { id: 292, name: "J. Henderson", age: 35, number: 14, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/292.png", appearances: 3, goals: 0, assists: 0 },
    { id: 282125, name: "R. Lavia", age: 21, number: 45, position: "Midfielder", nationality: "Bỉ", photo: "https://media.api-sports.io/football/players/282125.png", appearances: 4, goals: 0, assists: 1 },
    { id: 506618, name: "M. Nicoll-Jazuli", age: 15, number: 10, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/506618.png", appearances: 0, goals: 0, assists: 0 },
    { id: 586131, name: "R. Watson", age: 16, number: 6, position: "Midfielder", nationality: "Anh", photo: "https://media.api-sports.io/football/players/586131.png", appearances: 0, goals: 0, assists: 0 },
    { id: 1864, name: "Pedro Neto", age: 26, number: 7, position: "Midfielder", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/1864.png", appearances: 6, goals: 2, assists: 2 },
    { id: 419582, name: "Geovany Tcherno Quenda", age: 19, number: 23, position: "Midfielder", nationality: "Bồ Đào Nha", photo: "https://media.api-sports.io/football/players/419582.png", appearances: 3, goals: 0, assists: 1 },
    // Attackers
    { id: 152982, name: "C. Palmer", age: 23, number: 10, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/152982.png", appearances: 6, goals: 6, assists: 4 },
    { id: 19170, name: "M. Rogers", age: 23, number: 17, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/19170.png", appearances: 5, goals: 2, assists: 1 },
    { id: 496411, name: "M. Eboue", age: 16, number: 18, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/496411.png", appearances: 0, goals: 0, assists: 0 },
    { id: 203762, name: "E. Emegha", age: 22, number: 22, position: "Attacker", nationality: "Hà Lan", photo: "https://media.api-sports.io/football/players/203762.png", appearances: 3, goals: 1, assists: 0 },
    { id: 425733, name: "Estêvão", age: 18, number: 41, position: "Attacker", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/425733.png", appearances: 4, goals: 1, assists: 1 },
    { id: 286894, name: "J. Bynoe-Gittens", age: 21, number: 11, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/286894.png", appearances: 5, goals: 1, assists: 2 },
    { id: 10329, name: "João Pedro", age: 24, number: 9, position: "Attacker", nationality: "Brazil", photo: "https://media.api-sports.io/football/players/10329.png", appearances: 6, goals: 3, assists: 2 },
    { id: 1469, name: "D. Welbeck", age: 35, number: 18, position: "Attacker", nationality: "Anh", photo: "https://media.api-sports.io/football/players/1469.png", appearances: 4, goals: 2, assists: 0 }
  ],
  recentVideos: [
    { id: 'vid-che-1', title: 'Chelsea 3 - 0 West Ham: Jackson và Palmer rực sáng', duration: '03:55', thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80', date: '2 ngày trước', views: '165.2K' }
  ],
  news: [
    {
      id: 'che-news-1',
      leagueId: 39,
      title: "Cole Palmer tiếp tục lập kỷ lục với 6 bàn sau 6 vòng đấu",
      summary: 'Nhạc trưởng của Chelsea chứng minh phong độ đẳng cấp hàng đầu thế giới với những bàn thắng mãn nhãn.',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
      publishedAt: '40 phút trước',
      category: 'Tiêu điểm',
      author: 'Hoàng An',
      commentCount: 92,
      isHot: true
    }
  ]
};

export const CAHN_PROFILE: TeamProfile = {
  id: 16400,
  slug: 'cahn-16400',
  name: 'Công An Hà Nội',
  shortName: 'CAHN',
  fullName: 'Câu lạc bộ Bóng đá Công An Hà Nội',
  logo: 'https://is.vnecdn.net/objects/teams/16400.png?v=1',
  country: 'Việt Nam',
  leagueId: 340,
  leagueName: 'V-League',
  stadium: 'Sân vận động Hàng Đẫy',
  capacity: 22500,
  coach: 'Alexandre Polking',
  founded: 1956,
  president: 'Đoàn Ngọc Hùng',
  marketValue: '5.2 triệu Euro',
  mainCompetitions: ['V-League', 'Cúp Quốc Gia', 'Shopee Cup (Cúp CLB Đông Nam Á)'],
  rank: 1,
  points: 9,
  played: 3,
  win: 3,
  draw: 0,
  lose: 0,
  goalsFor: 6,
  goalsAgainst: 0,
  form: ['W', 'W', 'W'],
  topScorers: [
    { rank: 1, name: 'Nguyễn Quang Hải', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', goals: 3, assists: 3 },
    { rank: 2, name: 'Léo Artur', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', goals: 2, assists: 1 },
    { rank: 3, name: 'Vũ Văn Thanh', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', goals: 1, assists: 2 }
  ],
  squad: [
    { id: 301, name: 'Nguyễn Filip', number: 1, position: 'Thủ môn', nationality: 'Việt Nam', age: 33, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 0, assists: 0, marketValue: '600.000 €' },
    { id: 302, name: 'Bùi Hoàng Việt Anh', number: 68, position: 'Hậu vệ', nationality: 'Việt Nam', age: 26, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 1, assists: 0, marketValue: '400.000 €' },
    { id: 303, name: 'Vũ Văn Thanh', number: 17, position: 'Hậu vệ', nationality: 'Việt Nam', age: 29, photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 2, assists: 2, marketValue: '350.000 €' },
    { id: 304, name: 'Nguyễn Quang Hải (C)', number: 19, position: 'Tiền vệ', nationality: 'Việt Nam', age: 28, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 3, assists: 3, marketValue: '400.000 €' },
    { id: 305, name: 'Léo Artur', number: 10, position: 'Tiền đạo', nationality: 'Brazil', age: 30, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 3, assists: 1, marketValue: '450.000 €' }
  ],
  recentVideos: [
    { id: 'vid-cahn-1', title: 'CAHN 2 - 1 Hà Nội: Siêu phẩm mu lai má của Quang Hải tại Hàng Đẫy', duration: '03:15', thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80', date: 'Hôm qua', views: '95.4K' }
  ],
  news: [
    {
      id: 'cahn-news-1',
      leagueId: 340,
      title: 'Quang Hải tỏa sáng rực rỡ đưa CAHN củng cố ngôi đầu bảng V-League',
      summary: 'Đội trưởng CLB CAHN thi đấu thăng hoa với 1 bàn thắng và 1 kiến tạo đẳng cấp, mang về trọn vẹn 3 điểm trong trận derby thủ đô.',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      publishedAt: '45 phút trước',
      category: 'Tiêu điểm',
      author: 'Lâm Thỏa',
      commentCount: 88,
      isHot: true
    }
  ]
};

export const PSG_PROFILE: TeamProfile = {
  id: 85,
  slug: 'psg-85',
  name: 'Paris Saint-Germain',
  shortName: 'PSG',
  fullName: 'Paris Saint-Germain Football Club',
  logo: 'https://is.vnecdn.net/objects/teams/85.png?v=1',
  country: 'Pháp',
  leagueId: 61,
  leagueName: 'Ligue 1',
  stadium: 'Parc des Princes',
  capacity: 48583,
  coach: 'Luis Enrique',
  founded: 1970,
  president: 'Nasser Al-Khelaïfi',
  marketValue: '915 triệu Euro',
  mainCompetitions: ['Ligue 1', 'Cúp C1 Châu Âu (Champions League)', 'Coupe de France', 'Trophée des Champions'],
  rank: 6,
  points: 11,
  played: 6,
  win: 3,
  draw: 2,
  lose: 1,
  goalsFor: 12,
  goalsAgainst: 6,
  form: ['W', 'D', 'W', 'L', 'D'],
  topScorers: [
    { rank: 1, name: 'Bradley Barcola', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', goals: 6, assists: 2 },
    { rank: 2, name: 'Ousmane Dembélé', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', goals: 4, assists: 3 },
    { rank: 3, name: 'Vitinha', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', goals: 2, assists: 2 }
  ],
  squad: [
    { id: 401, name: 'Gianluigi Donnarumma', number: 1, position: 'Thủ môn', nationality: 'Ý', age: 26, photo: 'https://media.api-sports.io/football/players/1622.png', appearances: 6, goals: 0, assists: 0, marketValue: '40 triệu €' },
    { id: 402, name: 'Marquinhos (C)', number: 5, position: 'Hậu vệ', nationality: 'Brazil', age: 31, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 1, assists: 0, marketValue: '50 triệu €' },
    { id: 403, name: 'Achraf Hakimi', number: 2, position: 'Hậu vệ', nationality: 'Maroc', age: 26, photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 1, assists: 3, marketValue: '60 triệu €' },
    { id: 404, name: 'Nuno Mendes', number: 25, position: 'Hậu vệ', nationality: 'Bồ Đào Nha', age: 23, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 0, assists: 1, marketValue: '55 triệu €' },
    { id: 405, name: 'Vitinha', number: 17, position: 'Tiền vệ', nationality: 'Bồ Đào Nha', age: 25, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 2, assists: 2, marketValue: '55 triệu €' },
    { id: 406, name: 'Warren Zaïre-Emery', number: 33, position: 'Tiền vệ', nationality: 'Pháp', age: 19, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 1, assists: 1, marketValue: '60 triệu €' },
    { id: 407, name: 'João Neves', number: 87, position: 'Tiền vệ', nationality: 'Bồ Đào Nha', age: 21, photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 0, assists: 5, marketValue: '60 triệu €' },
    { id: 408, name: 'Ousmane Dembélé', number: 10, position: 'Tiền đạo', nationality: 'Pháp', age: 28, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 4, assists: 3, marketValue: '60 triệu €' },
    { id: 409, name: 'Bradley Barcola', number: 29, position: 'Tiền đạo', nationality: 'Pháp', age: 23, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 6, assists: 2, marketValue: '65 triệu €' },
    { id: 410, name: 'Lee Kang-in', number: 19, position: 'Tiền vệ', nationality: 'Hàn Quốc', age: 24, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 3, assists: 1, marketValue: '30 triệu €' }
  ],
  recentVideos: [
    { id: 'vid-psg-1', title: 'PSG 3 - 1 Rennes: Siêu phẩm cứa lòng của Bradley Barcola tại Parc des Princes', duration: '03:40', thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80', date: 'Hôm qua', views: '112.5K' }
  ],
  news: [
    {
      id: 'psg-news-1',
      leagueId: 61,
      title: 'Luis Enrique: "PSG đang xây dựng lối chơi tập thể mạnh mẽ nhất"',
      summary: 'Dưới sự dẫn dắt của HLV Luis Enrique, PSG thể hiện lối đá kiểm soát áp đảo với sự bùng nổ của dàn sao trẻ Barcola, Dembélé và João Neves.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2 giờ trước',
      category: 'Tiêu điểm',
      author: 'VnExpress Thể Thao',
      commentCount: 64,
      isHot: true
    }
  ]
};

// Generic team generator for any other team
export function generateTeamProfile(id: number, name: string): TeamProfile {
  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`;
  return {
    id,
    slug,
    name,
    shortName: name,
    fullName: `${name} Football Club`,
    logo: `https://is.vnecdn.net/objects/teams/${id}.png?v=1`,
    country: '',
    leagueId: 39,
    leagueName: 'Giải đấu hàng đầu',
    stadium: '',
    capacity: 0,
    coach: '',
    founded: 1900,
    president: 'Ban lãnh đạo CLB',
    marketValue: '450 triệu Euro',
    mainCompetitions: [],
    rank: 4,
    points: 13,
    played: 6,
    win: 4,
    draw: 1,
    lose: 1,
    goalsFor: 11,
    goalsAgainst: 6,
    form: ['W', 'W', 'D', 'L', 'W'],
    topScorers: [
      { rank: 1, name: 'Tiền đạo chủ lực', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', goals: 5, assists: 2 },
      { rank: 2, name: 'Đội trưởng tiền vệ', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', goals: 3, assists: 4 }
    ],
    squad: [
      { id: id * 10 + 1, name: 'Thủ môn chính', number: 1, position: 'Thủ môn', nationality: 'Quốc gia', age: 28, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 0, assists: 0 },
      { id: id * 10 + 2, name: 'Trung vệ đội trưởng', number: 4, position: 'Hậu vệ', nationality: 'Quốc gia', age: 27, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 1, assists: 0 },
      { id: id * 10 + 3, name: 'Hậu vệ cánh', number: 2, position: 'Hậu vệ', nationality: 'Quốc gia', age: 25, photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', appearances: 5, goals: 0, assists: 2 },
      { id: id * 10 + 4, name: 'Tiền vệ tổ chức', number: 8, position: 'Tiền vệ', nationality: 'Quốc gia', age: 26, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 2, assists: 3 },
      { id: id * 10 + 5, name: 'Tiền vệ phòng ngự', number: 6, position: 'Tiền vệ', nationality: 'Quốc gia', age: 29, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 0, assists: 1 },
      { id: id * 10 + 6, name: 'Tiền đạo cắm', number: 9, position: 'Tiền đạo', nationality: 'Quốc gia', age: 24, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', appearances: 6, goals: 5, assists: 2 }
    ],
    recentVideos: [
      { id: `vid-${id}-1`, title: `${name}: Tổng hợp bàn thắng và pha bóng đáng nhớ`, duration: '03:30', thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80', date: 'Gần đây', views: '75.2K' }
    ],
    news: [
      {
        id: `news-${id}-1`,
        leagueId: 39,
        title: `${name} chuẩn bị lực lượng tối ưu cho giai đoạn then chốt mùa giải`,
        summary: `Toàn cảnh phong độ, chiến thuật và tình hình chấn thương mới nhất của ${name} được cập nhật liên tục trên VnExpress Thể Thao.`,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        publishedAt: '1 giờ trước',
        category: 'Tiêu điểm',
        author: 'VnExpress',
        commentCount: 45,
        isHot: true
      }
    ]
  };
}

export function getTeamBySlugOrId(identifier: string | number): TeamProfile {
  const str = String(identifier).toLowerCase().trim();
  
  // Manchester United
  if (str === '33' || str.includes('man-utd') || str.includes('manchester-united') || str.includes('mu')) {
    return MAN_UTD_PROFILE;
  }
  // Manchester City
  if (str === '50' || str.includes('man-city') || str.includes('manchester-city') || str.includes('mc') || str.includes('mancity')) {
    return MAN_CITY_PROFILE;
  }
  // Arsenal
  if (str === '42' || str.includes('arsenal')) {
    return ARSENAL_PROFILE;
  }
  // Liverpool
  if (str === '40' || str.includes('liverpool')) {
    return LIVERPOOL_PROFILE;
  }
  // Chelsea
  if (str === '49' || str.includes('chelsea')) {
    return CHELSEA_PROFILE;
  }
  // CAHN
  if (str === '16400' || str === '3801' || str.includes('cahn') || str.includes('cong-an-ha-noi')) {
    return CAHN_PROFILE;
  }
  // PSG
  if (str === '85' || str.includes('psg') || str.includes('paris-saint-germain')) {
    return PSG_PROFILE;
  }

  // Extract ID if in format `team-name-123`
  const match = str.match(/-(\d+)$/);
  const idNum = match ? parseInt(match[1], 10) : typeof identifier === 'number' ? identifier : 33;
  const name = typeof identifier === 'string' ? identifier.replace(/-\d+$/, '').replace(/-/g, ' ').toUpperCase() : `CLB ${identifier}`;

  return generateTeamProfile(idNum, name);
}

export function parseTeamFromPath(pathname: string, search?: string): { teamSlug: string; subTab?: string } | null {
  // Check search params first: ?team=man-utd-33 or ?doi-bong=man-utd-33
  if (search) {
    const params = new URLSearchParams(search);
    const teamParam = params.get('team') || params.get('doi-bong') || params.get('club');
    if (teamParam) {
      return {
        teamSlug: teamParam,
        subTab: params.get('tab') || undefined
      };
    }
  }

  // Matches:
  // /doi-bong/:slug
  // /doi-bong/:slug/:subTab
  // /the-thao/du-lieu-bong-da/doi-bong/:slug
  // /the-thao/du-lieu-bong-da/doi-bong/:slug/:subTab
  const pattern = /(?:\/the-thao\/du-lieu-bong-da)?\/doi-bong\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?/i;
  const match = pathname.match(pattern);
  if (match && match[1]) {
    return {
      teamSlug: match[1],
      subTab: match[2] || undefined
    };
  }
  return null;
}

export function getTeamUrl(teamId: number, teamSlug?: string, subTab?: string): string {
  const baseSlug = teamSlug || (
    teamId === 33 ? 'man-utd-33' : 
    teamId === 50 ? 'man-city-50' : 
    teamId === 42 ? 'arsenal-42' : 
    teamId === 40 ? 'liverpool-40' : 
    teamId === 49 ? 'chelsea-49' : 
    teamId === 85 ? 'psg-85' : 
    teamId === 3801 || teamId === 16400 ? 'cahn-16400' : 
    `doi-bong-${teamId}`
  );
  if (!subTab || subTab === 'tong-quan') {
    return `/the-thao/du-lieu-bong-da/doi-bong/${baseSlug}`;
  }
  return `/the-thao/du-lieu-bong-da/doi-bong/${baseSlug}/${subTab}`;
}
