import React, {useState, useEffect} from 'react';
import { Box, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { db } from '../../../Firebase/firebase';
import { collection, query, onSnapshot} from 'firebase/firestore';

const CouponsList = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [coupons, setCoupons] = useState([]);

    const fetchCouponData = async ()=>{
        const couponsCollection = query(collection(db,'coupons'));
        onSnapshot(couponsCollection, (querySnapshot) => {
            const couponsList = [];
            querySnapshot.forEach((doc) => {
                var couponData = {
                    id: doc.id,
                    CouponCode: doc.data().CouponCode,
                    Description: doc.data().CouponDescription,
                    CouponType: doc.data().CouponAmountType,
                    CouponDiscount: doc.data().CouponDiscount,
                }
                couponsList.push(couponData);
            });
            setCoupons(couponsList);
          });
      }

      const columns = [
        {
            field: "CouponCode", 
            headerName: "Coupon Code", 
            flex: 1,
        },
        {
            field: "Description", 
            headerName: "Description", 
            flex: 1
        },
        {
            field: "CouponType", 
            headerName: "Coupon Type", 
            flex: 1,
        },
        {
            field: "CouponDiscount", 
            headerName: "Amount", 
            flex: 1,
        }
    ]

    useEffect(() => {
        fetchCouponData();
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
                    rows={coupons} 
                    columns={columns} 
                    pageSize={10}
                />
            </Box>
        </Box>
    )
}

export default CouponsList