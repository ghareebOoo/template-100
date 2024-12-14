import { useContext } from "react"
import { cartContext } from "../../Pages/Context/Cart.context"


export default function CartItem({productInfo}) {
    const {count , price , product} = productInfo
    const {category , id , imageCover , title} = product


    const {removeCart , updateProcut} = useContext(cartContext)
  return (
    <>
    <div className="flex flex-col md:flex-row gap-5 mt-3">
        <div className="flex flex-col md:flex-row flex-grow justify-between items-center rounded-md p-4 bg-slate-200">
            <img className="w-20 h-20 rounded-full object-cover" src={imageCover} alt="" />
            <h2>{title}</h2>
            <h3>{category.name}</h3>
            <div className="flex items-center gap-5 mt-5 md:mt-0">
                <spna>{count}</spna>
                <div className="flex flex-col items-center gap-2">
                    <div
                    onClick={()=>{
                        updateProcut({productId: id , count: count +1})
                    }} 
                    className="cursor-pointer icon-plus flex items-center justify-center rounded-full w-5 h-5 bg-slate-100">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div
                          onClick={()=>{
                            updateProcut({productId: id , count: count -1})
                        }}  
                    className="cursor-pointer icon-minus flex items-center justify-center rounded-full w-5 h-5 bg-slate-100">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                </div>
            </div>
        </div>
        <div
        onClick = {()=>{
            removeCart({productId: id})
        }} 
        className="cursor-pointer flex justify-center items-center bg-slate-200 p-4 rounded-md">
            <i className="fa-solid fa-xmark"></i>
        </div>
    </div>
    </>
  )
}
