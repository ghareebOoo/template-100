import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"


export default function VerifyCode() {


  const [error , setError] = useState(null)
  const navigate = useNavigate()
  
  async function handelSubmit(values){

  
      try{
      const options ={
        method: "POST",
        url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data: values
      }
        let {data} = await axios.request(options);
        console.log(data)
        setTimeout(()=>{
          if(data.status == "Success"){
              navigate("/resetpassword")
          }
        } , 1000)
       }catch(error){
          console.log(error)
          setError(error.response.data.message);    
        }
    }


  const validation = yup.object({
    resetCode: yup.string().required("resetCode is required")
     })

  const formik = useFormik({
      initialValues:{
        resetCode:"",
      },
  
      onSubmit: handelSubmit,
  
  
      validationSchema: validation
    })
  return (
    <>
    <div className="mt-20 pb-[30px]">
        <h2 className="text-primary text-xl font-semibold mb-5">Verify Code</h2>
        <form onSubmit={formik.handleSubmit}>
        <div>
            <label htmlFor="resetCode">ResetCode:</label>
            <input  className="form-control w-full border-2 border-gray-700 rounded-md p-1" 
            type="text"  id="resetCode"
            name ="resetCode"
            placeholder="Code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? <div className="text-red-500 mt-3">*{formik.errors.resetCode}</div>: ""}
            {error ? <div className="text-red-500 mt-1">*{error}</div>: ""} 
        </div>
        <button type="submit" className="p-2 rounded-md bg-primary mt-5 text-white">Submit</button>
    </form>
    </div>
    </>
  )
}
