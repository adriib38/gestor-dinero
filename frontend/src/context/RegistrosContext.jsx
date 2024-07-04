import { useEffect, useState, createContext } from "react";
import { getRegistros as getRegistrosService } from '../services/Services';
import { deleteRegistro as deleteRegistroService } from '../services/Services';
import { createRegistro as createRegistroService } from '../services/Services';
import { updateRegistro as updateRegistroService } from '../services/Services';
import { getStatsResume as getStatsResumeService } from '../services/Services';

export const RegistrosContext = createContext();

export function RegistrosContextProvider(props) {

    const [registros, setRegistros] = useState([]);
    const [feedback, setFeedback] = useState({ message: '', type: '', key: 0 });
    const [numRegistros, setNumRegistros] = useState(0);

    const getRegistros = async () => {
        try {
            const resp = await getRegistrosService();
            if (resp.status === 'OK') {
                setRegistros(resp.data);
                setNumRegistros(resp.data.length);
            }
        } catch (error) {
            setFeedback({ message: `Error al obtener registros`, type: 'error', key: Date.now() });
            return false;
        }
    };

    useEffect(() => {
        getRegistros();
    }, []);

    const getStatsResume = async () => {
        try {
            const resp = await getStatsResumeService();
            if (resp.status === 'OK') {
                setRegistros(resp.data);
            }
        } catch (error) {
            setFeedback({ message: `Error al obtener registros`, type: 'error', key: Date.now() });
            return false;
        }
    };

    const deleteRegistro = async (id, concepto) => {
        try {
            const resp = await deleteRegistroService(id);
            if (resp.status === 'OK') {
                setFeedback({ message: `Eliminado correctamente ${concepto}`, type: 'successful', key: Date.now() });
                setRegistros((prevRegistros) => prevRegistros.filter(registro => registro.id !== id));
                setNumRegistros((prevNum) => prevNum - 1);
                return true;
            }
        } catch (error) {
            setFeedback({ message: `Error al eliminar ${concepto}`, type: 'error', key: Date.now() });
            return false;
        }
    };

    const crearRegistro = async (nuevoRegistro) => {
        try {
            const resp = await createRegistroService(nuevoRegistro);
            if (resp.status === 'OK') {
                setFeedback({ message: `Registro creado`, type: 'successful', key: Date.now() });
                getRegistros(); // Refresca la lista de registros después de crear uno nuevo
                return true;
            }
        } catch (error) {
            console.error('Error en la solicitud ', error);
            setFeedback({ message: `Error al crear`, type: 'error', key: Date.now() });
            return false;
        }
    };

    const updateRegistro = async (nuevoRegistro) => {
        try {
            const resp = await updateRegistroService(nuevoRegistro);
            if (resp.status === 'OK') {
                setFeedback({ message: `Registro editado`, type: 'successful', key: Date.now() });
                getRegistros(); // Refresca la lista de registros después de crear uno nuevo
                return true;
            }
        } catch (error) {
            console.error('Error en la solicitud ', error);
            setFeedback({ message: `Error al editar`, type: 'error', key: Date.now() });
            return false;
        }
    }

    return (
        <RegistrosContext.Provider
            value={{
                registros,
                deleteRegistro,
                crearRegistro,
                updateRegistro,
                getStatsResume,
                numRegistros,
                feedback
            }}
        >
            {props.children}
        </RegistrosContext.Provider>
    );
}
