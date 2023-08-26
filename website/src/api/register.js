import axios from "axios"
import { API_URL } from "../config1"

const customer_register_api= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/customer/register",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default customer_register_api