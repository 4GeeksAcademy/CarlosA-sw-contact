import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

export const NavegationBar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Utiliza el contexto para obtener los favoritos
    setFavorites(store.favorites || []);
  }, [store.favorites]);

  const handleNavigate = () => {
    // Estoy en ello vale? no me presiones 😭
    // Este codigo va a acabar con mi vida, que liada estoy montando, madre del amor hermoso.
  }

  const removeFromFavorites = (name) => {
    console.log('Removing from favorites:', name);
    actions.removeFavorite(name);
  };

  return (
    <>
      <Navbar expand="md" className="bg-dark mb-3" data-bs-theme="dark">
        <Container fluid>
          <LinkContainer to="/"><Navbar.Brand>StarWars - Contact List</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls="offcanvasNavbarLabel-md-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-md-md"
            aria-labelledby="offcanvasNavbarLabel-md-md"
            data-bs-theme="dark"
            placement="end"
            key="offcanvasNavbar-md-md"
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
                <NavDropdown title="Favoritos" id="basic-nav-dropdown">
                  {Array.isArray(favorites) && favorites.length === 0 ? (
                    <NavDropdown.Item disabled>No hay favoritos</NavDropdown.Item>
                  ) : (
                    favorites.map((item, index) => (
                      <NavDropdown.Item key={index}>
                        <div onClick={() => handleNavigate()}>
                          {item}
                        </div>
                        <Button variant="danger" size="sm" className="ms-2" onClick={() => removeFromFavorites(index)}>
                          Eliminar
                        </Button>
                      </NavDropdown.Item>
                    ))
                  )}
                </NavDropdown>
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
};
