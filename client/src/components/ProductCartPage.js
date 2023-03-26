import './ProductCartPage.css';
import {BiPlusCircle,BiMinusCircle} from 'react-icons/bi'
import { IconButton } from '@mui/material';



const ProductCartPage = ({name,amount,imgUrl,price}) => {
    console.log(name)
    
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

    <div className="ProductP">
        <img className="ProdImgP" src={imgUrl}></img>
        <div className='InfoProDivP'>
            <p>{name}</p>
            <p>{amount}</p>
        </div> 
        <div className='PriceDivP'>
            {(parseInt(price))}.
            <sub className='DecimalP'>{getDecimal(price)}</sub>
            $
        </div>
    </div>

    )
}
export default ProductCartPage