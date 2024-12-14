import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { userContext } from "../Context/User.Contetx"

function Login() {

  const {token , setToken} = useContext(userContext)

  const [errormsg , setErrormsg] = useState(null)
  const navigate = useNavigate()

  async function handelSubmit(values){

    let id;

    try{
    const options ={
      method: "POST",
      url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
      data: values
    }

      toast.loading("waiting...")
      let {data} = await axios.request(options);
      console.log(data)
      toast.dismiss(id)
      if(data.message == "success"){
        toast.success("you are logedin successfully")
        localStorage.setItem("token" , data.token)
        setToken(data.token)
        console.log(token)
        navigate("/")
      }
     }catch(error){
      setErrormsg(error.response.data.message)
      toast.dismiss(id)
      toast.error(error.response.data.message)
     }
  }

   const validation = yup.object({
    email: yup.string().required("email is required").email("email is not valid"),
    password: yup.string().required("password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"password is not valid"),
   })

  const formik = useFormik({
    initialValues:{
      email:"",
      password: "",
    },


    onSubmit: handelSubmit,


    validationSchema: validation
  })



  return (
    <>
    <div className="pb-[30px] mt-20">
      <h2>Login Now:</h2>
      <form className="space-y-2" onSubmit={formik.handleSubmit}>
        <div>
        <label htmlFor="email">Email:</label>
        <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1" 
        type="email"  id="email"
        name ="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
          {formik.errors.email && formik.touched.email ? <div className="text-red-500">*{formik.errors.email}</div>: ""}
        </div>
        <div>
        <label htmlFor="pass">Password:</label>
        <input className="form-control w-full border-2 border-gray-700 rounded-md p-1"  
        type="password" id="pass"
        name ="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
          {formik.errors.password && formik.touched.password ? <div className="text-red-500">*{formik.errors.password}</div>: ""}
          {errormsg ? <div className="text-red-500">*{errormsg}</div>: ""}
        </div>
        <div className="flex items-center justify-between">
        <button className="btn py-2 px-5 " type="submit">Login</button>
        <Link to="/forgetpassword" className="text-blue-600 text-xl font-bold" href="#">Forget Password</Link>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login