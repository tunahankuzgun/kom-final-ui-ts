import { MdOutlineModeEditOutline as ProgramStateIcon } from "react-icons/md";
import { ThemeIcon, Menu, Button, MediaQuery, ActionIcon } from "@mantine/core";
// import { accessLevels } from "src/utils/ApiRequest";
// import Notify from "src/utils/Notify";
import { sendStartProgramRtu, sendStopProgramRtu } from "../app/actions/servo";

export default function ServoState() {
  return (
    <div>
      <Menu
        offset={20}
        position="bottom"
        withArrow
        shadow="md"
        styles={(theme) => ({
          arrow: {
            borderColor: theme.colors.lime,
          },
        })}
      >
        <Menu.Target>
          <div>
            <MediaQuery
              smallerThan="xs"
              styles={{
                display: "none",
              }}
            >
              <Button
                fullWidth
                color={"gray"}
                leftIcon={
                  <ThemeIcon color="lime" variant="filled">
                    {<ProgramStateIcon />}
                  </ThemeIcon>
                }
              >
                <div>Servo States</div>
              </Button>
            </MediaQuery>
            <MediaQuery
              largerThan="xs"
              styles={{
                display: "none",
              }}
            >
              <ActionIcon>
                <ThemeIcon color="lime" variant="filled">
                  {<ProgramStateIcon />}
                </ThemeIcon>
              </ActionIcon>
            </MediaQuery>
          </div>
        </Menu.Target>

        <Menu.Dropdown
          sx={(theme) => ({
            borderColor: theme.colors.lime,
          })}
        >
          <Menu.Item
            closeMenuOnClick={false}
            sx={(theme) => ({
              textAlign: "center",
              padding: theme.spacing.md,
              background: theme.colors.lime,
            })}
          >
            Servo in Action
          </Menu.Item>
          <Menu.Divider
            sx={(theme) => ({
              borderColor: theme.colors.lime,
            })}
          />
          <Menu.Item
            sx={(theme) => ({
              textAlign: "center",
              padding: theme.spacing.md,
            })}
            onClick={() => sendStartProgramRtu()}
          >
            Start Program
          </Menu.Item>
          <Menu.Item
            sx={(theme) => ({
              textAlign: "center",
              padding: theme.spacing.md,
            })}
            onClick={() => sendStopProgramRtu()}
          >
            Stop Program
          </Menu.Item>
          <Menu.Item
            sx={(theme) => ({
              textAlign: "center",
              padding: theme.spacing.md,
            })}
            onClick={() => {}}
          >
            Pause Program
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
