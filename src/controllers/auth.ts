import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express";
import User, {IUser} from "../models/User"
import { genPassword } from "./hashPassword";

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {username, password} = req.body

        const doUsernameExist = await User.findOne({username})
        if(doUsernameExist){
            return res
            .status(409)
            .json("invalid user, theres already an user with that name ");
        }
        const {salt, hash} = genPassword(password)

        const newUser: IUser = new User({
            username,
            salt:salt,
            hash:hash
        })
        await newUser.save()
        return res.status(201).json({ message: "user register completed" });
    }catch(err){
        console.log(err)
    }
}

export const logIn = async (req:Request, res:Response, next:NextFunction) => {
    
}
export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.isAuthenticated()) {
      // If the user is authenticated, allow access to the next middleware or route handler
      return next();
    }
  
    // If the user is not authenticated, redirect or send an error response
    res.status(401).json({ message: "Unauthorized" });
  };