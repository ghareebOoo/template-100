import { useContext, useEffect } from "react"
import { cartContext } from "../../Pages/Context/Cart.context"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"

export default function Cart() {
    const {getProducts , cartinfo , clearAll} = useContext(cartContext)

    useEffect(()=>{
        getProducts()
    }
    ,[])
  return (
    <>
    {cartinfo == null ? <Loading/> : <section className="mt-20 pb-[30px]">
        <div className="flex items-center gap-10">
        <i className="fa-brands fa-opencart text-3xl"></i>
        <p className="text-xl relative before:absolute before:w-1 before:h-6 before:bg-slate-700 before:-left-4">Your Shopping Cart</p>
        </div>
        {cartinfo.numOfCartItems == 0 ? 
        <div className="flex justify-center items-center flex-col bg-slate-300 mt-3 p-4 rounded-md">
            <p>Oops ! your cart is empty. Start shopping now by clicking the button below and find something you lovel!</p>
            <Link to="/" className="p-2 mt-3 bg-primary text-white rounded-md">Back To Home</Link>
        </div>
        : <>
        <div className="mt-5">
        {cartinfo.data.products.map((product)=> <CartItem key={product._id} productInfo = {product} />)}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-3">
            <div className="flex items-center gap-3">
                <span className="text-primary">$</span>
                <p>Your total cart price</p>
                <span className="text-primary">{cartinfo.data.totalCartPrice}</span>
            </div>
            <button 
            onClick = {clearAll}
            className="w-full md:w-auto mt-3 md:mt-0 text-white p-2 rounded-md bg-red-500"><i className=" mr-2 fa-solid fa-trash"></i>Clear ALL</button>
        </div>
        <div>
            <Link to="/checkout" 
            className="block rounded-md mt-3 bg-primary text-white w-full text-center p-2">Next Step</Link>
        </div>
        </>}
        </section>}
    </>
  )
}
