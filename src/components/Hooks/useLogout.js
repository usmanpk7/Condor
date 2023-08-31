import { useMutation, useQueryClient } from "@tanstack/react-query"
// import {logout as logoutApi} from "../../Services/apiLogin"
import { useNavigate } from "react-router"

export function useLogout(){
    const navigate=useNavigate();
    const queryClient=useQueryClient()

    const {mutate:logout}=useMutation({
        mutationFn:()=>{
            localStorage.removeItem('accessToken');
        },
        onSuccess:()=>{
            queryClient.removeQueries()
            navigate('/login', {replace:true})
        }
    })

    return {logout}
}