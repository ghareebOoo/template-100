import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../Context/User.Contetx"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"
import Loading from "../../Components/Loading/Loading"


export default function Orders() {
  const {token} = useContext(userContext)
  const {id} = jwtDecode(token);

  const [userOrder , setUserOrder] = useState(null)
  console.log(id);
  async function getUserOrders(){
    const toastId = toast.loading("get user order")
    try{
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, 
        method:"GET"
      }
      let {data} = await axios.request(options)
      setUserOrder(data)
      console.log(data)
    }catch(error){
      console.log(error)
    }finally{
      toast.dismiss(toastId)
    }
  }
  useEffect(()=>{
    getUserOrders()
  },[])
  return (
    <>
    {userOrder ?     <section className="mt-20 pb-[30px]">
      {userOrder.map((order)=> 
         <div key={order.id} className="border-2 border-gray-400 border-opacity-60 mb-3">
         <div className="header p-3 flex justify-between items-center">
           <div>
             <h2 className="text-gray-300">Order ID</h2>
             <span className="font-semibold text-lg">#{order.id}</span>
           </div>
           <div>
            {order.isDelivered ?  <span className="font-cairo bg-lime-400 p-2 rounded-md text-white">تم الاستلام</span> : <span className="font-cairo bg-blue-600 p-2 rounded-md text-white">قيد التوصيل</span>}
            {order.isPaid ?  <span className="font-cairo mr-3 bg-lime-400 p-2 rounded-md text-white">تم الدفع</span> : <span className="font-cairo mr-3 bg-primary p-2 rounded-md text-white">لم يتم الدفع</span>}

           </div>
         </div>
         <div className="content p-3 mt-3 gap-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {order.cartItems.map((product)=> 
                 <div key={product._id} className="rounded-md p-3 border-2 border-gray-400 border-opacity-60">
                 <img className="w-32" src={product.product.imageCover} alt=""/>
                 <h3 className="mt-3">{product.product.title}</h3>
                 <span className="mt-3 text-gray-900 font-semibold">{product.price} L.E</span>
                 </div>    
          )}      
         </div>
         <p className="text-lg my-5 ml-3">Toatl order price is{" "}<span className="text-primary font-semibold">{order.totalOrderPrice}</span>{" "}L.E</p>
       </div>
      )}
    </section> : <Loading/>}
    </>
  )
}
