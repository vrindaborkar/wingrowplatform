import axios from 'axios';
import React,{useContext , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../../cartContext/ProductContext';
import authHeader from '../../services/auth.headers';
import './Cartpage.css'
import CheckoutItems from './CheckoutItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = () => {
  const { cartsData , Counter , Itemcount} = useContext(productContext);
  const navigate = useNavigate()

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  var result = cartsData.reduce((acc, obj) => { 
    const val = Object.keys(Counter);
    const value = val.filter(e => e === obj._id);
    const data = Counter[value]
    return acc + (obj.purchase_rate * data)} , 0);


    const confirmBooking = async() => {
      const amount = result * 100;
      try {
        if(result){const orderUrl = "https://wingrowmarket.com:8443/order";
        const {data} = await axios.post(orderUrl,{amount:amount},{headers:authHeader()})
        initPayment(data.data)}
      } catch (error) {
        console.log(error)
        alert("unknown error occured")
      }
    };

    const initPayment = (data) => 
    {
     const options = { 
      key:process.env.KEY_ID,
      amount:data.amount,
      currency:data.currency,
      order_id:data.id,
      description:"Wingrow Market",
      
      handler:async(response) =>{
          try {
              // const verifyUrl = "http://localhost:4000/verify";
              const verifyUrl = "/verify";
              const {data} = await axios.post(verifyUrl,response,{headers:authHeader()})

              if(data){
                toast.success('stalls booked successfully!', {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
                    setTimeout(() => {
                      navigate('../')
                    }, 1000);
              }
            }catch(err){
              console.log(err)
            }},
      theme:{
          color:"#3399cc"
      }
     };
     const rzp = new window.Razorpay(options);
      rzp.open();
  } 

  return (
    <div className='checkout_main'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <h2>Checkout</h2>
        <div className='checkout_container'/>
            <CheckoutItems cartsData={cartsData} Counter={Counter}/>
        <div/>
        <div>
            <h2>
              Total items : {Itemcount}
            </h2>
            <h2>
              Total Amount : {result}
            </h2>
        </div>
        <button onClick={confirmBooking}>Proceed to payment</button>
    </div>
  )
}

export default Checkout