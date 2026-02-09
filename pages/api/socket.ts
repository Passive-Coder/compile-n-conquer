import type { NextApiRequest } from "next"
import type { Server as NetServer } from "http"
import type { Socket } from "net"
import { Server as IOServer } from "socket.io"
import type { NextApiResponse } from "next"
import { setSocketServer } from "@/lib/socket"

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io?: IOServer
    }
  }
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    })

    res.socket.server.io = io
    setSocketServer(io)

    io.on("connection", (socket) => {
      socket.emit("lobby:connected", { id: socket.id })
    })
  } else if (res.socket.server.io) {
    setSocketServer(res.socket.server.io)
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
