import React from "react";
import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";

import { removeUser, removeUserReq } from "../features/users/usersSlice";

const DeleteConfirmationModal = ({
  showConfirmation,
  handleCloseConfirmation,
  idToDelete,
}) => {
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    dispatch(removeUser({ id })); //local changes

    // dispatch(removeUserReq(id));--->
    //--->fake request 'delete' ;'delete' gives 200 resp with already existed data,-->
    // but 404 when I want to delete the user I have just created(no such an id on server)-->
    //so I decided to comment it out to avoid errors in console(I dont like it;)), but basicaly it works like it should.checked with postman

    handleCloseConfirmation();
  };
  return (
    <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure to delete this user?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleCloseConfirmation} variant="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleDeleteUser(idToDelete)} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteConfirmationModal;
