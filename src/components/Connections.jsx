import { useEffect ,useState,useMemo} from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const Connections= ()=>{
    const connections = useSelector((store) => store.connections);
    const user= useSelector(store=>store.user.data)
   const userId = user?._id;

   console.log(userId,'userId...')
    
    const [userStatus, setUserStatus] = useState({});
 
    const dispatch = useDispatch();


    // Use useMemo to create the socket only once with the correct userId in the query.
    const socket = useMemo(() => {
        return createSocketConnection(userId); 
    }, [userId]);  
 
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
        // Prepare initial statuses from DB
      

      const initial = {};
            res.data.data.forEach((u) => {
                initial[u._id] = {
                    status: u.isOnline ? "online" : "offline",
                    lastSeen: u.lastSeen
                };
            });
     
      setUserStatus(initial);
    
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {

    // ⭐️ FIX: Only proceed if the socket connection was successfully created
    if (!socket) {
        console.warn("Socket connection not established yet, skipping listeners.");
        return; 
    }
    fetchConnections();



    //  const socket = createSocketConnection();
    // socket.on("userOnline", (userId) => {
    //   setUserStatus((prev) => ({
    //     ...prev,
    //     [userId]: { status: "online" },
    //   }));
    // });
    // socket.on("userOffline", ({ userId, lastSeen }) => {
    //   setUserStatus((prev) => ({
    //     ...prev,
    //     [userId]: { status: "offline", lastSeen },
    //   }));
    // });

    // B. Socket Listeners
        socket.on("userOnline", (userId) => {
            console.log(`User ${userId} came online.`);
            setUserStatus((prev) => ({
                ...prev,
                [userId]: { status: "online", lastSeen: prev[userId]?.lastSeen },
            }));
        });
        
        // ⭐️ Listens for the object { userId, lastSeen } from the backend
        socket.on("userOffline", ({ userId, lastSeen }) => {
            console.log(`User ${userId} went offline at ${lastSeen}.`);
            setUserStatus((prev) => ({
                ...prev,
                [userId]: { status: "offline", lastSeen: lastSeen },
            }));
        });

    // return () => socket.disconnect();

    return () => {
            socket.off("userOnline");
            socket.off("userOffline");
            socket.disconnect(); 
        };
  }, [userId],socket);
  
  

console.log(connections,'connections')

console.log(userStatus,'userstatus....')

if(connections?.length ===0 ) return <p>No Connections Found!</p>;

    return (
        <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections?.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        //   const status = userStatus[_id] || {};
        // const isOnline = status.status === "online";

        // Get the status from the real-time state, falling back to initial DB data
                const statusData = userStatus[_id] || { 
                    status: connection.isOnline ? "online" : "offline", 
                    lastSeen: connection.lastSeen 
                };
                console.log(statusData,'satusData....')
                
                const isOnline = statusData.status === "online";
     
        return (
          <div
            key={_id}
            className="flex items-center justify-between  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            {/* <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
              <div className="flex">
              <button className="btn btn-primary">Message</button></div>
            </div> */}
             <div className="flex items-center">
    <img
      alt="photo"
      className="w-20 h-20 rounded-full object-cover"
      src={photoUrl}
    />
     {/* Online Dot */}
                            {isOnline && (
                                <span className="absolute bottom-0 left-16 w-4 h-4 bg-green-500 border-2 border-base-300 rounded-full"></span>
                            )}
    <div className="text-left mx-4">
      <h2 className="font-bold text-xl">
        {firstName + " " + lastName}
      </h2>
      {age && gender && <p>{age + ", " + gender}</p>}
      <p>{about}</p>
      {/* Status line */}
                {/* <p className="text-sm text-gray-400">
                  {isOnline
                    ? "Online"
                    : status.lastSeen
                    ? `Last seen ${dayjs(status.lastSeen).fromNow()}`
                    : "Offline"}
                </p> */}

                {/* Status line */}
                                <p className="text-sm text-gray-400">
                                    {isOnline
                                        ? "Online"
                                        : statusData.lastSeen
                                            ? `Last seen ${dayjs(statusData.lastSeen).fromNow()}`
                                            : "Offline"}
                                </p>
    </div>
  </div>

  {/* Right Side - Button */}
  <Link to ={"/chat/"+_id}><button className="btn btn-primary">Message</button></Link>
           
          </div>
        );
      })}

    </div>
    )
}
export default Connections;