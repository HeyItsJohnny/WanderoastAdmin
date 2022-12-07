import React, {useState, useEffect} from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridValueGetterParams, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Header/Header";
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
          //OrderDate: doc.data().OrderDate.toDate()
        }));
    
        setOrders(ordersList);
        console.log(ordersList);
      }

    function getDateString(TimeStamp) {
        var dateFormat = new Date(TimeStamp);
        console.log("MONTH: " + dateFormat.getMonth());
        return dateFormat.getMonth() + "/" + dateFormat.getDate() + "/" + dateFormat.getFullYear();
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
        <Header title="New Orders" subtitle="New orders coming from text and website" />
        <Box
            m="40px 0 0 0"
            height="75vh"
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
        <DataGrid checkboxSelection rows={orders} columns={columns} />
      </Box>
    </Box>
    )
}

export default NewOrders