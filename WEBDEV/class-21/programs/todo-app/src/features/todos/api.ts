import { axiosInstance } from "../../services/axios"


export const getTodos = async () =>{
        try {
                const response = await axiosInstance.get('/todos')
                return response.data
        } catch (error) {
                throw error
        }       
}