export default function (baseUrl: string) {
  const controller = "room";
  async function createRoom(payload: {
    roomName: string;
    description: string;
  }) {
    const data = await fetch(`${baseUrl}/${controller}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
    }).then((e) => e.json());
    return data;
  }
  async function getRoomById(roomId: string) {
    const data = await fetch(`${baseUrl}/${controller}/${roomId}`).then((e) =>
      e.json()
    );
    return data;
  }
  async function getAllRoom() {
    const data = await fetch("https://bad-boy-service.vercel.app/room").then(
      (e) => e.json()
    );
    return data;
  }
  return {
    createRoom,
    getRoomById,
    getAllRoom,
  };
}
