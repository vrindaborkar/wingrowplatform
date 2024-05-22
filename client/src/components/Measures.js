    import React from 'react';
import '../styles/Home.css'

function Location({t}) {
    const locations = [
    {
        icon:"./images/fast-delivery.png",
        measure:t('covid_response1'),
        data: t('covid_response1_value'),
    },
    {
        icon:"./images/plane.png",
        measure: t('covid_response2'),
        data: t('covid_response2_value'),
    },
    {
        icon:"./images/multiple-users-silhouette.png",
        measure: t('covid_response3'),
        data: t('covid_response3_value'),
    },
    {
        icon:"./images/podcast.png",
        measure: t('covid_response7'),
        data: t('covid_response7_value'),
    },
    {
        icon:"./images/002-hand.png",
       measure:t('covid_response4'),
        data: t('covid_response4_value'),
    },
    {
        icon:"./images/003-trash-bin.png",
        measure: t('covid_response5'),
        data: t('covid_response5_value'),
    },
    {
        icon:"./images/001-user.png",
        measure:t('covid_response6'),
        data: t('covid_response6_value'),
    },
    {
        icon:"./images/light-bulb.png",
        measure:t("covid_response8"),
        data: t('covid_response8_value'),
    }
]
  return <>
      {
          locations.map((e,i)=>{
            return(
                <div key={e}  className="location_container">

                        <div className='location_component_main'>
                            
                            <img alt="team" className="measure_icon" src={e.icon}/>
                            
                            <div className="places_main_wrapper">
                                    <h2 className="location_markets">{e.measure}</h2>

                            <p className="location_date">{e.data}</p>
                            </div>
                        </div>
                    </div>
            )
          })
      }

  </>;
}

export default Location;