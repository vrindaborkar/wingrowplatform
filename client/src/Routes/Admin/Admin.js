import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route } from "react-router-dom";
import AdminMain from './AdminMain';
import Adminrev from './Adminrev.js';
import AdminMarket from './AdminMarket.js'
import AdminHome from './AdminHome';
import AdminSub from './AdminSub';
import CheckList from './CheckList'
import CheckListSoln from './CheckListSoln';
import AdminrevTotal from './AdminrevTotal';
import FarmersListData from './FarmersListData';
import CustomersList from './CustomersList';
import CancellationFeed from './CancellationFeed';
import UserService from '../../services/user.service';
import axios from 'axios';
import authHeader from '../../services/auth.headers';
import FarmerService from '../../services/farmer.service';
import dayjs from 'dayjs'
import AdminHello from './AdminHello'
import Leaves from './Leaves'
const Admin = () => {
  const [Inward, setInward] = useState()
  const { REACT_APP_API_URL } = process.env;

    const [Outward, setOutward] = useState()
    const [value, setValue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
    const [filteredInData, setfilteredInData] = useState()
    const [filteredOutData, setfilteredOutData] = useState()
    const [fromDate, setfromDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
    const [toDate, settoDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
    const [market, setMarket] = React.useState('');
    const [CancelledStalls, setCancelledStalls] = useState()
    const [stallsBooked, setStallsBooked] = useState([]);
    const[all,setAll] = useState([])
    const[stalls,setStalls] = useState([])
    const[sub,setSub] = useState([])
  const [leave, setLeave] = useState([])
   // var all=[]
    const array=[2,2,3,4,5,7,8]
    var total = 8
    var start = 0
    var date1 = new Date("04/15/2023")
    var today = new Date();
    today = dayjs(today).format("MM/DD/YYYY")
    var date2 = new Date(today);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    var weeks= Math.floor(Difference_In_Days / 7)
    var days = Difference_In_Days % 7
    var finalTotal= start + weeks*total +array[days]
    console.log(finalTotal)
    console.log(Difference_In_Days,weeks,days)
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true); };
    const handleClose = () => {setOpen(false);
    };
    const [Farmers, setFarmers] = useState()
    const [Customer, setCustomer] = useState()
    
    const handleChangeMarket = (event) => {
      setMarket(event.target.value);
    };
   
    useEffect(() => {
      UserService.getSubscribedData().then((res)=>{
        const data = res?.data
        setSub(data)
        console.log("the subscribed data :",data)
      })
      FarmerService.getBookedStalls().then(res => {
        const data = res?.data;
        setStallsBooked(data)
        setAll(data)
      })
      // FarmerService.getMyStalls().then(res => {
      //   const data = res?.data;
      //   setStalls(data)
      //   console.log("hello --" ,data)
      // })
      
      FarmerService.getInwardData().then(res => 
        {
          setInward(res?.data);
          setfilteredInData(res?.data)
        })
      FarmerService.getOutwardData().then(res => 
        {
          setOutward(res?.data);
          setfilteredOutData(res?.data)
        })
  
      FarmerService.getcancelledStalls().then(res=>{
        setCancelledStalls(res?.data)
      })
  
        UserService.getFarmers().then(res=>{
          setFarmers(res?.data)
        })
  
        UserService.getUsers().then(res=>{
          setCustomer(res?.data)
        })
    }, [])

    useEffect(()=>{
      FarmerService.getMyStalls().then((res)=>{
        if(res){
          const {data} = res
          console.log("hey",data)
          setStalls(data)
        }
      })
    },[])
  useEffect(() => {
    async function getLeave() {
      await axios.get(REACT_APP_API_URL + "getLeave")
        .then((res) => {
          var data = res?.data
          setLeave(data)
          console.log("the leave data ", data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
    getLeave();
  }, [])

  const totalFarmers = new Set();
  const farmers = new Set();
  const marketsData = new Set();
  const farmersMarket = []
  let purchaseQty = 0;
  let purchaseAmount = 0;
  let salesQty = 0;
  let salesAmount = 0;
  let noOfBookedStalls = stallsBooked?.length;

  Inward && Inward.forEach((e) => {
    marketsData.add(e.market)
  });

  filteredInData && filteredInData.forEach(e => {
    totalFarmers.add(e.market)
    farmers.add(e.userId)

    purchaseQty += e.purchase_quantity
    purchaseAmount += e.purchase_rate
  });

  filteredOutData && filteredOutData.forEach(e => {
    if (!e.total_sales){
      return
    }
    else{
    salesQty += e.total_sales
    }
    salesAmount += e.sales_rate
  });
  const finalStall = new Set()
  stalls && stalls.forEach(e => {
    finalStall.add(e.location)
  })
  const finalStall1 = [...finalStall]
  console.log(finalStall1)
  const handleSearchmarkets = () => {
    const marketresponse = Inward && Inward.filter(e => e.market === market);
    setfilteredInData(marketresponse)
    handleClose()
  }

  const handleSearchDate = () => {
    const inData = Inward && Inward.filter((e) => {
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    const outData = Outward && Outward.filter((e) => {
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })
    console.log(all)
    setStallsBooked(all)
    console.log("before", stallsBooked)
    const stallsData = all && all.filter((e) => {

      return e.bookedAt === dayjs(value).format("YYYY-MM-DD")
    })
    console.log("after", stallsData)
    setStallsBooked(stallsData)
    setfilteredInData(inData)
    setfilteredOutData(outData)


    handleClose()
  }


  const handleSearch = () => {
    const filterIn = Inward.filter((e) => {
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    const filterOut = Outward && Outward.filter((e) => {
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    const stallsData = stallsBooked && stallsBooked.filter((e) => {
      const [date] = e.bookedAt.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    setStallsBooked(stallsData)
    setfilteredInData(filterIn);
    setfilteredOutData(filterOut)
    handleClose()
  }

  for (let item of marketsData) {
    farmersMarket.push(item)

  }

  const handleRefundDelete = (e) => {
    const id = e.target.id;
    const response = window.confirm("Confirm Refunded?")
    // if(response === true){
    //   axios.delete("https://wingrowagritech.herokuapp.com/cancelledstalls" , { headers: authHeader()  , data:{id: id}}).then(res=>{
    //     const data = res?.data;
    //     const filter = CancelledStalls.filter(e=>e._id !== data._id);
    //     setCancelledStalls(filter)
    //   })
    // }
    if (response === true) {
      axios.delete(REACT_APP_API_URL + "cancelledstalls", { headers: authHeader(), data: { id: id } }).then(res => {
        const data = res?.data;
        const filter = CancelledStalls.filter(e => e._id !== data._id);
        setCancelledStalls(filter)
      })
    }
  }


  return (
    <Routes>
      <Route path='/' element={<AdminMain />}>
        <Route index
          element=
          {<AdminHome
            handleChangeMarket={handleChangeMarket}
            fromDate={fromDate}
            setfromDate={setfromDate}
            toDate={toDate}
            settoDate={settoDate}
            sub={sub}
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
            filteredInData={filteredInData}
            filteredOutData={filteredOutData}
            purchaseQty={purchaseQty}
            purchaseAmount={purchaseAmount}
            salesQty={salesQty}
            salesAmount={salesAmount}
            noOfBookedStalls={noOfBookedStalls}
            totalFarmers={finalTotal}
            farmers={farmers}
            Farmers={Farmers}
            Customer={Customer}
          />}
        />
        <Route path="/hello" element={<AdminHello />}></Route>
        <Route path='/adminrev' element={<Adminrev
          filterIn={filteredInData} filterOut={filteredOutData}

          handleChangeMarket={handleChangeMarket}
                fromDate={fromDate}
                setfromDate={setfromDate}
                toDate={toDate}
                settoDate={settoDate}
                value={value}
                market={market}
                farmersMarket={farmersMarket}
                setValue={setValue}
                handleSearch={handleSearch}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                handleSearchmarkets={handleSearchmarkets}
                handleSearchDate={handleSearchDate}
                
                
                
          />}/>
          <Route path = "/leaves" element={ <Leaves Leave = {leave}/>} />
          <Route path = '/adminrevtotal' element ={ <AdminrevTotal Inward={Inward} Outward={Outward} />} />
          <Route path = "/livemarkets" element={<AdminMarket/>} ></Route>
          <Route path='/listoffarmers' element={<FarmersListData Farmers={Farmers}/>}/>
          <Route path = "/checkList" element={<CheckList farmersMarket={finalStall1}  />}/>
          <Route path='/listofCustomers' element={<CustomersList Customer={Customer}/>}/>
          <Route path="/subscriptionList" element ={<AdminSub Farmers={Farmers}/>} />
          <Route path='/cancelledstalls' element={<CancellationFeed Farmers={Farmers} CancelledStalls={CancelledStalls} handleRefundDelete={handleRefundDelete}/>}/>
            <Route path ="/checklistsoln" element ={<CheckListSoln />} ></Route>
         </Route>
         
    </Routes>
  )
}

export default Admin