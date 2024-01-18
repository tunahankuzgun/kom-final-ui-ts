import Ws from "../../utils/ApiSocket";

const token = localStorage.getItem("token");

export function sendStartProgram() {
  Ws.send("message", {
    command: "start",
    value: {},
    accessToken: token,
  });
}

export function sendStopProgram() {
  Ws.send("message", {
    command: "stop",
    data: {},
    accessToken: token,
  });
}

export function sendSetFrequency(freq: number) {
  Ws.send("message", {
    command: "setFreq",
    value: freq,
    accessToken: token,
  });
}
