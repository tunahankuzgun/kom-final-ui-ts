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
import Notify from "../utils/Notify";
import apiRequest from "../utils/ApiRequest";

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
          "http://64.226.68.129:3333/v1/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            signal: abortController.signal,
          }
        )
        .then((response) => {
          console.log("Login Successful", response.data);

          dispatch({ type: "SET_APP_AUTHORIZED" });

          localStorage.setItem("email", response.data.user.email);
          apiRequest.setToken(response.data.accessToken.token);

          Notify({
            id: "login-success",
            title: "Login Successful",
            message: `Logged in as ${response.data.user.email} successfully.`,
            color: "lime",
            autoClose: 3000,
            icon: "success",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          Notify({
            id: "login-fail",
            title: "Login Failed",
            message: `Failed to login.`,
            color: "red",
            autoClose: 3000,
            icon: "error",
          });
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
