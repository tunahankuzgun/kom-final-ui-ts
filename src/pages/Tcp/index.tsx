import "./index.sass";
import PageTitle from "../../components/PageTitle";
import { Button, SimpleGrid } from "@mantine/core";
import {
  VscDebugStart as StartIcon,
  VscDebugStop as StopIcon,
  VscDebugRestart as ResetIcon,
} from "react-icons/vsc";
import {
  sendSetFrequency,
  sendStartProgram,
  sendStopProgram,
} from "../../app/actions/servo";

export default function Tcp() {
  return (
    <div className="Page Tcp">
      <PageTitle title={"TCP"} />
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
            onClick={() => sendStartProgram()}
          >
            <span className="label">Start</span>
          </Button>

          <Button
            className="button"
            color="red"
            leftIcon={<StopIcon size={30} />}
            onClick={() => sendStopProgram()}
          >
            <span className="label">Stop</span>
          </Button>

          <Button
            className="button"
            color="blue"
            leftIcon={<ResetIcon size={30} />}
            onClick={() => sendSetFrequency(1000)}
          >
            <span className="label">Reset</span>
          </Button>
        </SimpleGrid>
      </div>
    </div>
  );
}
