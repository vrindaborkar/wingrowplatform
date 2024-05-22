import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import {Link} from 'react-router-dom'
import axios from "axios";
import NavMenu from '../../components/NavMenu';
import useWindowDimensions from '../../components/useWindowDimensions';

const AdminSub = ({Farmers}) => {
    const[subData,setSubData] = useState([]);
    const { REACT_APP_API_URL } = process.env;
    console.log(REACT_APP_API_URL)
    useEffect(()=>{
        async function  getData() {

            await axios.get(REACT_APP_API_URL + "subData")
                        .then((res)=>{
                            console.log("hello")
                            const {data} = res
                            console.log(data)
                             setSubData(data)
                        })
                        .catch((err)=>{
                            console.log("couldnt fetch data")
                        })
        }

        getData();
    },[])
    const [mobile, setmobile] = useState(false)

    const { width } = useWindowDimensions()

    useEffect(() => {
        if (width < 850) {
            setmobile(true)
        } else {
            setmobile(false)
        }
    }, [width])
  return  (
    <>
        {subData && <div className='cancellation_feed'>
        <div className='cancellation_feed_container'>
                  
            <h2 className='cancellation_header'>Subscription Data</h2>
                  
            <div className='cancellation_body'>
                {
                    subData && subData.length !== 0 && subData.map((e,i)=>{
                    const farmer =  Farmers && Farmers.filter( ele => ele._id === e.userId)
                    console.log(farmer)

                    return(
                        farmer && farmer.length !== 0 && <div key={i} className='cancellation_card'>
                            <h2 style={{textAlign:"center",padding:"0.5rem",textTransform:"capitalize"}}>{farmer[0].firstname+" "+ farmer[0].lastname}</h2>
                            <div><b>Phone No : </b>{farmer[0].phone}</div>
                            <div><b> Startdate: </b>{e.date}</div>
                            <div><b> validity : </b>{e.validity}</div>
                            <div><b> Stalls left :</b>{e.stalls}</div>
                            <div><b> Status :</b>{e.status}</div>
                            
                            
                        </div> 
                    )
                    })
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

export default AdminSub