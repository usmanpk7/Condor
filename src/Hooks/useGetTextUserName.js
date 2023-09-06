import { useQuery } from "react-query";
import { getActiveContacts } from "../Services/apiGetActiveContacts";

export function useGetTextUserName(){
    const {data: activeContactNames, isLoading}=useQuery({
        queryFn:getActiveContacts,
        queryKey:['userDetail']
    })

    return {activeContactNames, isLoading}
}