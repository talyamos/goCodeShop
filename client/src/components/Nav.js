import './Nav.css';
import Sort from "./Sort";
import {BsCart3} from 'react-icons/bs'
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Nav = () => {
  const [cartOpen,setCartOpen]=useState(false)

  const onClose=()=>{
    setCartOpen(false);
  };
    return (
      <nav className="product-filter">
      <CartDrawer open={cartOpen} onClose={onClose}></CartDrawer>
      <Button  onClick={()=>{setCartOpen(true)}} variant="contained"><BsCart3/></Button>
      <h1>Jackets</h1>
      <Sort/>
      </nav>
    )
  }

  export default Nav;
