import { FixtureItem, MatchFullDetails, MatchLineupPlayer, MatchTimelineEvent } from '../types/football';

/**
 * EXACT Flagship Match Data: Arsenal 3 - 0 Coventry (ID: 1557367)
 * Season 2026/2027 - Round 1 Premier League
 * Emirates Stadium, London | Referee: Thomas Bramall
 * Coaches: Mikel Arteta vs Frank Lampard
 */
export const ARSENAL_COVENTRY_DETAIL: MatchFullDetails = {
  fixture: {
    fixture: {
      id: 1557367,
      referee: 'Thomas Bramall, England',
      timezone: 'UTC',
      date: '2026-08-22T02:00:00+07:00',
      timestamp: 1787338800,
      periods: { first: 1787338800, second: 1787342400 },
      venue: { id: null, name: 'Sân Emirates', city: 'London' },
      status: { long: 'Match Finished', short: 'FT', elapsed: 90, extra: null }
    },
    league: {
      id: 39,
      name: 'Premier League',
      vietnameseName: 'Ngoại hạng Anh',
      country: 'Anh',
      logo: 'https://is.vnecdn.net/objects/leagues/39.png?v=1',
      flag: 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
      season: 2026,
      round: 'Vòng 1',
      standings: true,
      tier: 1
    },
    teams: {
      home: {
        id: 42,
        name: 'Arsenal',
        shortName: 'Arsenal',
        logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1',
        winner: true
      },
      away: {
        id: 1346,
        name: 'Coventry',
        shortName: 'Coventry',
        logo: 'https://is.vnecdn.net/objects/teams/1346.png?v=1',
        winner: false
      }
    },
    goals: { home: 3, away: 0 },
    score: {
      halftime: { home: 2, away: 0 },
      fulltime: { home: 3, away: 0 },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    },
    is_hot: true,
    has_preview: false,
    has_recap: true,
    has_highlight: true,
    highlight_video_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    highlight_duration: '07:45',
    recap_summary: 'Arsenal thị uy sức mạnh ngày mở màn Ngoại hạng Anh khi đè bẹp Coventry 3-0 nhờ sự tỏa sáng rực rỡ của Kai Havertz, Bukayo Saka và nhạc trưởng Martin Ødegaard.'
  },
  headline: 'Arsenal 3 - 0 Coventry: Thắng lợi tưng bừng ngày mở màn',
  recapArticle: {
    title: 'Arsenal đè bẹp Coventry 3-0 ngày ra quân Ngoại hạng Anh',
    sapo: 'Đoàn quân của HLV Mikel Arteta phô diễn sức mạnh vượt trội khi kiểm soát bóng 64%, tạo xG 1.88 và nã 3 bàn thắng đẹp mắt vào lưới tân binh Coventry tại chảo lửa Emirates.',
    author: 'Quang Dũng - VnExpress',
    publishedAt: '22/08/2026, 04:15 (GMT+7)',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    leadQuote: '“Chúng tôi đã có một sự khởi đầu mẫu mực. Các vị trí luân chuyển bóng nhịp nhàng, kiểm soát hoàn toàn không gian và tận dụng cơ hội với sự lạnh lùng cần thiết.” — HLV Mikel Arteta.'
  },
  highlightVideo: {
    title: 'Video highlight: Arsenal 3-0 Coventry (Vòng 1 Ngoại hạng Anh 2026/2027)',
    duration: '07:45',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
  },
  eventsTimeline: [
    {
      minute: 1,
      period: '1H',
      type: 'whistle_start',
      title: 'Trọng tài Thomas Bramall nổi còi bắt đầu trận đấu',
      description: 'Coventry là đội giao bóng trước tại chảo lửa Emirates.'
    },
    {
      minute: 15,
      period: '1H',
      type: 'goal',
      isHome: true,
      teamId: 42,
      playerName: 'Kai Havertz',
      assistName: 'Riccardo Calafiori',
      scoreText: '1 - 0',
      title: 'VÀO! 1-0 cho Arsenal (Kai Havertz)',
      description: 'Hậu vệ Riccardo Calafiori dâng cao tạt bóng chuẩn xác vào vòng cấm để Kai Havertz bật cao đánh đầu hiểm hóc tung lưới Oliver Dovin.'
    },
    {
      minute: 23,
      period: '1H',
      type: 'goal',
      isHome: true,
      teamId: 42,
      playerName: 'Bukayo Saka',
      assistName: 'Martin Ødegaard',
      scoreText: '2 - 0',
      title: 'VÀO! 2-0 cho Arsenal (Bukayo Saka)',
      description: 'Đội trưởng Martin Ødegaard chọc khe xé toang hàng thủ Coventry, Bukayo Saka băng xuống bứt tốc dứt điểm chéo góc bằng chân trái không thể cản phá.'
    },
    {
      minute: 41,
      period: '1H',
      type: 'card_yellow',
      isHome: false,
      teamId: 1346,
      playerName: 'Victor Torp',
      title: 'Thẻ vàng cho Victor Torp (Coventry)',
      description: 'Tiền vệ Coventry phạm lỗi kéo người lộ liễu với Declan Rice ở khu vực giữa sân nhằm ngăn chặn đợt phản công nhanh.'
    },
    {
      minute: 45,
      extraMinute: 2,
      period: 'HT',
      type: 'halftime',
      scoreText: '2 - 0',
      title: 'Hết hiệp 1: Arsenal 2 - 0 Coventry',
      description: 'Arsenal hoàn toàn làm chủ thế trận trong 45 phút đầu tiên với 65% thời lượng kiểm soát bóng và 2 bàn thắng dẫn trước.'
    },
    {
      minute: 46,
      period: '2H',
      type: 'whistle_start',
      title: 'Hiệp 2 bắt đầu',
      description: 'Chưa có sự thay đổi người nào sau giờ nghỉ giải lao từ hai HLV.'
    },
    {
      minute: 49,
      period: '2H',
      type: 'goal',
      isHome: true,
      teamId: 42,
      playerName: 'Martin Ødegaard',
      assistName: null,
      scoreText: '3 - 0',
      title: 'VÀO! 3-0 cho Arsenal (Martin Ødegaard)',
      description: 'Pha phối hợp một chạm siêu đẳng ngoài vòng cấm, Ødegaard tự mình xoay người tung cú nã đại bác bằng chân trái đưa bóng găm thẳng góc chết.'
    },
    {
      minute: 63,
      period: '2H',
      type: 'card_yellow',
      isHome: true,
      teamId: 42,
      playerName: 'Gabriel Magalhães',
      title: 'Thẻ vàng cho Gabriel Magalhães (Arsenal)',
      description: 'Trung vệ người Brazil có pha va chạm tranh chấp quyết liệt trên không với tiền đạo Haji Wright.'
    },
    {
      minute: 68,
      period: '2H',
      type: 'subst',
      isHome: true,
      teamId: 42,
      playerInName: 'Martín Zubimendi & Noni Madueke',
      playerOutName: 'Thomas Partey & Bukayo Saka',
      title: 'Arsenal thay 2 người cùng lúc',
      description: 'Zubimendi vào thay Partey để củng cố tuyến giữa; Madueke vào thay Saka dưỡng sức sau màn trình diễn chói sáng.'
    },
    {
      minute: 76,
      period: '2H',
      type: 'subst',
      isHome: true,
      teamId: 42,
      playerInName: 'Mikel Merino & Eberechi Eze',
      playerOutName: 'Declan Rice & Gabriel Martinelli',
      title: 'Arsenal thay tiếp 2 cầu thủ',
      description: 'HLV Mikel Arteta tung tân binh Merino và Eze vào sân để duy trì áp lực tấn công và kiểm soát nhịp độ.'
    },
    {
      minute: 82,
      period: '2H',
      type: 'var',
      isHome: false,
      teamId: 1346,
      isDisallowed: true,
      title: '🚫 VAR can thiệp: Bàn thắng không được công nhận cho Coventry',
      description: 'Haji Wright đệm bóng tung lưới David Raya nhưng trọng tài VAR xác định tiền đạo người Mỹ đã rơi vào thế việt vị trước đó nửa thân người.'
    },
    {
      minute: 90,
      extraMinute: 4,
      period: 'FT',
      type: 'fulltime',
      scoreText: '3 - 0',
      title: 'Hết giờ: Arsenal 3 - 0 Coventry',
      description: 'Trọng tài Thomas Bramall nổi còi mãn cuộc. Arsenal bỏ túi 3 điểm tuyệt đối và tạm thời vươn lên nhóm đầu bảng xếp hạng Premier League.'
    }
  ],
  lineups: {
    home: {
      team: {
        id: 42,
        name: 'Arsenal',
        shortName: 'Arsenal',
        logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1',
        winner: true
      },
      formation: '4-2-3-1',
      coach: {
        name: 'Mikel Arteta',
        nationality: 'Tây Ban Nha',
        photo: 'https://media.api-sports.io/football/coachs/19.png'
      },
      kitColor: {
        primary: '#dc2626',
        number: '#ffffff',
        border: '#ffffff'
      },
      startXI: [
        {
          id: 19465,
          name: 'David Raya',
          shortName: 'Raya',
          number: 22,
          position: 'Goalkeeper',
          gridX: 50,
          gridY: 90,
          rating: 7.2,
          photo: 'https://media.api-sports.io/football/players/19465.png',
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 34,
            keyPasses: 0,
            passAccuracy: 88,
            duelsWon: 1,
            duelsTotal: 1,
            tackles: 0,
            interceptions: 1,
            saves: 1,
            touches: 42
          }
        },
        {
          id: 157052,
          name: 'Riccardo Calafiori',
          shortName: 'Calafiori',
          number: 33,
          position: 'Defender',
          gridX: 18,
          gridY: 72,
          rating: 7.8,
          photo: 'https://media.api-sports.io/football/players/157052.png',
          stats: {
            minutes: 90,
            goals: 0,
            assists: 1,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 62,
            keyPasses: 2,
            passAccuracy: 93,
            duelsWon: 5,
            duelsTotal: 7,
            tackles: 3,
            interceptions: 2,
            touches: 78
          }
        },
        {
          id: 22224,
          name: 'Gabriel Magalhães',
          shortName: 'Gabriel',
          number: 6,
          position: 'Defender',
          gridX: 38,
          gridY: 74,
          rating: 7.4,
          photo: 'https://media.api-sports.io/football/players/22224.png',
          events: [{ type: 'card_yellow', minute: 63 }],
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 71,
            keyPasses: 0,
            passAccuracy: 94,
            duelsWon: 6,
            duelsTotal: 8,
            tackles: 2,
            interceptions: 3,
            touches: 85
          }
        },
        {
          id: 22090,
          name: 'William Saliba',
          shortName: 'Saliba',
          number: 2,
          position: 'Defender',
          gridX: 62,
          gridY: 74,
          rating: 7.7,
          photo: 'https://media.api-sports.io/football/players/22090.png',
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 79,
            keyPasses: 0,
            passAccuracy: 96,
            duelsWon: 4,
            duelsTotal: 5,
            tackles: 2,
            interceptions: 4,
            touches: 89
          }
        },
        {
          id: 313245,
          name: 'Myles Lewis-Skelly',
          shortName: 'Lewis-Skelly',
          number: 49,
          position: 'Defender',
          gridX: 82,
          gridY: 72,
          rating: 7.6,
          photo: 'https://media.api-sports.io/football/players/313245.png',
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 58,
            keyPasses: 1,
            passAccuracy: 91,
            duelsWon: 4,
            duelsTotal: 6,
            tackles: 3,
            interceptions: 2,
            touches: 73
          }
        },
        {
          id: 2937,
          name: 'Declan Rice',
          shortName: 'Rice',
          number: 41,
          position: 'Midfielder',
          gridX: 36,
          gridY: 55,
          rating: 7.5,
          photo: 'https://media.api-sports.io/football/players/2937.png',
          events: [{ type: 'sub_out', minute: 76 }],
          stats: {
            minutes: 76,
            goals: 0,
            assists: 0,
            shotsTotal: 2,
            shotsOnTarget: 1,
            passesTotal: 64,
            keyPasses: 2,
            passAccuracy: 92,
            duelsWon: 5,
            duelsTotal: 7,
            tackles: 2,
            interceptions: 2,
            touches: 79
          }
        },
        {
          id: 49,
          name: 'Thomas Partey',
          shortName: 'Partey',
          number: 5,
          position: 'Midfielder',
          gridX: 64,
          gridY: 55,
          rating: 7.3,
          photo: 'https://media.api-sports.io/football/players/49.png',
          events: [{ type: 'sub_out', minute: 68 }],
          stats: {
            minutes: 68,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 52,
            keyPasses: 1,
            passAccuracy: 90,
            duelsWon: 4,
            duelsTotal: 6,
            tackles: 3,
            interceptions: 1,
            touches: 65
          }
        },
        {
          id: 22223,
          name: 'Gabriel Martinelli',
          shortName: 'Martinelli',
          number: 11,
          position: 'Attacker',
          gridX: 20,
          gridY: 36,
          rating: 7.4,
          photo: 'https://media.api-sports.io/football/players/22223.png',
          events: [{ type: 'sub_out', minute: 76 }],
          stats: {
            minutes: 76,
            goals: 0,
            assists: 0,
            shotsTotal: 3,
            shotsOnTarget: 1,
            passesTotal: 31,
            keyPasses: 2,
            passAccuracy: 84,
            duelsWon: 3,
            duelsTotal: 7,
            tackles: 1,
            interceptions: 0,
            touches: 48
          }
        },
        {
          id: 37127,
          name: 'Martin Ødegaard',
          shortName: 'Ødegaard',
          number: 8,
          position: 'Midfielder',
          gridX: 50,
          gridY: 34,
          rating: 8.5,
          isCaptain: true,
          photo: 'https://media.api-sports.io/football/players/37127.png',
          events: [{ type: 'goal', minute: 49 }],
          stats: {
            minutes: 90,
            goals: 1,
            assists: 1,
            shotsTotal: 4,
            shotsOnTarget: 2,
            passesTotal: 68,
            keyPasses: 3,
            passAccuracy: 91,
            duelsWon: 4,
            duelsTotal: 6,
            tackles: 2,
            interceptions: 1,
            touches: 56
          }
        },
        {
          id: 1460,
          name: 'Bukayo Saka',
          shortName: 'Saka',
          number: 7,
          position: 'Attacker',
          gridX: 80,
          gridY: 36,
          rating: 8.1,
          photo: 'https://media.api-sports.io/football/players/1460.png',
          events: [{ type: 'goal', minute: 23 }, { type: 'sub_out', minute: 68 }],
          stats: {
            minutes: 68,
            goals: 1,
            assists: 0,
            shotsTotal: 3,
            shotsOnTarget: 2,
            passesTotal: 36,
            keyPasses: 2,
            passAccuracy: 89,
            duelsWon: 5,
            duelsTotal: 8,
            tackles: 1,
            interceptions: 1,
            touches: 52
          }
        },
        {
          id: 978,
          name: 'Kai Havertz',
          shortName: 'Havertz',
          number: 29,
          position: 'Attacker',
          gridX: 50,
          gridY: 18,
          rating: 7.9,
          photo: 'https://media.api-sports.io/football/players/978.png',
          events: [{ type: 'goal', minute: 15 }],
          stats: {
            minutes: 90,
            goals: 1,
            assists: 0,
            shotsTotal: 4,
            shotsOnTarget: 2,
            passesTotal: 28,
            keyPasses: 1,
            passAccuracy: 86,
            duelsWon: 7,
            duelsTotal: 11,
            tackles: 1,
            interceptions: 0,
            touches: 45
          }
        }
      ],
      substitutes: [
        {
          player: {
            id: 47315,
            name: 'Martín Zubimendi',
            shortName: 'Zubimendi',
            number: 36,
            position: 'Midfielder',
            gridX: 0,
            gridY: 0,
            rating: 6.8,
            photo: 'https://media.api-sports.io/football/players/47315.png'
          },
          subInMinute: 68,
          subOutFor: 'Partey'
        },
        {
          player: {
            id: 136723,
            name: 'Noni Madueke',
            shortName: 'Madueke',
            number: 20,
            position: 'Attacker',
            gridX: 0,
            gridY: 0,
            rating: 6.7,
            photo: 'https://media.api-sports.io/football/players/136723.png'
          },
          subInMinute: 68,
          subOutFor: 'Saka'
        },
        {
          player: {
            id: 47311,
            name: 'Mikel Merino',
            shortName: 'Merino',
            number: 23,
            position: 'Midfielder',
            gridX: 0,
            gridY: 0,
            rating: 6.6,
            photo: 'https://media.api-sports.io/football/players/47311.png'
          },
          subInMinute: 76,
          subOutFor: 'Rice'
        },
        {
          player: {
            id: 19586,
            name: 'Eberechi Eze',
            shortName: 'Eze',
            number: 10,
            position: 'Midfielder',
            gridX: 0,
            gridY: 0,
            rating: 6.8,
            photo: 'https://media.api-sports.io/football/players/19586.png'
          },
          subInMinute: 76,
          subOutFor: 'Martinelli'
        },
        {
          player: {
            id: 19959,
            name: 'Ben White',
            shortName: 'White',
            number: 4,
            position: 'Defender',
            gridX: 0,
            gridY: 0,
            photo: 'https://media.api-sports.io/football/players/19959.png'
          }
        },
        {
          player: {
            id: 284486,
            name: 'Jakub Kiwior',
            shortName: 'Kiwior',
            number: 15,
            position: 'Defender',
            gridX: 0,
            gridY: 0,
            photo: 'https://media.api-sports.io/football/players/284486.png'
          }
        },
        {
          player: {
            id: 2273,
            name: 'Kepa Arrizabalaga',
            shortName: 'Kepa',
            number: 13,
            position: 'Goalkeeper',
            gridX: 0,
            gridY: 0,
            photo: 'https://media.api-sports.io/football/players/2273.png'
          }
        },
        {
          player: {
            id: 18979,
            name: 'Viktor Gyökeres',
            shortName: 'Gyökeres',
            number: 14,
            position: 'Attacker',
            gridX: 0,
            gridY: 0,
            photo: 'https://media.api-sports.io/football/players/18979.png'
          }
        }
      ]
    },
    away: {
      team: {
        id: 1346,
        name: 'Coventry',
        shortName: 'Coventry',
        logo: 'https://is.vnecdn.net/objects/teams/1346.png?v=1',
        winner: false
      },
      formation: '4-1-4-1',
      coach: {
        name: 'Frank Lampard',
        nationality: 'Anh',
        photo: 'https://media.api-sports.io/football/coachs/17.png'
      },
      kitColor: {
        primary: '#0284c7',
        number: '#ffffff',
        border: '#0369a1'
      },
      startXI: [
        {
          id: 101,
          name: 'Oliver Dovin',
          shortName: 'Dovin',
          number: 1,
          position: 'Goalkeeper',
          gridX: 50,
          gridY: 10,
          rating: 6.2,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 29,
            keyPasses: 0,
            passAccuracy: 72,
            duelsWon: 1,
            duelsTotal: 1,
            tackles: 0,
            interceptions: 0,
            saves: 3,
            touches: 38
          }
        },
        {
          id: 102,
          name: 'Milan van Ewijk',
          shortName: 'van Ewijk',
          number: 27,
          position: 'Defender',
          gridX: 82,
          gridY: 28,
          rating: 6.1,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 34,
            keyPasses: 0,
            passAccuracy: 76,
            duelsWon: 4,
            duelsTotal: 7,
            tackles: 2,
            interceptions: 1,
            touches: 49
          }
        },
        {
          id: 103,
          name: 'Bobby Thomas',
          shortName: 'Thomas',
          number: 4,
          position: 'Defender',
          gridX: 62,
          gridY: 26,
          rating: 5.9,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 38,
            keyPasses: 0,
            passAccuracy: 81,
            duelsWon: 4,
            duelsTotal: 8,
            tackles: 1,
            interceptions: 2,
            touches: 46
          }
        },
        {
          id: 104,
          name: 'Luis Binks',
          shortName: 'Binks',
          number: 22,
          position: 'Defender',
          gridX: 38,
          gridY: 26,
          rating: 6.0,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 41,
            keyPasses: 0,
            passAccuracy: 80,
            duelsWon: 3,
            duelsTotal: 6,
            tackles: 2,
            interceptions: 2,
            touches: 48
          }
        },
        {
          id: 105,
          name: 'Jay Dasilva',
          shortName: 'Dasilva',
          number: 3,
          position: 'Defender',
          gridX: 18,
          gridY: 28,
          rating: 5.8,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 33,
            keyPasses: 0,
            passAccuracy: 75,
            duelsWon: 3,
            duelsTotal: 7,
            tackles: 1,
            interceptions: 1,
            touches: 44
          }
        },
        {
          id: 106,
          name: 'Ben Sheaf',
          shortName: 'Sheaf',
          number: 14,
          position: 'Midfielder',
          gridX: 50,
          gridY: 42,
          rating: 6.3,
          isCaptain: true,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 46,
            keyPasses: 1,
            passAccuracy: 82,
            duelsWon: 6,
            duelsTotal: 10,
            tackles: 3,
            interceptions: 2,
            touches: 58
          }
        },
        {
          id: 107,
          name: 'Tatsuhiro Sakamoto',
          shortName: 'Sakamoto',
          number: 7,
          position: 'Midfielder',
          gridX: 80,
          gridY: 60,
          rating: 6.4,
          stats: {
            minutes: 84,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 27,
            keyPasses: 1,
            passAccuracy: 77,
            duelsWon: 5,
            duelsTotal: 9,
            tackles: 2,
            interceptions: 1,
            touches: 39
          }
        },
        {
          id: 108,
          name: 'Victor Torp',
          shortName: 'Torp',
          number: 29,
          position: 'Midfielder',
          gridX: 62,
          gridY: 62,
          rating: 5.9,
          events: [{ type: 'card_yellow', minute: 41 }],
          stats: {
            minutes: 75,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 30,
            keyPasses: 0,
            passAccuracy: 78,
            duelsWon: 4,
            duelsTotal: 8,
            tackles: 2,
            interceptions: 1,
            touches: 41
          }
        },
        {
          id: 109,
          name: 'Jack Rudoni',
          shortName: 'Rudoni',
          number: 5,
          position: 'Midfielder',
          gridX: 38,
          gridY: 62,
          rating: 6.2,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 1,
            passesTotal: 35,
            keyPasses: 1,
            passAccuracy: 79,
            duelsWon: 4,
            duelsTotal: 7,
            tackles: 1,
            interceptions: 0,
            touches: 47
          }
        },
        {
          id: 110,
          name: 'Ephron Mason-Clark',
          shortName: 'Mason-Clark',
          number: 11,
          position: 'Midfielder',
          gridX: 20,
          gridY: 60,
          rating: 6.0,
          stats: {
            minutes: 80,
            goals: 0,
            assists: 0,
            shotsTotal: 0,
            shotsOnTarget: 0,
            passesTotal: 22,
            keyPasses: 0,
            passAccuracy: 73,
            duelsWon: 3,
            duelsTotal: 8,
            tackles: 1,
            interceptions: 0,
            touches: 33
          }
        },
        {
          id: 111,
          name: 'Haji Wright',
          shortName: 'Wright',
          number: 9,
          position: 'Attacker',
          gridX: 50,
          gridY: 82,
          rating: 6.3,
          stats: {
            minutes: 90,
            goals: 0,
            assists: 0,
            shotsTotal: 1,
            shotsOnTarget: 0,
            passesTotal: 16,
            keyPasses: 0,
            passAccuracy: 69,
            duelsWon: 4,
            duelsTotal: 10,
            tackles: 0,
            interceptions: 0,
            touches: 27
          }
        }
      ],
      substitutes: [
        {
          player: {
            id: 112,
            name: 'Brad Collins',
            shortName: 'Collins',
            number: 13,
            position: 'Goalkeeper',
            gridX: 0,
            gridY: 0
          }
        },
        {
          player: {
            id: 113,
            name: 'Joel Latibeaudiere',
            shortName: 'Latibeaudiere',
            number: 15,
            position: 'Defender',
            gridX: 0,
            gridY: 0
          },
          subInMinute: 75,
          subOutFor: 'Torp'
        },
        {
          player: {
            id: 114,
            name: 'Brandon Thomas-Asante',
            shortName: 'Thomas-Asante',
            number: 19,
            position: 'Attacker',
            gridX: 0,
            gridY: 0
          },
          subInMinute: 80,
          subOutFor: 'Mason-Clark'
        },
        {
          player: {
            id: 115,
            name: 'Ellis Simms',
            shortName: 'Simms',
            number: 9,
            position: 'Attacker',
            gridX: 0,
            gridY: 0
          },
          subInMinute: 84,
          subOutFor: 'Sakamoto'
        },
        {
          player: {
            id: 116,
            name: 'Liam Kitching',
            shortName: 'Kitching',
            number: 16,
            position: 'Defender',
            gridX: 0,
            gridY: 0
          }
        },
        {
          player: {
            id: 117,
            name: 'Jake Bidwell',
            shortName: 'Bidwell',
            number: 21,
            position: 'Defender',
            gridX: 0,
            gridY: 0
          }
        }
      ]
    }
  },
  stats: {
    xG: { home: 1.88, away: 0.20 },
    possession: { home: 64, away: 36 },
    totalShots: { home: 20, away: 4 },
    shotsOnTarget: { home: 6, away: 1 },
    shotsOffTarget: { home: 6, away: 2 },
    blockedShots: { home: 8, away: 1 },
    shotsInsideBox: { home: 10, away: 1 },
    totalPasses: { home: 616, away: 347 },
    passAccuracy: { home: 92, away: 78 },
    corners: { home: 8, away: 2 },
    fouls: { home: 10, away: 13 },
    yellowCards: { home: 1, away: 1 },
    redCards: { home: 0, away: 0 },
    saves: { home: 1, away: 2 },
    goalsPrevented: { home: -0.56, away: -0.56 }
  },
  motm: {
    player: {
      id: 37127,
      name: 'Martin Ødegaard',
      shortName: 'M. Ødegaard',
      number: 8,
      position: 'Midfielder',
      gridX: 50,
      gridY: 34,
      rating: 8.5,
      photo: 'https://media.api-sports.io/football/players/37127.png'
    },
    team: {
      id: 42,
      name: 'Arsenal',
      shortName: 'Arsenal',
      logo: 'https://is.vnecdn.net/objects/teams/42.png?v=1',
      winner: true
    },
    rating: 8.5,
    photo: 'https://media.api-sports.io/football/players/37127.png',
    badgeText: 'CẦU THỦ XUẤT SẮC NHẤT TRẬN (MOTM)',
    headlineStat: '1 Bàn thắng · 1 Kiến tạo · 3 Đường chuyền tạo cơ hội (Key Passes) · 56 Lần chạm bóng',
    metrics: [
      { label: 'Bàn thắng', value: 1 },
      { label: 'Kiến tạo', value: 1 },
      { label: 'Chuyền tạo cơ hội', value: 3 },
      { label: 'Chạm bóng', value: 56 },
      { label: 'Tranh chấp thắng', value: '4/6' },
      { label: 'Độ chính xác chuyền', value: '91%' }
    ]
  },
  news: [
    {
      id: 'news-match-1',
      leagueId: 39,
      title: 'Arsenal 3-0 Coventry: Khởi đầu như mơ của Pháo thủ tại Emirates',
      summary: 'Dưới sự chỉ huy xuất thần của nhạc trưởng Martin Ødegaard, Arsenal dễ dàng đánh bại đối thủ khó chịu Coventry 3-0 trong trận ra quân rạng sáng nay.',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      publishedAt: '35 phút trước',
      category: 'Tổng thuật',
      author: 'Quang Dũng',
      commentCount: 86,
      isHot: true
    },
    {
      id: 'news-match-2',
      leagueId: 39,
      title: 'Góc nhìn chiến thuật: Cách Arteta sử dụng Lewis-Skelly & Calafiori đảo vị trí hoàn hảo',
      summary: 'Việc bố trí Myles Lewis-Skelly và Riccardo Calafiori bó vào trung lộ như hai tiền vệ con thoi đã bóp nghẹt hoàn toàn tuyến giữa của Frank Lampard.',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      publishedAt: '1 giờ trước',
      category: 'Phân tích',
      author: 'Hồng Duy',
      commentCount: 52,
      isHot: true
    },
    {
      id: 'news-match-3',
      leagueId: 39,
      title: 'Mikel Arteta ca ngợi Ødegaard, Lampard thừa nhận chênh lệch đẳng cấp',
      summary: 'HLV Frank Lampard khen ngợi Arsenal là cỗ máy hoàn hảo bậc nhất châu Âu thời điểm hiện tại, trong khi Arteta nhấn mạnh sự khiêm tốn của toàn đội.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2 giờ trước',
      category: 'Họp báo',
      author: 'Vy Anh',
      commentCount: 114
    },
    {
      id: 'news-match-4',
      leagueId: 39,
      title: 'Chùm ảnh: Havertz, Saka, Ødegaard tỏa sáng rực rỡ ngày mở màn',
      summary: 'Khoảnh khắc ba ngôi sao trên hàng công Arsenal chia vui cùng 60.000 khán giả Emirates trong ngày hội khai màn Ngoại hạng Anh 2026/2027.',
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
      publishedAt: '3 giờ trước',
      category: 'Chùm ảnh',
      author: 'Đỗ Tuấn',
      commentCount: 39
    }
  ]
};

export const GALATASARAY_LINEUP_PLAYERS: MatchLineupPlayer[] = [
  { id: 64501, name: 'U. Çakır', shortName: 'U. Çakır', number: 1, position: 'Goalkeeper', gridX: 50, gridY: 8, rating: 7.2 },
  { id: 64553, name: 'B. Yılmaz', shortName: 'B. Yılmaz', number: 53, position: 'Defender', gridX: 16, gridY: 17, rating: 7.0 },
  { id: 64506, name: 'D. Sánchez', shortName: 'D. Sánchez', number: 6, position: 'Defender', gridX: 39, gridY: 17, rating: 7.4 },
  { id: 64504, name: 'I. Jakobs', shortName: 'I. Jakobs', number: 4, position: 'Defender', gridX: 61, gridY: 17, rating: 7.1 },
  { id: 64517, name: 'E. Elmalı', shortName: 'E. Elmalı', number: 17, position: 'Defender', gridX: 84, gridY: 17, rating: 6.9 },
  { id: 64534, name: 'L. Torreira', shortName: 'L. Torreira', number: 34, position: 'Midfielder', gridX: 35, gridY: 26, rating: 7.5 },
  { id: 64599, name: 'M. Lemina', shortName: 'M. Lemina', number: 99, position: 'Midfielder', gridX: 65, gridY: 26, rating: 7.3 },
  { id: 64511, name: 'Y. Akgün', shortName: 'Y. Akgün', number: 11, position: 'Midfielder', gridX: 20, gridY: 34, rating: 7.6 },
  { id: 64583, name: 'A. Batrakov', shortName: 'A. Batrakov', number: 83, position: 'Midfielder', gridX: 50, gridY: 34, rating: 7.7 },
  { id: 64527, name: 'R. Leão', shortName: 'R. Leão', number: 27, position: 'Midfielder', gridX: 80, gridY: 34, rating: 7.9 },
  { id: 64545, name: 'V. Osimhen', shortName: 'V. Osimhen', number: 45, position: 'Attacker', gridX: 50, gridY: 42, rating: 8.3 }
];

export const GALATASARAY_SUBS = [
  { player: { id: 64542, name: 'A. Bardakcı', shortName: 'Bardakcı', number: 42, position: 'Defender' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64503, name: 'E. Bitshiabu', shortName: 'Bitshiabu', number: 3, position: 'Defender' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64508, name: 'G. Sara', shortName: 'Sara', number: 8, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64521, name: 'D. Gül', shortName: 'Gül', number: 21, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64520, name: 'İ. Gündoğan', shortName: 'Gündoğan', number: 20, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64573, name: 'B. Luş', shortName: 'Luş', number: 73, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64574, name: 'R. Nhaga', shortName: 'Nhaga', number: 74, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64507, name: 'R. Sallai', shortName: 'Sallai', number: 7, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64510, name: 'L. Sané', shortName: 'Sané', number: 10, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64518, name: 'L. Ugochukwu', shortName: 'Ugochukwu', number: 18, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 64524, name: 'J. Yılmaz', shortName: 'Yılmaz', number: 24, position: 'Goalkeeper' as const, gridX: 0, gridY: 0 } }
];

export const BARCA_LINEUP_PLAYERS: MatchLineupPlayer[] = [
  { id: 52917, name: 'A. Gordon', shortName: 'A. Gordon', number: 17, position: 'Attacker', gridX: 20, gridY: 58, rating: 7.5 },
  { id: 52920, name: 'D. Olmo', shortName: 'D. Olmo', number: 20, position: 'Attacker', gridX: 50, gridY: 58, rating: 7.9 },
  { id: 52910, name: 'L. Yamal', shortName: 'L. Yamal', number: 10, position: 'Attacker', gridX: 80, gridY: 58, rating: 8.4 },
  { id: 52908, name: 'Pedri', shortName: 'Pedri', number: 8, position: 'Midfielder', gridX: 25, gridY: 67, rating: 8.1 },
  { id: 52916, name: 'Rodri', shortName: 'Rodri', number: 16, position: 'Midfielder', gridX: 50, gridY: 67, rating: 7.8 },
  { id: 52907, name: 'Fermín', shortName: 'Fermín', number: 7, position: 'Midfielder', gridX: 75, gridY: 67, rating: 7.4 },
  { id: 52902, name: 'J. Cancelo', shortName: 'J. Cancelo', number: 2, position: 'Defender', gridX: 16, gridY: 76, rating: 7.3 },
  { id: 52918, name: 'G. Martín', shortName: 'G. Martín', number: 18, position: 'Defender', gridX: 39, gridY: 76, rating: 7.2 },
  { id: 52905, name: 'P. Cubarsí Paredes', shortName: 'P. Cubarsí Paredes', number: 5, position: 'Defender', gridX: 61, gridY: 76, rating: 7.6 },
  { id: 52924, name: 'E. García', shortName: 'E. García', number: 24, position: 'Defender', gridX: 84, gridY: 76, rating: 7.1 },
  { id: 52901, name: 'J. García', shortName: 'J. García', number: 1, position: 'Goalkeeper', gridX: 50, gridY: 87, rating: 7.0 }
];

export const BARCA_SUBS = [
  { player: { id: 52913, name: 'W. Szczęsny', shortName: 'Szczęsny', number: 13, position: 'Goalkeeper' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52925, name: 'D. Livaković', shortName: 'Livaković', number: 25, position: 'Goalkeeper' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52923, name: 'J. Koundé', shortName: 'Koundé', number: 23, position: 'Defender' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52906, name: 'Gavi', shortName: 'Gavi', number: 6, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52909, name: 'G. Jesus', shortName: 'Jesus', number: 9, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52904, name: 'B. Farinas', shortName: 'Farinas', number: 4, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52912, name: 'X. Espart', shortName: 'Espart', number: 12, position: 'Defender' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52922, name: 'M. Bernal', shortName: 'Bernal', number: 22, position: 'Midfielder' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52903, name: 'A. Balde', shortName: 'Balde', number: 3, position: 'Defender' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52914, name: 'K. Adeyemi', shortName: 'Adeyemi', number: 14, position: 'Attacker' as const, gridX: 0, gridY: 0 } },
  { player: { id: 52929, name: 'H. Abdelkarim', shortName: 'Abdelkarim', number: 29, position: 'Attacker' as const, gridX: 0, gridY: 0 } }
];

/**
 * Robust factory for any match in the system:
 * Returns the exact Arsenal vs Coventry dataset for fixture 1557367 (or when teams match),
 * or procedurally generates high-quality match center details for any other fixture.
 */
export function getMatchDetailsForFixture(fixture: FixtureItem): MatchFullDetails {
  if (
    fixture.fixture.id === 1557367 ||
    (fixture.teams.home.name.toLowerCase().includes('arsenal') && fixture.teams.away.name.toLowerCase().includes('coventry'))
  ) {
    return ARSENAL_COVENTRY_DETAIL;
  }

  const isFinished = ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) || fixture.fixture.status.long.includes('Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(fixture.fixture.status.short);
  const homeScore = fixture.goals.home ?? fixture.score.fulltime.home ?? 0;
  const awayScore = fixture.goals.away ?? fixture.score.fulltime.away ?? 0;
  const htHome = fixture.score.halftime.home ?? Math.min(homeScore, Math.floor(homeScore / 2));
  const htAway = fixture.score.halftime.away ?? Math.min(awayScore, Math.floor(awayScore / 2));

  const home = fixture.teams.home;
  const away = fixture.teams.away;

  // Build timeline events from existing events or synthetic
  const timeline: MatchTimelineEvent[] = [];
  timeline.push({
    minute: 1,
    period: '1H',
    type: 'whistle_start',
    title: `Trọng tài nổi còi bắt đầu trận đấu ${home.name} vs ${away.name}`,
    description: `Trận đấu diễn ra trên ${fixture.fixture.venue?.name || 'Sân vận động'} (${fixture.fixture.venue?.city || 'Sân trung lập'}).`
  });

  if (fixture.events && fixture.events.length > 0) {
    fixture.events.forEach((ev) => {
      const isHomeTeam = ev.team.id === home.id;
      if (ev.type === 'Goal') {
        timeline.push({
          minute: ev.time.elapsed,
          period: ev.time.elapsed <= 45 ? '1H' : '2H',
          type: 'goal',
          isHome: isHomeTeam,
          teamId: ev.team.id,
          playerName: ev.player.name,
          assistName: ev.assist?.name,
          title: `VÀO! ${ev.player.name} lập công cho ${ev.team.name}`,
          description: ev.assist?.name ? `Đường kiến tạo chuẩn mực của ${ev.assist.name}.` : 'Pha dứt điểm quyết đoán đánh bại thủ môn.'
        });
      } else if (ev.type === 'Card') {
        timeline.push({
          minute: ev.time.elapsed,
          period: ev.time.elapsed <= 45 ? '1H' : '2H',
          type: ev.detail === 'Red Card' ? 'card_red' : 'card_yellow',
          isHome: isHomeTeam,
          teamId: ev.team.id,
          playerName: ev.player.name,
          title: `${ev.detail === 'Red Card' ? 'Thẻ đỏ' : 'Thẻ vàng'} cho ${ev.player.name} (${ev.team.name})`,
          description: 'Pha phạm lỗi nguy hiểm trong tình huống tranh chấp.'
        });
      }
    });
  } else if (isFinished || isLive) {
    if (home.name.toLowerCase().includes('coventry') && away.name.toLowerCase().includes('newcastle')) {
      timeline.push(
        {
          minute: 6,
          period: '1H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: 'Jack Rudoni',
          scoreText: '1 - 0',
          title: 'VÀO! 1-0 cho Coventry (Jack Rudoni - Penalty)',
          description: 'Jack Rudoni thực hiện thành công quả phạt đền 11m đánh lừa thủ môn Newcastle.'
        },
        {
          minute: 48,
          period: '2H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: 'Sidiki Cherif',
          scoreText: '2 - 0',
          title: 'VÀO! 2-0 cho Coventry (Sidiki Cherif)',
          description: 'Sidiki Cherif băng vào đệm bóng cận thành nhân đôi cách biệt cho Coventry.'
        },
        {
          minute: 70,
          period: '2H',
          type: 'goal',
          isHome: false,
          teamId: away.id,
          playerName: 'Sven Botman',
          scoreText: '2 - 1',
          title: 'VÀO! Newcastle rút ngắn 1-2 (Sven Botman)',
          description: 'Sven Botman bật cao đánh đầu dũng mãnh sau quả đá phạt góc.'
        },
        {
          minute: 81,
          period: '2H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: 'Ellis Simms',
          scoreText: '3 - 1',
          title: 'VÀO! 3-1 cho Coventry (Ellis Simms)',
          description: 'Pha bứt tốc và dứt điểm chéo góc lạnh lùng của Ellis Simms.'
        },
        {
          minute: 86,
          period: '2H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: 'Stephen Mfuni',
          scoreText: '4 - 1',
          title: 'VÀO! 4-1 cho Coventry (Stephen Mfuni)',
          description: 'Stephen Mfuni ấn định chiến thắng tưng bừng 4-1 cho Coventry.'
        }
      );
    } else {
      // Generate realistic goal events if none present
      if (homeScore > 0) {
        timeline.push({
          minute: 24,
          period: '1H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: `${home.shortName || home.name} Tiền đạo`,
          scoreText: '1 - 0',
          title: `VÀO! Bàn mở tỷ số cho ${home.name}`,
          description: 'Dứt điểm cận thành sau đường căng ngang chuẩn xác.'
        });
      }
      if (homeScore > 1) {
        timeline.push({
          minute: 57,
          period: '2H',
          type: 'goal',
          isHome: true,
          teamId: home.id,
          playerName: `${home.shortName || home.name} Đội trưởng`,
          scoreText: `${homeScore} - ${awayScore}`,
          title: `VÀO! Bàn thắng thứ hai cho ${home.name}`,
          description: 'Cú sút sấm sét từ tuyến hai tung lưới đối phương.'
        });
      }
      if (awayScore > 0) {
        timeline.push({
          minute: 38,
          period: '1H',
          type: 'goal',
          isHome: false,
          teamId: away.id,
          playerName: `${away.shortName || away.name} Cầu thủ`,
          scoreText: `${Math.min(homeScore, 1)} - 1`,
          title: `VÀO! Bàn thắng quý giá cho ${away.name}`,
          description: 'Pha phản công chớp nhoáng xé toang hàng phòng ngự.'
        });
      }
    }
  }

  // Add halftime & fulltime markers
  if (isFinished || isLive) {
    timeline.push({
      minute: 45,
      extraMinute: 2,
      period: 'HT',
      type: 'halftime',
      scoreText: `${htHome} - ${htAway}`,
      title: `Hết hiệp 1: ${home.shortName || home.name} ${htHome} - ${htAway} ${away.shortName || away.name}`,
      description: 'Hai đội bước vào giờ nghỉ sau 45 phút tranh tài sôi nổi.'
    });
  }

  if (isFinished) {
    timeline.push({
      minute: 90,
      extraMinute: 4,
      period: 'FT',
      type: 'fulltime',
      scoreText: `${homeScore} - ${awayScore}`,
      title: `Hết giờ: ${home.shortName || home.name} ${homeScore} - ${awayScore} ${away.shortName || away.name}`,
      description: 'Trận đấu khép lại với kết quả chung cuộc xứng đáng.'
    });
  }

  // Sort timeline by minute
  timeline.sort((a, b) => a.minute - b.minute);

  // Generate tactical pitch starting XI
  const makeStartXI = (isHomeTeam: boolean): MatchLineupPlayer[] => {
    const t = isHomeTeam ? home : away;
    const basePositions = isHomeTeam
      ? [
          { name: 'Thủ môn', short: 'GK', num: 1, pos: 'Goalkeeper' as const, x: 50, y: 8, rat: 7.2 },
          { name: 'Hậu vệ phải', short: 'RB', num: 2, pos: 'Defender' as const, x: 16, y: 17, rat: 7.0 },
          { name: 'Trung vệ', short: 'CB', num: 4, pos: 'Defender' as const, x: 39, y: 17, rat: 7.4 },
          { name: 'Trung vệ', short: 'CB', num: 5, pos: 'Defender' as const, x: 61, y: 17, rat: 7.3 },
          { name: 'Hậu vệ trái', short: 'LB', num: 3, pos: 'Defender' as const, x: 84, y: 17, rat: 7.1 },
          { name: 'Tiền vệ phòng ngự', short: 'DM', num: 6, pos: 'Midfielder' as const, x: 35, y: 26, rat: 7.2 },
          { name: 'Tiền vệ trung tâm', short: 'CM', num: 8, pos: 'Midfielder' as const, x: 65, y: 26, rat: 7.5 },
          { name: 'Tiền vệ cánh phải', short: 'RM', num: 7, pos: 'Attacker' as const, x: 20, y: 34, rat: 7.6 },
          { name: 'Tiền vệ công', short: 'CAM', num: 10, pos: 'Midfielder' as const, x: 50, y: 34, rat: 7.8 },
          { name: 'Tiền vệ cánh trái', short: 'LM', num: 11, pos: 'Attacker' as const, x: 80, y: 34, rat: 7.4 },
          { name: 'Tiền đạo cắm', short: 'ST', num: 9, pos: 'Attacker' as const, x: 50, y: 42, rat: homeScore > 0 ? 8.2 : 7.1 }
        ]
      : [
          { name: 'Tiền đạo cánh trái', short: 'LW', num: 11, pos: 'Attacker' as const, x: 20, y: 58, rat: 7.5 },
          { name: 'Tiền đạo trung tâm', short: 'CF', num: 9, pos: 'Attacker' as const, x: 50, y: 58, rat: 7.9 },
          { name: 'Tiền đạo cánh phải', short: 'RW', num: 7, pos: 'Attacker' as const, x: 80, y: 58, rat: 7.6 },
          { name: 'Tiền vệ trung tâm', short: 'CM', num: 8, pos: 'Midfielder' as const, x: 25, y: 67, rat: 7.4 },
          { name: 'Tiền vệ trụ', short: 'DM', num: 6, pos: 'Midfielder' as const, x: 50, y: 67, rat: 7.8 },
          { name: 'Tiền vệ tấn công', short: 'AM', num: 10, pos: 'Midfielder' as const, x: 75, y: 67, rat: 7.4 },
          { name: 'Hậu vệ trái', short: 'LB', num: 3, pos: 'Defender' as const, x: 16, y: 76, rat: 7.3 },
          { name: 'Trung vệ', short: 'CB', num: 4, pos: 'Defender' as const, x: 39, y: 76, rat: 7.2 },
          { name: 'Trung vệ', short: 'CB', num: 5, pos: 'Defender' as const, x: 61, y: 76, rat: 7.6 },
          { name: 'Hậu vệ phải', short: 'RB', num: 2, pos: 'Defender' as const, x: 84, y: 76, rat: 7.1 },
          { name: 'Thủ môn', short: 'GK', num: 1, pos: 'Goalkeeper' as const, x: 50, y: 87, rat: 7.0 }
        ];

    return basePositions.map((p, idx) => ({
      id: t.id * 100 + idx,
      name: `${p.name} (${t.shortName || t.name})`,
      shortName: p.short,
      number: p.num,
      position: p.pos,
      gridX: p.x,
      gridY: p.y,
      rating: p.rat,
      stats: {
        minutes: 90,
        goals: p.pos === 'Attacker' ? (isHomeTeam ? Math.min(1, homeScore) : Math.min(1, awayScore)) : 0,
        assists: p.pos === 'Midfielder' ? (isHomeTeam ? Math.min(1, homeScore) : 0) : 0,
        shotsTotal: p.pos === 'Attacker' ? 3 : 1,
        shotsOnTarget: p.pos === 'Attacker' ? 2 : 0,
        passesTotal: 45,
        keyPasses: 1,
        passAccuracy: isHomeTeam ? 90 : 81,
        duelsWon: 4,
        duelsTotal: 7,
        tackles: 2,
        interceptions: 1,
        touches: 52
      }
    }));
  };

  const makeSubstitutes = (isHomeTeam: boolean) => {
    const t = isHomeTeam ? home : away;
    const subDefs = [
      { name: 'Thủ môn dự bị', num: 12, pos: 'Goalkeeper' as const },
      { name: 'Trung vệ', num: 15, pos: 'Defender' as const },
      { name: 'Hậu vệ cánh', num: 18, pos: 'Defender' as const },
      { name: 'Hậu vệ đa năng', num: 23, pos: 'Defender' as const },
      { name: 'Tiền vệ phòng ngự', num: 16, pos: 'Midfielder' as const },
      { name: 'Tiền vệ trung tâm', num: 20, pos: 'Midfielder' as const },
      { name: 'Tiền vệ công', num: 22, pos: 'Midfielder' as const },
      { name: 'Tiền đạo cánh', num: 19, pos: 'Attacker' as const },
      { name: 'Tiền đạo cắm', num: 25, pos: 'Attacker' as const },
      { name: 'Tiền đạo dự bị', num: 28, pos: 'Attacker' as const },
      { name: 'Thủ môn trẻ', num: 31, pos: 'Goalkeeper' as const }
    ];
    return subDefs.map((s, idx) => ({
      player: {
        id: t.id * 1000 + idx,
        name: `${s.name} (${t.shortName || t.name})`,
        shortName: s.name,
        number: s.num,
        position: s.pos,
        gridX: 0,
        gridY: 0
      }
    }));
  };

  const isGalatasarayHome = home.name.toLowerCase().includes('galatasaray');
  const isBarcaAway = away.name.toLowerCase().includes('barca') || away.name.toLowerCase().includes('barcelona');
  const isGalatasarayAway = away.name.toLowerCase().includes('galatasaray');
  const isBarcaHome = home.name.toLowerCase().includes('barca') || home.name.toLowerCase().includes('barcelona');

  const homeFormation = isGalatasarayHome ? '4-2-3-1' : (isBarcaHome ? '4-3-3' : '4-2-3-1');
  const awayFormation = isBarcaAway ? '4-3-3' : (isGalatasarayAway ? '4-2-3-1' : '4-3-3');

  const homeStartXI = isGalatasarayHome 
    ? GALATASARAY_LINEUP_PLAYERS 
    : (isBarcaHome ? BARCA_LINEUP_PLAYERS : makeStartXI(true));
  const homeSubstitutes = isGalatasarayHome 
    ? GALATASARAY_SUBS 
    : (isBarcaHome ? BARCA_SUBS : makeSubstitutes(true));

  const awayStartXI = isBarcaAway 
    ? BARCA_LINEUP_PLAYERS 
    : (isGalatasarayAway ? GALATASARAY_LINEUP_PLAYERS : makeStartXI(false));
  const awaySubstitutes = isBarcaAway 
    ? BARCA_SUBS 
    : (isGalatasarayAway ? GALATASARAY_SUBS : makeSubstitutes(false));

  const xGHome = +(homeScore * 0.72 + 0.55).toFixed(2);
  const xGAway = +(awayScore * 0.65 + 0.32).toFixed(2);
  const possHome = homeScore >= awayScore ? 58 : 46;

  const motmCandidate: MatchLineupPlayer = {
    id: home.id * 100 + 10,
    name: `${home.shortName || home.name} Ngôi sao`,
    shortName: `${home.shortName || home.name} #10`,
    number: 10,
    position: 'Midfielder',
    gridX: 50,
    gridY: 34,
    rating: 8.4,
    photo: home.logo,
    stats: {
      minutes: 90,
      goals: Math.max(1, homeScore),
      assists: 1,
      shotsTotal: 4,
      shotsOnTarget: 2,
      passesTotal: 62,
      keyPasses: 3,
      passAccuracy: 92,
      duelsWon: 5,
      duelsTotal: 8,
      tackles: 2,
      interceptions: 1,
      touches: 70
    }
  };

  return {
    fixture,
    headline: isFinished 
      ? `${home.name} ${homeScore} - ${awayScore} ${away.name}: Đại chiến kịch tính`
      : `Trực tiếp ${home.name} vs ${away.name}: Vòng đấu nảy lửa`,
    recapArticle: {
      title: `${home.name} so tài kịch tính cùng ${away.name}`,
      sapo: `Màn đọ sức giữa ${home.name} và ${away.name} mang đến 90 phút nghẹt thở với các toan tính chiến thuật đỉnh cao tại ${fixture.league.vietnameseName || fixture.league.name}.`,
      author: 'Ban Thể Thao - VnExpress',
      publishedAt: 'Hôm nay',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      leadQuote: '“Trận đấu đòi hỏi thể lực và sự tập trung cao độ đến những giây cuối cùng.”'
    },
    highlightVideo: {
      title: `Video highlight: ${home.name} vs ${away.name} (${fixture.league.vietnameseName})`,
      duration: '06:30',
      thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80'
    },
    eventsTimeline: timeline,
    lineups: {
      home: {
        team: home,
        formation: homeFormation,
        coach: { name: `HLV ${home.shortName || home.name}`, nationality: 'Châu Âu' },
        kitColor: { primary: '#9f224e', number: '#ffffff' },
        startXI: homeStartXI,
        substitutes: homeSubstitutes
      },
      away: {
        team: away,
        formation: awayFormation,
        coach: { name: `HLV ${away.shortName || away.name}`, nationality: 'Châu Âu' },
        kitColor: { primary: '#0284c7', number: '#ffffff' },
        startXI: awayStartXI,
        substitutes: awaySubstitutes
      }
    },
    stats: {
      xG: { home: xGHome, away: xGAway },
      possession: { home: possHome, away: 100 - possHome },
      totalShots: { home: Math.max(12, homeScore * 4), away: Math.max(5, awayScore * 3) },
      shotsOnTarget: { home: Math.max(4, homeScore * 2), away: Math.max(2, awayScore * 1) },
      shotsOffTarget: { home: 5, away: 2 },
      blockedShots: { home: 4, away: 2 },
      shotsInsideBox: { home: 8, away: 2 },
      totalPasses: { home: 540, away: 390 },
      passAccuracy: { home: 89, away: 79 },
      corners: { home: 6, away: 3 },
      fouls: { home: 9, away: 12 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
      saves: { home: 2, away: 3 },
      goalsPrevented: { home: 0.12, away: -0.45 }
    },
    motm: {
      player: motmCandidate,
      team: home,
      rating: 8.4,
      photo: home.logo,
      badgeText: 'CẦU THỦ XUẤT SẮC NHẤT TRẬN (MOTM)',
      headlineStat: `Đóng góp nổi bật trong chiến thắng của ${home.name}`,
      metrics: [
        { label: 'Bàn thắng', value: Math.max(1, homeScore) },
        { label: 'Độ chính xác chuyền', value: '92%' },
        { label: 'Key Passes', value: 3 },
        { label: 'Chạm bóng', value: 70 }
      ]
    },
    news: [
      {
        id: `news-${fixture.fixture.id}-1`,
        leagueId: fixture.league.id,
        title: `${home.name} ${homeScore}-${awayScore} ${away.name}: Diễn biến căng thẳng đến phút chót`,
        summary: `Cả hai đội đã cống hiến màn rượt đuổi tỷ số hấp dẫn trong khuôn khổ ${fixture.league.vietnameseName || fixture.league.name}.`,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        publishedAt: '1 giờ trước',
        category: 'Tổng thuật',
        author: 'Đỗ Tuấn',
        commentCount: 42,
        isHot: true
      },
      {
        id: `news-${fixture.fixture.id}-2`,
        leagueId: fixture.league.id,
        title: `Phân tích chuyên sâu: Điểm nhấn chiến thuật trận ${home.shortName || home.name} vs ${away.shortName || away.name}`,
        summary: `Sự linh hoạt trong sơ đồ chiến thuật đã định đoạt cục diện then chốt của cuộc đối đầu này.`,
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
        publishedAt: '2 giờ trước',
        category: 'Chiến thuật',
        author: 'Quang Dũng',
        commentCount: 28
      }
    ]
  };
}
