import { Product } from "../models/Product.js";

export const addProductService=(newProduct)=>{

    return createProduct=new Product(newProduct)
}

export const addProductsService=(newProducts)=>{
    return createProducts= Product.insertMany(newProducts) 
}

export const getProductByIdService=(productId)=>{
    return Product.findOne({_id: productId})
}

export const getProductsByCatService=(selectedCat)=>{
    return Product.find({category: selectedCat})
}

export const getAllProductsService=()=>{
    return Product.find({})
}

export const updateProductService=(productId,updateProd)=>{
    return Product.findOneAndUpdate({_id: productId},updateProd, {new:true})
}

export const deleteProductService=(productId)=>{
    return Product.findOneAndDelete({_id: productId});
}