import Ws from "../../utils/ApiSocket";
import Notify from "../../utils/Notify";

const token = localStorage.getItem("token");

export function sendStartProgramRtu() {
  Ws.send("message", {
    command: "start",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "start-success-rtu",
    title: "Start Program Successful",
    message: `Program started successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendStartProgramTcp() {
  Ws.send("message", {
    command: "run",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "start-success-tcp",
    title: "Start Program Successful",
    message: `Program started successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendStopProgramRtu() {
  Ws.send("message", {
    command: "stop",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "stop-success",
    title: "Stop Program Successful",
    message: `Program stopped successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendStopProgramTcp() {
  Ws.send("message", {
    command: "stop",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "stop-success-tcp",
    title: "Stop Program Successful",
    message: `Program stopped successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendResetProgramRtu() {
  Ws.send("message", {
    command: "reset",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "reset-success-rtu",
    title: "Reset Program Successful",
    message: `Program reset successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendResetProgramTcp() {
  Ws.send("message", {
    command: "reset",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "reset-success-tcp",
    title: "Reset Program Successful",
    message: `Program reset successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendReadRotationRtu() {
  Ws.send("message", {
    command: "readRotation",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "read-rotation-success-rtu",
    title: "Read Rotation Successful",
    message: `Program rotation read successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendReadRotationTcp() {
  Ws.send("message", {
    command: "readRotation",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "read-rotation-success-tcp",
    title: "Read Rotation Successful",
    message: `Program rotation read successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetClockwiseRtu() {
  Ws.send("message", {
    command: "cw",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "set-cw-success-rtu",
    title: "Set Clockwise Successful",
    message: `Servo is now rotating clockwise`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetClockwiseTcp() {
  Ws.send("message", {
    command: "cw",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "set-cw-success-tcp",
    title: "Set Clockwise Successful",
    message: `Servo is now rotating clockwise`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetCounterClockwiseRtu() {
  Ws.send("message", {
    command: "ccw",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "set-ccw-success-rtu",
    title: "Set Counter Clockwise Successful",
    message: `Servo is now rotating counter clockwise`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetCounterClockwiseTcp() {
  Ws.send("message", {
    command: "ccw",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "set-ccw-success-tcp",
    title: "Set Counter Clockwise Successful",
    message: `Servo is now rotating counter clockwise`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetTorqueRtu(torque: number) {
  Ws.send("message", {
    command: "setTorque",
    value: torque,
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "set-torque-success-rtu",
    title: "Send Torque Success",
    message: `Torque: is now ${torque} Nm`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetTorqueTcp(torque: number) {
  Ws.send("message", {
    command: "setTorque",
    value: torque,
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "set-torque-success-tcp",
    title: "Send Torque Success",
    message: `Torque: is now ${torque} Nm`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendRunProgramRtu() {
  Ws.send("message", {
    command: "run",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
}

export function sendRunProgramTcp() {
  Ws.send("message", {
    command: "run",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
}

export function sendEmergencyStopProgramRtu() {
  Ws.send("message", {
    command: "emergencyStop",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
}

export function sendEmergencyStopProgramTcp() {
  Ws.send("message", {
    command: "emergencyStop",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
}
export function sendSetVelocityRtu(velocity: number) {
  Ws.send("message", {
    command: "setVelocity",
    value: velocity,
    connectionType: "rtu",
    accessToken: token,
  });
  console.log("sendSetVelocity", velocity);
}

export function sendSetVelocityTcp(velocity: number) {
  Ws.send("message", {
    command: "setVelocity",
    value: velocity,
    connectionType: "tcp",
    accessToken: token,
  });
  console.log("sendSetVelocity", velocity);
}

export function sendSetFrequencyRtu(freq: number) {
  Ws.send("message", {
    command: "setFreq",
    value: freq * 100,
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "set-freq-success-rtu",
    title: "Send Frequency Success",
    message: `Frequency: is now ${freq} Hz`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendSetFrequencyTcp(freq: number) {
  Ws.send("message", {
    command: "setFreq",
    value: freq * 100,
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "set-freq-success-tcp",
    title: "Send Frequency Success",
    message: `Frequency: is now ${freq} Hz`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendReadCurrentRtu() {
  Ws.send("message", {
    command: "readCurrent",
    value: {},
    connectionType: "rtu",
    accessToken: token,
  });
  Notify({
    id: "read-rotation-success-rtu",
    title: "Read Rotation Successful",
    message: `Program rotation read successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendReadCurrentTcp() {
  Ws.send("message", {
    command: "readCurrent",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "read-rotation-success-tcp",
    title: "Read Rotation Successful",
    message: `Program rotation read successfully`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}

export function sendHomingTcp() {
  Ws.send("message", {
    command: "homing",
    value: {},
    connectionType: "tcp",
    accessToken: token,
  });
  Notify({
    id: "homing-success-tcp",
    title: "Homing Successful",
    message: `Homing successful`,
    color: "lime",
    autoClose: 3000,
    icon: "success",
  });
}
