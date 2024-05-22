import React from 'react'
import Spinner from '../../components/Spinner'
import {Link} from 'react-router-dom'
import NavMenu from '../../components/NavMenu'
import useWindowDimensions from '../../components/useWindowDimensions'
import { useState,useEffect } from 'react'

 const CancellationFeed = ({CancelledStalls , Farmers , handleRefundDelete}) =>  {
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
        {CancelledStalls && <div className='cancellation_feed'>
        <div className='cancellation_feed_container'>
                  
            <h2 className='cancellation_header'>Cancellation Data</h2>
                  
            <div className='cancellation_body'>
                {
                    CancelledStalls && CancelledStalls.length !== 0 && CancelledStalls.map((e,i)=>{
                    const farmer =  Farmers && Farmers.filter( ele => ele._id === e.bookedBy)
                    console.log(farmer)

                    return(
                        farmer.length !== 0 && <div key={i} className='cancellation_card'>
                            <h2 style={{textAlign:"center",padding:"0.5rem",textTransform:"capitalize"}}>{farmer[0].firstname+" "+ farmer[0].lastname}</h2>
                            <div><b>Phone No : </b>{farmer[0].phone}</div>
                            <div><b>Stall Address : </b>{e.address}</div>
                            <div><b>Cancellation Date : </b>{e.cancelledAt}</div>
                            <div><b>Booked Date : </b>{e.bookedAt}</div>
                            <div><b>Stall Name :</b>{e.stallName}</div>
                            <div><b>Refund Status :</b>Not Refunded</div>
                            <div className='refund_btn_wrapper'>
                                <button className='refund_btn' id={e._id} onClick={handleRefundDelete}>Mark as Refunded</button>
                            </div>
                        </div> 
                    )
                    })
                }
                {
                    CancelledStalls && CancelledStalls.length === 0 && <h2 style={{margin:"auto"}}>No Cancellation Data!</h2>
                }
                {
                    !CancelledStalls && <Spinner/>
                }
            </div>
                 <Link style={{ marginTop: '10px', marginLeft:'125px' }} className="backbtn green" to="/admin" >
                      Back
                  </Link> 
        </div>
        </div>}
        <div className="pageBottom" style={{height: '100px'}}></div>
          {mobile?<NavMenu
            />:console.log("desktop")}
    </>
  )
}

export default CancellationFeed