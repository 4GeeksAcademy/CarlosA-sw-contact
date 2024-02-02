import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Form, InputGroup, Pagination, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactList = () => {
  const { store, actions } = useContext(Context);
  const [agendaList, setAgendaList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [inputValue, setInputValue] = useState(store.agendaName);

  // Paginación de las agendas

  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(agendaList.length / 6);
  const currentAgendaList = agendaList.slice((currentPage - 1) * 6, currentPage * 6);


  // Función de navegación:
  const navigate = useNavigate();


  // Funciones de navegación a Details

  const handleEdit = (item) => {
    navigate("/details/" + item.id + "/edit")
  }

  const handleView = (item) => {
    navigate("/details/" + item.id + "/view")
  }

  const handleAdd = (item) => {
    navigate("/details/" + '0' + "/add")
  }


  // Funciones de manipulación de datos

  const handleSubmit = () => {
    actions.setAgendaName(inputValue);
    fetchData();
  }

  const handleDelete = (item) => {
    actions.deleteContact(item.id);
    fetchData();
  }


  // Funciones de manipulación de datos de agenda

  const handleAddToAgenda = (item) => {
    setInputValue(item);
    actions.setAgendaName(item);
    fetchData();
  }

  const handleDeleteAgenda = () => {
    actions.deleteAgenda(inputValue);
    fetchData();
  }


  // Función para obtener datos

  const fetchData = async () => {
    setAgendaList(await actions.getAllAgendas());
    setContactList(await actions.getAllContacts());
  };


  // Efecto para cargar datos al montar el componente

  useEffect(() => {
    fetchData();
  }, []);


  return (

    <Container>

      {/* Listado de agendas */}

      <InputGroup className="mb-2">
        <InputGroup.Text className="bg-dark text-white"><strong>Listado de agendas:</strong></InputGroup.Text>
        <ListGroup horizontal>
          {!currentAgendaList ? '' : currentAgendaList.map((item, index) => (
            <ListGroup.Item key={index}><Button variant="primary" onClick={() => handleAddToAgenda(item)}>{item}</Button></ListGroup.Item>
          ))}
        </ListGroup>
      </InputGroup>


      {/* Paginación */}

      <Pagination className="my-2 mb-5 justify-content-start">
        {Array.from({ length: pageCount }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>


      {/* Formulario de agenda */}

      <InputGroup className="mb-5">
        <InputGroup.Text>Agenda: </InputGroup.Text>
        <Form.Control
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" ? handleSubmit() : null}
          value={inputValue}
          placeholder="Introduce el nombre de la agenda o da click a un botón"
          type="text" />
        <InputGroup.Text><Button variant="success" onClick={handleAdd}>Añadir contacto</Button></InputGroup.Text>
        <InputGroup.Text><Button variant="danger" onClick={handleDeleteAgenda}>Eliminar agenda</Button></InputGroup.Text>

      </InputGroup>


      {/* Listado de contactos */}

      {Array.isArray(contactList) ? (
        !contactList ? '' : contactList.map((item, index) => (
          <Card className="my-3" key={index}>
            <Card.Header>
              <span className="d-flex justify-content-between">
                <span className="col-auto">{item.full_name}</span>
                <span className="col text-end me-5">
                  <i onClick={() => handleView(item)} className="fa-solid fa-eye mx-2" />
                  <i onClick={() => handleEdit(item)} className="fa-solid fa-pen-to-square mx-2" />
                </span>
                <span className="col-auto"><i onClick={() => handleDelete(item)} className="fa-solid fa-trash" /></span>
              </span>
            </Card.Header>
            <div>
              <img className="img-thumbnail float-start me-2 mt-2 ms-1" src="https://placehold.co/120" alt="Profile" />
              <Card.Body>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Dirección:</strong> {item.address}</p>
                <p><strong>Teléfono:</strong> {item.phone}</p>
              </Card.Body>
            </div>
          </Card>
        ))
      ) : (
        <p>Error en la API, actualiza la página</p>
      )}

    </Container>
  );
};
