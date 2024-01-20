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
  sendHomingTcp,
  sendResetProgramTcp,
  sendSetClockwiseTcp,
  sendSetCounterClockwiseTcp,
  sendSetFrequencyTcp,
  sendSetTorqueTcp,
  sendSetVelocityTcp,
  sendStartProgramTcp,
  sendStopProgramTcp,
} from "../../app/actions/servo";
import { XAxis, YAxis, Tooltip, ReferenceLine, Area } from "recharts";
import { useEffect, useRef, useState } from "react";
import { AreaChart } from "recharts";
import {
  VscDebugStart as StartIcon,
  VscDebugStop as StopIcon,
  VscDebugRestart as ResetIcon,
  VscHome as HomeIcon,
} from "react-icons/vsc";
import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function Tcp() {
  const form = useForm({
    initialValues: {
      frequency: 3.5,
      velocity: 15,
      torque: 100,
    },
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const frequencyHandlers = useRef<NumberInputHandlers>();
  const velocityHandlers = useRef<NumberInputHandlers>();
  const torqueHandlers = useRef<NumberInputHandlers>();

  const [confirmationModal, setConfirmationModal] = useState(false);

  const direction = useAppSelector((s) => s.servo.tcpDirection);
  const dispatch = useAppDispatch();

  const [data, setData] = useState([{ pos: 0 }]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 5) {
        setData((prev) => {
          prev.shift();
          return [...prev, { pos: Math.random() * 100 }];
        });
      } else {
        setData((prev) => {
          return [...prev, { pos: Math.random() * 100 }];
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  function handleChangeRotation() {
    direction === "cw" ? sendSetCounterClockwiseTcp() : sendSetClockwiseTcp();
    dispatch({
      type: "SET_TCP_DIRECTION",
      payload: direction === "cw" ? "ccw" : "cw",
    });
    setConfirmationModal(false);
  }

  console.log(data.length);
  return (
    <div className="Page Tcp">
      <PageTitle
        title={"TCP"}
        children={
          <Button onClick={() => sendEmergencyStopProgramRtu()} color="red">
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
              height: "155px",
            }}
          >
            <div>Frequency:</div>
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
                  onClick={() => frequencyHandlers.current?.decrement()}
                  mr={15}
                >
                  –
                </ActionIcon>
                <NumberInput
                  size="md"
                  style={{ flex: 1 }}
                  rightSection={<span>Hz</span>}
                  hideControls
                  decimalSeparator="."
                  precision={1}
                  max={50}
                  min={0}
                  handlersRef={frequencyHandlers}
                  step={5}
                  styles={{
                    input: { textAlign: "center" },
                    rightSection: { width: 60 },
                  }}
                  {...form.getInputProps("frequency")}
                />
                <ActionIcon
                  size={42}
                  variant="default"
                  onClick={() => frequencyHandlers.current?.increment()}
                  ml={15}
                >
                  +
                </ActionIcon>
                <ActionIcon
                  size={42}
                  variant="outline"
                  color="green"
                  onClick={() => sendSetFrequencyTcp(form.values.frequency)}
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
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 400 }}>
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis domain={["auto", "auto"]} label={"Pos"} />
                <ReferenceLine ifOverflow="extendDomain" y={0} stroke="red" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="pos"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "350px",
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
        </form>
      </div>
    </div>
  );
}
