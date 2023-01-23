import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useContext,useState } from 'react';
import MyContext from '../MyContext';


const SortCollection=()=>{
  const {allProducts,productsData,setProductsData,copyProductsData} = useContext(MyContext)
  
  const [prodByPrice, setProdByPrice] =useState([]);
  const [value, setValue] =useState([0, 1000]);


  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newProducts= copyProductsData.filter((prod)=>prod.price>newValue[0]&&prod.price<newValue[1])
    setProductsData(newProducts)
  };
  

    return(
      <div className="collection-sort">
        <label>Price range:</label>
        <Box sx={{ width: 300 }}>
          <Slider
          getAriaLabel={() => 'Price range'}
          max={1000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          />
          </Box>
            
      </div>
    )
  }
  
  export default SortCollection;


  /* <select>
              <option value="/">Featured</option>
              <option value="/">Best Selling</option>
              <option value="/">Alphabetically, A-Z</option>
              <option value="/">Alphabetically, Z-A</option>
              <option value="/">Price, low to high</option>
              <option value="/">Price, high to low</option>
              <option value="/">Date, new to old</option>
              <option value="/">Date, old to new</option>
            </select> */