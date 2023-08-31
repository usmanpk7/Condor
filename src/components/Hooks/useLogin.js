import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLogin } from "../../Services/apiLogin";
import { toast } from 'react-hot-toast';


export function useLogin(){
    
    const queryClient=useQueryClient();
    const navigate=useNavigate()

    const {mutate:login, isLoading}=useMutation({
        mutationFn:({email, password})=>getLogin({email, password}),
        onSuccess:(user)=>{
            // console.log(user);
            queryClient.setQueryData(['user'], user.user)
            navigate('/conversation', {replace:true})
            localStorage.setItem('accessToken', user?.data?.accessToken);
            toast.success('Successfully Login')
        },
        onError: (error) => {
            console.error(error);
            toast.error('User Not Found');
        }
    })

    return {login, isLoading}
}

