import useApi from "./baseApi";
import useMatchApi from "./useMatchApi";
import useMatchSetApi from "./useMatchSetApi";

interface RoomInsertModel {
  roomName: string;
  allTeam: [];
  teamLimit: number;
  winScore: number;
  winStreak: number;
  courtNumber: number;
}
export default function useRoomApi() {
  const api = useApi();
  const controller = "room";
  async function createRoom(payload: {
    roomName: string;
    description: string;
  }) {
    const data = await api.post<{ id: string }>({ url: controller, payload });
    return data;
  }
  async function getRoomById(roomId: string) {
    const data = await api.get({ url: `${controller}`, id: roomId });
    return data;
  }
  async function getAllRoom() {
    const data = await api.get({
      url: controller,
    });
    return data;
  }
  async function getAllMatchAndMatchSetInRoom(roomId: string) {
    const { getAllByRoomId: match } = useMatchApi();
    const { getAllByRoomId: set } = useMatchSetApi();

    const matchResult = await match(roomId);
    const setResult = await set(roomId);
    return { match: matchResult, set: setResult };
  }
  async function deleteRoomById(roomid: string) {
    const data = await api.get({
      url: "deleteRoom",
      id: roomid,
    });
    return data;
  }
  return {
    createRoom,
    getRoomById,
    getAllMatchAndMatchSetInRoom,
    getAllRoom,
    deleteRoomById,
  };
}
