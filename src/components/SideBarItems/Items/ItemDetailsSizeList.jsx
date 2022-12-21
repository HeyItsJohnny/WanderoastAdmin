import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { tokens } from "../../../theme";
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ItemDetailsSizeList = ({itemid, itemSizesToRemove}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [itemSizes, setItemSizes] = useState([]);

    const fetchItemSizeData = async ()=>{
        const couponsCollection = query(collection(db,'items',itemid,'sizes'));
        onSnapshot(couponsCollection, (querySnapshot) => {
          const itemSizeList = [];
          querySnapshot.forEach((doc) => {
            var itemSizeData = {
                id: doc.id,
                name: doc.data().Name,
                price: doc.data().Price
            }
            itemSizeList.push(itemSizeData);
          });
          setItemSizes(itemSizeList);
        });
    }

    const columns = [
        {
            field: "name", 
            headerName: "Name", 
            flex: 1,
        },
        {
            field: "price", 
            headerName: "Price", 
            flex: 1
        }
    ]

    const onRowsSelectionHandler = (ids) => {
         const selectedRowsData = ids.map((id) => itemSizes.find((row) => row.id === id));
         itemSizesToRemove({selectedRowsData});
    };

    useEffect(() => {
        fetchItemSizeData();
      }, []);

    return (
        <Box m="20px">
            <Box
                m="20px 0 0 0"
                height="20vh"
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
                    rows={itemSizes} 
                    columns={columns} 
                    pageSize={5}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>
        </Box>
    )
    }

export default ItemDetailsSizeList