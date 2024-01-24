import EventEmitter from "events";
import { io, Socket } from "socket.io-client";
import { store } from "../app/store";

export interface SocketData {
  command: string;
  params?: any;
  data?: any;
  status?: "success" | "error";
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface EmitData<T> extends SocketData {
  params: T;
}

export interface ReceiveData<T> extends SocketData {
  data: T;
  token: string;
  token_api: string;
  status: "success" | "error";
}

interface StatusHandlerProps {
  [command: string]: {
    success: (message: Prettify<ReceiveData<any>>) => void;
    error: (message: Prettify<ReceiveData<any>>) => void;
  };
}

interface CommandHandlerProps {
  [command: string]: {
    success: (message: Prettify<ReceiveData<any>>) => void;
    error: (message: Prettify<ReceiveData<any>>) => void;
  };
}

//prettier-ignore
interface ClientToServerEvents {
  "message": (message: Prettify<SocketData>) => void;
  "request": (message: Prettify<SocketData>) => void;
}
//prettier-ignore
interface ServerToClientEvents {
  "message:status": (
    message: Prettify<ReceiveData<StatusHandlerProps>>
  ) => void;
  "message": (
    message: Prettify<ReceiveData<CommandHandlerProps>>
    ) => void;
    "request": (
      message: Prettify<ReceiveData<CommandHandlerProps>>
      ) => void;
}

class ApiSocket extends EventEmitter {
  private io: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {
    super();

    this.io = io("http://172.30.16.42:3333/", {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 1e6,
    });

    this.io.on("connect", () => this.onConnect());
    this.io.on("disconnect", (reason: string) => this.onDisconnect(reason));
    this.io.on("message:status", (message: Prettify<ReceiveData<any>>) =>
      this.onStatusMessage(message)
    );
    this.io.on("message", (message: Prettify<ReceiveData<any>>) =>
      // this.onCommandMessage(message)
      JSON.parse(message.data).type === "rtu"
        ? this.onRtuConnectionStatus(message)
        : this.onTcpConnectionStatus(message)
    );
  }

  init() {}

  onConnect() {
    console.log("%capisocket connected", "color: green");
    // sendCheckToken();
  }

  onTcpConnectionStatus(message: Prettify<ReceiveData<any>>) {
    this.tcpHandler(JSON.parse(message.data));
  }
  onRtuConnectionStatus(message: Prettify<ReceiveData<any>>) {
    this.rtuHandler(JSON.parse(message.data));
  }

  tcpHandler(message: any) {
    store.getState().tcp.tcpPosition.length < 10
      ? store.dispatch({
          type: "SET_TCP_POSITION",
          payload: [
            ...store.getState().tcp.tcpPosition,
            message.values.position,
          ],
        })
      : store.dispatch({
          type: "SET_TCP_POSITION",
          payload: [
            ...store.getState().tcp.tcpPosition.slice(1),
            message.values.position,
          ],
        });

    // console.log(message);
    store.dispatch({
      type: "SET_TCP_DIRECTION",
      payload:
        message.values.rotation === 1
          ? "cw"
          : message.values.rotation === 0
          ? "ccw"
          : "unnown",
    });
    store.dispatch({
      type: "SET_TCP_ERROR",
      payload: message.values.error,
    });

    store.dispatch({
      type: "SET_TCP_TORQUE",
      payload: message.values.torque,
    });
    store.dispatch({
      type: "SET_TCP_VELOCITY",
      payload: message.values.velocity,
    });
  }

  rtuHandler(message: any) {
    // console.log(message);
    store.dispatch({
      type: "SET_RTU_DIRECTION",
      payload:
        message.values.rotation === 0
          ? "idle"
          : message.values.rotation === 1
          ? "cw"
          : "ccw",
    });
    store.dispatch({
      type: "SET_RTU_CURRENT",
      payload: message.values.current,
    });
    store.dispatch({
      type: "SET_RTU_FREQUENCY",
      payload: message.values.outFreq,
    });
    store.dispatch({
      type: "SET_RTU_TORQUE",
      payload: message.values.torque,
    });
  }

  onDisconnect(reason: string) {
    console.warn("apisocket disconnected", reason);
  }

  onStatusMessage(message: Prettify<ReceiveData<any>>) {
    try {
      this.statusHandler[message.command][message.status!](message);
    } catch (error) {
      console.error(error);
    }
  }

  onCommandMessage(message: Prettify<ReceiveData<any>>) {
    try {
      this.commandHandler[message.command][message.status!](message);
      console.log(message);
    } catch (error) {
      console.error(message.command, error, message);
    }
  }

  send(event: any, message: any) {
    return this.io.emit(event, {
      message,
    });
  }

  statusHandler: StatusHandlerProps = {
    tcp_connection: {
      success: () => {},
      error: () => {},
    },
  };

  commandHandler: Prettify<CommandHandlerProps> = {
    login: {
      success: (message: Prettify<ReceiveData<any>>) => {},
      error: (message: Prettify<ReceiveData<any>>) => {},
    },
  };
}

const Ws = new ApiSocket();

export default Ws;
