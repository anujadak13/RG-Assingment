import { Getweather } from "../services/weather.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const GetweatherInfo = async (req, res) => {
    const { location } = req.params;
    const weather = await Getweather(location);
      if(!weather){
        throw new ApiError(400, "All fields are required")
      }
    return res.status(200).json(
       new ApiResponse(200, weather, "Weather Details got Successfully")
    )

}

export{
    GetweatherInfo
}
