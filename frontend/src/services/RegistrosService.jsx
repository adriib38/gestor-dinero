import { API_BASE_URL } from "../env";

export const getStatsCantidadCategoria = async (type) => {
    const url = `${API_BASE_URL}/stats/cantidadCategorias${type}`;
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
        });
        if (!resp.ok) {
            throw new Error('Failed to fetch stats');
        }

        const data = await resp.json();
        return { status: resp.status, data: data };
    } catch(error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}

export const getStatsResume = async () => {
    const url = `${API_BASE_URL}/stats/resume`;
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!resp.ok) {
            throw new Error('Failed to fetch stats');
        }
        const data = await resp.json();
        return { status: resp.status, data };
    } catch(error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}

export const getRegistros = async () => {
    const url = `${API_BASE_URL}/misregistros`;
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!resp.ok) {
            throw new Error('Failed to fetch registros');
        }
        const data = await resp.json();
        return { status: resp.status, data };
    } catch(error) {
        console.error('Error fetching registros:', error);
        throw error;
    }
}

export const deleteRegistro = async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    try {
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!resp.ok) {
            throw new Error('Failed deleting registro');
        }
        const data = await resp.json();
        return { status: resp.status, data };
    } catch (error) {
        console.error('Error eliminando registro:', error);
        throw error;
    }
};

export const createRegistro = async (nuevoRegistro) => {
    const url = API_BASE_URL;
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro),
            credentials: "include",
        })
        if (!resp.ok) {
            throw new Error('Failed deleting registro');
        }
        const data = await resp.json();
        return { status: resp.status, data };
    } catch (error) {
        console.error('Error creando registro:', error);
        throw error;
    }
}

export const updateRegistro = async (nuevoRegistro) => {
    const id = nuevoRegistro.id;
    const url = `${API_BASE_URL}/${id}`
    try {
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro),
            credentials: "include",
        })
        if (!resp.ok) {
            throw new Error('Failed put registro');
        }
        const data = await resp.json();
        return { status: resp.status, data };
    } catch (error) {
        console.error('Error put registro:', error);
        throw error;
    }
}