import { Request, Response } from "express"
import user from "../model/user"

export const getTotalUsers = async (req: Request, res: Response) => {
    try{

        const result = await user.listIndexes();

        res.send(result)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}