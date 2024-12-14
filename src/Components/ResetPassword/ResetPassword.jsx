import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"

import {  useNavigate } from "react-router-dom"
import * as yup from "yup"

export default function ResetPassword() {



    const [errormsg , setErrormsg] = useState(null)
    const navigate = useNavigate()
  
    async function handelSubmit(values){
  

  
      try{
      const options ={
        method: "PUT",
        url:"https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        data: values
      }
  
 
        let {data} = await axios.request(options);
        console.log(data)
        navigate("/login")

       }catch(error){
        console.log(error)
        setErrormsg(error.message)
       }
    }
  
     const validation = yup.object({
      email: yup.string().required("email is required").email("email is not valid"),
      newPassword: yup.string().required("password is required")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"password is not valid"),
     })
  
    const formik = useFormik({
      initialValues:{
        email:"",
        newPassword: "",
      },
  
  
      onSubmit: handelSubmit,
  
  
      validationSchema: validation
    })
  return (
    <div className="pb-[30px] mt-20">
    <h2>Reset Password:</h2>
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
      <label htmlFor="pass">NewPassword:</label>
      <input className="form-control w-full border-2 border-gray-700 rounded-md p-1"  
      type="password" id="pass"
      name ="newPassword"
      placeholder="NewPassword"
      value={formik.values.newPassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      />
        {formik.errors.newPassword && formik.touched.newPassword ? <div className="text-red-500">*{formik.errors.newPassword}</div>: ""}
        {errormsg ? <div className="text-red-500">*{errormsg}</div>: ""}
      </div>
      <button className="btn py-2 px-5 " type="submit">Submit</button>
     
    </form>
  </div>
  )
}
