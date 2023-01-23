import './ProductInCart.css';
import {BiPlusCircle,BiMinusCircle} from 'react-icons/bi'
import { IconButton } from '@mui/material';



const ProductInCart = ({name,amount,imgUrl,price}) => {
    
    const getDecimal=(price)=>{
        const dec=price.toString().split(".")[1]
        if(typeof dec === 'undefined'){
            return '00'
        }
        if(dec/10<1){
            return dec+'0'
        }
        return dec
    }

    return(
    <div className="Product">
        <div className='PriceDiv'>
            {(parseInt(price))}.
            <sub className='Decimal'>{getDecimal(price)}</sub>
            $
        </div>
        <div className='InfoProDiv'>
            <p>{name}</p>
            <p>{amount}</p>
        </div> 
        <img className="ProdImg" src={imgUrl}></img>
    </div>
    )
}
export default ProductInCart