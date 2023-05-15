import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";

const SortCollection = () => {
  const { allProducts, productsData, setProductsData, copyProductsData } =
    useContext(MyContext);

  const [prodByPrice, setProdByPrice] = useState([]);
  const [value, setValue] = useState([0, 1000]);

  useEffect(() => {
    const newProducts = copyProductsData.filter(
      (prod) => prod.price >= value[0] && prod.price <= value[1]
    );
    setProductsData(newProducts);
  }, [value, copyProductsData, setProductsData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="collection-sort">
      <label>Price range:</label>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Price range"}
          max={1000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
};

export default SortCollection;
