import MyContext from "../MyContext";
import { useContext,useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import ProdactCartPage from './ProductCartPage'
import './CartPage.css'




const CartPage = () => {
  // const {productCart,setProductCart} = useContext(MyContext)
  // const  params  = useParams();
  // console.log(productCart)
  const [productsData,setProductsData]=useState([])

  const fetchProducts=async function(){
    const response=await fetch("http://localhost:8000/api/getAllProducts")
    const json= await response.json()
    setProductsData(json)
  }
  useEffect(()=>{fetchProducts()},[])
    return (
      
      <section className="Page" >
        <div className="TopDiv">
          <h1 className="Title">my cart</h1>
        </div>
        <div className="Products">
        {
        productsData.map((product)=>{
          return <ProdactCartPage
          key={product._id}
          id={product._id}
          imgUrl={product.image}
          name={product.title}
          price={product.price}
          />})
        }
        </div>
      </section>
    )
  }

  export default CartPage;