import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import { addProductController,addProductsController,getProductByIdController,getProductsByCatController,getAllProductsController,updateProductController,deleteProductController } from "./controllers/Product.js";
dotenv.config()
const { PORT, DB_USER,DB_PASS,DB_HOST,DB_NAME } = process.env
const app = express();

mongoose.set('strictQuery', true)
app.use(express.json());
app.use(express.static("client/build"))
app.use(cors())

// CRUD
// create - post - more secured so login \ register will also go with post
// read - get
// update - put \ patch
// delete - delete

app.post("/api/addProduct",addProductController)
app.post("/api/addProducts",addProductsController)
app.get('/api/getProductById/:productId/',getProductByIdController)
app.get('/api/getProductsByCat/:category/',getProductsByCatController)
app.get("/api/getAllProducts", getAllProductsController)
app.put('/api/updateProduct/:productId/',updateProductController)
app.delete("/api/deleteProduct/:productId/",deleteProductController)

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
