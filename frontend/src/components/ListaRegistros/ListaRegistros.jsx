import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RegistrosContext } from "../../context/RegistrosContext";
import { validateRow } from "../../shared/ValidateRows";
import RegisterTypeDot from "../../shared/RegisterTypeDot";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./style.css";

function ListaRegistros() {
  const [modeEdit, setModeEdit] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [open, setOpen] = useState(false);

  const { registros, deleteRegistro, updateRegistro, numRegistros } = useContext(RegistrosContext);

  if (registros.length === 0) {
    return (
      <h2>
        No hay registros. <Link to="/new">Crear ahora</Link>
      </h2>
    );
  }

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
    console.log('reason', reason)
    //No cerrar Snack cuando se hace clic fuera del Snack
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleModeEdit = () => {
    setModeEdit(!modeEdit);
  };

  const rows = registros;

  const columns = [
    { field: "id", headerName: "Id", flex: 1, minWidth: 15 },
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
            <RegisterTypeDot t={params.value} />
            {params.value}
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
          color: isToday ? "red" : "black",
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

  return (
    <Box style={{ background: "white" }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {validationErrors}
        </Alert>
      </Snackbar>

      <div
        style={{
          marginBottom: 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>{numRegistros} registros.</h2>
        <Tooltip
          title="Edit mode, dos clic en una celda para editar."
          placement="top"
        >
          <button
            id="btn-mode-edit"
            className={modeEdit ? "active" : "inactive"}
            onClick={handleModeEdit}
          >
            <ModeEditIcon />
          </button>
        </Tooltip>
      </div>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        localeText={{
          columnsPanelTextFieldPlaceholder: "Custom Column Title"
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
          sorting: {
            sortModel: [{ field: "created_at", sort: "desc" }],
          },
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
