import React from "react";
import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const ProductPage = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  const { productId } = useParams();
  const fetchSingleProduct = async () => {
    const response = await fetch(
      `http://localhost:8000/api/getProductById/${productId}`
    );
    const data = await response.json();
    setChosenProduct(data);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [productId]);

  return (
    <div>
      {chosenProduct && (
        <div className="MainDiv">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography className="Title" variant="h2" component="div">
                {chosenProduct.title}
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                {chosenProduct.description}
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                {chosenProduct.category}
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                {chosenProduct.price}$
              </Typography>
            </CardContent>
          </Card>
          <div className="DivImg">
            <img className="Img" alt="product" src={chosenProduct.image} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
