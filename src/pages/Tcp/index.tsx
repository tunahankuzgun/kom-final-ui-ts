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
import { sendEmergencyStopProgramRtu } from "../../app/actions/servo";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Speedometer from "../../components/Speedometer";

export default function Tcp() {
  //continously create random data
  const [data, setData] = useState(0);
  setInterval(() => {
    const data = Math.floor(Math.random() * 100);
    setData(data);
    // console.log(data);
  }, 1000);

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
      <div className="value chart">
        <Speedometer id="gauge-chart-1" value={data} maxValue={10} />
      </div>
    </div>
  );
}
