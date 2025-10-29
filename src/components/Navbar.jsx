 import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 const Navbar=()=>{

    const user=useSelector((store)=>store.user);
    console.log(user,'userr')
    const navigate=useNavigate();

    
  const dispatch=useDispatch()
    
  const handleLogout= async()=>{
    try{
 await axios.post(BASE_URL+'logout',{},{ withCredentials: true});
 dispatch(removeUser());
 console.log('click the button')
   return navigate('/login')
    }
catch(err){
console.log(err)
}
   }
    return(
 <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user&&(
  <div className="flex gap-2">
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <p> Welcome {user.firstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to ='/profile' className="justify-between">
            Profile
            
          </Link>
        </li>
        <li>
        <Link to="/connections">Connections</Link></li>
         <li>
        <Link to="/requests">Requests</Link></li>
         <li>
        <Link to="/premium">Premium</Link></li>

        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
    )
 }
 export default Navbar
