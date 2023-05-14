import { useState } from "react";
import { useLocation } from "react-router-dom";
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
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CircularProgress from "@mui/material/CircularProgress";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const CartPage = () => {
  const location = useLocation();
  const productInCart = location?.state?.productCart || [];

  const [productsCart, setProductsCart] = useState(productInCart);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getTotalPrice = () => {
    var sum = 0;
    productsCart.map((prod) => {
      sum += prod.price * prod.amount;
    });
    return sum.toFixed(2);
  };

  const handleIncrementAmount = (productId) => {
    setProductsCart((prevProductsCart) =>
      prevProductsCart.map((product) => {
        if (product.id === productId) {
          return { ...product, amount: product.amount + 1 };
        }
        return product;
      })
    );
  };

  const handleDecrementAmount = (productId) => {
    setProductsCart((prevProductsCart) =>
      prevProductsCart.map((product) => {
        if (product.id === productId && product.amount > 1) {
          return { ...product, amount: product.amount - 1 };
        }
        return product;
      })
    );
  };

  const handleDeleteProdCart = (delProdId) => {
    setLoading(true);
    setTimeout(() => {
      setProductsCart((prevProductsCart) =>
        prevProductsCart.filter((product) => product.id !== delProdId)
      );
      setLoading(false);
    }, 1000);
  };

  const handleShopping = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setProductsCart([]);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="Page">
      <div className="TopDiv">
        <h1 className="Title">My Cart</h1>
      </div>
      <TableContainer component={Paper}>
        {loading && (
          <div className="LoadingDiv">
            <CircularProgress />
          </div>
        )}
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
            {productsCart.map((row) => (
              <TableRow key={row.title}>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteProdCart(row.id)}>
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <img className="ImgCartTable" src={row.imgUrl} alt=""></img>
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  <div>
                    <IconButton onClick={() => handleDecrementAmount(row.id)}>
                      <RemoveIcon />
                    </IconButton>
                    {row.amount}
                    <IconButton onClick={() => handleIncrementAmount(row.id)}>
                      <AddIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align="center">
                  {(row.price * row.amount).toFixed(2)}$
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Total Price:
              </TableCell>
              <TableCell align="center">{getTotalPrice()}$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="ShopNowDiv">
        <Button
          variant="contained"
          endIcon={<ShoppingCartCheckoutIcon />}
          onClick={handleShopping}
        >
          Shop Now
        </Button>
        {success && (
          <div className="Overlay">
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              className="SuccessAlert"
            >
              The purchase was successfully completed! Hope to see you again
              soon
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
