
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
const Body=()=>{

    const dispatch=useDispatch();
    const userData=useSelector((selector)=>selector.user);
    const navigate= useNavigate()
    const fetchUser= async()=>{
        if(userData) return
        try{
const response= axios.get(BASE_URL+'profile',{withCredentials:true}) ;

dispatch(addUser(response.data))
        }
        catch(err){
            if(err.status === 401){
                navigate('/login')
            }
console.log(err)
    }
       
    }
useEffect(()=>{
fetchUser()
},[])
    
    return(
        <>
        <Navbar/>
       <Outlet/>
       <Footer/>
        </>
    )
}
export default Body