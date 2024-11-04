import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const AccountPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Outlet /> {/* Renders either PersonalPage or ViewOrdersHistory based on route */}
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
