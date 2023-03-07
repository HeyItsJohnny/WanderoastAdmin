import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { tokens } from "../../../theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header/Header";


const OrderLinesList = ({orderid}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderLines, setOrderLines] = useState([]);

    const fetchOrderLineData = async ()=>{
        const couponsCollection = query(collection(db,'orders',orderid,'orderlines'));
        onSnapshot(couponsCollection, (querySnapshot) => {
          const orderLineList = [];
          querySnapshot.forEach((doc) => {
            var orderLineData = {
                id: doc.id,
                ItemName: doc.data().ItemName,
                BagSize: doc.data().BagSize,
                Quantity: doc.data().Quantity,
                LineAmount: doc.data().LineAmount,
                UnitPrice: doc.data().UnitPrice,
                ItemId: doc.data().ItemId
            }
            orderLineList.push(orderLineData);
          });
          setOrderLines(orderLineList);
        });
    }

    const columns = [
        {
            field: "ItemName", 
            headerName: "Item", 
            flex: 1,
        },
        {
            field: "BagSize", 
            headerName: "Size", 
            flex: 1
        },
        {
            field: "Quantity", 
            headerName: "Quantity", 
            flex: 1
        },
        {
            field: "ItemId", 
            headerName: "Item ID", 
            flex: 1
        },
        {
            field: "UnitPrice", 
            headerName: "($) Unit Price", 
            flex: 1
        },
        {
            field: "LineAmount", 
            headerName: "($) Total Amount", 
            flex: 1
        }
    ]

    useEffect(() => {
        fetchOrderLineData();
      }, []);

    return (
        <Box m="20px">
            
            <Box
                m="20px 0 0 0"
                height="30vh"
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
                <Box display="flex" justifyContent="left" alignItems="center">
                    <h6>Order Lines</h6>
                </Box>
                <DataGrid 
                    rows={orderLines} 
                    columns={columns} 
                    pageSize={50}
                />
            </Box>
        </Box>
    )
}

export default OrderLinesList