import "./index.sass";
import PageTitle from "../../components/PageTitle";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  NumberInputHandlers,
  SimpleGrid,
  Switch,
} from "@mantine/core";
import {
  sendEmergencyStopProgramRtu,
  sendEmergencyStopProgramTcp,
  sendHomingTcp,
  sendResetProgramTcp,
  sendSetClockwiseTcp,
  sendSetCounterClockwiseTcp,
  sendSetTorqueTcp,
  sendSetVelocityTcp,
  sendStartProgramTcp,
  sendStopProgramTcp,
} from "../../app/actions/servo";
import {
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Area,
  CartesianGrid,
} from "recharts";
import { useRef, useState } from "react";
import { AreaChart } from "recharts";
import {
  VscDebugStart as StartIcon,
  VscDebugStop as StopIcon,
  VscDebugRestart as ResetIcon,
  VscHome as HomeIcon,
} from "react-icons/vsc";
import { useForm } from "@mantine/form";
import { useAppSelector } from "../../app/hooks";
import GaugeComponent from "react-gauge-component";

export default function Tcp() {
  const form = useForm({
    initialValues: {
      velocity: 15,
      torque: 100,
    },
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const velocityHandlers = useRef<NumberInputHandlers>();
  const torqueHandlers = useRef<NumberInputHandlers>();

  const [confirmationModal, setConfirmationModal] = useState(false);

  const direction = useAppSelector((s) => s.tcp.tcpDirection);
  const position = useAppSelector((s) => s.tcp.tcpPosition);
  const velocity = useAppSelector((s) => s.tcp.tcpVelocity);
  const torque = useAppSelector((s) => s.tcp.tcpTorque);

  // useEffect(() => {
  //   if (data.length > 3) {
  //     setData((prev) => {
  //       prev.shift();
  //       return [...prev, { pos: position }];
  //     });
  //   } else {
  //     setData((prev) => {
  //       return [...prev, { pos: position }];
  //     });
  //   }
  //   console.log(data);
  // }, []);

  function handleChangeRotation() {
    direction === "cw" ? sendSetCounterClockwiseTcp() : sendSetClockwiseTcp();
    setConfirmationModal(false);
  }

  return (
    <div className="Page Tcp">
      <PageTitle
        title={"TCP"}
        children={
          <Button
            onClick={() => {
              sendEmergencyStopProgramRtu();
              sendEmergencyStopProgramTcp();
            }}
            color="red"
          >
            EMERGENCY STOP!
          </Button>
        }
      />
      <Modal
        closeOnClickOutside={false}
        overlayProps={{
          blur: 0,
        }}
        title="Are You Sure?"
        opened={confirmationModal}
        w="auto"
        onClose={() => setConfirmationModal(false)}
        sx={(theme) => ({
          textAlign: "center",
          padding: theme.spacing.md,
        })}
      >
        {direction === "cw"
          ? "Servo will rotate counter clockwise"
          : "Servo will rotate clockwise"}
        <div
          style={{
            paddingTop: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setConfirmationModal(false)} color="gray">
            Cancel
          </Button>
          <Button
            color="lime"
            onClick={() => {
              handleChangeRotation();
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <div className="content">
        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 1 },
            { minWidth: 700, cols: 4 },
            { minWidth: "md", cols: 4 },
          ]}
        >
          <Button
            className="button"
            color="green"
            leftIcon={<StartIcon size={30} />}
            onClick={() => sendStartProgramTcp()}
          >
            <span className="label">Start</span>
          </Button>

          <Button
            className="button"
            color="red"
            leftIcon={<StopIcon size={30} />}
            onClick={() => sendStopProgramTcp()}
          >
            <span className="label">Stop</span>
          </Button>

          <Button
            className="button"
            color="yellow"
            leftIcon={<ResetIcon size={30} />}
            onClick={() => sendResetProgramTcp()}
          >
            <span className="label">Reset</span>
          </Button>
          <Button
            className="button"
            color="blue"
            leftIcon={<HomeIcon size={30} />}
            onClick={() => sendHomingTcp()}
          >
            <span className="label">Homing</span>
          </Button>
        </SimpleGrid>
        <form
          id="rtu-form"
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-around",
              height: "104px",
            }}
          >
            <div>Velocity:</div>
            <div>Torque:</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "550px",
              marginLeft: "20px",
            }}
          >
            <Group grow mt={10} spacing={5}>
              <div style={{ display: "flex" }}>
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => velocityHandlers.current?.decrement()}
                  mr={15}
                >
                  –
                </ActionIcon>
                <NumberInput
                  size="md"
                  style={{ flex: 1 }}
                  hideControls
                  handlersRef={velocityHandlers}
                  rightSection={<span>%</span>}
                  max={100}
                  min={1}
                  step={5}
                  styles={{
                    input: { textAlign: "center" },
                    rightSection: { width: 60 },
                  }}
                  {...form.getInputProps("velocity")}
                />
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => velocityHandlers.current?.increment()}
                  ml={15}
                >
                  +
                </ActionIcon>
                <ActionIcon
                  size={42}
                  variant="outline"
                  color="green"
                  onClick={() => sendSetVelocityTcp(form.values.velocity)}
                  ml={15}
                >
                  <StartIcon size={30} />
                </ActionIcon>
              </div>
            </Group>
            <Group grow mt={10} spacing={5}>
              <div style={{ display: "flex" }}>
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => torqueHandlers.current?.decrement()}
                  mr={15}
                >
                  –
                </ActionIcon>
                <NumberInput
                  size="md"
                  hideControls
                  style={{ flex: 1 }}
                  handlersRef={torqueHandlers}
                  rightSection={<span>Nm</span>}
                  max={500}
                  min={10}
                  step={25}
                  styles={{
                    input: { textAlign: "center" },
                    rightSection: { width: 60 },
                  }}
                  {...form.getInputProps("torque")}
                />
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => torqueHandlers.current?.increment()}
                  ml={15}
                >
                  +
                </ActionIcon>
                <ActionIcon
                  size={42}
                  variant="outline"
                  color="green"
                  onClick={() => sendSetTorqueTcp(form.values.torque)}
                  ml={15}
                >
                  <StartIcon size={30} />
                </ActionIcon>
              </div>
            </Group>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              {direction === "cw"
                ? "Servo rotating clockwise"
                : "Servo rotating counter clockwise"}
              <Switch
                onClick={() => setConfirmationModal(true)}
                color="lime"
                ml={10}
                size="xl"
                checked={direction === "cw"}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 30 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>Velocity</div>
              <GaugeComponent
                key="velocity"
                id="velocity"
                arc={{
                  subArcs: [
                    {
                      limit: 200,
                      color: "#5BE12C",

                      showTick: true,
                    },
                    {
                      limit: 400,
                      color: "#F5CD19",
                      showTick: true,
                    },
                    {
                      limit: 600,
                      color: "#F58B19",
                      showTick: true,
                    },
                    {
                      limit: 1000,
                      color: "#EA4228",
                      showTick: true,
                    },
                  ],
                }}
                value={velocity}
                minValue={0}
                maxValue={1000}
                labels={{
                  valueLabel: { formatTextValue: (value) => value + "A" },
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>Torque</div>
              <GaugeComponent
                key="torque"
                id="torque"
                type="semicircle"
                pointer={{
                  color: "#345243",
                  length: 0.8,
                  width: 15,
                }}
                arc={{
                  width: 0.2,
                  padding: 0.005,
                  cornerRadius: 1,
                  subArcs: [
                    {
                      limit: -400,
                      color: "#EA4228",
                      showTick: true,
                    },
                    {
                      limit: -200,
                      color: "#F5CD19",
                      showTick: true,
                    },
                    {
                      limit: 0,
                      color: "#5BE12C",
                      showTick: true,
                    },
                    {
                      limit: 200,
                      color: "#5BE12C",
                      showTick: true,
                    },
                    {
                      limit: 400,
                      color: "#F5CD19",
                      showTick: true,
                    },
                    {
                      color: "#EA4228",
                    },
                  ],
                }}
                value={torque}
                minValue={-600}
                maxValue={600}
                labels={{
                  valueLabel: { formatTextValue: (value) => value + "N/m" },
                }}
              />
            </div>
          </div>
        </form>
        <div style={{ width: 400 }}>
          <AreaChart
            width={730}
            height={250}
            data={position}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis domain={["auto", "auto"]} label={"Pos"} />
            <ReferenceLine ifOverflow="extendDomain" y={100} />
            <ReferenceLine ifOverflow="extendDomain" y={0} stroke="red" />
            <ReferenceLine ifOverflow="extendDomain" y={-100} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pos"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
              isAnimationActive={false}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
