
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { addUser ,finishLoading} from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const Body=()=>{

    const dispatch=useDispatch();
    const userData=useSelector((selector)=>selector.user.data);
    console.log(userData,'userData in body')
    const loading = useSelector((store) => store.user.loading);
    const navigate= useNavigate()
    const fetchUser= async()=>{
        if(userData) return
        try{
const response= await axios.get(BASE_URL+'profile/view',{withCredentials:true}) ;
console.log(response,'response from profile api')
dispatch(addUser(response.data))
        }
        catch(err){
           dispatch(finishLoading());
            if(err.status === 401){
                navigate('/login')
            }
console.log(err)
    }
       
    }
useEffect(()=>{
    
fetchUser()
},[])
    if (loading) return <div>Loading...</div>;
    return(
        <>
        <Navbar/>
       <Outlet/>
       <Footer/>
        </>
    )
}
export default Body