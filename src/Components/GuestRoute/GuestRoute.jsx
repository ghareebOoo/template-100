import { useContext } from "react";
import { userContext } from "../../Pages/Context/User.Contetx";
import { Navigate } from "react-router-dom";


export default function GuestRoute({children}) {

    const {token} = useContext(userContext)
    if(token){
        return <Navigate to ="/" />
    }else{
        return children
    }
}
