import { display } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import './ProductCard.css';
import MyContext from '../MyContext';
import {BiPlusCircle,BiMinusCircle} from 'react-icons/bi'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


const ProductCard=({id,imgUrl,title,price})=>{
  const {productCart,setProductCart} = useContext(MyContext)
  const [amount,setAmount]=useState(0)
  const [addState,setAddState]=useState(true)
  const [btnState,setBtnState]=useState('Add')

  // useEffect(()=>{productState()},[])

  const minusAmount=()=>{
    if(amount!=0){
    const currentAmount=amount-1
    setAmount(currentAmount)
    }
  }
  const plusAmount=()=>{
    const currentAmount=amount+1
    setAmount(currentAmount) 
  }

  const productState=()=>{
    const newProdCart=[...productCart]
    if(addState){
      const addProd={id,title,amount,imgUrl,price}
      newProdCart.push(addProd)
      setProductCart(newProdCart)
      setAddState(false)
      setBtnState('Update')
    }
    else{
      if(amount===0){
        const index=newProdCart.findIndex((prod)=>prod.title===title) 
        newProdCart.splice(index,1)
        setProductCart(newProdCart)
        setAddState(true)
        setBtnState('Add')
      }
      else{
        const index=newProdCart.findIndex((prod)=>prod.title===title) 
        const updateProd=newProdCart.find((prod)=>prod.title===title)
        newProdCart.splice(index,1)
        updateProd.amount=amount
        newProdCart.splice(index,0,updateProd)
        newProdCart.push(updateProd)
      }
    }
  } 
  
    return(
      <div className="product-card">
          <div className="product-image">
            <img
              src={imgUrl}
            />
          </div>
          <div className="product-info">
            <h5>{title}</h5>
            <h6>{price}$</h6>
            <div className='Amount'>
            <Button  onClick={productState}>{btnState}</Button>
            <IconButton className='AmountBtn' onClick={minusAmount}><BiMinusCircle/></IconButton>
            <p className='PAmount'>{amount}</p>
            <IconButton className='AmountBtn' onClick={plusAmount}><BiPlusCircle/></IconButton>
            </div>
          </div>
        </div>
    )
  }

  export default ProductCard;
