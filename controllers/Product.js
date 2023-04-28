import { addProductService,addProductsService,getProductByIdService,getProductsByCatService,
    getAllProductsService,updateProductService,deleteProductService } from "../services/Product.js";

export const addProductController=async (req,res)=>{
    try{
        const newProduct = {...req.body};
        const createProduct = addProductService(newProduct)
        await createProduct.save()
        res.send(createProduct);
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
}

export const addProductsController=async (req,res)=>{
    try{
        const newProducts = [...req.body];
        const createProducts = await addProductsService(newProducts)
        res.send(createProducts);
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
}

export const getProductByIdController = async (req,res)=>{
    try{
        const {productId} = req.params;
        const prod = await getProductByIdService(productId)
        if(!prod){
            res.status(404).send({message: "no such product with the specific id"})
        }
        res.send(prod)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
}

export const getProductsByCatController = async (req,res)=>{
    try{
        const selectedCat = req.params.category;
        const prods = await getProductsByCatService(selectedCat)
        if(!prods){
            res.status(404).send({message: "no such product with the specific category"})
        }
        res.send(prods)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
}

export const getAllProductsController = async (req,res) => {
    try{
      const products = await getAllProductsService()
      res.send(products)
    } catch(e){
      console.log(e)
      res.status(500).send(e.message)
    }
  }

export const updateProductController = async (req,res)=>{
    try{
        const { productId } = req.params;
        var newProd={...req.body}
        const newProduct =  await updateProductService(productId,newProd) 
        res.send(newProduct);
    }catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
}

export const deleteProductController = async (req,res)=>{
    try{ 
        const { productId } = req.params;
        const prod = await deleteProductService(productId)
        if(!prod){
            res.status(404).send({message: "no such product with the specific id"})
        }
        res.send(prod)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
      }
}