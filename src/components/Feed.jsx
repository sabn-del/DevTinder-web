import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useEffect } from "react";
const Feed= ()=>{
const dispatch=useDispatch();
const feed=useSelector((store)=>store.feed)
   
   const getFeed= async()=>{
    const res= await axios.get(BASE_URL+"feed",{withCredentials:true});
    console.log(res,'res....')
    dispatch(addFeed(res.data.data))
   } 
   useEffect(()=>{
    getFeed();

   },[])
   if(!feed) return
   if(feed.length<=0 ) return <h1 className="flex justify-center my-10">No new useres Found</h1>
    return(
        
        <div className=" flex justify-center my-10">
            {feed &&
<UserCard user={feed[2]}/>}
        </div>
        
    )
}
export default Feed