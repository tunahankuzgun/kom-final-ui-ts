import "./index.sass";
import { Button, ScrollArea, SimpleGrid } from "@mantine/core";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCastConnected as RtuIcon,
  MdOutlineConnectedTv as TcpIcon,
  MdPeople as UsersIcon,
} from "react-icons/md";
import { sendEmergencyStopProgramRtu } from "../../app/actions/servo";

export default function Overview() {
  const navigate = useNavigate();

  return (
    <ScrollArea>
      <div className="Page Overview">
        <PageTitle
          title={"Overview"}
          children={
            <Button onClick={() => sendEmergencyStopProgramRtu()} color="red">
              EMERGENCY STOP!
            </Button>
          }
        />
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
              leftIcon={<RtuIcon size={30} />}
              color="blue"
              onClick={() => navigate("/rtu")}
            >
              <span className="label">RTU</span>
            </Button>

            <Button
              className="button"
              leftIcon={<TcpIcon size={30} />}
              color="teal"
              onClick={() => navigate("/tcp")}
            >
              <span className="label">TCP</span>
            </Button>

            <Button
              className="button"
              leftIcon={<UsersIcon size={30} />}
              color="grape"
              onClick={() => navigate("/users")}
            >
              <span className="label">Users</span>
            </Button>
          </SimpleGrid>
        </div>
      </div>
    </ScrollArea>
  );
}
