import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const { PORT, DB_USER,DB_PASS,DB_HOST,DB_NAME } = process.env
const app = express();

mongoose.set('strictQuery', true)
app.use(express.json());
app.use(express.static("client/build"))



// CRUD
// create - post - more secured so login \ register will also go with post
// read - get
// update - put \ patch
// delete - delete

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number ,
        required:true
    },
    category:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
})
const Product=mongoose.model('Product',productSchema)


app.post("/api/addProduct",async (req,res)=>{
    try{
        const newProduct = {...req.body};
        const createProduct=new Product(newProduct)
        await createProduct.save()
        res.send(createProduct);
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})

app.post("/api/addProducts", async (req,res)=>{
    try{
        const newProducts = [...req.body];
        const createProducts= await Product.insertMany(newProducts)
        res.send(createProducts);
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})


app.get('/api/getProductById/:productId/',async (req,res)=>{
    try{
        const {productId} = req.params;
        const prod = await Product.findOne({_id: productId})
        if(!prod){
            res.status(404).send({message: "no such product with the specific id"})
        }
        res.send(prod)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})

app.get('/api/getProductByCat/:category/',async (req,res)=>{
    try{
        const selectedCat = req.params.category;
        const prods = await Product.find({category: selectedCat})
        if(!prods){
            res.status(404).send({message: "no such product with the specific category"})
        }
        res.send(prods)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})

app.get("/api/getAllProducts", async (req,res) => {
    try{
      const products = await Product.find({})
      res.send(products)
    } catch(e){
      console.log(e)
      res.status(500).send(e.message)
    }
  })

app.put('/api/updatePrice/:productId/',async (req,res)=>{
    try{
        const { productId } = req.params;
        const newPrice =  {...req.body} ;
        const newProduct =  await Product.findOne({_id: productId}) 
        newProduct.price=newPrice.price
        res.send(newProduct);
    }catch(e){
        console.log(e)
        res.status(500).send(e.message)
    }
})

app.delete("/api/deleteProduct/:productId/",async (req,res)=>{
    try{ 
        const { productId } = req.params;
        const prod = await Product.findOneAndDelete({_id: productId});
        if(!prod){
            res.status(404).send({message: "no such product with the specific id"})
        }
        res.send(prod)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.message)
      }
})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      app.listen(PORT || 8000, () => {
        console.log("err", err);
        console.log("Ani maazin!");
      });
    }
  );

// mongoose.connect("mongodb://127.0.0.1:27017/onlineShop",{
//     useNewUrlParser:true,
//     useUnifiedTopology: true,
// });

// app.listen(8000, () => {
//     console.log(`Example app listening on port ${PORT}!`);
//   });
