import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from "..";
import { useForm } from "@mantine/form";
import {
  Button,
  Divider,
  LoadingOverlay,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import ApiRequest from "../../../utils/ApiRequest";
import axios from "axios";
import { Prettify } from "../../../utils/ApiSocket";
import Notify from "../../../utils/Notify";

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams<string>();

  const [processing, setProcessing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
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
        (value.length < 6 && "Password must be at least 6 characters long"),
      password: (value) =>
        (!value && "Password is required") ||
        (value.length < 6 && "Password must be at least 6 characters long"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const formRef = useRef(form);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        await axios
          .get(`http://64.226.68.129:3333/v1/users/${id}`, {
            signal: abortController.signal,
            headers: { ...ApiRequest.getAuthHeader() },
          })
          .then((response) => {
            formRef.current.setFieldValue("email", response.data.email);

            setLoading(false);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn("Edit User fetch axios cancelled", error.message);
        } else {
          console.error(error);
        }
        setLoading(false);
      }
    }
    fetchUser();

    return () => {
      abortController.abort("Component unmount");
    };
  }, [id]);

  const onEditUserFormSubmit = useCallback(
    async (values: Prettify<UserType>) => {
      const abortController = new AbortController();

      setProcessing(true);

      try {
        await axios
          .patch(
            `http://64.226.68.129:3333/v1/users/${id}`,
            {
              email: values.email,
              password: values.password,
            },
            {
              signal: abortController.signal,
              headers: { ...ApiRequest.getAuthHeader() },
            }
          )
          .then((response) => {
            console.log("Edit User Successful", response.data);
            navigate(`..`);
            Notify({
              id: "edit-user-success",
              title: "User Edited",
              message: `User ${response.data.email} has edited successfully.`,
              color: "lime",
              autoClose: 3000,
              icon: "success",
            });
          })
          .catch((error) => {
            form.setFieldError(
              `${error.response.data.errors[0].field}` || "email",
              error.response.data.errors[0].message
            );
            console.error(error.response.data.errors[0].message);
            Notify({
              id: "edit-user-fail",
              title: "User Cannot Edited",
              message: `User cannot edited: ${error.response.data.errors[0].message} at ${error.response.data.errors[0].field}`,
              color: "red",
              autoClose: 3000,
              icon: "error",
            });
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn("User edit axios cancelled", error.message);
        } else {
          console.error(error);
          form.setFieldError("email", "failed to edit user");
          Notify({
            id: "edit-user-fail",
            title: "User Cannot Edited",
            message: `User cannot edited`,
            color: "red",
            autoClose: 3000,
            icon: "error",
          });
        }
      }
      setProcessing(false);

      return () => {
        abortController.abort("Component unmount");
      };
    },
    [form, id, navigate]
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
      title="Edit User"
    >
      <LoadingOverlay visible={loading} />
      <Divider />
      <>
        <form
          id="edit-user-form"
          onSubmit={form.onSubmit((values: any) =>
            onEditUserFormSubmit(values)
          )}
        >
          <TextInput
            withAsterisk
            id="edit-user-email-input"
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
              loading={processing}
              color="cyan"
              size="sm"
              type="submit"
              mt="xs"
              mb="md"
            >
              Update user
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
}
