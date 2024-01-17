import { Outlet } from "react-router-dom";
import "./AppOutlet.sass";

import { AppShell, useMantineTheme } from "@mantine/core";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

export default function AppOutlet() {
  const theme = useMantineTheme();

  return (
    <AppShell
      layout="alt"
      styles={{
        main: {
          display: "flex",
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="xs"
      navbar={<AppNavbar />}
      footer={<AppFooter />}
      padding={0}
    >
      <div className="AppOutlet">
        <Outlet />
      </div>
    </AppShell>
  );
}
