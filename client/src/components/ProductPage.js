import React from "react";
import './ProductPage.css' 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [chosenProduct, setChosenProduct] = useState({});
    const { productId } = useParams();
    const fetchSingleProduct = async () => {
        const response = await fetch(
          // `http://fakestoreapi.com/products/${productId}`
        `http://localhost:8000/api/getProductById/${productId}`
        );
        const data = await response.json();
        setChosenProduct(data);
      };
    
      useEffect(() => {
        fetchSingleProduct();
      }, [productId]);
    
      // console.log(chosenProduct);
    return(
        <div >
      {chosenProduct && <div className="MainDiv">
        <div className="DivInfo">
            <p className="Title">{chosenProduct.title}</p>
            <p>{chosenProduct.description}</p>
            <p>{chosenProduct.price}$</p>
            <p>{chosenProduct.category}</p>
        </div>
        <div className="DivImg">
            <img className="Img" alt="product" src={chosenProduct.image} />
        </div>
      </div>}
    </div>
    )
}
export default ProductPage