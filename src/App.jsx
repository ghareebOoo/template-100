import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import NotFound from "./Pages/NotFound/NotFound.Jsx"
import Home from "./Pages/Home/Home"
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./Components/ProtectedRoute.jsx/ProtectedRoute"
import UserProvider from "./Pages/Context/User.Contetx"
import Cart from "./Components/Cart/Cart"
import CartProvider from "./Pages/Context/Cart.context"
import Orders from "./Pages/Orders/Orders"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import CheckOut from "./Pages/CheckOut/CheckOut"
import GuestRoute from "./Components/GuestRoute/GuestRoute"
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
import VerifyCode from "./Components/VerifyCode/VerifyCode"
import ResetPassword from "./Components/ResetPassword/ResetPassword"
import Offline from "./Components/Offline/Offline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Categories from "./Pages/Categories/Categories"
import Brands from "./Pages/Brands/Brands"
import Products from "./Pages/Products/Products"






function App() {
  const routes = createBrowserRouter([
    {path: "/" , element: <ProtectedRoute>
      <Layout/>
    </ProtectedRoute> , children:[
      {index: true , element: <Home/>},
      {path: "/products" , element: <Products/>},
      {path: "/categories" , element: <Categories/>},
      {path: "/brands" , element: <Brands/>},
      {path: "/allorders" , element: <Orders/>},
      {path: "/cart" , element: <Cart/>},
      {path: "/product/:id" , element: <ProductDetails/>},
      {path: "/checkout" , element: <CheckOut/>},
      {path: "*" , element: <NotFound/>}
    ]},
    {path: "/" , element:
      <GuestRoute>
         <Layout />
      </GuestRoute>
    , children:[
      {path: "login" , element: <Login/>},
      {path: "register" , element:<Register/> },
      {path: "forgetpassword" , element:<ForgetPassword/> },
      {path: "verifycode" , element:<VerifyCode/> },
      {path: "/resetpassword" , element:<ResetPassword/> },
    ]}
  ])
  const myClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={myClient}>
    <UserProvider>
      <CartProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
      </CartProvider>
    </UserProvider>
    </QueryClientProvider>
    <Offline>
      <div className="flex items-center gap-3 fixed z-50 right-14 top-20 bg-slate-300 rounded-md p-2">
        <i className="fa-solid fa-wifi"></i>
        <h2 className="text-red-500">Check Your Internet Connection</h2>
      </div>
    </Offline>
    </>
  )
}

export default App
