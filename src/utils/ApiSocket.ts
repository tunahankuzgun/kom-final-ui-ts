import EventEmitter from "events";
import { io, Socket } from "socket.io-client";

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
}
//prettier-ignore
interface ServerToClientEvents {
  "message:status": (
    message: Prettify<ReceiveData<StatusHandlerProps>>
  ) => void;
  "message": (
    message: Prettify<ReceiveData<CommandHandlerProps>>
    ) => void;
}

class ApiSocket extends EventEmitter {
  private io: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {
    super();

    this.io = io("127.0.0.1:3333", {
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
      this.onCommandMessage(message)
    );
  }

  init() {}

  onConnect() {
    console.log("%capisocket connected", "color: green");
    // sendCheckToken();
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
