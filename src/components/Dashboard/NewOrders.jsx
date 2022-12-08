import React, {useState, useEffect} from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { db } from '../../Firebase/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';

const NewOrders = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState([]);

    const fetchOrdersData = async ()=>{
        const ordersCollection = query(collection(db,'orders'),where("Status","==","Order Created"))
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          FullName: doc.data().FullName,
          CustomerNotes: doc.data().CustomerNotes,
          InternalComments: doc.data().InternalComments,
          OrderType: doc.data().OrderType
        }));
    
        setOrders(ordersList);
        console.log(ordersList);
      }

    const columns = [
        {
            field: "OrderType", 
            headerName: "Order Type", 
            width: 75
        },
        {
            field: "FullName", 
            headerName: "Name", 
            flex: 1,
            width: 90
        },
        {
            field: "CustomerNotes", 
            headerName: "Customer Notes", 
            cellClass: "normalLineHeight",
            flex: 1,
        },
        {
            field: "Internal Comments", 
            headerName: "Internal Comments", 
            cellClass: "normalLineHeight",
            flex: 1
        },
        
    ]

    useEffect(() => {
        fetchOrdersData();
      }, []);

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
            rows={orders} 
            columns={columns} 
            pageSize={3}
        />
      </Box>
    </Box>
    )
}

export default NewOrders