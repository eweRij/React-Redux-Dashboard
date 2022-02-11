import React, { useState } from "react";

import { Container, Col, Row, Button, Card } from "react-bootstrap";

import AddUserModal from "./AddUserModal";

import UsersList from "./UsersList";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <AddUserModal show={show} handleClose={handleClose}></AddUserModal>
          <Card bg="light">
            <Card.Header>Dashboard</Card.Header>
            <Card.Body>
              <Card.Title>
                Users list
                <Button onClick={() => setShow(!show)}>Add new</Button>
              </Card.Title>
              <UsersList></UsersList>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
