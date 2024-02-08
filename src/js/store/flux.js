const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendaName: "xXcarlos117Xx2",
			base_url: "https://playground.4geeks.com/apis/fake/contact/",
			swBaseUrl: "https://www.swapi.tech/api/",
			favorites: [],
			avaliableViews: {
				'contact': { 'name': 'Contact List', 'link': '/contact' },
				'swCharacter': { 'name': 'StarWars - Personajes', 'link': '/sw/people' },
				'swPlanet': { 'name': 'StarWars - Planetas', 'link': '/sw/planets' },
				'swSpecies': { 'name': 'StarWars - Especies', 'link': '/sw/species' },
				'swShips': { 'name': 'StarWars - Naves', 'link': '/sw/starships' },
				'swVehicles': { 'name': 'StarWars - Vehiculos', 'link': '/sw/vehicles' },
			},
			types: ['people', 'planets', 'species', 'starships', 'vehicles']
		},
		actions: {

			// Llamada general a la API

			APICall: async (url, options) => {
				try {
					const response = await fetch(url, options);
					if (!response.ok) {
						console.log('Error: ' + response.status, response.statusText);
						return response.status;
					}
					return await response.json();
				} catch (error) {
					console.error('Error in fetch:', error);
					return null;
				}
			},

			fetchFavorite: (item) => {
				setStore({ favorites: item })
			},

			removeFavorite: (index) => {
				const favorites = JSON.parse(localStorage.getItem('favoriteList')) || [];
				const updatedFavorites = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
				localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
				setStore({ favorites: updatedFavorites }); // Actualizar el estado de favoritos en el contexto
				console.log('Favorites after removing:', updatedFavorites);
			},

			addFavorite: (name) => {
				const favorites = JSON.parse(localStorage.getItem('favoriteList')) || [];
				const existingFavorite = favorites.find(fav => fav == name);

				if (!existingFavorite) {
					const updatedFavorites = [...favorites, name];
					localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
					setStore({ favorites: updatedFavorites }); // Actualizar el estado de favoritos en el contexto
					console.log('Favorites after adding:', updatedFavorites);
				}
			},

			// GET - Todas las agendas

			getAllAgendas: async () => {
				return await getActions().APICall(getStore().base_url + 'agenda/');
			},

			// GET - Todos los contactos en {agendaName}

			getAllContacts: async () => {

				return await getActions().APICall(getStore().base_url + "agenda/" + getStore().agendaName);
			},

			// GET - Información de contacto específico {id}

			getContact: async (id) => {

				return await getActions().APICall(getStore().base_url + id);
			},

			// DELETE - Borrar contacto por {id}

			deleteContact: async (id) => {
				const options = {
					method: 'DELETE',
				}
				return await getActions().APICall(getStore().base_url + id, options);
			},

			// DELETE - Borrar todos los contactos de la {agenda}

			deleteAgenda: async (agenda) => {
				const options = {
					method: 'DELETE',
				}
				return await getActions().APICall(getStore().base_url + "agenda/" + agenda, options);
			},

			// PUT - Actualizar los datos del contacto {id} con {data}

			updateContact: async (id, data) => {
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall(getStore().base_url + id, options);
			},

			// POST - Añadir contacto con {data}

			addContact: async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall(getStore().base_url, options);
			},

			// Funciones para cambios en store

			// Cambio de {agendaName}

			setAgendaName: (name) => {
				setStore({ agendaName: name });
			}
		}
	};
};

export default getState;
