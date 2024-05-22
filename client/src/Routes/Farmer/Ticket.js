// import React from "react";
import React, { useEffect, useState, useRef } from "react";
import '../../styles/Ticket.css'
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from '../../services/auth.headers';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import generatePDF from './generatePDF';
// import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";
function Ticket({ bookingDetails }) {
    const [called, setCalled] = useState(false)
    const { REACT_APP_API_URL } = process.env;

    useEffect(() => {
        if (!called) {
            sendMsg91SMS();
        }

    }, [called]);

    const  sendMsg91SMS= async () => {
        // console.log("booking ",bookingDetails)

        const orderUrl = REACT_APP_API_URL + "msg91";
        const { data } = await axios.post(orderUrl, { bookingDetails: bookingDetails }, { headers: authHeader() });
        setCalled(true)
        console.log(data)
    }

    const pdfRef = useRef();

  const downloadPDF = async () => {
    const content = pdfRef.current;

    const pdfBlob = await generatePDF(content);

    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'download.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }


const { BookedStalls } = bookingDetails
const navigate = useNavigate()
const bookStr = BookedStalls?.toString();
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
        
        {bookingDetails ? <div><div className="invoice-box" ref={pdfRef}>
            <img src="../images/logo.png" alt="log" width="128" height="128"  />
            <h2 className="thanks">Stall booking details</h2>
            <br />
            <div className="invoice_flex_box">
            
            <div className="invoice_details" >
                
                <div>Farmer Name : {bookingDetails.farmer}</div>
                <br />
                <div>Phone : {bookingDetails.phone}</div>
                <br />
                <div>No. of Stalls Booked :{bookingDetails.stallsBooked}</div>
                <br />
                <div>Stalls Booked : {bookStr}</div>
                <br />
                <div>Payment Id : {bookingDetails.paymentDetails}</div>
                <br />
                <div>Address : {bookingDetails.address}</div>
                <br />
                <div>Total Amount : {bookingDetails.totalAmount}</div>
                <br />
            </div>
            {/* <div><img src="../images/Book Your Stall.png" alt="log" width="160px" height="132px" /></div> */}
            <div className="invoice_image"><img src="../images/4.webp" alt="log" height=" 155px"/></div>
            </div>
            <h2 className="thanks">Thank You for Booking Your Stall in Wingrow Market !</h2>
            

        </div>
        <div className="bookings_buttons" >
                <button onClick={() => { navigate('/farmers/stallplaces') }} className="btns_bookings">Continue Booking</button>
                <button onClick={() => { navigate('../mybookings') }} className="btns_bookings">Your Bookings</button>
                <button onClick={downloadPDF}className="btns_bookings">Download Ticket</button>
            </div></div> : <Spinner />}

    </>
);
}

export default Ticket;