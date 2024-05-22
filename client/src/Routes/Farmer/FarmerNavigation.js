import React from 'react'
import { Link } from "react-router-dom";

function FarmerNavigation({t}) {
  return (
    <div>
          <div className="farmerScreen">
              <Link className="links_farmersdata red" to="./stallplaces">
                  {t('book_stall')}
              </Link>
              <Link className="links_farmersdata green" to="./mybookings">
                  {t("my_bookings")}
              </Link>
              <Link className="links_farmersdata red" to="./inward">
                  {t('fill_inward')}
              </Link>
              <Link className="links_farmersdata green" to="./outward">
                  {t('fill_outward')}
              </Link>
              <Link className="links_farmersdata red" to="./farmershome">
                  {t('data')}
              </Link>
              <Link className="links_farmersdata green" to="./subscription">
                  {t('subscription')}
              </Link>
          </div>

    </div>
  )
}

export default FarmerNavigation
