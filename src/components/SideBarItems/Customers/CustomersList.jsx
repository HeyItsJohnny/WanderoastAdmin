import React, {useState, useEffect} from 'react';
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot, orderBy} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CustomersList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomerData = async ()=>{
        const customersCollection = query(collection(db,'customer-profile'),orderBy("CustomerName"));
        onSnapshot(customersCollection, (querySnapshot) => {
            const customersList = [];
            querySnapshot.forEach((doc) => {
                var hasSquareAccount = true;
                if (doc.data().squareID === "") {
                    hasSquareAccount = false;
                }
                var customerData = {
                    id: doc.id,
                    CustomerName: doc.data().CustomerName,
                    Email: doc.data().Email,
                    PhoneNo: doc.data().PhoneNo,
                    HasSquareAccount: hasSquareAccount
                }
                customersList.push(customerData);
            });
            setCustomers(customersList);
        });
    }

    const columns = [
        {
            field: "CustomerName", 
            headerName: "Name", 
            flex: 1,
        },
        {
            field: "Email", 
            headerName: "Email", 
            flex: 1
        },
        {
            field: "PhoneNo", 
            headerName: "Phone #", 
            flex: 1
        }
        ,
        {
            field: "HasSquareAccount", 
            headerName: "Square Account?", 
            flex: 1
        }
    ]

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const handleRowClick = (params) => {
        alert(params.row.id);
        //navigate("/customerdetails/" + params.row.id);
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
                    rows={customers} 
                    columns={columns} 
                    pageSize={50}
                    onRowDoubleClick={handleRowClick}
                />
            </Box>
        </Box>
    )
}

export default CustomersList