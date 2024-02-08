import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Pagination, Container, Row, Col } from 'react-bootstrap';
import { Context } from '../store/appContext';

export const SWInfo = () => {
    const { store, actions } = useContext(Context);
    const { category } = useParams();
    const storedData = localStorage.getItem('swApiData');
    const apiData = storedData ? JSON.parse(storedData) : {};
    const categoryData = apiData[category] || { total_records: 0, results: [] };
    const itemsPerPage = 8; // Número de items por página
    const totalPages = Math.ceil(categoryData.results.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const buildImageUrl = (id) => {
        const baseUrl = 'https://starwars-visualguide.com/assets/img/';
        const adjustedCategory = category === 'people' ? 'characters' : category;
        return `${baseUrl}${adjustedCategory}/${id}.jpg`;
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = categoryData.results.slice(startIndex, endIndex);

    const handleAddToFavorites = (name) => {
        console.log('Adding to favorites:', name);
        actions.addFavorite(name); // Utilizar la función addFavorite del contexto
    };

    return (
        <Container>
            <h1>{category}</h1>
            <Row>
                {currentItems.map((item) => (
                    <Col key={item.uid} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img
                                variant="top"
                                src={buildImageUrl(item.uid)}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                                }}
                            />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <Link to={`/sw/${category}/${item.uid}`} className="me-auto">
                                    <Button variant="secondary">Detalles</Button>
                                </Link>
                                <Button variant="primary" onClick={() => handleAddToFavorites(item.name)}>
                                    <i className="fas fa-heart" />
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination className="justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};
