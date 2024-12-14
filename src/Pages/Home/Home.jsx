// import { useEffect, useState } from "react";
import CategorySlider from "../../Components/CatrgorySlider/CategorySlider";
import Loading from "../../Components/Loading/Loading";
import Slider from "../../Components/Slider/Slider";
import axios from "axios";
import Card from "../../Components/Card/Card";
import useOnlineStatement from "../../Components/hooks/useOnlineStatement";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";


export default function Home() {

    // const [products , setProducts] = useState(null)

    let isOnline = useOnlineStatement()


    // async function getProducts(){
    //     const options = {
    //         method: "GET",
    //         url : "https://ecommerce.routemisr.com/api/v1/products/"
    //     }
    //     let {data} = await axios.request(options)
    //     setProducts(data.data)
    // }


    // useEffect(()=>{
    //     getProducts()
    // } , [])

    async function getProducts(){
        const options = {
            method: "GET",
            url : "https://ecommerce.routemisr.com/api/v1/products/"
        }
        return axios.request(options)
    }
    


 let {data , isLoading} = useQuery({
    queryKey: ["products"],
    queryFn:getProducts
 })
 console.log(data)
 if(isLoading) return <Loading/>
  return (
   <>
   <Helmet>
    <title>Home</title>
    <meta name="Home" content="main page...." />
   </Helmet>
   <section className="mt-20 pb-[30px]">
   <h2>{isOnline ? "Online" : "Offline"}</h2>
   <Slider/>
   <CategorySlider/>
   {/* {products ?<div className="container grid grid-cols-12 gap-4 mt-6">{products.map((product) => <Card  productInfo={product} key={product.id}/>)}</div> : <Loading/>} */}
    <div className="container grid grid-cols-12 gap-4 mt-6">{data.data.data.map((product) => <Card  productInfo={product} key={product.id}/>)}</div> 
   </section>
   </>
  )
}
