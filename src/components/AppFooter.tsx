import { useAppDispatch, useAppSelector } from "../app/hooks";
import "./AppFooter.sass";
import { Burger, Footer, MediaQuery, useMantineTheme } from "@mantine/core";
// import ServoState from "./ServoState";

export default function AppFooter() {
  const theme = useMantineTheme();
  const opened = useAppSelector((s) => s.navbar.opened);
  // const state = useAppSelector((s) => s.state.state);
  const dispatch = useAppDispatch();

  return (
    <div className="AppFooter">
      <Footer
        height={60}
        p="md"
        style={{ display: "flex", alignItems: "center" }}
      >
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() =>
              dispatch({ type: "SET_NAVBAR_OPEN", payload: !opened })
            }
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div className="footer-actions">{/* <ServoState /> */}</div>
      </Footer>
    </div>
  );
}
