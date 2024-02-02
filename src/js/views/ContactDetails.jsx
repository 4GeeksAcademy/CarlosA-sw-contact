import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

export const ContactDetails = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        address: "",
        phone: "",
        agenda_slug: "",
    });

    // Función de navegación

    const navigate = useNavigate();


    const handleInputChange = (event) => {
        event.target.name == "phone" ? setContact({ ...contact, [event.target.name]: event.target.value.replace(/[^0-9()+\s]/g, '') }) : setContact({ ...contact, [event.target.name]: event.target.value })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (params.mode == 'edit') {
            actions.updateContact(params.id, contact);
            navigate("/contact")
        } else if (params.mode == 'add') {
            actions.addContact(contact);
            navigate("/contact")
        }

    };

    const fetchData = async () => {
        setContact(await actions.getContact(params.id));
    };

    useEffect(() => {
        params.mode == 'add' ? setContact({ ...contact, agenda_slug: store.agendaName }) : fetchData()
    }, []);

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Card className="my-3">
                    <Card.Header>
                        <Form.Group>
                            <Form.Label>Full name:</Form.Label>
                            <Form.Control
                                name="full_name"
                                value={contact.full_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Full Name"
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
                                placeholder="Email"
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
                                placeholder="Address"
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
                                placeholder="Phone"
                                disabled={params.mode == 'view'}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <Form.Label>Full name:</Form.Label>
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