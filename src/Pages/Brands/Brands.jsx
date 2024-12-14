import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"


export default function Brands() {

    async function getBrands(){
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/brands",
            method:"GET",
        }
        return await axios.request(options)
    }

    let {data , isLoading} = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands
    })
    console.log(data)
    if(isLoading) return <Loading/>
  return (
   <>
   <section className="mt-20 pb-[30px]">
    <h2 className="text-center text-3xl font-bold text-primary">All Brands</h2>
    <div className="grid grid-cols-12 gap-5 mt-5">
        {data.data.data.map((br)=>
        <div key={br._id} className="col-span-12 md:col-span-3 p-5 border-2 transition-all hover:scale-105 hover:shadow-xl hover:shadow-70 duration-1000 border-gray-200 rounded-md">
            <img src={br.image} alt="" />
            <h3 className="text-center">{br.name}</h3>
        </div>
        )}
    </div>
   </section>
   </>
  )
}
