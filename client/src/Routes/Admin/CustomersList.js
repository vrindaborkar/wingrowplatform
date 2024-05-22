import React from 'react'
import Spinner from '../../components/Spinner'
import {Link} from 'react-router-dom'

import NavMenu from '../../components/NavMenu'
import useWindowDimensions from '../../components/useWindowDimensions'
import { useEffect,useState } from 'react'

const CustomersList = ({Customer}) => {
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
          <div className='farmers_data_entries'>
                <div className='farmers_entries'>
                    <div className='farmers_entries_nav'>
                    <span className='farmers_entries_nav_farmername'>
                        Customers Name
                    </span>
                    <span  className='farmers_entries_nav_farmerstype'>
                        Phone No.
                    </span>
                    <span  className='farmers_entries_nav_farmersaddress'>
                        Address
                    </span>
                    </div>

                    <div className='farmers_entries_body'>
                        {
                        Customer && Customer.length!==0 && Customer.map((e,i)=>{
                            return(
                            <div key={i} className='farmers_entries_section'>
                                <span className='farmers_entries_nav_farmername'>
                                    {e.firstname} {e.lastname}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.phone}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.address}
                                </span>
                            </div>
                            )
                        })
                        }
                        {
                            !Customer && <Spinner/>
                        }
                        {
                            Customer && Customer.length === 0 && <div className='farmers_entries_section'>No data available</div>
                        }
                      <Link style={{ marginTop: '10px', marginLeft: '125px' }} className="backbtn green" to="/admin" >
                          Back
                      </Link>
                    </div>
                  
                </div>
            </div>
            <div className="pageBottom" style={{height: '100px'}}></div>
          {mobile?<NavMenu
             />:console.log("desktop")}
    </>
  )
}

export default CustomersList