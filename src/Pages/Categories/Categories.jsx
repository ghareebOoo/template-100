import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"


export default function Categories() {

    async function getCategories(){
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET",
        }
        return axios.request(options)
    }

    let {data , isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        
    })
    console.log(data)

    if(isLoading) return <Loading/>

  return (
   <>
   <section className="mt-20 pb-[30px]">
    <h2>Categories</h2>
    <div className="grid grid-cols-12 gap-5 mt-5">
        {data.data.data.map((ca)=> 
        <div  key={ca._id} className="transition-all hover:scale-105 hover:shadow-xl hover:shadow-70 duration-1000 col-span-12 md:col-span-4 border-2 border-gray-200 rounded-md">
            <img className="w-full h-[80%] object-cover" src={ca.image} alt="" />
            <h3 className="font-semibold text-primary text-xl text-center p-1 mt-3">{ca.name}</h3>
        </div>
        )}
    </div>
   </section>
   </>
  )
}
