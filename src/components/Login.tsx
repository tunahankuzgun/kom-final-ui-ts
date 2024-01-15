import "./Login.sass";

// import { sendLogin } from "../app/actions/login";

import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Login() {
  //   const alertMessage = useAppSelector((s) => s.login.alertMessage);
  //   const loading = useAppSelector((s) => s.login.loading);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      username: localStorage.getItem("username") || "",
      password: "",
      guest: localStorage.getItem("guest") === "true" || false,
    },

    validate: {
      username: (value) =>
        value.length < 2 ? "Username must have at least 2 letters" : null,
    },
    validateInputOnChange: true,
  });

  const handleLogin = (values: {
    username: string;
    password: string;
    guest: boolean;
  }) => {
    try {
      dispatch({ type: "LOGIN_LOADING" });
      //   sendLogin(values.username, values.password, values.guest);
      localStorage.setItem("username", values.username);
      localStorage.setItem("guest", String(values.guest));
    } catch (error: any) {
      form.setFieldError(
        `${error.response.data.errors[0].field}` || "username",
        error.response.data.errors[0].message
      );
    }
  };

  return (
    <div className="Login">
      {/* <div className="alert">{alertMessage}</div> */}
      <Container size={350} my={20} style={{ width: "100%" }}>
        <Paper shadow="md" mt={20} radius="md">
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <TextInput
              size="md"
              {...form.getInputProps("username")}
              label="Username"
              placeholder="Your username"
              autoFocus
            />
            <PasswordInput
              size="md"
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />

            <Button
              //   loading={loading}
              color="cyan"
              size="md"
              type="submit"
              fullWidth
              mt="xl"
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
