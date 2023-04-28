import './Nav.css';
import Sort from "./Sort";
import {BsCart3} from 'react-icons/bs'
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const Nav = () => {
  const [cartOpen,setCartOpen]=useState(false)
  const navigate = useNavigate()


  const onClose=()=>{
    setCartOpen(false);
  };
    return (
      <nav className="product-filter">
      <CartDrawer open={cartOpen} onClose={onClose}></CartDrawer>
      <Button variant="contained" onClick={()=>{navigate(`Admin`)}}>Admin</Button>
      {/* <Link to={{ pathname: '/Admin', state: { data: 'hello' } }}>gigigi</Link> */}
      <Button  onClick={()=>{setCartOpen(true)}} variant="contained"><BsCart3/></Button>
      <h1 className='TitleNav'>GoCode Shop</h1>
      <Sort/>
      </nav>
    )
  }

  export default Nav;
