import io from "socket.io-client";
import { Message } from "../domain/message";
import { useGetToken } from "../application/token/usetGetToken";
let socket;

export const initiateSocket = async () => {
  const { getToken } = useGetToken();

  socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    },
  });

  if (socket) socket.emit("join");
};
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
export const subscribeTo = (roomId: string, cb) => {
  if (!socket) return true;
  socket.on("exchanges/" + roomId, (msg) => {
    return cb(msg);
  });
};
export const sendMessage = (channel: string, message: any) => {
  if (socket) {
    socket.emit(channel, message);
  }
};
