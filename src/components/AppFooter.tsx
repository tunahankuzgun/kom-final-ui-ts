import { useAppDispatch, useAppSelector } from "../app/hooks";
import "./AppFooter.sass";
import { Burger, Footer, MediaQuery, useMantineTheme } from "@mantine/core";
import ServoState from "./ServoState";

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
        <div className="footer-actions">
          <ServoState />
          {/* <MachineMode />
          <MachineState />
          <ProgramState />
          <IPCamera />
          <Notification /> */}
          {/* <Tooltip
            withArrow
            arrowPosition="center"
            position="top-end"
            label={STATE_LABELS.STATES[state]}
          >
            <AnimatedIcon
              isPaused={state === MSTATE.Paused}
              isStopped={state !== MSTATE.Running && state !== MSTATE.Paused}
              running={state === MSTATE.Running}
              options={{
                animationData,
                autoplay: state === MSTATE.Running,
              }}
              isClickToPauseDisabled={true}
              speed={1}
              width={30}
              height={30}
              style={{ margin: 0 }}
            />
          </Tooltip> */}
        </div>
      </Footer>
    </div>
  );
}
