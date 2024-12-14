import { useContext } from "react"
import { cartContext } from "../../Pages/Context/Cart.context"
import { Link } from "react-router-dom"




function Card({productInfo}) {
    const {images , title , price , category , ratingsAverage , id} = productInfo

    const {addToCart} = useContext(cartContext)



  return (
    <>
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className="relative">
        <img className="w-full" src={images[0]} alt="" />
        <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-1000 flex items-center gap-2 justify-center absolute w-full h-full left-0 top-0 bg-black bg-opacity-15">
            <div className="icon hover:scale-110 hover:rotate-6 transition-transform duration-1000 cursor-pointer w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                <i className="fa-solid fa-heart"></i>
            </div>
            <div
            onClick = {()=>{
                addToCart(id)
            }}
            className="icon  hover:scale-110 hover:rotate-6 transition-transform duration-1000 cursor-pointer w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link to={`/product/${id}`}
            className="icon hover:scale-110 hover:rotate-6 transition-transform duration-1000 cursor-pointer w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                <i className="fa-solid fa-eye"></i>
            </Link>
        </div>
        </div>
        <div className="p-3">
            <h3 className="text-primary">{category.name}</h3>
            <h2 className="text-lg font-semibold ">{title.split(" ").slice(0,2).join(" ")}</h2>
            <div className="flex items-center justify-between mt-4">
                <span>{price} L.E</span>
                <div className="flex gap-1 items-center">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span>{ratingsAverage}</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Card