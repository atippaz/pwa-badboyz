import roomApi from "./useRoomApi";
const baseUrl = import.meta.env.VITE_API_URL;
export const useRoomApi = () => roomApi(baseUrl);
