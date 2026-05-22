import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_BASEURTL || 'http://localhost:8080', {
  autoConnect: false,
});
