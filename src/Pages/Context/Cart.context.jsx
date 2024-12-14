import { createContext, useContext, useState } from "react";
import { userContext } from "./User.Contetx";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

export const cartContext = createContext(null)




export default function CartProvider({children}){
    const {token} = useContext(userContext)
    const [cartinfo , setCartinfo] = useState(null)
 
    async function addToCart(productId){
        let toastId = toast.loading("add product ...")
        try{
            const options = {
                method: "POST",
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                headers:{
                    token
                },
                data:{
                    productId
                }
            }
            let {data} = await axios.request(options)
            console.log(data)
            if(data.status == "success"){
                toast.success("Product added successfully to your cart")
                getProducts()
            }

        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function getProducts(){
        let toastId = toast.loading("get products...")
        try{
            const options = {
                method: "GET",
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            console.log(data)
            if(data.status == "success"){
                setCartinfo(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function removeCart({productId}){
        let toastId = toast.loading("remove carrt....")
        try{
            const options = {
                method:"DELETE",
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            if(data.status == "success"){
                setCartinfo(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }

    }

    async function clearAll (){
        let toastId = toast.loading("remove all carts")
        try{
            const options = {
                method: "DELETE",
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            if(data.message == "success"){
                setCartinfo({numOfCartItems : 0})}
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function updateProcut({productId , count}){
        let toastId = toast.loading("update product ...")
        try{
            const options = {
                method: "PUT",
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                headers:{
                    token
                },
                data:{
                    count
                }
            }
            let {data} = await axios.request(options)
            if(data.status == "success"){
                setCartinfo(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }
    return <cartContext.Provider value = {{addToCart , getProducts , cartinfo , removeCart , clearAll , updateProcut}}>
        {children}
    </cartContext.Provider>
}