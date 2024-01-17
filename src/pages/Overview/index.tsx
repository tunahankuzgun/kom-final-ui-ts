import "./index.sass";
import { ScrollArea } from "@mantine/core";
import PageTitle from "../../components/PageTitle";

export default function Overview() {
  //   const navigate = useNavigate();

  return (
    <ScrollArea>
      <div className="Page Overview">
        <PageTitle title={"Overview"} />
        <div className="content">HELLOOO</div>
      </div>
    </ScrollArea>
  );
}
