import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup"


export default function ForgetPassword() {

    const [message , setMessage] = useState(null)
    const navigate = useNavigate()
    
    async function handelSubmit(values){

    
        try{
        const options ={
          method: "POST",
          url:"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          data: values
        }
          let {data} = await axios.request(options);
          console.log(data)
          setMessage(data.message)
          setTimeout(()=>{
            if(data.statusMsg == "success"){
              navigate("/verifycode")
            }
          } , 1000)
         }catch(error){
            console.log(error)
         }
      }


    const validation = yup.object({
        email: yup.string().required("email is required").email("email is not valid"),
       })

    const formik = useFormik({
        initialValues:{
          email:"",
        },
    
        onSubmit: handelSubmit,
    
    
        validationSchema: validation
      })

  return (
   <>
   <div className="pb-[30px] mt-20">
    <h2 className="text-primary font-semibold text-xl mb-5">Forget password:</h2>
    <form onSubmit={formik.handleSubmit}>
        <div>
            <label htmlFor="email">Email:</label>
            <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1" 
            type="email"  id="email"
            placeholder="Email"
            name ="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="text-red-500 mt-3">*{formik.errors.email}</div>: ""}
            {message ? <div className="text-red-500 mt-1">*{message}</div>: ""}
        </div>
        <button type="submit" className="p-2 rounded-md bg-primary mt-5 text-white">Submit</button>
    </form>
   </div>
   </>
  )
}
