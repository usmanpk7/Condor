import { useMutation, useQueryClient } from "react-query";
import {addUser} from '../Services/apiAddUser'
import { toast } from "react-hot-toast";


export function useAddUser(){
    const queryClient=useQueryClient()

    const {mutate:addNewUser, isLoading}=useMutation({
        mutationFn:({firstName, lastName, email})=>addUser({firstName, lastName, email}),
        onSuccess:(newUser)=>{
            queryClient.setQueryData(['newUser'], newUser)
               // Invalidate the 'contacts' query, causing it to refetch
               queryClient.invalidateQueries('contacts');
            toast.success(' User Successfully Added')
        },
        onError: (error) => {
            // console.error(error);
            toast.error('User Not Added');
        }
    })

    return {addNewUser, isLoading}
}