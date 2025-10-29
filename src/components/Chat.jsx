import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import { use } from "react";
import  axios from 'axios';
import dayjs from "dayjs";

const Chat =()=>{
    const {targetUserId}= useParams();
    const[messages,setMessage]=useState([]);
    const[newMessage,setNewMessage]=useState('');
     const [userStatus, setUserStatus] = useState({});
   const user=useSelector(store=>store.user)

   const fetchChatMessage= async()=>{
    const chat= await  axios.get(BASE_URL+"chat/"+targetUserId,{
      withCredentials:true
    })
     console.log(chat.data.messages,'chat')
     const chatMessage= chat.data.messages.map((msg)=>{
      const{senderId,text}=msg
      return {firstName:senderId?.firstName, lastName:senderId?.lastName,text}
     })
     setMessage(chatMessage)
     }

    
     
     useEffect(()=>{
      fetchChatMessage()
     },[])
       
     const userId= user?._id
    useEffect(()=>{
      if(!userId){
        return
      }

const socket=createSocketConnection();
console.log(socket,'sockett')
// as soon as the page loads,the socket connection is made and joinChat event is emitted
socket.emit("joinChat",{ firstName:user.firstName,userId,targetUserId})

socket.on("messageRecieved",({firstName,lastName,text})=>{
  console.log(firstName+""+text)
  setMessage((messages)=>[...messages,{firstName,lastName,text}])
})
return ()=>{
  socket.disconnect();
}
    },[userId,targetUserId]);
   
    

    useEffect(() => {
   const socket=createSocketConnection();

   
      if (userId) {
    socket.emit("userOnline", user._id);
  }
}, [user]);

useEffect(() => {
    const socket=createSocketConnection();
  socket.on("updateUserStatus", ({ userId, status, lastSeen }) => {
    setUserStatus((prev) => ({
      ...prev,
      [userId]: { status, lastSeen }
    }));
  });

  return () => {
    socket.off("updateUserStatus");
  };
}, []);
   
    const sendMessage=()=>{
     
      const socket=createSocketConnection();
      socket.emit("sendMessage",{
        firstName:user.firstName,
        lastName:user.lastName,
userId,
targetUserId,
text:newMessage
      })
      setNewMessage("")
    }

    return(
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <p>
  {userStatus[user._id]?.status === "online"
    ? "Online"
    : `Last seen ${dayjs(userStatus[user._id]?.lastSeen).fromNow()}`}
</p>
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
    )
}
export default Chat;