import {
  Button,
  Group,
  Image,
  Menu,
  Modal,
  Paper,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import "./ProfileMenu.sass";
import {
  MdPerson as PrfileIcon,
  MdLogout as LogoutIcon,
  MdSettings as SettingsIcon,
} from "react-icons/md";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images//yildiz-logo.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function ProfileMenu() {
  const [logoutModal, setLogoutModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const opened = useAppSelector((s) => s.navbar.opened);
  const email = localStorage.getItem("email");
  // const username = useAppSelector((s) => s.account.username);
  // const apiVersion = useAppSelector((s) => s.about.apiVersion);
  const matches = useMediaQuery("(max-width: 575px)");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const date = new Date();

  const handleLogout = () => {
    console.log("Logout Successful");
    localStorage.removeItem("token");

    dispatch({ type: "RESET_APP_AUTHORIZED" });
  };
  return (
    <>
      <Modal
        closeOnClickOutside={false}
        overlayProps={{
          blur: 0,
        }}
        title="Are You Sure?"
        opened={logoutModal}
        w="auto"
        onClose={() => setLogoutModal(false)}
        sx={(theme) => ({
          textAlign: "center",
          padding: theme.spacing.md,
        })}
      >
        Do you really want to log out?
        <div
          style={{
            paddingTop: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setLogoutModal(false)} color="gray">
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </Button>
        </div>
      </Modal>
      <Modal
        closeOnClickOutside={false}
        overlayProps={{
          blur: 0,
        }}
        title="About"
        opened={aboutModal}
        onClose={() => setAboutModal(false)}
        ml={-15}
        sx={(theme) => ({
          padding: theme.spacing.md,
        })}
      >
        <Image
          alt="lynca-logo"
          height={230}
          width="100%"
          src={logo}
          placeholder={<Text>Lynca Logo</Text>}
        />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20 }}>Bilko Web Client</div>
          {/* <Paper radius="lg" p="lg">
            <div style={{ fontSize: 15 }}>UI Version {uiVersion}</div>
            <div style={{ fontSize: 15 }}>API Version {apiVersion}</div>
          </Paper> */}
          <Paper radius="lg" p="md">
            <div style={{ fontSize: 15, textAlign: "center" }}>
              Bilko Bilgisayar Otomasyon ve Kontrol A.Ş.
            </div>
            <div style={{ fontSize: 15 }}>
              Copyright © {date.getFullYear()}. All rights reserved.
            </div>
            <div style={{ fontSize: 15 }}>www.bilko-automation.com</div>
          </Paper>
        </div>
      </Modal>
      <div className="ProfileMenu">
        <Menu
          offset={20}
          position={matches ? "top" : "right-end"}
          withArrow
          shadow="md"
        >
          <Menu.Target>
            <UnstyledButton
              mb={8}
              sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Group>
                <ThemeIcon color="cyan" variant="filled">
                  <PrfileIcon className="Icon" />
                </ThemeIcon>

                {opened && <Text size="sm">Profile Settings</Text>}
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              closeMenuOnClick={false}
              sx={(theme) => ({
                padding: theme.spacing.md,
                width: 200,
              })}
            >
              Hello, "{email}"
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              closeMenuOnClick={false}
              sx={(theme) => ({
                padding: theme.spacing.md,
                width: 200,
              })}
              onClick={() => setAboutModal(true)}
            >
              About
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="blue"
              sx={(theme) => ({
                padding: theme.spacing.md,
                width: 200,
              })}
              onClick={() => navigate("/settings")}
            >
              <div style={{ display: "flex" }}>
                Settings
                <span className="commons flex-spacer" />
                <SettingsIcon />
              </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              closeMenuOnClick={false}
              sx={(theme) => ({
                padding: theme.spacing.md,
                width: 200,
              })}
              onClick={() => setLogoutModal(true)}
            >
              <div style={{ display: "flex" }}>
                Log Out
                <span className="commons flex-spacer" />
                <LogoutIcon />
              </div>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
}
