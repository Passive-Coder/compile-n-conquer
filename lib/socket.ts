import type { Server as IOServer } from "socket.io"

declare global {
  // eslint-disable-next-line no-var
  var __cncSocketServer: IOServer | undefined
}

export const setSocketServer = (server: IOServer) => {
  globalThis.__cncSocketServer = server
}

export const getSocketServer = () => globalThis.__cncSocketServer ?? null
