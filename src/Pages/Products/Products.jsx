import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { cartContext } from "../Context/Cart.context";
import { useState } from "react";

export default function Products() {
    const { addToCart } = useContext(cartContext);
    const [colors, setColors] = useState([]); 

    function changeId(productId) {
     
        if (colors.includes(productId)) {
            setColors(colors.filter(id => id !== productId));
        } else {
            setColors([...colors, productId]);
        }
    }

    async function getProducts() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/products",
            method: "GET",
        };
        return await axios.request(options);
    }

    let { data, isLoading } = useQuery({
        queryKey: ["Product"],
        queryFn: getProducts,
        refetchOnMount: false
    });
    if (isLoading) return <Loading />;
    
    return (
        <>
            <section className="mt-20 pb-[30px]">
                <input className="w-full p-2 rounded-md border-2 border-gray-200" type="text" placeholder="Search"/>
                <div className="grid grid-cols-12 gap-5 mt-10">
                    {data.data.data.map((pro) => (
                        <div key={pro.id} className="group col-span-12 md:col-span-6 lg:col-span-3 transition-all hover:scale-105 hover:shadow-xl hover:shadow-70 duration-1000 border-2 border-gray-200 rounded-md">
                            <img className="w-full" src={pro.imageCover} alt="" />
                            <div className="p-2">
                                <h3 className="mt-3 text-primary">{pro.category.name}</h3>
                                <h4 className="mt-1 line-clamp-2">{pro.title.split(" ").splice(0, 2).join(" ")}</h4>
                                <div className="mt-5 flex justify-between items-center">
                                    <span>{pro.price} L.E</span>
                                    <span><i className="fa-solid fa-star text-yellow-600"></i>{pro.ratingsAverage}</span>
                                </div>
                                <div
                                    onClick={() => {
                                        addToCart(pro.id);
                                    }}  
                                className="relative mt-6 mb-6 flex items-center justify-between">
                                    <div className="absolute transition-all duration-1000 translate-y-[100px] opacity-0 group-hover:translate-y-[0px] group-hover:opacity-100 px-10 py-2 rounded-md cursor-pointer text-white bg-primary">
                                        <i className="fa-solid fa-plus"></i>
                                        Add 
                                    </div>
                                    <i 
                                        onClick={() => changeId(pro.id)}   
                                        className={`text-xl absolute right-0 cursor-pointer fa-solid fa-heart ${colors.includes(pro.id) ? "text-red-700" : "text-black"}`} 
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
