import './Products.css';
import ProductCard from "./ProductCard"; 
import {useContext} from 'react';
import MyContext from '../MyContext';


const Products=()=>{   
  const {productsData, setProductsData} = useContext(MyContext)

  return(
      <section className="products">
        {
        productsData.map((product)=>{
          return <ProductCard
          key={product._id}
          id={product._id}
          imgUrl={product.image}
          title={product.title}
          price={product.price}
          />})
        }
      </section>
    )  
  }

  export default Products;
