import { useQuery } from "react-query";
import { getChat } from "../Services/apiGetChat";

export function useGetChat(id){
    const {data: chatDetails, isLoading}=useQuery(['chat', id], () => getChat({id}))

   return {chatDetails, isLoading}
}