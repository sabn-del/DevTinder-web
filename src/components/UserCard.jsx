 import { useDispatch } from "react-redux";
 import { removeUserFromFeed } from "../utils/feedSlice";
 import axios from 'axios';
 import { BASE_URL } from "../utils/constants";
 const UserCard=({user})=>{
   
    const{firstName,lastName,age,skills,about,photoUrl,gender,_id}=user
    
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
      console.log(userId,'userId..')
    try {
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res,'res...')
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err,'err')
    }
  };
  
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+lastName}</h2>
   {age&&gender && <p>{age+" "+gender}</p>}
    <p>{about}</p>
    {skills&&<p>{skills}</p>}
   
    <div className="card-actions justify-end">
        <button className="btn btn-warning" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
      <button className="btn btn-success"  onClick={() => handleSendRequest("interested", _id)}>Intrested</button>
    </div>
  </div>
</div>
    )
 }
 export default UserCard