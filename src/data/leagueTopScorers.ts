export interface TopScorerItem {
  rank: number;
  name: string;
  photo: string;
  clubName: string;
  clubLogo: string;
  goals: number;
  assists?: number;
  penalties?: number;
  matches?: number;
}

export const LEAGUE_TOP_SCORERS: Record<number, TopScorerItem[]> = {
  // Ngoại Hạng Anh (Premier League - ID 39)
  39: [
    {
      rank: 1,
      name: "Erling Haaland",
      photo: "https://media.api-sports.io/football/players/1100.png",
      clubName: "Man City",
      clubLogo: "https://is.vnecdn.net/objects/teams/50.png?v=1",
      goals: 10,
      assists: 1,
      penalties: 1,
      matches: 6
    },
    {
      rank: 2,
      name: "Cole Palmer",
      photo: "https://media.api-sports.io/football/players/152982.png",
      clubName: "Chelsea",
      clubLogo: "https://is.vnecdn.net/objects/teams/49.png?v=1",
      goals: 6,
      assists: 4,
      penalties: 2,
      matches: 6
    },
    {
      rank: 3,
      name: "Mohamed Salah",
      photo: "https://media.api-sports.io/football/players/306.png",
      clubName: "Liverpool",
      clubLogo: "https://is.vnecdn.net/objects/teams/40.png?v=1",
      goals: 5,
      assists: 4,
      penalties: 1,
      matches: 6
    },
    {
      rank: 4,
      name: "Bukayo Saka",
      photo: "https://media.api-sports.io/football/players/1460.png",
      clubName: "Arsenal",
      clubLogo: "https://is.vnecdn.net/objects/teams/42.png?v=1",
      goals: 4,
      assists: 5,
      penalties: 0,
      matches: 6
    },
    {
      rank: 5,
      name: "Rasmus Højlund",
      photo: "https://media.api-sports.io/football/players/152982.png",
      clubName: "Man Utd",
      clubLogo: "https://is.vnecdn.net/objects/teams/33.png?v=1",
      goals: 4,
      assists: 1,
      penalties: 0,
      matches: 5
    }
  ],

  // V-League (ID 340)
  340: [
    {
      rank: 1,
      name: "Rafaelson (Nguyễn Xuân Son)",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      clubName: "Nam Định",
      clubLogo: "https://is.vnecdn.net/objects/teams/1283.png?v=1",
      goals: 7,
      assists: 2,
      penalties: 1,
      matches: 5
    },
    {
      rank: 2,
      name: "Léo Artur",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      clubName: "CAHN",
      clubLogo: "https://is.vnecdn.net/objects/teams/13813.png?v=1",
      goals: 5,
      assists: 3,
      penalties: 0,
      matches: 5
    },
    {
      rank: 3,
      name: "Nguyễn Tiến Linh",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      clubName: "Bình Dương",
      clubLogo: "https://is.vnecdn.net/objects/teams/1281.png?v=1",
      goals: 4,
      assists: 1,
      penalties: 1,
      matches: 5
    },
    {
      rank: 4,
      name: "Nguyễn Quang Hải",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      clubName: "CAHN",
      clubLogo: "https://is.vnecdn.net/objects/teams/13813.png?v=1",
      goals: 3,
      assists: 3,
      penalties: 0,
      matches: 5
    }
  ],

  // La Liga (ID 140)
  140: [
    {
      rank: 1,
      name: "Robert Lewandowski",
      photo: "https://media.api-sports.io/football/players/521.png",
      clubName: "Barcelona",
      clubLogo: "https://is.vnecdn.net/objects/teams/529.png?v=1",
      goals: 7,
      assists: 2,
      penalties: 1,
      matches: 7
    },
    {
      rank: 2,
      name: "Kylian Mbappé",
      photo: "https://media.api-sports.io/football/players/278.png",
      clubName: "Real Madrid",
      clubLogo: "https://is.vnecdn.net/objects/teams/541.png?v=1",
      goals: 6,
      assists: 1,
      penalties: 2,
      matches: 7
    },
    {
      rank: 3,
      name: "Raphinha",
      photo: "https://media.api-sports.io/football/players/247.png",
      clubName: "Barcelona",
      clubLogo: "https://is.vnecdn.net/objects/teams/529.png?v=1",
      goals: 5,
      assists: 3,
      penalties: 0,
      matches: 7
    },
    {
      rank: 4,
      name: "Vinícius Júnior",
      photo: "https://media.api-sports.io/football/players/754.png",
      clubName: "Real Madrid",
      clubLogo: "https://is.vnecdn.net/objects/teams/541.png?v=1",
      goals: 4,
      assists: 4,
      penalties: 1,
      matches: 7
    }
  ],

  // Cúp C1 Champions League (ID 2)
  2: [
    {
      rank: 1,
      name: "Harry Kane",
      photo: "https://media.api-sports.io/football/players/184.png",
      clubName: "Bayern Munich",
      clubLogo: "https://is.vnecdn.net/objects/teams/157.png?v=1",
      goals: 5,
      assists: 1,
      penalties: 3,
      matches: 2
    },
    {
      rank: 2,
      name: "Erling Haaland",
      photo: "https://media.api-sports.io/football/players/1100.png",
      clubName: "Man City",
      clubLogo: "https://is.vnecdn.net/objects/teams/50.png?v=1",
      goals: 4,
      assists: 0,
      penalties: 0,
      matches: 2
    },
    {
      rank: 3,
      name: "Kylian Mbappé",
      photo: "https://media.api-sports.io/football/players/278.png",
      clubName: "Real Madrid",
      clubLogo: "https://is.vnecdn.net/objects/teams/541.png?v=1",
      goals: 3,
      assists: 1,
      penalties: 1,
      matches: 2
    }
  ]
};

export function getLeagueTopScorers(leagueId: number): TopScorerItem[] {
  return LEAGUE_TOP_SCORERS[leagueId] || LEAGUE_TOP_SCORERS[39];
}
