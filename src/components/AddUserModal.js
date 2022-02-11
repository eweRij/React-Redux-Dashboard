import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Modal, Form } from "react-bootstrap";

import {
  selectUsersData,
  addUser,
  addUserReq,
} from "../features/users/usersSlice";

const AddUserModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsersData);

  const [validated, setValidated] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: { city: "" },
  });

  const handleNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => {
      return {
        ...prevState,
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(addUser({ newUser })); //local changes
      dispatch(addUserReq(newUser)); //fake request ;only 'post' will not give an error with new user, so I decided to not comment it out.
      handleClose();
      setNewUser({
        id: "",
        name: "",
        username: "",
        email: "",
        city: "",
      });
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              value={newUser.name}
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              type="email"
              value={newUser.email}
              name="email"
              placeholder="Enter your email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddUserModal;
