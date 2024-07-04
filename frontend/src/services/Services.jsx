const API_BASE_URL = `http://localhost:3000/api/v1`

export const getStatsCantidadCategorias = async (type) => {
    const url = `${API_BASE_URL}/cantidadCategorias${type}`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error('Failed to fetch stats');
        }
        const data = await resp.json();
        return data;
    } catch(error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}

export const getStatsResume = async () => {
    const url = `${API_BASE_URL}/stats/resume`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error('Failed to fetch stats');
        }
        const data = await resp.json();
        return data;
    } catch(error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}

export const getRegistros = async () => {
    const url = API_BASE_URL
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error('Failed to fetch registros');
        }
        const data = await resp.json();
        return data;
    } catch(error) {
        console.error('Error fetching registros:', error);
        throw error;
    }
}

export const deleteRegistro = async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    try {
        const resp = await fetch(url, {
            method: 'DELETE'
        });
        if (!resp.ok) {
            throw new Error('Failed deleting registro');
        }
        const data = await resp.json();
        return data;
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
            body: JSON.stringify(nuevoRegistro)
        })
        if (!resp.ok) {
            throw new Error('Failed deleting registro');
        }
        const data = await resp.json();
        return data;
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
            body: JSON.stringify(nuevoRegistro)
        })
        if (!resp.ok) {
            throw new Error('Failed put registro');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error put registro:', error);
        throw error;
    }
}