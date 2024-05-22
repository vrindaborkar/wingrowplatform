import "../../styles/Admin.css";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import FilterModal from "../../components/FilterModal";
import { Link } from "react-router-dom";
// import { Divider, Grid } from "@mui/material";
// import AdminMarket from "./AdminMarket.js";

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
const AdminHome = ({
  handleChangeMarket,
  fromDate,
  sub,
  setfromDate,
  toDate,
  settoDate,
  value,
  setValue,
  handleSearch,
  market,
  farmersMarket,
  open,
  setOpen,
  handleClose,
  handleOpen,
  handleSearchmarkets,
  handleSearchDate,
  filteredInData,
  filteredOutData,
  purchaseQty,
  purchaseAmount,
  salesQty,
  salesAmount,
  noOfBookedStalls,
  totalFarmers,
  farmers,
  Farmers,
  Customer,
}) => {
  const FarmersObj = [];
  const farmersData = new Map();
  const handleCloseModal = () => {
    setOpen(false);
  }

  Farmers &&
    Farmers.forEach((e) => {
      if (farmersData.has(e.farmertype)) {
        farmersData.set(e.farmertype, farmersData.get(e.farmertype) + 1);
      } else {
        farmersData.set(e.farmertype, 1);
      }
    });
  //this is for how many farmers of each type
  // no need to go through this
  farmersData.forEach((value, key) => {
    FarmersObj.push({ farmertype: key, count: value });
  });
  let maxmarkets = 10000;
  let maxStalls = 10000;
  let maxPurchaseQty = 100000;
  let maxPurchaseAmount = 500000;
  let maxSalesAmount = 500000;
  let maxSalesQty = 2000000;
  const colors = {
    green: '#4CAF50',
    red: '#DB190C',
    purple: '#8624DB',
    white: '#fff',
    orange: '#FF9066'
  }
  const data1 = {
    summary: [
      {
        title: 'Farmers Markets',
        subtitle: 'Total Farmers Markets',
        value: totalFarmers,
        percent: (totalFarmers * 100) / maxmarkets

      },
      {
        title: 'Stalls Booked',
        subtitle: 'Stalls of farmers',
        value: 2000 + noOfBookedStalls,
        percent: (noOfBookedStalls * 100) / maxStalls

      }
    ]
  }
  const data2 = {
    summary: [
      {
        title: 'Purchased Quantity (Kgs)',
        subtitle: 'Total Quantity Purched',
        value: purchaseQty,
        percent: (purchaseQty * 100) / maxPurchaseQty
      },
      {
        title: 'Purchase (INR)',
        subtitle: 'Total Purchase Amount',
        value: purchaseAmount,
        percent: (purchaseAmount * 100) / maxPurchaseAmount
      },
    ]
  }
  const data3 = {
    summary: [
      {
        title: 'Sales Quantity (Kgs)',
        subtitle: 'Total Sales Quantity',
        value: purchaseQty-salesQty,
        value: purchaseQty - salesQty,
        percent: ((purchaseQty-salesQty)*100)/maxSalesQty
      },
      {
        title: 'Sales (INR)',
        subtitle: 'Total Sales Amount',
        value: salesAmount,
        percent: (salesAmount * 100) / maxSalesAmount
      }
    ]
  }
  
  return (
    <>
      <div className="admin_main_component" >
        <div className="adminAlign">
        <FilterModal
          style={{ width: "10%" }}
          handleChangeMarket={handleChangeMarket}
          fromDate={fromDate}
          setfromDate={setfromDate}
          toDate={toDate}
          settoDate={settoDate}
          value={value}
          setValue={setValue}
          handleSearch={handleSearch}
          market={market}
          farmersMarket={farmersMarket}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSearchmarkets={handleSearchmarkets}
          handleSearchDate={handleSearchDate}
          handleCloseModal={handleCloseModal}

        />
        <div className='admin_links'>
          <div className="two">
            <Link className="admin_links_details twoDetails" style={{fontWeight:'bold', marginBottom: '40px'}} to="../adminrev">
              Graph for market vs market
            </Link>
            <Link className='admin_links_details twoDetails' style={{fontWeight:'bold',marginBottom: '40px'}} to="../adminrevtotal">Graph for a year</Link>
            <Link className='admin_links_details twoDetails' style={{fontWeight:'bold',marginBottom: '40px'}} to="../livemarkets">Add Live Market Data</Link>
            <Link className='admin_links_details twoDetails' style={{fontWeight:'bold',marginBottom: '40px'}} to="../leaves">Approve Leaves</Link>
          </div>

        </div>
        </div>

        <div className="farmers-stats-main farmers-stats-main1">
          <h2 className="overalldata_header stats" style={{width
          :'200px',fontWeight:'bold'}}>Farmers Statistics</h2>
          <div className="farmers-stats-holder">
            {filteredInData && filteredOutData && (
              <div className="total-stall-market" style={{fontWeight:'bold'}}>
                {/* <Card header={"Total Market"} value={totalFarmers.size} />
                <Card header={"Stalls Booked"} value={noOfBookedStalls} /> */}
                {
                  data1.summary.map((item, index) => {
                    return (<div key={`summary-${index}`} className="sub_overalldata" style={{fontSize:'10px'}} >
                      {
                        <>
                          <span>{item.title} </span>


                          <CircularProgressbarWithChildren
                            className='circularbar'
                            value={item.percent}
                            strokeWidth={6}
                            text={`${item.value}`}
                            styles={buildStyles({
                              pathColor: item.percent < 50 ? colors.green : colors.green,
                              trailColor: '#d3d3d3',
                              strokeLinecap: 'round'
                            })}
                          >
                            <br />
                            {/* <div className="summary-box__chart__value">
                            {item.percent}%
                        </div> */}
                          </CircularProgressbarWithChildren>
                        </>
                      }
                    </div>)
                  })
                }
              </div>

            )}
            <div className="quantity" style={{fontWeight:'bold'}}>
              {/* <h2>Quantity</h2> */}
              {filteredInData && filteredOutData && (
                <div className="total-quantity">

                  {/* <Card header={"Purchase:"} value={purchaseQty} />
                <Card header={"Sales:"} value={salesQty} /> */}
                  {
                    data2.summary.map((item, index) => {
                      return (<div key={`summary-${index}`} className="sub_overalldata" style={{fontSize:'10px'}} >
                        {
                          <>
                            <span>{item.title} </span>


                            <CircularProgressbarWithChildren
                              className='circularbar'
                              value={item.percent}
                              strokeWidth={6}
                              text={`${item.value}`}
                              styles={buildStyles({
                                pathColor: item.percent < 50 ? colors.green : colors.green,
                                trailColor: '#d3d3d3',
                                strokeLinecap: 'round'
                              })}
                            >
                              <br />
                              {/* <div className="summary-box__chart__value">
                            {item.percent}%
                        </div> */}
                            </CircularProgressbarWithChildren>
                          </>
                        }
                      </div>)
                    })
                  }
                </div>
              )}
            </div>
            <div className="amount" style={{fontWeight:'bold'}}>
              {/* <h2 >Amount</h2> */}
              {filteredInData && filteredOutData && (
                <div className="total-amount">
                  {/* <Card header={"Purchase:"} value={purchaseAmount} />
                <Card header={"Sales:"} value={salesAmount} /> */}
                  {
                    data3.summary.map((item, index) => {
                      return (<div key={`summary-${index}`} className="sub_overalldata" style={{fontSize:'10px'}} >
                        {
                          <>
                            <span>{item.title} </span>


                            <CircularProgressbarWithChildren
                              className='circularbar'
                              value={item.percent}
                              strokeWidth={6}
                              text={`${item.value}`}
                              styles={buildStyles({
                                pathColor: item.percent < 50 ? colors.green : colors.green,
                                trailColor: '#d3d3d3',
                                strokeLinecap: 'round'
                              })}
                            >
                              <br />
                              {/* <div >
                            {item.percent}%
                        </div> */}
                            </CircularProgressbarWithChildren>
                          </>
                        }
                      </div>)
                    })
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="farmers-stats-main farmers-stats-main1">
          <h3 className="overalldata_header stats" style={{width
          :'150px',fontWeight:'bold',marginBottom:'10px'}}>Sub data</h3>
          <div className="farmers-stats-holder">
          
          <div className="sub_overalldata">
            <h1>Number of Subscribed Users : {sub.length} </h1>
          </div>
          </div>
        </div>
        <div className="farmers-stats-main" style={{textAlign:'center'}}>
          <h2 className="overalldata_header farmers-type" style={{width
          :'200px',fontWeight:'bold'}}>Types of Farmers</h2>
          {FarmersObj && (
            <div className="cards_container">
              {FarmersObj.map((e, i) => {
                return <Card key={i} header={e.farmertype} value={e.count} />;
              })}
            </div>
          )}
        </div>
        <div className="total-customers" style={{textAlign:'center'}}>
          <h2 className="overalldata_header no-consumers" style={{width
          :'200px',fontWeight:'bold'}}>
            Total No. Of Customers
          </h2>
          {Customer && <div className="customers_count">{Customer.length}</div>}
        </div>

        <div className='admin-links'>


        <div className="one">
            <Link className="admin_links_details admin_links_details_lists " to="../listoffarmers" style={{ width:'250px', fontWeight:'bold' }}>
              Farmers List
            </Link>
            <Link className="admin_links_details admin_links_details_lists " to="/admin/checklist"style={{ width: '250px', fontWeight:'bold' }}>
              CheckList
            </Link>
          {/* </div>
          <div className="one"> */}
            <Link className='admin_links_details admin_links_details_lists' to="../listofCustomers" style={{ width: '250px', fontWeight:'bold' }} >Customers List</Link>
            <Link className='admin_links_details admin_links_details_lists' to="../cancelledstalls" style={{ width: '250px', fontWeight:'bold' }}>Cancelled Stalls List</Link>
            {/* <Link className="admin_links_details admin_links_details_lists" to ="../leave" style = {{width : '250px', fontWeight:'bold'}}>Apply For Leave</Link> */}
          </div>

        </div>
      </div>
      {!filteredInData && !filteredOutData && !Farmers && <Spinner />}
    </>
  );
};

export default AdminHome;