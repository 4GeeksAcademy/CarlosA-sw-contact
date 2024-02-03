// React
import React, { useContext } from 'react';

// Bootstrap
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Context } from "../store/appContext";

// Data

export const NavegationBar = () => {

  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar expand="md" className="bg-dark mb-3" data-bs-theme="dark">
        <Container fluid>
          <LinkContainer to="/"><Navbar.Brand>Contact List</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls="offcanvasNavbarLabel-md-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-md-md"
            aria-labelledby="offcanvasNavbarLabel-md-md"
            data-bs-theme="dark"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-md-md">
                Menú de navegación
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                <LinkContainer to="/contact"><Nav.Link>Contact List</Nav.Link></LinkContainer>
                <NavDropdown
                  title="Dropdown"
                  id="offcanvasNavbarLabel-md-md"
                  align="end"
                >
                  {Object.values(store.avaliableViews).map(view => (
                    <NavDropdown.Item key={view.link} href={view.link}>
                      {view.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}