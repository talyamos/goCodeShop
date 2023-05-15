import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./CollectionSort.css";
import MyContext from "../MyContext";
import { useContext, useState } from "react";

const FilterCollection = () => {
  const { allProducts, setProductsData, categories, setCopyProductsData } =
    useContext(MyContext);
  const [category, setCategory] = useState("");

  const filterProducts = (event) => {
    const department = [...allProducts];
    if (event.target.value === "allProducts") {
      setProductsData(allProducts);
      setCopyProductsData(allProducts);
      setCategory(event.target.value);
    } else {
      const newProducts = department.filter(
        (prod) => prod.category === event.target.value
      );
      setProductsData(newProducts);
      setCopyProductsData(newProducts);
      setCategory(event.target.value);
    }
  };

  return (
    <div className="collection-sort">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="filter by">Filter by:</InputLabel>
        <Select
          onChange={filterProducts}
          id="filter by"
          value={category}
          label="Filter by:"
        >
          <MenuItem value="allProducts">All Products</MenuItem>
          {categories.map((category, index) => {
            return (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterCollection;
