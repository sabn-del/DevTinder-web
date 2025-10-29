 import axios from "axios";
 import { BASE_URL } from "../utils/constants";
 const Premium =()=>{


  const verifyPremiumUserv= async()=>{
    const[isPremium,setisPremium]= useState('false')
 const response= await axios.get(BASE_URL+'/payment/verify',{withCredentials:true})
if(response.data.isPremium){
  setisPremium(true)
}


























  }

  const handleBuyClick = async(type)=>{
    try{
      const order= await axios.post(BASE_URL+"payment/create",
        {
          memberShipType:type

        },{
          withCredentials:'true'

        }
      )
      const{amount,keyId,currency,notes,orderId}=order.data
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency, 
        name: 'DevTinder',
        description: 'Test Transaction',
        order_id: orderId, // This is the order_id created in the backend
       
        prefill: {
          name: notes.firstName +""+ notes.lastName,
          email:notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    
    }
catch(err){
  console.log(err)
}
  }
    return(
        <div className="m-10">
        <div className="flex w-full ">
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center"><h1 className="font-bold text-3xl">Silver MemberShip</h1>
  <ul>
    <li>Chat with Other People</li>
    <li>100 Connection Requests Per day</li>
    <li>blue Tick</li>
    <li>3 Months</li>
  </ul>

<button className=" btn btn-primary" onClick ={()=>handleBuyClick('silver')}>Buy Silver</button>

  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center"><h1 className="font-bold  text-3xl">Golden MemberShip</h1>
  <ul>
    <li>Chat with Other People</li>
    <li>Infinite Connection Requests Per day</li>
    <li>blue Tick</li>
    <li>6 Months</li>
  </ul>

<button className=" btn btn-primary" onClick ={()=>handleBuyClick('gold')}>Buy Gold</button>
  </div>
  
</div>
</div>
    )
 }

 export default Premium;
