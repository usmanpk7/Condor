import { useMutation, useQueryClient } from "react-query";
import { deleteChat } from "../Services/apiDeleteChat";
import { toast } from 'react-hot-toast';



export function useDeleteChat(){
    const queryClient=useQueryClient();

    const {mutate: removeChat, isLoading}=useMutation({
        mutationFn: (id) => deleteChat(id),
        onSuccess:(deletedChatId)=>{
            queryClient.invalidateQueries(['chat', deletedChatId]);
          toast.success('Successfully Deleted')

        },
        onError: (error) => {
            toast.error('Cannot Delete');
        }
    })

    return {removeChat, isLoading}
}