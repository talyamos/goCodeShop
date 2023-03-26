import './CartDrawer.css'
import  Drawer  from "@mui/material/Drawer";
import ProductInCart from "./ProductInCart";
import MyContext from "../MyContext";
import { useContext } from "react";
import {RiCloseCircleLine} from 'react-icons/ri'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";


export default function CartDrawer ({open,onClose}){

    const {productCart,setProductCart} = useContext(MyContext)
    const navigate = useNavigate()

    const getTotalPrice=()=>{
        var sum=0
        productCart.map((prod)=>{sum+=prod.price*prod.amount})
        return sum
    }

    return(
        <div style={{width:'20%'}}>
            <Drawer anchor={"right"} open={open}>
            <IconButton className='DrawerBtn' onClick={onClose}><RiCloseCircleLine/></IconButton>
            <section className="productsInCart">
                {
                productCart.map((product)=>{
                    return <ProductInCart
                    key={product._id}
                    id={product._id}
                    name={product.title}
                    amount={product.amount}
                    imgUrl={product.imgUrl}
                    price={product.price}
                    />})
                }
            </section>
            <div className='TotalPrice'>
                <p>Total Price:</p>
                <p>{getTotalPrice()}$</p>
            </div>
            <Button onClick={()=>{navigate(`Cart`)}} >Go to cart</Button>
            {/* <Outlet /> */}
            </Drawer>
        </div>
    );
}