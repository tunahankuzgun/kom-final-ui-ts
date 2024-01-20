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
  VscDebugStart as StartIcon,
  VscDebugStop as StopIcon,
  VscDebugRestart as ResetIcon,
} from "react-icons/vsc";
import {
  sendEmergencyStopProgramRtu,
  sendResetProgramRtu,
  sendSetClockwiseRtu,
  sendSetCounterClockwiseRtu,
  sendSetFrequencyRtu,
  sendSetTorqueRtu,
  sendSetVelocityRtu,
  sendStartProgramRtu,
  sendStopProgramRtu,
} from "../../app/actions/servo";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GaugeComponent from "react-gauge-component";

export default function Rtu() {
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

  const direction = useAppSelector((s) => s.servo.rtuDirection);
  const dispatch = useAppDispatch();

  function handleChangeRotation() {
    direction === "cw" ? sendSetCounterClockwiseRtu() : sendSetClockwiseRtu();
    dispatch({
      type: "SET_RTU_DIRECTION",
      payload: direction === "cw" ? "ccw" : "cw",
    });
    setConfirmationModal(false);
  }
  return (
    <div className="Page Rtu">
      <PageTitle
        title={"RTU"}
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
            { minWidth: 700, cols: 3 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          <Button
            className="button"
            color="green"
            leftIcon={<StartIcon size={30} />}
            onClick={() => sendStartProgramRtu()}
          >
            <span className="label">Start</span>
          </Button>

          <Button
            className="button"
            color="red"
            leftIcon={<StopIcon size={30} />}
            onClick={() => sendStopProgramRtu()}
          >
            <span className="label">Stop</span>
          </Button>

          <Button
            className="button"
            color="blue"
            leftIcon={<ResetIcon size={30} />}
            onClick={() => sendResetProgramRtu()}
          >
            <span className="label">Reset</span>
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
                  onClick={() => sendSetFrequencyRtu(form.values.frequency)}
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
                  onClick={() => sendSetVelocityRtu(form.values.velocity)}
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
                  onClick={() => sendSetTorqueRtu(form.values.torque)}
                  ml={15}
                >
                  <StartIcon size={30} />
                </ActionIcon>
              </div>
            </Group>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 400 }}>
              <GaugeComponent
                arc={{
                  subArcs: [
                    {
                      limit: 20,
                      color: "#5BE12C",

                      showTick: true,
                    },
                    {
                      limit: 40,
                      color: "#F5CD19",
                      showTick: true,
                    },
                    {
                      limit: 60,
                      color: "#F58B19",
                      showTick: true,
                    },
                    {
                      limit: 100,
                      color: "#EA4228",
                      showTick: true,
                    },
                  ],
                }}
                value={50}
              />
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
