import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const Uploadfile= async (req, res)=>{
const filelocapath = req.files?.file[0]?.path
    if(!filelocapath){
      throw new ApiError(400, "file is required")
    }

    return res.status(200).json(
      new ApiResponse(200, Uploadfile, "File uploaded successfully")
    )
}
       
export{
  Uploadfile
}