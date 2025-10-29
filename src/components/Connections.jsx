import { useEffect ,useState} from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
const Connections= ()=>{
    const connections = useSelector((store) => store.connections);
    
    const [userStatus, setUserStatus] = useState({});
 
    const dispatch = useDispatch();
 
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
        // Prepare initial statuses from DB
      const initial = {};
      res.data.data.forEach((u) => {
        initial[u._id] = { status: "offline", lastSeen: u.lastSeen };
      });
      console.log(initial,'initailll')
      setUserStatus(initial);
    
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();



     const socket = createSocketConnection();
    socket.on("userOnline", (userId) => {
      setUserStatus((prev) => ({
        ...prev,
        [userId]: { status: "online" },
      }));
    });
    socket.on("userOffline", ({ userId, lastSeen }) => {
      setUserStatus((prev) => ({
        ...prev,
        [userId]: { status: "offline", lastSeen },
      }));
    });

    return () => socket.disconnect();
  }, []);
  
  // Listen for online/offline updates via socket
  // useEffect(() => {
  //    const socket=createSocketConnection();
  //   if (!socket) return;

  //   socket.on("updateUserStatus", ({ userId, status, lastSeen }) => {
  //     setUserStatus((prev) => ({
  //       ...prev,
  //       [userId]: { status, lastSeen },
  //     }));
  //   });

  //   return () => socket.off("updateUserStatus");
  // }, []);

console.log(connections,'connections')

if(connections?.length ===0 ) return <p>No Connections Found!</p>;

    return (
        <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections?.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

          const status = userStatus[_id] || {};
        const isOnline = status.status === "online";
     console.log(status,'status')
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
      {isOnline && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                )}
    <div className="text-left mx-4">
      <h2 className="font-bold text-xl">
        {firstName + " " + lastName}
      </h2>
      {age && gender && <p>{age + ", " + gender}</p>}
      <p>{about}</p>
      {/* Status line */}
                <p className="text-sm text-gray-400">
                  {isOnline
                    ? "Online"
                    : status.lastSeen
                    ? `Last seen ${dayjs(status.lastSeen).fromNow()}`
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