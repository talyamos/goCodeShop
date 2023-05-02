import MyContext from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdactCartPage from "./ProductCartPage";
import "./CartPage.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

const CartPage = () => {
  // const {productCart,setProductCart} = useContext(MyContext)
  // const  params  = useParams();
  // console.log(productCart)
  const [productsData, setProductsData] = useState([]);
  const [rows, setRows] = useState([]);
  const [delProd, setDelProd] = React.useState(0);

  useEffect(() => {
    //להביא במקום הפונקציה הזאת את המוצרים של העגלה מהיוז קונטקסט
    fetch("http://localhost:8000/api/getAllProducts")
      .then((response) => response.json())
      .then((data) => setProductsData(data));
  }, []);

  const handleDeleteProdCart = (event) => {
    console.log(event);
    // const newRows=[...rows]
    // const index=rows.findIndex((prod)=>prod._id===delProd)
    // newRows.splice(index,1)
    // setRows(newRows)
    // // setProductsData(newRows)
  };

  return (
    <div className="Page">
      <div className="TopDiv">
        <h1 className="Title">My Cart</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((row) => (
              <TableRow key={row.title}>
                <TableCell align="center">
                  <IconButton onClick={handleDeleteProdCart}>
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <img className="ImgCartTable" src={row.image}></img>
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.price}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartPage;
