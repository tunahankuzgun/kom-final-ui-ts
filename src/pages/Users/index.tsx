import { Button } from "@mantine/core";
import PageTitle from "../../components/PageTitle";
import { sendEmergencyStopProgramRtu } from "../../app/actions/servo";

export default function Users() {
  return (
    <div className="Page Users">
      <PageTitle
        title="Users"
        children={
          <Button onClick={() => sendEmergencyStopProgramRtu()} color="red">
            EMERGENCY STOP!
          </Button>
        }
      ></PageTitle>
    </div>
  );
}
