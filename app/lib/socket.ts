import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export const socket: Socket = io(`${SOCKET_URL}/events`, {
  autoConnect: false,
  transports: ['websocket'],
});

/**
 * Hook ou helper para gerenciar a conexão WebSocket.
 */
export const connectWebSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectWebSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
