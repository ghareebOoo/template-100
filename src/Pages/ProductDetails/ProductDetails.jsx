import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loading from "../../Components/Loading/Loading"
import { cartContext } from "../Context/Cart.context"
import ReactImageGallery from "react-image-gallery"
import Card from "../../Components/Card/Card"
import { Swiper , SwiperSlide } from "swiper/react"
import "swiper/css"
import { Helmet } from "react-helmet"


export default function ProductDetails() {

    const {addToCart} = useContext(cartContext)

    const [productDetails , setProductDetails] = useState(null)
    const [related , setRelated] = useState(null)
    const {id} = useParams()
    async function getdetails(){
        let toastId = toast.loading(" get details ...")
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method:"GET",
            }
            let {data} = await axios.request(options)
            console.log(data)
            setProductDetails(data.data)
            toast.success("get details successfully")
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function relatedProduct(){
        let toastId = toast.loading("get related product")
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: "GET",
            }
            let {data} = await axios.request(options)
            console.log(data)
            setRelated(data.data)
            toast.success("get related successfully")
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    useEffect(()=>{
        getdetails()
    },[id])

    useEffect(()=>{
        if(productDetails == null)return
        relatedProduct()
    },[productDetails])
  return (
    <>
     <Helmet>
        <title>Product Details</title>
        <meta name="Products" content="Product Details & Related ...." />
     </Helmet>
    <div className="pt-[100px] pb-[30px]">
    {productDetails && related ?  <>
    <Helmet>
        <title>{productDetails.title}</title>
    </Helmet>
    <section>
       
    <section>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={productDetails.id}>
    <div className="col-span-1 md:col-span-1">
      <ReactImageGallery
        showFullscreenButton={false}
        showNav={false}
        showPlayButton={false}
        items={productDetails.images.map((image) => {
          return { original: image, thumbnail: image };
        })}
      />
    </div>
    <div className="col-span-1 md:col-span-1">
      <div>
        <h2 className="text-gray-700 text-xl">{productDetails.title}</h2>
        <h3 className="text-primary">{productDetails.category.name}</h3>
      </div>
      <p className="mt-3">{productDetails.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-bold">{productDetails.price} L.E</span>
        <span>
          <i className="text-yellow-600 mr-2 fa-solid fa-star"></i>
          {productDetails.ratingsAverage}
        </span>
      </div>
      <button
        onClick={() => {
          addToCart(id);
        }}
        className="w-full mt-5 p-2 rounded-md text-white bg-primary"
      >
        Add To Cart
      </button>
    </div>
  </div>
</section>
      
   </section>
   <section>
    <div>
    <h2 className="text-2xl text-gray-500 my-10">Related Products</h2>
    <Swiper loop={true} autoplay={true} breakpoints={{640:{slidesPerView: 1}, 
    768:{slidesPerView: 3}, 
    1024:{slidesPerView: 6}, }} spaceBetween={10}>
    {related.map((re)=> 
    <SwiperSlide key={re._id}>
        <Card  productInfo={re}/>
    </SwiperSlide>
    )}
    </Swiper>
    </div>
   </section>
    </>  : <Loading/>}
    </div>
    </>
  )
}
