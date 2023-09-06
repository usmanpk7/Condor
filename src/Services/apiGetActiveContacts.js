
import base_url from '../utils/constants'
import { getToken } from './apiLogin'

export async function getActiveContacts(){
    try{
        const res= await fetch(`${base_url}/conversation/find-all`,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        })

        if(!res.ok){
            throw new Error("UnAuthorized")
        }

        const data=await res.json()

        return data.data
    }catch(e){
        throw e
    }
}