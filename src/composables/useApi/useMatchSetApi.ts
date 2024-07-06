import useApi from "./baseApi";
export interface MatchSetModelResponse {
  roomId: string;
  setId: string;
  teamName: string;
  courtNumber: number;
  allTeam: AllTeam[];
  winScore: number;
  teamLimit: number;
  winStreak: number;
}

interface AllTeam {
  order: number;
  set: Set[];
  _id: string;
}

interface Set {
  member: string[];
  order: number;
}

export default function useMatchSetApi() {
  const api = useApi();
  async function getSetById(setId: string): Promise<MatchSetModelResponse> {
    const data = await api.get<MatchSetModelResponse>({
      url: "set",
      id: setId,
    });
    return data;
  }

  async function getAllByRoomId(
    roomId: string
  ): Promise<MatchSetModelResponse[]> {
    const data = await api.get<MatchSetModelResponse[]>({
      url: "set",
      query: {
        roomId,
      },
    });
    return data;
  }

  async function deleteSetById(setId: string) {
    return await api.get({ url: `deleteSet`, id: setId });
  }
  return {
    getSetById,
    deleteSetById,
    getAllByRoomId,
  };
}
