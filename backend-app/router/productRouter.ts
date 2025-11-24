import express from "express";
import type { IProduct } from "../models/IProduct.ts";
import ProductTable from "../models/Product.ts";

const productRouter: express.Router = express.Router();

/*
    1. INFO : READ all the Products Info
       URL : http://127.0.0.1:5000/api/products
       METHOD : GET
       FIELDS : no-fields 
 */
productRouter.get(
  "/products",
  async (request: express.Request, response: express.Response) => {
    try {
      let products = await ProductTable.find();
      response.status(200).json({ products: products });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }
);

/*
2. INFO : READ a single Product Info
   URL : http://127.0.0.1:5000/api/products/:productId
   METHOD : GET
   FIELDS : no-fields
 */
productRouter.get(
  "/products/:productId",
  async (request: express.Request, response: express.Response) => {
    let productId: string = request.params.productId;
    try {
      let product = await ProductTable.findById(productId);
      response.status(200).json({ product: product });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }
);

/*
3. INFO : CREATE a Product
   URL : http://127.0.0.1:5000/api/products
   METHOD : POST
   FIELDS : name , image , price , qty , info
 */
productRouter.post(
  "/products",
  async (request: express.Request, response: express.Response) => {
    let newProduct: IProduct = {
      name: request.body.name,
      image: request.body.image,
      price: request.body.price,
      qty: request.body.qty,
      info: request.body.info,
    };
    try {
      // check if already a product with the same name exists
      let product = await ProductTable.findOne({ name: newProduct.name });
      if (product) {
        return response.status(401).json({ msg: "product is already exits" });
      }
      //insert
      product = new ProductTable(newProduct);
      product = await product.save();
      response
        .status(200)
        .json({ msg: "product is Created", product: product });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }
);

/*
4. INFO : UPDATE a Product
   URL : http://127.0.0.1:5000/api/products/:productId
   METHOD : PUT
   FIELDS : name , image , price , qty , info
 */
productRouter.put(
  "/products/:productId",
  async (request: express.Request, response: express.Response) => {
    let productId: string = request.params.productId;
    let updatedProduct: IProduct = {
      name: request.body.name,
      image: request.body.image,
      price: request.body.price,
      qty: request.body.qty,
      info: request.body.info,
    };
    try {
      // check if the product is exists
      let product = await ProductTable.findById(productId);
      if (!product) {
        return response.status(401).json({ msg: "product is not available" });
      }
      // update
      product = await ProductTable.findByIdAndUpdate(
        productId,
        {
          $set: updatedProduct,
        },
        { new: true }
      );
      response.status(200).json({ msg: "Product is Updated" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }
);

/*
5. INFO : DELETE a Product
   URL : http://127.0.0.1:5000/api/products/:productId
   METHOD : DELETE
   FIELDS : no-fields
 */
productRouter.delete(
  "/products/:productId",
  async (request: express.Request, response: express.Response) => {
    let productId: string = request.params.productId;
    try {
      // check if the product is exists
      let product = await ProductTable.findById(productId);
      if (!product) {
        return response.status(401).json({ msg: "product is not available" });
      }
      // delete
      product = await ProductTable.findByIdAndDelete(productId);
      response.status(200).json({ msg: "Product is Deleted" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }
);

export default productRouter;
