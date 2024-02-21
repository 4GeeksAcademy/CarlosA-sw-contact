import React, { useContext, useState } from "react";
import { Carousel } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import swChaImg from "../../img/swcharacter.jpg";
import swPlaImg from "../../img/swplanets.jpg";
import ConListImg from "../../img/contactlist.jpeg";


export const Home = () => {
    const { store, actions } = useContext(Context)
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

     const handleSelect = (selectedIndex) => setIndex(selectedIndex);
     const handleClick = () => {

         // Navegar a la URL de la vista seleccionada
         navigate(store.avaliableViews[Object.keys(store.avaliableViews)[index]].link);
     }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img src={ConListImg} onClick={handleClick} className='carrouselImg d-block w-100' />
                <Carousel.Caption className="text-light">
                    <h3>Contact List</h3>
                    <p>Trabajo de <a href="https://4geeks.com/syllabus/spain-fs-pt-54/project/contact-list-context">4GeeksAcademy "Contact List"</a>.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={swChaImg} onClick={handleClick} className='carrouselImg d-block w-100' />
                <Carousel.Caption className="text-light">
                    <h3>Personajes</h3>
                    <p>Información sobre los personajes de StarWars.</p>
                    <p>Parte del trabajo de <a href="https://4geeks.com/syllabus/spain-fs-pt-54/project/starwars-blog-reading-list">4GeeksAcademy "Star Wars"</a></p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={swPlaImg} onClick={handleClick} className='carrouselImg d-block w-100' />
                <Carousel.Caption className="text-light">
                    <h3>Planetas</h3>
                    <p>Información sobre los planetas de StarWars.</p>
                    <p>Parte del trabajo de <a href="https://4geeks.com/syllabus/spain-fs-pt-54/project/starwars-blog-reading-list">4GeeksAcademy "Star Wars"</a></p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}