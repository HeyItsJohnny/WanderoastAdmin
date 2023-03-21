import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMode, tokens } from "../../../theme";
import { db } from "../../../Firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const SelectCustomer = ({ setCustomerAndContinue }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const [customers, setCustomers] = useState([]);

  const fetchCustomerData = async () => {
    const customersCollection = query(
      collection(db, "customer-profile"),
      orderBy("CustomerName")
    );
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
          HasSquareAccount: hasSquareAccount,
        };
        customersList.push(customerData);
      });
      setCustomers(customersList);
    });
  };

  const columns = [
    {
      field: "CustomerName",
      headerName: "Name",
      flex: 1,
    },
  ];

  function searchCustomerArray(searchTerm) {
    const results = [];

    customers.forEach((obj) => {
      for (let key in obj) {
        if (
          typeof obj[key] === "string" &&
          obj[key].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push(obj);
          break;
        }
      }
    });

    setCustomers(results);
  }

  const handleSearchChange = (event) => {
    if (event.target.value === "") {
      fetchCustomerData();
    } else {
      searchCustomerArray(event.target.value);
    }
  };

  const handleRowClick = (params) => {
    setCustomerAndContinue(params.row.id);
    //alert(params.row.CustomerName);
    //navigate("/itemdetails/" + params.row.id);
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <>
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
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search Name"
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        <DataGrid 
          rows={customers} 
          columns={columns} 
          pageSize={50}
          onRowClick={handleRowClick}
        />
      </Box>
    </>
  );
};

export default SelectCustomer;
