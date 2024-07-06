import useApi from "./baseApi";
export interface MatchResponse {
  roomId: string;
  teamId: string;
  teamName: string;
  courtNumber: number;
  allTeam: AllTeam[];
  winScore: number;
  teamLimit: number;
  winStreak: number;
}

interface AllTeam {
  member: string[];
  order: number;
}
export default function useMatchApi() {
  const api = useApi();

  async function getMatchById(matchId: string): Promise<MatchResponse> {
    const data = await api.get<MatchResponse>({ url: "team", id: matchId });
    return data;
  }
  async function getAllByRoomId(roomId: string): Promise<MatchResponse[]> {
    const data = await api.get<MatchResponse[]>({
      url: "team",
      query: {
        roomId,
      },
    });
    return data;
  }
  async function deleteTeamById(teamId: string) {
    return await api.get({ url: `deleteTeam`, id: teamId });
  }
  return {
    getMatchById,
    deleteTeamById,
    getAllByRoomId,
  };
}
