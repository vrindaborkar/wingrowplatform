import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FarmerService from '../../services/farmer.service'
import '../../styles/Farmer.css'
import Spinner from '../../components/Spinner'
import useWindowDimensions from '../../components/useWindowDimensions'
// import NavMenu from '../../components/NavMenu'

const StallsPlaces = ({t}) => {
  const [stalls, setStalls] = useState()
  const set = new Set();
  const places = [];
  const day = ["Wednesday(3-9PM) ","Tuesday(3-9PM)","Sunday(3-9PM)","Sunday(7-9PM)","Friday(3-9PM)","Thursday (3-9PM)","Friday(3-9PM)","Wednesday(3-9PM)","Saturday(3-9PM)","Thuesday(3-9PM)","Sunday (3-9PM)","Sunday"]
  // const day = ["tuesday","tuesday","wednesday","wednesday","thursday","friday","friday","saturday","saturday","sunday","sunday","sunday"]
  const navigate = useNavigate()


  if (stalls) {
    for (let item of stalls) {
      set.add(item.location)
    }
  }

  for (let key of set){ 
    places.push(key);
    console.log(places[0]);

  }

  useEffect(() => {
    FarmerService.getMyStalls()
      .then(res => { setStalls(res.data); console.log(res.data) })

  }, [])

  const handleClick = (ev) => {
    const Id = ev.target.id
    navigate(`stalls/${Id}`)
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

      {stalls && <div className='places_market_container'>
        <div className='backbtnflex'>
          <Link style={{ marginTop: '16px' }} className="backbtn green flex" to="/farmers" >
            {t("back")}
          </Link>
          <h2 className='main_header_places'>{t("Select Wingrow Market From Pune..")}</h2>
        </div>

        <div className='places_wrapper'>
          {
            places && places.map((e, i) => {
              return (
                <div onClick={handleClick} key={e} id={e} className={`places_market_component${i % 4}`}>
                  <img id={e} alt='logo' className='image_1' src="../images/4.webp" />
                  <div id={e}>
                  {console.log(e)}
                    <span id={e} className='places_headers'>{t("Wingrow Market in")} <br />{t(e)} <br/>{day[i]}</span>
                  </div>
                </div>
              )
            })

          }
        </div>
      </div>}
      {!stalls && <Spinner />}
      <div className="pageBottom" ></div>
      {/* {mobile?<NavMenu
        />:console.log("no")} */}
    </>
  )
}

export default StallsPlaces