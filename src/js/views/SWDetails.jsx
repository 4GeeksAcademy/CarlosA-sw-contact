import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Spinner, Image, ListGroup} from 'react-bootstrap';
import { Context } from '../store/appContext';

export const SWDetails = () => {
    const { store, actions } = useContext(Context);
    const { category, id } = useParams();
    const [details, setDetails] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const fetchDetails = async () => {
        setSpinner(true);
        const call = await actions.APICall(store.swBaseUrl + category + '/' + id);
        setDetails(call.result.properties);
        setSpinner(false);
    };

    useEffect(() => {
        fetchDetails()
    }, [category, id]);

    // Propiedades dependiendo de su categoría

    const displayDetails = {
        people: ['name', 'gender', 'birth_year', 'eye_color', 'skin_color', 'hair_color', 'height', 'mass', 'homeworld'],
        planets: ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water'],
        species: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'hair_colors', 'skin_colors', 'eye_colors', 'homeworld', 'language', 'people'],
        starships: ['name', 'model', 'starship_class', 'manufacturer', 'cost_in_credits', 'length', 'crew', 'passengers', 'max_atmosphering_speed', 'hyperdrive_rating', 'MGLT', 'cargo_capacity', 'consumables'],
        vehicles: ['name', 'model', 'vehicle_class', 'manufacturer', 'cost_in_credits', 'length', 'crew', 'passengers', 'max_atmosphering_speed', 'cargo_capacity', 'consumables'],
    };

        // Objeto de traducción
        const translations = {
            name: 'Nombre',
            people: 'Personajes',
            gender: 'Género',
            birth_year: 'Año de nacimiento',
            eye_color: 'Color de ojos',
            skin_color: 'Color de piel',
            hair_color: 'Color de cabello',
            height: 'Altura',
            mass: 'Masa',
            homeworld: 'Planeta natal',
            diameter: 'Diámetro',
            rotation_period: 'Periodo de rotación',
            orbital_period: 'Periodo orbital',
            gravity: 'Gravedad',
            population: 'Población',
            climate: 'Clima',
            terrain: 'Terreno',
            surface_water: 'Agua en la superficie',
            classification: 'Clasificación',
            designation: 'Designación',
            average_height: 'Altura promedio',
            average_lifespan: 'Esperanza de vida promedio',
            hair_colors: 'Colores de cabello',
            skin_colors: 'Colores de piel',
            eye_colors: 'Colores de ojos',
            language: 'Idioma',
            model: 'Modelo',
            starship_class: 'Clase de nave estelar',
            manufacturer: 'Fabricante',
            cost_in_credits: 'Costo en créditos',
            length: 'Longitud',
            crew: 'Tripulación',
            passengers: 'Pasajeros',
            max_atmosphering_speed: 'Velocidad máxima atmosférica',
            hyperdrive_rating: 'Calificación de hiperimpulsor',
            MGLT: 'MGLT',
            cargo_capacity: 'Capacidad de carga',
            consumables: 'Consumibles',
            vehicle_class: 'Clase de vehículo',
            films: 'Películas',
            pilots: 'Pilotos',
        };
    
        const getDisplayCategory = () => {
            const categoryProperties = displayDetails[category] || [];
            return categoryProperties.filter((key) => key !== 'name');
        };

        const buildImageUrl = (category, id) => {
            const baseUrl = 'https://starwars-visualguide.com/assets/img/';
            const adjustedCategory = category === 'people' ? 'characters' : category;
            console.log(`${baseUrl}${adjustedCategory}/${id}.jpg`);
            return `${baseUrl}${adjustedCategory}/${id}.jpg`;
        };
    
        return (
            <Container>
                {spinner ? (
                    <Card>
                        <Card.Header><h2>Cargando datos, espere un momento por favor...</h2></Card.Header>
                        <Card.Body><Spinner animation="border" role="status" /></Card.Body>
                    </Card>
                ) : (
                    details && (
                        <Card>
                            <Card.Header>
                                <h2 className="text-end">{translations['name']}: {details['name']}</h2>
                            </Card.Header>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Image
                                            src={buildImageUrl(category, id)}
                                            onError={(e) => {
                                                e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                                            }}
                                            thumbnail
                                        />
                                    </div>
                                    <div className="col-md-8">
                                    <ListGroup>
                                            {getDisplayCategory().map((key) => (
                                                <ListGroup.Item key={key}>
                                                    <strong>{translations[key] || key}: </strong>
                                                    {key == 'homeworld' ? (
                                                        <Link to={`/planets/${details[key].split('/').pop()}`}>
                                                            {`/planets/${details[key].split('/').pop()}`}
                                                        </Link>
                                                    ) : key == 'people' ? (
                                                        details[key].map((peopleUrl, index) => (
                                                            <li key={index}>
                                                                <Link to={`/people/${peopleUrl.split('/').pop()}`}>
                                                                    {`/people/${peopleUrl.split('/').pop()}`}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        details[key]
                                                    )}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                )}
            </Container>
        );
};