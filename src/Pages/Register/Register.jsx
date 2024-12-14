import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

function Register() {

  const [errorMsg , setErrorMsg] = useState(null)

  const navigate = useNavigate()

  async function handelSubmit(values){
    let id;

    try{
    const options ={
      method: "POST",
      url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
      data: values
    }

    id = toast.loading("waiting....")

    let {data} = await axios.request(options);
    console.log(data)
    toast.dismiss(id)
    if(data.message == "success"){
      toast.success("user created successfully")
      navigate("/login")
    }
  }catch (error){
    setErrorMsg(error.response.data.message)
    toast.dismiss(id)
    toast.error(error.response.data.message)
  }
  }

   const validation = yup.object({
    name: yup.string().required("name is required").min(3,"must be at least 3 characters")
    .max(25, "must be less than 25 characters"),
    email: yup.string().required("email is required").email("email is not valid"),
    phone: yup.string().required("phone is required")
    .matches(/^01[0125][0-9]{8}$/,"phone is not valid"),
    password: yup.string().required("password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: yup.string().oneOf([yup.ref("password")] , "password and rePassword must be the same")
   })

  const formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password: "",
      rePassword: "",
      phone:"",
    },


    onSubmit: handelSubmit,


    validationSchema: validation
  })



  return (
    <>
    <div className="pb-[30px] mt-20">
      <h2>Register Now:</h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
        <label htmlFor="name">Name:</label>
        <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1"
        type="text" id="name"
        name ="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? <div className="text-red-500">*{formik.errors.name}</div>: ""}
        </div>
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
          {errorMsg ? <div className="text-red-800">*{errorMsg}</div>:""}
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
        </div>
        <div>
        <label htmlFor="repass">RePassword:</label>
        <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1" 
        type="password" id="repass"
        name ="rePassword"
        placeholder="RePassword"
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="text-red-500">*{formik.errors.rePassword}</div>: ""}
        </div>
        <div className="mb-5">
        <label htmlFor="phone">Phone:</label>
        <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1" 
        type="tel" id="phone"
        name ="phone"
        placeholder="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
          {formik.errors.phone && formik.touched.phone ? <div className="text-red-500">*{formik.errors.phone}</div>: ""}
        </div>
        <button className="btn w-full p-2 " type="submit">Register</button>
      </form>
    </div>
    </>
  )
}

export default Register