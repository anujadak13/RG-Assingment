import jwt from "jsonwebtoken"
import { User } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyJWT = async (req, _, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized Request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findByPk(decodedToken?.id, {
            attributes: { exclude: ['password', 'refreshToken'] }
        })
    
        if(!user){
            throw new ApiError(401, "Invalid AccessToken")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
}

export{
  verifyJWT
}