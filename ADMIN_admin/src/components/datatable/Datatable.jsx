import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource.js";  //userRows
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";


const Datatable = ({ columns }) => {


  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path)

  const [list, setList] = useState([]); // Linea de codigo nueva  nota: siempre colocar useState([])
  console.log(list);


  const { data, loading, error } = useFetch(`/api/${path}`);
  console.log("Datos de los usurios", data);
  console.log(loading);
  console.log("Error de peticion", error);

  //Linea de codigo Nueva
  useEffect(() => {
    setList(data)
  }, [data])

  //const [data, setData] = useState(userRows);

  const handleDelete = async (id) => {

    try {
      await axios.delete(`/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {

    }

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">

      <div className="datatableTitle">
        {path}

        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>

      </div>

      <DataGrid
        className="datagrid"
        rows={list}  // rows={data}   // Liena de codigo nueva
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}       // linea de codigo nueva
      />


    </div>
  );
};

export default Datatable;
