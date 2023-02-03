import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { tokens } from "../../../theme";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import Header from "../../Header/Header";

import CustomerShipCodeModal from '../../Modals/CustomerShipCodeModal';

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const CustomerShipCodeList = ({customerid}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [custShipCodes, setCustShipCodes] = useState([]);
    var selectedCustShipCode = [];

    const fetchCustShipCodeData = async ()=>{
        const custShipCodeCollection = query(collection(db,'customer-profile',customerid,'shippingcodes'));
        onSnapshot(custShipCodeCollection, (querySnapshot) => {
          const custShipCodeList = [];
          querySnapshot.forEach((doc) => {
            var custShipCodeData = {
                id: doc.id,
                code: doc.data().Code,
                address1: doc.data().Address1,
                address2: doc.data().Address2,
                city: doc.data().City,
                state: doc.data().State,
                zipcode: doc.data().ZipCode
            }
            custShipCodeList.push(custShipCodeData);
          });
          setCustShipCodes(custShipCodeList);
        });
    }

    const columns = [
        {
            field: "code", 
            headerName: "Code", 
            flex: 1,
        },
        {
            field: "address1", 
            headerName: "Address1", 
            flex: 1
        },
        {
            field: "address2", 
            headerName: "Address2", 
            flex: 1
        },
        {
            field: "city", 
            headerName: "City", 
            flex: 1
        },
        {
            field: "state", 
            headerName: "State", 
            flex: 1
        },
        {
            field: "zipcode", 
            headerName: "Zip Code", 
            flex: 1
        }
    ]

    const onRowsSelectionHandler = (ids) => {
        selectedCustShipCode = ids.map((id) => custShipCodes.find((row) => row.id === id));
    };

    function removeCustShipCode() {
        for (var key in selectedCustShipCode) {
            deleteCustShipCode(selectedCustShipCode[key].id)
        }
    }

    function setDefaultShipping() {
        for (var key in selectedCustShipCode) {
            //deleteCustShipCode(selectedCustShipCode[key].id)
        }
    }

    async function deleteCustShipCode(custShipCodeID) {
        await deleteDoc(doc(db,"customer-profile",customerid,"shippingcodes",custShipCodeID));
    }

    useEffect(() => {
        fetchCustShipCodeData();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="left" alignItems="center">
                <Header title="Shipping Codes" subtitle='' />  
            </Box>
            <Box display="flex" justifyContent="left" alignItems="center">
                <CustomerShipCodeModal customerid={customerid}/>
                <Button
                    sx={{
                        backgroundColor: colors.primary[700],
                        color: colors.primary[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                    onClick={() => { setDefaultShipping() }
                    }
                    >
                    <SettingsSuggestIcon sx={{ mr: "10px" }} />
                    Set Default Shipping Code
                </Button>
                <Button
                    sx={{
                        backgroundColor: colors.grey[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                    onClick={() => { removeCustShipCode() }
                    }
                    >
                    <RemoveCircleIcon sx={{ mr: "10px" }} />
                    Remove Shipping Code
                </Button>
            </Box>
            
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
                    rows={custShipCodes} 
                    columns={columns} 
                    pageSize={5}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>
        </Box>
    )
}

export default CustomerShipCodeList