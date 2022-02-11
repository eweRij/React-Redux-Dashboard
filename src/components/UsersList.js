import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Button, Alert } from "react-bootstrap";

import "./UsersList.scss";

import { selectUsersData, fetchUsers } from "../features/users/usersSlice";

import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const UsersList = () => {
  const users = useSelector(selectUsersData);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [userToEdit, setUserToEdit] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleEditData = (e, user) => {
    setUserToEdit(user);
    setShow(!show);
  };
  const handleDelete = (id) => {
    setShowConfirmation(!showConfirmation);
    setIdToDelete(id);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <EditUserModal
        userToEdit={userToEdit}
        show={show}
        handleClose={handleClose}
      />
      <DeleteConfirmationModal
        idToDelete={idToDelete}
        showConfirmation={showConfirmation}
        handleCloseConfirmation={handleCloseConfirmation}
      />
      <Table responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, id) => {
              return (
                <tr key={id + user.name}>
                  <td>{user.id && user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username && user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address && user.address.city}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={(e) => {
                        handleEditData(e, user);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <Alert variant="warning">
                  List is empty. Please, add new users!
                </Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
