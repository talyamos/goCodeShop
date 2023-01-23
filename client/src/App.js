import React, { useEffect, useState } from 'react';
import './App.css';
import CartDrawer from './components/CartDrawer';
import Main from './components/Main';
import MyContext from './MyContext';


function App() {

  const [productsData,setProductsData]=useState([])
  const [allProducts,setAllProduct]=useState([])
  const [copyProductsData,setCopyProductsData]=useState([])
  const [productCart,setProductCart]=useState([])

  const fetchProducts=async function(){
    const response=await fetch("https://fakestoreapi.com/products")
    const json= await response.json()
    setProductsData(json)
    setAllProduct(json)
    setCopyProductsData(json)
    }

  useEffect(()=>{fetchProducts()},[])

  const categories = allProducts.map(p => p.category)
  .filter((value, index, array) => array.indexOf(value)===index);

  

  return (
    <MyContext.Provider value={{productsData, setProductsData,allProducts,setAllProduct,
    productCart,setProductCart,copyProductsData,setCopyProductsData,categories}}>
    <div className="App">
      <Main/>
    </div>
    </MyContext.Provider>
  );
}

export default App;




