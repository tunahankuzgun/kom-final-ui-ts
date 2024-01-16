import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images//ytu-logo.png";
import "./AppNavbar.sass";

import {
  ActionIcon,
  Box,
  Burger,
  Group,
  Image,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  UnstyledButtonProps,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  MdNightlight as DarkThemeIcon,
  MdLightMode as LightThemeIcon,
  MdHome as HomeIcon,
  MdPeople as UsersIcon,
} from "react-icons/md";

import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { accessLevels } from "src/utils/ApiRequest";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  opened?: boolean;
  active?: boolean;
}

function MainLink({
  icon,
  color,
  label,
  opened,
  active,
  ...rest
}: MainLinkProps &
  UnstyledButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <UnstyledButton
      mb={8}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        ...(active
          ? {
              opacity: 1,
              "&, &:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
              },
            }
          : {}),
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[0],
        },
      })}
      {...rest}
    >
      <Group>
        <ThemeIcon color={color} variant="filled">
          {icon}
        </ThemeIcon>

        {opened && <Text size="sm">{label}</Text>}
      </Group>
    </UnstyledButton>
  );
}

export default function AppNavbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(max-width: 575px)");
  //   const defaultGroup = useAppSelector((s) => s.groups.defaultGroup);

  const opened = useAppSelector((s) => s.navbar.opened);

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { pathname } = useLocation();

  //   const accessLevel = useAppSelector((s) => s.account.accessLevel);
  const onclickHandler = (path: string) => {
    navigate(path);
    dispatch({ type: "SET_NAVBAR_OPEN", payload: false });
  };

  return (
    <Navbar
      className="AppNavbar"
      p="md"
      hiddenBreakpoint="xs"
      hidden={!opened}
      width={{
        xs: opened ? 250 : 80,
      }}
      style={matches ? { width: "70%" } : undefined}
    >
      <Navbar.Section>
        <Box
          sx={(theme) => ({
            paddingBottom: `calc ${theme.spacing.md} - 5`,
            borderBottom: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          })}
        >
          <Group pt={5} position="apart">
            <Image src={logo} width="100%" style={{ maxWidth: 47 }} />
            {opened && (
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <LightThemeIcon size={18} />
                ) : (
                  <DarkThemeIcon size={18} />
                )}
              </ActionIcon>
            )}
          </Group>
        </Box>
      </Navbar.Section>

      <Navbar.Section className="NavbarSection" grow mt="md">
        <MainLink
          icon={<HomeIcon fontSize={30} />}
          color="red"
          active={pathname === "/"}
          label="Home"
          opened={opened}
          onClick={() => onclickHandler("/")}
        />
        <MainLink
          icon={<UsersIcon fontSize={30} />}
          color="grape"
          active={pathname === "/users" || pathname.startsWith("/users")}
          label="Users"
          opened={opened}
          onClick={() => onclickHandler("/users")}
        />
      </Navbar.Section>
      {/* <Navbar.Section mb={matches ? 15 : "unset"}>
        <ProfileMenu />
      </Navbar.Section> */}
      <Navbar.Section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: `calc ${theme.spacing.lg} - 5`,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Burger
          opened={opened}
          onClick={() =>
            dispatch({ type: "SET_NAVBAR_OPEN", payload: !opened })
          }
          size="sm"
          color={theme.colors.gray[6]}
        />
      </Navbar.Section>
    </Navbar>
  );
}
