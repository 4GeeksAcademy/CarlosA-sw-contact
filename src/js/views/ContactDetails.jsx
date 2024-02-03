import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

export const ContactDetails = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        address: "",
        phone: "",
        agenda_slug: "",
    });

    // Función de navegación y parámetros

    const navigate = useNavigate();
    const params = useParams();


    // Función para manejar el cambio del input de cada uno de los huecos
    // Se ve mas complicado de lo que es...
    // Lo dejo en forma de "if-else" comentado despues de la propia función para verlo mas sencillo.

    const handleInputChange = (event) => {
        event.target.name == "phone" ? setContact({ ...contact, [event.target.name]: event.target.value.replace(/[^0-9()+\s]/g, '') }) : setContact({ ...contact, [event.target.name]: event.target.value })
    };

    /*
    const handleInputChange = (event) => {
        // Extraer el nombre y el valor del evento
        const { name, value } = event.target;

        // Verificar si el campo es "phone" antes de actualizar el estado
        if (name === "phone") {

            // Si es el campo "phone", eliminar caracteres no numéricos
            const cleanedValue = value.replace(/[^0-9()+\s]/g, '');

            // Actualizar el estado utilizando el operador de propagación
            setContact({ ...contact, [name]: cleanedValue });
        } else {

            // Si no es el campo "phone", actualizar el estado normalmente
            setContact({ ...contact, [name]: value });
        }
    };
    */


    // Función para manejar el envío del formulario

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Verificar el modo de operación del formulario (editar o agregar)
        if (params.mode == 'edit') { // Si el modo es editar, actualizar el contacto existente

            actions.updateContact(params.id, contact);
            navigate("/contact")

        } else if (params.mode == 'add') { // Si el modo es agregar, añadir un nuevo contacto

            actions.addContact(contact);
            navigate("/contact")
        }

    };

    const fetchData = async () => {

        // Obtener el contacto utilizando el id proporcionado en los parámetros y
        // establecer el contacto en el estado utilizando la función proporcionada por el 'setContact'
        setContact(await actions.getContact(params.id));
    };

    // Efecto que se ejecuta cuando se carga la vista
    useEffect(() => {

        // Verificar si el modo es 'add' para establecer el campo 'agenda_slug' con el nombre de la agenda
        // Si el modo es distinto de 'add', entonces hace un "fetchData()" normal
        params.mode == 'add' ? setContact({ ...contact, agenda_slug: store.agendaName }) : fetchData()
    }, []);


    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Card className="my-3">
                    <Card.Header>
                        <Form.Group>
                            <Form.Label>Nombre completo:</Form.Label>
                            <Form.Control
                                name="full_name"
                                value={contact.full_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Nombre completo"
                                disabled={params.mode == 'view'}
                                required
                            />
                        </Form.Group>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                name="email"
                                value={contact.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="Dirección de correo"
                                disabled={params.mode == 'view'}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control
                                name="address"
                                value={contact.address}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Dirección"
                                disabled={params.mode == 'view'}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                name="phone"
                                value={contact.phone}
                                onChange={handleInputChange}
                                type="tel"
                                placeholder="Nº Teléfono"
                                disabled={params.mode == 'view'}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <Form.Label>Agenda Asignada:</Form.Label>
                            <Form.Control
                                name="agenda_slug"
                                value={contact.agenda_slug}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Agenda asignada"
                                disabled={params.mode == 'view'}
                                required
                            />
                        </Form.Group>
                    </Card.Footer>
                </Card>
                <div className="d-flex justify-content-between">
                    <Link to="/contact"><Button variant="danger">Volver</Button></Link>
                    {params.mode == 'edit' || params.mode == 'add' && <Button type="submit" variant="success">Guardar cambios</Button>}
                </div>
            </Form>
        </Container>
    )
};