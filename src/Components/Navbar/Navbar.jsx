import { Link, NavLink } from "react-router-dom"
import imageNav from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../Pages/Context/User.Contetx"
import { cartContext } from "../../Pages/Context/Cart.context"


function Navbar() {

    const {token , logOut} = useContext(userContext)

    const {getProducts ,cartinfo} = useContext(cartContext)

    const [links , setLink] = useState(false)
    const [social , setSocial] = useState(false)

    const toggleLinks = () => {
        setLink(prevLinks => !prevLinks);
    };

    const toggleSocial = ()=>{
        setSocial(prevSocial => !prevSocial)
    }
    useEffect(()=>{
        getProducts()
    },[])
  return (
    <>
      <nav className={`bg-slate-100 p-5 fixed top-0 left-0 right-0 z-50 md:h-16 ${links || social ? "h-64" : ""}`}>
    <div className="container flex items-center gap-5">
        <div>
            <img src={imageNav} alt="" />
        </div>
        {token ?     <ul className={`md:flex md:flex-row md:static items-center gap-3 ${links ? "absolute flex flex-col top-20": "hidden"}`}> 
            <li>
            <NavLink className={({isActive})=> `relative shape ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> `relative shape  ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/products">Products</NavLink>
            </li>      
            <li>
                <NavLink className={({isActive})=> `relative shape  ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/categories">Categories</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> `relative shape  ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/brands">Brands</NavLink>
            </li>
            <li>
            <NavLink className={({isActive})=> `relative shape  ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/allorders">Orders</NavLink>
            </li>
        </ul> : ""}
        <div
        onClick={toggleLinks} 
        className="md:hidden cursor-pointer">
            <i className="fa-solid fa-bars"></i>
        </div>
     {token ? <div className="flex items-center gap-3 ml-auto">
        <Link to="/cart" className="ml-auto relative">
        <div className="cursor-pointer flex justify-center items-center text-white absolute -translate-x-1/2 -translate-y-1/2 left-0 bottom-2 w-5 h-5 rounded-full bg-primary">
        {cartinfo == null ? <i className="fa-solid fa-spinner fa-spin"></i> : <span className="">{cartinfo.numOfCartItems}</span>}
        </div>
            <i className="fa-solid fa-cart-shopping"></i>
        </Link>
        <div
          onClick={toggleSocial}  
        className="md:hidden cursor-pointer">
            <i className="fa-solid fa-bars-progress"></i>
        </div>
        <ul className={`md:flex md:flex-row items-center gap-3 md:static ${social ? "absolute flex flex-col top-20 right-10" : "hidden"}`}>
        <li>
                <a href="www.facebook.con">
                <i className="fa-brands fa-facebook"></i>
                </a>
            </li>
            <li>
                <a href="www.instagram.con">
                <i className="fa-brands fa-instagram"></i>
                </a>
            </li>
            <li>
                <a href="www.twitter.con">
                <i className="fa-brands fa-twitter"></i>
                </a>
            </li>
            <li>
                <a href="www.linkedin.con">
                <i className="fa-brands fa-linkedin"></i>
                </a>
            </li>
            <li>
                <a href="www.youtube.con">
                <i className="fa-brands fa-youtube"></i>
                </a>
            </li>
        </ul>
        </div> : ""}
        <ul className={`flex items-center gap-3 ${token ? " " : "ml-auto"}`}>
            {!token ?  <>
                <li className="cursor-pointer"> 
                <NavLink className={({isActive})=> `relative shape ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/login">Login</NavLink>
            </li>
            <li className="cursor-pointer">
                <NavLink className={({isActive})=> `relative shape ${isActive ? "before:w-full font-bold before:transition-[width] before:duration-1000" : "before:w-0"}`} to="/register">Register</NavLink>
            </li>
            </>    :       <li className="cursor-pointer">
                <span onClick={logOut}>
                    <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
            </li>}
      
        </ul>
    </div>
   </nav>
    </>
  )
}

export default Navbar