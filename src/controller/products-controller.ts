import { Request, Response } from "express";
import productsModel from "../model/products";

export const getProducts = async (req: Request, res: Response) => {
    try{
        const skip = (parseInt(req.query.page as string) - 1) * 3
        const products = await productsModel.find().skip(skip).limit(3);

        res.status(200).json(products)

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}

export const getProductsById = async (req: Request, res: Response) => {
    try{
        const product = await productsModel.findById(req.params.id)

        if(!product){
            res.status(404).json({ message: "product doesn't exist" })
        }

        res.send(product)

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}