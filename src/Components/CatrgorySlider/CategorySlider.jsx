import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"



export default function CategorySlider() {

    const [category , setCategory] = useState(null)


    async function getSlider(){
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/categories",
        }
        let {data} = await axios.request(options)
        setCategory(data.data);
    }


    useEffect(()=>{
        getSlider()
    } , [])
  return (
    <>
    {category ? <div className="">
        <h2 className="text-xl font-bold mb-3">Shop Popular Categories</h2>
        <div className="">
        <swiper-container loop={true}
        preakpoints={{640: {slidesPerView:2 , spaceBetween: 10}, 
        768: {slidesPerView:3 , spaceBetween: 15},
        1024: {slidesPerView:6 , spaceBetween: 20} }}
        >
            {category.map((ca)=> <swiper-slide key={ca._id}>
                <div >
                    <img className="w-full h-80 object-cover" src={ca.image} alt="" />
                    <h3>{ca.name}</h3>
                </div>
            </swiper-slide>)}
        </swiper-container>
        </div>
    </div>: <Loading/>}
    </>
  )
}
