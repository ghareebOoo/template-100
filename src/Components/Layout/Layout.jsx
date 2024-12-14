import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"


function Layout() {
  return (
    <>
    <Navbar/>
    <div className="container p-5">
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout