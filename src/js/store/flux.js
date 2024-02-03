const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendaName : "xXcarlos117Xx2",
			base_url: "https://playground.4geeks.com/apis/fake/contact/",
		},
		actions: {

			// Llamada general a la API

			APICall : async (url, options) => {
				try {
					const response = await fetch(getStore().base_url + url, options);
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

			// GET - Todas las agendas

			getAllAgendas : async () => {
				return await getActions().APICall('agenda/');
			},

			// GET - Todos los contactos en {agendaName}

			getAllContacts : async () => {

				return await getActions().APICall("agenda/"+getStore().agendaName);
			},

			// GET - Información de contacto específico {id}

			getContact : async (id) => {

				return await getActions().APICall(id);
			},

			// DELETE - Borrar contacto por {id}

			deleteContact : async (id) => {
				const options = {
					method: 'DELETE',
				}
				return await getActions().APICall(id,options);
			},

			// DELETE - Borrar todos los contactos de la {agenda}

			deleteAgenda : async (agenda) => {
				const options = {
					method: 'DELETE',
				}
				return await getActions().APICall("agenda/"+agenda,options);
			},

			// PUT - Actualizar los datos del contacto {id} con {data}

			updateContact : async (id,data) => {
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall(id,options);
			},

			// POST - Añadir contacto con {data}

			addContact : async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall("",options);
			},

			// Funciones para cambios en store
			
			// Cambio de {agendaName}

			setAgendaName : (name) =>{
				setStore({agendaName : name});
			}
		}
	};
};

export default getState;
