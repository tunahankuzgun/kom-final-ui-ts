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
  sendEmergencyStopProgramTcp,
  sendResetProgramRtu,
  sendSetClockwiseRtu,
  sendSetCounterClockwiseRtu,
  sendSetFrequencyRtu,
  sendStartProgramRtu,
  sendStopProgramRtu,
} from "../../app/actions/servo";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import GaugeComponent from "react-gauge-component";

export default function Rtu() {
  const form = useForm({
    initialValues: {
      frequency: 3.5,
    },
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const frequencyHandlers = useRef<NumberInputHandlers>();

  const [confirmationModal, setConfirmationModal] = useState(false);

  const direction = useAppSelector((s) => s.rtu.rtuDirection);
  const rtuCurrent = useAppSelector((s) => s.rtu.current);
  const rtuFrequency = useAppSelector((s) => s.rtu.frequency);
  const rtuTorque = useAppSelector((s) => s.rtu.torque);

  function handleChangeRotation() {
    direction === "cw"
      ? sendSetCounterClockwiseRtu()
      : direction === "ccw"
      ? sendSetClockwiseRtu()
      : console.log("idle");
    setConfirmationModal(false);
  }
  return (
    <div className="Page Rtu">
      <PageTitle
        title={"RTU"}
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
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-around",
              height: "52px",
            }}
          >
            <div>Frequency:</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
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
                disabled={direction === "idle"}
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
              <div>Current</div>
              <GaugeComponent
                key="current"
                id="current"
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
                value={rtuCurrent}
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
              <div>Frequency</div>
              <GaugeComponent
                key="frequency"
                id="frequency"
                arc={{
                  subArcs: [
                    {
                      limit: 1000,
                      color: "#5BE12C",

                      showTick: true,
                    },
                    {
                      limit: 2000,
                      color: "#F5CD19",
                      showTick: true,
                    },
                    {
                      limit: 3000,
                      color: "#F58B19",
                      showTick: true,
                    },
                    {
                      limit: 5000,
                      color: "#EA4228",
                      showTick: true,
                    },
                  ],
                }}
                value={rtuFrequency}
                minValue={0}
                maxValue={5000}
                labels={{
                  valueLabel: { formatTextValue: (value) => value + "Hz" },
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
                  // elastic: true,
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
                value={rtuTorque}
                minValue={-600}
                maxValue={600}
                labels={{
                  valueLabel: { formatTextValue: (value) => value + "N/m" },
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
