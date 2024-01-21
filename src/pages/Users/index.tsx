import "./index.sass";
import { Button, ScrollArea, Table } from "@mantine/core";
import {
  MdAdd as AddIcon,
  MdEdit as EditIcon,
  MdClose as RemoveIcon,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DeleteUser from "./Modals/DeleteUser";
import AddUser from "./Modals/AddUser";
import EditUser from "./Modals/EditUser";
import { useMediaQuery } from "@mantine/hooks";
import { Prettify } from "../../utils/ApiSocket";
import {
  sendEmergencyStopProgramRtu,
  sendEmergencyStopProgramTcp,
} from "../../app/actions/servo";
import PageTitle from "../../components/PageTitle";
import apiRequest from "../../utils/ApiRequest";
import axios from "axios";

export interface UserType {
  id?: number;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 575px)");
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchUsers() {
      try {
        await axios
          .get("http://64.226.68.129:3333/v1/users", {
            signal: abortController.signal,
            headers: { ...apiRequest.getAuthHeader() },
          })
          .then((response) => {
            setUsers(response.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, [location]);

  const rows = users.map((user: Prettify<UserType>) => (
    <tr className="TableBody" key={user.id}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.created_at}</td>
      <td>{user.updated_at}</td>
      <td>
        <Button
          onClick={() => navigate(`edit-user/${user.id}`)}
          leftIcon={<EditIcon />}
          color="lime"
        >
          Edit User
        </Button>
      </td>
      <td>
        <Button
          onClick={() => navigate(`delete-user/${user.id}`)}
          color="red"
          leftIcon={<RemoveIcon />}
        >
          Remove User
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="Page Users">
      <PageTitle
        title="Users"
        children={
          <Button
            onClick={() => {
              sendEmergencyStopProgramRtu();
              sendEmergencyStopProgramTcp();
            }}
            color="red"
          >
            EMERGENCY STOP!
          </Button>
        }
      />
      <div> Welcome to users page.</div>
      <div className="AddButton">
        <Button onClick={() => navigate("add-user")} leftIcon={<AddIcon />}>
          Add User
        </Button>
      </div>
      <ScrollArea>
        <Table captionSide="bottom" withBorder striped highlightOnHover>
          <caption
            style={
              matches
                ? { marginBottom: 15, textAlign: "left" }
                : { marginBottom: 15 }
            }
          >
            You can view, add, remove or edit users.
          </caption>
          <thead>
            <tr className="TableHead">
              <th>Id</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Edit User</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Routes>
        <Route path={`add-user`} element={<AddUser />} />
        <Route path={`edit-user/:id`} element={<EditUser />} />
        <Route path={`delete-user/:id`} element={<DeleteUser />} />
      </Routes>
    </div>
  );
}
