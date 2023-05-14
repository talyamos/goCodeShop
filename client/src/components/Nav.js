import "./Nav.css";
import Sort from "./Sort";
import { BsCart3 } from "react-icons/bs";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setCartOpen(false);
  };
  return (
    <nav className="product-filter">
      <div style={{ width: "0px" }}>
        <CartDrawer open={cartOpen} onClose={onClose}></CartDrawer>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`AdminLogin`);
        }}
      >
        Admin
      </Button>
      <Button
        onClick={() => {
          setCartOpen(true);
        }}
        variant="contained"
        style={{ marginLeft: "5px" }}
      >
        <BsCart3 />
      </Button>
      <h1 className="TitleNav">GoCode Shop</h1>
      <Sort />
    </nav>
  );
};

export default Nav;
