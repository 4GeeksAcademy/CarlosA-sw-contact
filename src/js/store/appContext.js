import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		/*
		Vamos a hacer que el useEffect de AppContext.js haga algunos if para comprobar datos.
			- Si el objeto swApiData no existe en localStorage => Crearla
			- Si el objeto swApiData existe:
					- Comprobar si contiene como clave estos diferentes types: ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
				- Hacer una llamada a la API por cada comprobación y comprobar que el numero de items es el de "total_records" que envia la API
					- En caso de que no coincida
					  - Borrar esa clave
					  - Hacer un get de todas las paginas de ese tipo y almacenarlo en localStorage
		*/

		// Función para obtener datos de la API
		const fetchData = async () => {

			// Comprobar si 'swApiData' no existe en localStorage o si está incompleto
			const storedData = localStorage.getItem('swApiData');
			const apiData = storedData ? JSON.parse(storedData) : {};

			// Filtrar tipos de datos incompletos en función de los datos almacenados y el estado actual
			const incompleteTypes = state.store.types.filter(type => {
				const typeData = apiData[type];
				const totalRecords = typeData ? typeData.total_records : 0;
				const resultsLength = typeData ? typeData.results.length : 0;

				return !typeData || resultsLength !== totalRecords;
			});

			// Verificar si hay tipos incompletos
			if (incompleteTypes.length > 0) {

				// Si hay tipos incompletos, volver a descargar los datos
				for (const type of incompleteTypes) {
					console.log('Obteniendo datos de: ' + type);
					let currentPage = 1;
					let results = [];
					let typeData;

					// Realizar llamadas a la API paginada hasta obtener todos los datos
					do {
						typeData = await state.actions.APICall(state.store.swBaseUrl + type + '?page=' + currentPage + '&limit=10');
						results = results.concat(typeData.results);
						currentPage++;
					} while (typeData && typeData.next);

					// Guardar el campo total_records junto con los resultados para poder usarlo al comprobar si estan incompletos
					apiData[type] = {
						total_records: typeData ? typeData.total_records : 0,
						results: results
					};

					// Almacenar los datos actualizados en localStorage después de cada iteración
					localStorage.setItem('swApiData', JSON.stringify(apiData));
					console.log('Datos de ' + type + ' obtenidos y actualizados.');
				}
			}
			
			state.actions.fetchFavorite(JSON.parse(localStorage.getItem('favoriteList')))
			// Mostrar mensaje en la consola una vez que todos los datos se han descargado y almacenado con éxito o en caso de que esten ya todos guardados
			console.log('Todos los datos han sido obtenidos:', apiData, '\nLista de favoritos cargada:', state.store.favorites);
		}



		useEffect(() => {
			fetchData();
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
