import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { RegistrosContext } from "../../context/RegistrosContext";
import { validateRow } from "../../shared/ValidateRows";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./style.css";

function ListaRegistros() {
  const [modeEdit, setModeEdit] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { registros, deleteRegistro, updateRegistro, numRegistros } = useContext(RegistrosContext);
  
  useEffect(() => {
    setLoadingData(registros.length === 0); 
  }, [registros]); 

  const processRowUpdate = async (newRow) => {
    const errors = validateRow(newRow);

    if (errors.length === 0) {
      const updatedRow = await updateRegistro(newRow);
      return { ...updatedRow, id: newRow.id };
    } else {
      throw new Error(errors);
    }
  };

  const handleProcessRowUpdateError = (error) => {
    const errors = error.message.split(", ");
    setValidationErrors(errors);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    console.log("reason", reason);
    //No cerrar Snack cuando se hace clic fuera del Snack
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleModeEdit = () => {
    setModeEdit(!modeEdit);
  };

  const RegisterType = ({ t }) => {
    // Asignar color basado en el tipo
    let background = t === 'gasto' ? '#ce1c1cb0' : '#25ce257a';
    let text = t === 'gasto' ? 'rgb(112, 4, 4)' : 'rgb(8, 129, 8)';

    return (
      <span style={{ background: background, color: text, fontWeight:500, borderRadius: "10px", padding: "3px 6px" }}>
        {t}
      </span>
    );
  };

  const columns = [
    { field: "id", headerName: "Id", flex: 1, minWidth: 15},
    {
      field: "concepto",
      headerName: "Concepto",
      flex: 1,
      minWidth: 170,
      editable: modeEdit,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      flex: 1,
      minWidth: 170,
      editable: modeEdit,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <span>
            <RegisterType t={params.value} />
          </span>
        );
      },
      editable: true,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      flex: 1,
      minWidth: 100,
      editable: modeEdit,
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 1,
      minWidth: 180,
      editable: modeEdit,
    },
    {
      field: "created_at",
      headerName: "Fecha",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const date = new Date(params.value).toLocaleDateString();
        const today = new Date().toLocaleDateString();
        const isToday = date === today;

        const dateStyle = {
          color: isToday ? "#E0274C" : "black",
        };

        return <span style={dateStyle}>{date}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          if (window.confirm(`¿Eliminar ${params.row.id}?`)) {
            deleteRegistro(params.row.id);
          }
        };
        return (
          <Tooltip title="Delete" placement="right">
            <Button color="error" onClick={onClick}>
              X
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  if (registros.length === 0 && !loadingData) {
    return (
      <h2>
        No hay registros. <Link to="/new">Crear ahora</Link>
      </h2>
    );
  }

  return (
    <Box style={{ background: "white" }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {validationErrors}
        </Alert>
      </Snackbar>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h2>{numRegistros} registros.</h2>
        <div style={{ display: "flex", gap: "30px" }}>
          <Tooltip
            title="Edit mode, dos clic en una celda para editar."
            placement="top"
          >
            <Button
              id="btn-mode-edit"
              className={modeEdit ? "active" : "inactive"}
              onClick={handleModeEdit}
              variant="outlined"
            >
              Edit
            </Button>
          </Tooltip>
        </div>
      </div>
      <DataGrid
        loading={loadingData}
        autoHeight
        slots={{
          toolbar: CustomToolbar,
        }}
        rows={registros}
        columns={columns}
        localeText={{
          columnsPanelTextFieldPlaceholder: "Custom Column Title",
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
          sorting: {
            sortModel: [{ field: "created_at", sort: "desc" }],
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          backgroundColor: "white",
        }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </Box>
  );
}

export default ListaRegistros;
