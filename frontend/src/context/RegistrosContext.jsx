import { useEffect, useState, createContext } from "react";
import { getRegistros as getRegistrosService } from '../services/RegistrosService';
import { deleteRegistro as deleteRegistroService } from '../services/RegistrosService';
import { createRegistro as createRegistroService } from '../services/RegistrosService';
import { updateRegistro as updateRegistroService } from '../services/RegistrosService';
import { getStatsResume as getStatsResumeService } from '../services/RegistrosService';
import { getStatsCantidadCategoria as getStatsCantidadCategoriasService } from '../services/RegistrosService';

export const RegistrosContext = createContext();

export function RegistrosContextProvider(props) {

    const [registros, setRegistros] = useState([]);
    const [feedback, setFeedback] = useState({ message: '', type: '', key: 0 });
    const [numRegistros, setNumRegistros] = useState(0);
    
    const [cantidadCategoriasGastos, setCantidadCategoriasGastos] = useState([]);
    const [cantidadCategoriasIngresos, setCantidadCategoriasIngresos] = useState([]);

    useEffect(()=> {
       
    },[])

    const getStatsCantidadCategoria = async (t) => {
        try {
            const resp = await getStatsCantidadCategoriasService(t);
            if (resp.status === 200) {
                if (resp.data) {
                    const formattedData = resp.data.map((item) => ({
                      id: item.id,
                      value: item.value,
                      label: item.label,
                    }));
               
                    if(t == 'gastos') {
                        setCantidadCategoriasGastos(formattedData);
                    }
                    if(t == 'ingresos') {
                        setCantidadCategoriasIngresos(formattedData);
                    } 
                }
            }
        } catch (error) {
            setFeedback({ message: `Error al obtener registros`, type: 'error', key: Date.now() });
            return false;
        }
    }

    const getRegistros = async () => {
        try {
            const resp = await getRegistrosService();
            if (resp.status === 200) {
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
        getStatsCantidadCategoria('gastos');
        getStatsCantidadCategoria('ingresos')
    }, []);

    const getStatsResume = async () => {
        try {
            const resp = await getStatsResumeService();
            if (resp.status === 200) {
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
            if (resp.status === 200) {
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
            if (resp.status === 201) {
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
            if (resp.status === 200) {
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
                cantidadCategoriasGastos,
                cantidadCategoriasIngresos,
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
