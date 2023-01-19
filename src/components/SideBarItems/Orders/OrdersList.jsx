import React, {useState, useEffect} from 'react';
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot, orderBy} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrderData = async ()=>{
        const couponsCollection = query(collection(db,'orders'),orderBy("OrderDate", "desc"));
        onSnapshot(couponsCollection, (querySnapshot) => {
            const ordersList = [];
            querySnapshot.forEach((doc) => {
                var orderData = {
                    id: doc.id,
                    FullName: doc.data().FullName,
                    Status: doc.data().Status,
                    OrderType: doc.data().OrderType,
                    Total: doc.data().Total
                }
                ordersList.push(orderData);
            });
            setOrders(ordersList);
        });
    }

    const columns = [
        {
            field: "FullName", 
            headerName: "Name", 
            flex: 1,
        },
        {
            field: "Status", 
            headerName: "Status", 
            flex: 1
        },
        {
            field: "OrderType", 
            headerName: "Order Type", 
            flex: 1
        }
        ,
        {
            field: "Total", 
            headerName: "Total ($)", 
            flex: 1
        }
    ]

    useEffect(() => {
        fetchOrderData();
      }, []);
    
    
      const onRowsSelectionHandler = (ids) => {
          //const selectedRowsData = ids.map((id) => items.find((row) => row.id === id));
          //itemsToRemove({selectedRowsData});
      };
    
      const handleRowClick = (params) => {
        navigate("/orderdetails/" + params.row.id);
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
                    rows={orders} 
                    columns={columns} 
                    pageSize={50}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    onRowDoubleClick={handleRowClick}
                />
            </Box>
        </Box>
    )
    }

export default OrdersList