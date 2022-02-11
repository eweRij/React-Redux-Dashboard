import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal, Form } from "react-bootstrap";

import { editUser, editUserReq } from "../features/users/usersSlice";

const EditUserModal = ({ show, handleClose, userToEdit }) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    setNewUser({
      id: userToEdit.id,
      name: userToEdit.name,
      username: userToEdit.username,
      email: userToEdit.email,
      city: userToEdit.address && userToEdit.address.city,
    });
  }, [userToEdit]);

  const handleNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => {
      return {
        ...prevState,
        id: userToEdit.id,
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
      dispatch(editUser({ newUser })); //local changes

      // dispatch(editUserReq(newUser)); ---->
      //--->fake request 'put' ;'put' gives 200 resp with already existed data,-->
      // but 404 when I want to edit the user I have just created(no such an id on server)-->
      //so I decided to comment it out to avoid errors in console(I dont like it;)), but basicaly it works like it should.checked with postman

      handleClose();
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              value={newUser.name ?? ""}
              name="name"
              type="text"
              default={userToEdit.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              value={newUser.username ?? ""}
              name="username"
              type="text"
              default={userToEdit.username}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              type="email"
              value={newUser.email ?? ""}
              name="email"
              default={userToEdit.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={(e) => handleNewUser(e)}
              value={(userToEdit.address && newUser.city) ?? ""}
              name="city"
              type="text"
              default={userToEdit.address && userToEdit.address.city}
            />
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
export default EditUserModal;
