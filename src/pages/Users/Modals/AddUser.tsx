import {
  Button,
  Divider,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { UserType } from "..";
import { useCallback, useState } from "react";
import axios from "axios";
import { Prettify } from "../../../utils/ApiSocket";
import apiRequest from "../../../utils/ApiRequest";
import Notify from "../../../utils/Notify";

export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form: any = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: {
      email: (value) =>
        (!value && "Email is required") ||
        (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        (!value && "Password is required") ||
        (value.length < 6 && "Password must be at least 6 characters long"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const onAddUserFormSubmit = useCallback(
    (values: Prettify<UserType>) => {
      const abortController = new AbortController();

      try {
        setLoading(true);
        axios
          .post(
            "http://64.226.68.129:3333/v1/register",
            {
              email: values.email,
              password: values.password,
            },
            {
              signal: abortController.signal,
              headers: { ...apiRequest.getAuthHeader() },
            }
          )
          .then((response) => {
            form.reset();
            console.log("Add User Successful", response.data.user);

            Notify({
              id: "add-user-success",
              title: "User Added",
              message: `User ${response.data.user.email} has been created`,
              color: "lime",
              autoClose: 3000,
              icon: "success",
            });
            navigate("..", { replace: true });
            setLoading(false);
          })
          .catch((error) => {
            form.setFieldError(
              `${error.response.data.errors[0].field}` || "email",
              error.response.data.errors[0].message
            );
            console.error(error.response.data.errors[0]);
            Notify({
              id: "add-user-fail",
              title: "User Cannot Added",
              message: `User failed to create: ${error.response.data.errors[0].message} at ${error.response.data.errors[0].field}`,
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
    },
    [form, navigate]
  );
  return (
    <Modal
      closeOnClickOutside={false}
      overlayProps={{
        blur: 0,
      }}
      opened={true}
      onClose={() =>
        navigate("..", {
          replace: true,
        })
      }
      title="Add User"
    >
      <Divider />
      <>
        <form
          id="add-user-form"
          onSubmit={form.onSubmit((values: Prettify<UserType>) =>
            onAddUserFormSubmit(values)
          )}
        >
          <TextInput
            withAsterisk
            id="add-user-email-input"
            size="md"
            label="Email"
            placeholder="Enter your users email"
            mt="md"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk
            id="add-user-password-input"
            label="Password"
            size="md"
            placeholder="Password"
            mt="md"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            withAsterisk
            id="add-user-confirm-password-input"
            label="Confirm password"
            size="md"
            placeholder="Confirm password"
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <div
            style={{
              paddingTop: 30,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                navigate("..", { replace: true });
              }}
              color="gray"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              color="cyan"
              size="sm"
              type="submit"
              mt="xs"
              mb="md"
            >
              Create new user
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
}
