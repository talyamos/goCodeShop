import './CartDrawer.css'
import  Drawer  from "@mui/material/Drawer";
import ProductInCart from "./ProductInCart";
import MyContext from "../MyContext";
import { useContext } from "react";
import {RiCloseCircleLine} from 'react-icons/ri'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';



export default function CartDrawer ({open,onClose}){

    const {productCart,setProductCart} = useContext(MyContext)

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
                    key={product.id}
                    id={product.id}
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
            </Drawer>
        </div>
    );
}