import "./Login.sass";
import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../app/hooks";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/images/yildiz-logo.png";

export default function Login() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: localStorage.getItem("email") || "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    validateInputOnChange: true,
  });

  const handleLogin = (values: { email: string; password: string }) => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      axios
        .post(
          "http://localhost:3333/v1/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            signal: abortController.signal,
            // headers: { ...ApiRequest.getAuthHeader() },
          }
        )
        .then((response) => {
          form.reset();
          console.log("Login Successful", response.data);
          dispatch({ type: "SET_APP_AUTHORIZED" });
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("token", response.data.accessToken.token);
          // Notify({
          //   id: "add-user-success",
          //   title: "User Added",
          //   message: `User ${response.data.user.username} has been created`,
          //   color: "lime",
          //   autoClose: 3000,
          //   icon: "success",
          // });

          setLoading(false);
        })
        .catch((error) => {
          // form.setFieldError(
          //   `${error.response.data.errors[0].field}` || "email",
          //   error.response.data.errors[0].message
          // );
          console.error(error);
          // Notify({
          //   id: "add-user-fail",
          //   title: "User Cannot Added",
          //   message: `User failed to create: ${error.response.data.errors[0].message} at ${error.response.data.errors[0].field}`,
          //   color: "red",
          //   autoClose: 3000,
          //   icon: "error",
          // });
          setLoading(false);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("User add axios cancelled", error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="Login">
      <Image width={500} fit="contain" src={logo} />
      <Container size={350} my={20} style={{ width: "100%" }}>
        <Paper shadow="md" mt={20} radius="md">
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <TextInput
              size="md"
              {...form.getInputProps("email")}
              label="Email"
              placeholder="Your email"
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
              loading={loading}
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
