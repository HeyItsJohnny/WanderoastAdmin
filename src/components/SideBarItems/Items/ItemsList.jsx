import React, {useState, useEffect} from 'react';
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ItemsList = ({itemsToRemove}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItemData = async ()=>{
      const couponsCollection = query(collection(db,'items'));
      onSnapshot(couponsCollection, (querySnapshot) => {
          const itemsList = [];
          querySnapshot.forEach((doc) => {
            var hasImage = true;
            if (doc.data().ImageFilePath === "") {
                hasImage = false;
            }
            var itemData = {
                id: doc.id,
                Name: doc.data().Name,
                EnableItem: doc.data().EnableItem,
                HasImage: hasImage
            }
            itemsList.push(itemData);
          });
          setItems(itemsList);
        });
    }
  
  const columns = [
      {
          field: "Name", 
          headerName: "Name", 
          flex: 1,
      },
      {
          field: "EnableItem", 
          headerName: "Enabled", 
          flex: 1
      },
      {
        field: "HasImage", 
        headerName: "Image Uploaded", 
        flex: 1
    }
  ]

  useEffect(() => {
    fetchItemData();
  }, []);


  const onRowsSelectionHandler = (ids) => {
      const selectedRowsData = ids.map((id) => items.find((row) => row.id === id));
      itemsToRemove({selectedRowsData});
  };

  const handleRowClick = (params) => {
    navigate("/itemdetails/" + params.row.id);
  };

  return (
    <Box m="20px">
      <Box
          m="20px 0 0 0"
          height="50vh"
          sx={{
          "& .MuiDataGrid-root": {
              border: "none",
          },
          "& .MuiDataGrid-cell": {
              borderBottom: "none",
          },
          "& .name-column--cell": {
              color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
          },
          }}
      >
        <DataGrid 
            checkboxSelection 
            rows={items} 
            columns={columns} 
            pageSize={20}
            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            onRowDoubleClick={handleRowClick}
        />
    </Box>
  </Box>
)
}

export default ItemsList