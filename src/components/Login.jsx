import { useState } from "react"
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login=()=>{
    const[emailId,setEmailId]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');
    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
const dispatch=useDispatch();
const navigate=useNavigate()


    const handleLogin = async(e)=>{
       e.preventDefault();
        try{
            const res= await axios.post(BASE_URL+'login',{

        emailId,
        password
            },{withCredentials:true});
           
            dispatch(addUser(res.data.data))
            navigate('/')
        }
        
        catch(err){
            console.error(err)
            setError(err?.response?.data)
        }
    }
     const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

    console.log(emailId,password,'email.....')
    return(

<div className="min-h-screen flex items-center justify-center bg-base-200">
<div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
           {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

    <div className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        onChange={(e)=>setEmailId(e.target.value)}
       value={emailId}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        onChange={(e)=>setPassword(e.target.value)}
         value={password}
      />
<p className="text-red-500">{error}</p>
      <div className="card-actions justify-end mt-2">
        <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
      </div>
    </div>
  </div>
</div>
</div>

    )
}
export default Login