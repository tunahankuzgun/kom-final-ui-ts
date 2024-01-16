import { useState } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.sass";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
// import Status from "src/pages/Status";
import { Notifications } from "@mantine/notifications";
import AppOutlet from "./AppOutlet";

import Ws from "../utils/ApiSocket";
import Overview from "../pages/Overview";
import Login from "./Login";
import Error from "../pages/Error";
import Users from "../pages/Users";

Ws.init();

const router = createHashRouter([
  {
    path: "/",
    element: <AppOutlet />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "users/*",
        element: <Users />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default function App() {
  const authorized = true;
  // const machineConnected = useAppSelector((s) => s.app.machineConnected);
  // const apiConnected = useAppSelector((s) => s.app.apiConnected);
  // const loading = useAppSelector((s) => s.app.loading);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, loader: "bars" }}
          withGlobalStyles
          withNormalizeCSS
        >
          {authorized ? (
            <>
              {/* <LoadingOverlay
                transitionDuration={500}
                visible={(!machineConnected || !apiConnected) && loading}
                overlayBlur={2}
              /> */}
              <RouterProvider router={router} />
            </>
          ) : (
            <Login />
          )}
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
