import React , {useState , useEffect} from 'react'
import AuthService from '../../services/auth.service'
import FarmerService from '../../services/farmer.service'
import '../../styles/MyBookings.css'
import Spinner from '../../components/Spinner';
import dayjs from 'dayjs'
import ConfirmDelete from '../../components/ConfirmDelete';
import axios from 'axios';
import authHeader from '../../services/auth.headers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
// import NavMenu from '../../components/NavMenu';
import useWindowDimensions from '../../components/useWindowDimensions';

const MyBookings = ({t}) => {
    const user = AuthService.getCurrentUser()
    const [MyStalls, setMyStalls] = useState();
    var num = 0;
    const { REACT_APP_API_URL } = process.env;

    useEffect(() => {
        FarmerService.getBookedStalls().then((res) => {
            const { data } = res;
            const filteredData = data.filter(e => e.bookedBy === user.id);
            const sortedData = filteredData.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
            setMyStalls(sortedData);
        })
    }, [user])


    

    const handleDelete = (e) => {
       const DeleteId = e.target.id;
       const cancelledStall = MyStalls.filter(e => e._id === DeleteId)
       const [data] = cancelledStall;
       data.cancelledAt = dayjs(Date.now()).format("YYYY-MM-DD");
        data.bookedBy = user.id
        data.firstname = user.firstname
        data.lastname = user.lastname
        data.phone = user.phone
        console.log("data - ",data)
        axios.post(REACT_APP_API_URL+"cancelledstalls" , data , {headers:authHeader()})
        axios.delete(REACT_APP_API_URL+"bookedstalls" , { headers: authHeader()  , data:{id: DeleteId}})
        .then(res =>  {
            if(res)
            {
                const resp = res.data;
                const filData = MyStalls.filter(e => e._id !== resp._id)
                // axios.post("https://wingrowmarket.onrender.com/cancelledstalls" , data , {headers:authHeader()})
                setMyStalls(filData);
                toast.success('Cancelled successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            else{
                toast.warn('Failed to cancel booking!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
       })
    }

    const [mobile, setmobile] = useState(false)

    const { width } = useWindowDimensions()

    useEffect(() => {
        if (width < 850) {
            setmobile(true)
        } else {
            setmobile(false)
        }
    }, [width])

  return (
    <>
    
    {MyStalls?<div className='bookings_container'>
              {num = MyStalls.length}
              {console.log(num)}
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
        
        <div className='booking_content'>
            <div className='booking_cards'> 
                      <div className='backbtndiv'>
                          <Link className="backbtn green" to="/farmers" sx={{ m: 2 }} style={{ padding: '8px 20px 8px 20px', marginLeft: '-1100px' }}>
                              {t("back")}
                          </Link>
                      </div>  
               
            </div>

            <div className='card_booking'>
                {
                          
                    MyStalls.map((e,i)=>{
                        const bookingExpired = e.bookedAt < dayjs(Date.now()).format("YYYY-MM-DD") ? true : false;
                        return(
                            <div key={i} className='cards_section'>
                                <div className='card'>
                                    <div className='card_content'>
                                        {bookingExpired && <h2 style={{color:"red",textAlign:"center"}}>Booking Expired</h2>}
                                        <br/>
                                        <h2 className='card_header'><span>Stall No : {num--}</span>
                                        </h2>
                                        <p className='card_para'>{e.location}</p>
                                        <p className='card_para'>{e.stallName}</p>
                                        <p className='card_para'>{e.bookedAt}</p>
                                        {console.log(e.link) }
                                        <div style={{display:"flex",margin:"auto"}}>
                                        <img alt="team" className="location_image_Mybookings" src="https://e7.pngegg.com/pngimages/938/419/png-clipart-allied-communications-inc-computer-icons-location-youtube-symbol-addres-logo-company-text-thumbnail.png"/>
                            
                                        <a  href={e.link} target="_blank"><p className='card_para'>{e.address}</p> </a></div>
                                        <span>
                                                {bookingExpired?
                                                <div style={{cursor:"not-allowed",padding:"4px",backgroundColor:"gray",border:"none",marginTop:"10px",textAlign:"center"}}>Booking Expired</div>
                                                :
                                                <span><ConfirmDelete t={t} Delete={handleDelete} id={e._id}/></span>
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
        
    </div>:<Spinner/>}
    <div className="pageBottom" ></div>
          {/* {mobile?<NavMenu
             />:console.log("desktop")} */}
    </>
  )
}

export default MyBookings