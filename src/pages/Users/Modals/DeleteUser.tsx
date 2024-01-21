import { Button, Modal } from "@mantine/core";
import axios from "axios";
import { useCallback } from "react";
import ApiRequest from "../../../utils/ApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "../../../utils/Notify";

export default function DeleteUser() {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const handleDelete = useCallback(() => {
    try {
      const abortController = new AbortController();

      axios
        .delete(`http://64.226.68.129:3333/v1/users/${id}`, {
          signal: abortController.signal,
          headers: { ...ApiRequest.getAuthHeader() },
        })
        .then((response) => {
          console.log(response.data);
          navigate("..", { replace: true });
          Notify({
            id: "delete-user-success",
            title: "User Deleted",
            message: `User ${response.data.username} has deleted successfully.`,
            color: "lime",
            autoClose: 2000,
            icon: "success",
          });
        });
    } catch (error) {
      console.error(error);
      Notify({
        id: "delete-user-fail",
        title: "User Cannot Deleted",
        message: `User failed to delete.`,
        color: "red",
        autoClose: 2000,
        icon: "error",
      });
    }
  }, [id, navigate]);

  return (
    <Modal
      closeOnClickOutside={false}
      overlayProps={{
        blur: 0,
      }}
      title="Are You Sure?"
      opened
      onClose={() => navigate("..", { replace: true })}
      sx={(theme) => ({
        textAlign: "center",
        padding: theme.spacing.md,
      })}
    >
      Do you really want to delete the user with id: {id}?
      <div
        style={{
          paddingTop: 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => navigate("..", { replace: true })} color="gray">
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
