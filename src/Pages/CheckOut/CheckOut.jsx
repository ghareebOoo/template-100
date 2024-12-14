import { useFormik } from "formik"
import { useContext, useState } from "react"
import { userContext } from "../Context/User.Contetx"
import { cartContext } from "../Context/Cart.context"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export default function CheckOut() {

    const {token} = useContext(userContext)
    const {cartinfo} = useContext(cartContext)
    const [order , setOrder] = useState(null)

    const navigate = useNavigate()


    async function cashOrder(values){
        let toastId = toast.loading("making cash order")
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartinfo.cartId}`,
                method:"POST",
                headers:{
                    token
                },
                data: values
            }
            let {data} = await axios.request(options)
            if(data.status == "success"){
                toast.success("order has been created")
                setTimeout(()=>{
                    navigate("/allorders")
                } , 2000)
            }
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function onlinePayment(values){
        let toastId = toast.loading("making online order")
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartinfo.cartId}?url=${location.origin}`,
                method:"POST",
                headers:{
                    token
                },
                data: values
            }
            let {data} = await axios.request(options)
            console.log(data)
            if(data.status == "success"){
                location.href = data.session.url
            }
        }catch(error){
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }


    const formik = useFormik({
        initialValues:{
            shippingAddress:{
                "details": "",
                "phone": "",
                "city": "",
                },
        },

        onSubmit: (values)=>{
            if (order == "cash") cashOrder(values)
            else onlinePayment(values)
        }
    })
  return (
    <>
    <div className="mt-20 pb-[30px]">
    <h2 className="text-xl text-slate-700">Shipping Address</h2>
    <form className="mt-5 space-y-3" onSubmit={formik.handleSubmit}>
        <div>
            <input  className="form-control w-full border-2 border-slate-200 rounded-md p-1" 
            type="text" 
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.city}
            name="shippingAddress.city"
            placeholder="City"
            />
        </div>
        <div>
            <input  className="form-control w-full border-2 border-slate-200 rounded-md p-1" 
            type="tel" 
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.phone}
            name="shippingAddress.phone"
            placeholder="Phone"
            />
        </div>
        <div>
            <textarea className="form-control w-full border-2 border-slate-200 rounded-md p-2" 
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.details}
                name="shippingAddress.details"
                placeholder="Details"
            ></textarea>
        </div>
        <button 
        onClick = {()=>{
            setOrder("cash")
        }}
        type="submit"
        className="bg-blue-500 text-white rounded-md p-2">Cash Order</button>
        <button
           onClick = {()=>{
            setOrder("online")
        }} 
          type="submit"
        className="bg-primary text-white rounded-md p-2 ml-2">Online Payment</button>
    </form>
    </div>
    </>
  )
}
