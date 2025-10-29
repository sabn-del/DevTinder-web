import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from"axios";
const EditProfile=({user})=>{
console.log(user,'fromedit profile...')
    const[firstName,setFirstName]=useState(user?.firstName);
    const[lastName,setLastName]=useState(user?.lastName)
    const[photoUrl,setPhotoUrl]=useState(user?.photoUrl);
    const[age,setAge]=useState(user?.age);
     const[gender,setGender]=useState(user?.gender);
      const[about,setAbout]=useState(user?.about);
      const[error,setError]=useState('');
      const[showTost,setShowTost]=useState(false)

      const dispatch=useDispatch();

      const handleEdit = async()=>{
        setError("")
        try{
const res= await axios.patch(BASE_URL+'profile/edit',{
firstName,lastName,photoUrl,age,gender,about,
        },{ withCredentials: true,}
    )
    setShowTost(true)
    dispatch(addUser(res.data?.data))
    console.log(res.data.data,'response from edit')
        }
        catch(err){
            console.log(err)
            setError(err.response.data)
        }
        
      }
    return (
        <>
        <div className="flex justify-center my-10">
       <div className="min-h-screen flex items-center justify-center bg-base-200">
<div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    

    <div className="flex flex-col gap-3">
        <h1 className="text-align-center justify-center">Edit Profile</h1>
      <input
        type="text"
        placeholder="First Name"
        className="input input-bordered w-full"
        onChange={(e)=>setFirstName(e.target.value)}
       value={firstName}
      />
      <input
        type="text"
        placeholder="Second Name"
        className="input input-bordered w-full"
        onChange={(e)=>setLastName(e.target.value)}
         value={lastName}
      /> <input
        type="text"
        placeholder="Photo Url"
        className="input input-bordered w-full"
        onChange={(e)=>setPhotoUrl(e.target.value)}
         value={photoUrl}
      />
       <input
        type="text"
        placeholder="Age"
        className="input input-bordered w-full"
        onChange={(e)=>setAge(e.target.value)}
         value={age}
      />
       <input
        type="text"
        placeholder="Gender"
        className="input input-bordered w-full"
        onChange={(e)=>setGender(e.target.value)}
         value={gender}
      />

 <input
        type="text"
        placeholder="About"
        className="input input-bordered w-full"
        onChange={(e)=>setAbout(e.target.value)}
         value={about}
      />
<p className="text-red-500">{error}</p>
      <div className="card-actions justify-center mt-2">
        <button className="btn btn-primary" onClick={handleEdit}>Save Profile</button>
      </div>
    </div>
  </div>
</div>
</div>

<UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
</div>
{showTost &&
<div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span> Profile Updated successfully.</span>
  </div>
</div>}
</>

    )
}
export default EditProfile
