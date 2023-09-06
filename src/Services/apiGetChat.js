
import base_url from '../utils/constants'
import { getToken } from './apiLogin'


export async function getChat({id}){
    try{
        const res=await fetch(`${base_url}/conversation/messages/find-all/${id}`,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        })

        if(!res.ok){
            throw new Error('Error to load messages')
        }

        const data=await res.json()
        return data.data
    }catch(e){
        throw e
    }
}