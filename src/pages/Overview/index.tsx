import "./index.sass";
import { Button, ScrollArea } from "@mantine/core";
import PageTitle from "../../components/PageTitle";

export default function Overview() {
  //   const navigate = useNavigate();

  function handleLogin() {
    // axios.post();
    return 0;
  }
  return (
    <ScrollArea>
      <div className="Page Overview">
        <PageTitle title={"Overview"} />
        <div className="content">HELLOOO</div>
        <Button onClick={() => handleLogin()}></Button>
      </div>
    </ScrollArea>
  );
}
