import React, { useState, useEffect, useRef } from "react";
import "../../styles/Farmer.css";

import FarmerService from "../../services/farmer.service";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import useWindowDimensions from "../../components/useWindowDimensions";
import * as echarts from 'echarts';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// import { Bar } from 'react-chartjs-2';
// import NavMenu from "../../components/NavMenu";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)



const FarmersHome = ({t}) => {
  const [InwardData, setInwardData] = useState([]);
  const [OutwardData, setOutwardData] = useState([]);
  const [InwardDataGraph, setInwardDataGraph] = useState([]);
  const [OutwardDataGraph, setOutwardDataGraph] = useState([]);
  const [salesQuantity, setSalesQuantity] = useState(0);
  const [salesRate, setSalesRate] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);
  const [purchaseRate, setPurchaseRate] = useState(0);
  const today = new Date();
  const [mondaySalesQuantity, setMondaySalesQuantity] = useState(0);
  const [tuesdaySalesQuantity, setTuesdaySalesQuantity] = useState(0);
  const [wednesdaySalesQuantity, setWednesdaySalesQuantity] = useState(0);
  const [thursdaySalesQuantity, setThursdaySalesQuantity] = useState(0);
  const [fridaySalesQuantity, setFridaySalesQuantity] = useState(0);
  const [saturdaySalesQuantity, setSaturdaySalesQuantity] = useState(0);
  const [sundaySalesQuantity, setSundaySalesQuantity] = useState(0);
  const [mondayPurchaseQuantity, setMondayPurchaseQuantity] = useState(0);
  const [tuesdayPurchaseQuantity, setTuesdayPurchaseQuantity] = useState(0);
  const [wednesdayPurchaseQuantity, setWednesdayPurchaseQuantity] = useState(0);
  const [thursdayPurchaseQuantity, setThursdayPurchaseQuantity] = useState(0);
  const [fridayPurchaseQuantity, setFridayPurchaseQuantity] = useState(0);
  const [saturdayPurchaseQuantity, setSaturdayPurchaseQuantity] = useState(0);
  const [sundayPurchaseQuantity, setSundayPurchaseQuantity] = useState(0);
  const [mondaySalesRate, setMondaySalesRate] = useState(0);
  const [tuesdaySalesRate, setTuesdaySalesRate] = useState(0);
  const [wednesdaySalesRate, setWednesdaySalesRate] = useState(0);
  const [thursdaySalesRate, setThursdaySalesRate] = useState(0);
  const [fridaySalesRate, setFridaySalesRate] = useState(0);
  const [saturdaySalesRate, setSaturdaySalesRate] = useState(0);
  const [sundaySalesRate, setSundaySalesRate] = useState(0);
  const [mondayPurchaseRate, setMondayPurchaseRate] = useState(0);
  const [tuesdayPurchaseRate, setTuesdayPurchaseRate] = useState(0);
  const [wednesdayPurchaseRate, setWednesdayPurchaseRate] = useState(0);
  const [thursdayPurchaseRate, setThursdayPurchaseRate] = useState(0);
  const [fridayPurchaseRate, setFridayPurchaseRate] = useState(0);
  const [saturdayPurchaseRate, setSaturdayPurchaseRate] = useState(0);
  const [sundayPurchaseRate, setSundayPurchaseRate] = useState(0);
  const [name, setname] = useState("");
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalRemainingSales, setTotalRemainingSales] = useState(0);
  const [totSales, setTotSales] = useState(0);
  const chartRef = useRef(null);

  const chartData = [mondaySalesQuantity * mondaySalesRate - mondayPurchaseQuantity * mondayPurchaseRate,
  tuesdaySalesQuantity * tuesdaySalesRate - tuesdayPurchaseQuantity * tuesdayPurchaseRate,
  (wednesdaySalesQuantity * wednesdaySalesRate) - (wednesdayPurchaseQuantity * wednesdayPurchaseRate),
  (thursdaySalesQuantity * thursdaySalesRate) - (thursdayPurchaseQuantity * thursdayPurchaseRate),
  fridaySalesQuantity * fridaySalesRate - fridayPurchaseQuantity * fridayPurchaseRate,
  (saturdaySalesQuantity * saturdaySalesRate) - (saturdayPurchaseQuantity * saturdayPurchaseRate),
  (sundaySalesQuantity * sundaySalesRate) - (sundayPurchaseQuantity * sundayPurchaseRate)];
  const [mobile, setmobile] = useState(false)

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 850) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])
  // console.log(InwardData)

  const arr = { 'Karve Nagar': 2, 'Godrej Prana':2, 'Ambegaon':2,'F Plaza':2, 'Hadapsar': 3, 'Godrej Horizon':3, 'Handewadi':3,'Kharadi IT Park': 4, 'Tingre Nagar': 4,'Bopodi': 4, 'Bramhasun City': 5, 'More Corner':5, 'Grandeur Undri':5, 'Bhavadi Road':6, 'Baif Road':6,'Neo City': 7,'Magarpatta':7,'Amanora City': 7,'Ivy Estate':7}


  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weekdayNumber = today.getDay();

  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Data',
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        data: [mondaySalesQuantity * mondaySalesRate - mondayPurchaseQuantity * mondayPurchaseRate,
        tuesdaySalesQuantity * tuesdaySalesRate - tuesdayPurchaseQuantity * tuesdayPurchaseRate,
        (wednesdaySalesQuantity * wednesdaySalesRate) - (wednesdayPurchaseQuantity * wednesdayPurchaseRate),
        (thursdaySalesQuantity * thursdaySalesRate) - (thursdayPurchaseQuantity * thursdayPurchaseRate),
        fridaySalesQuantity * fridaySalesRate - fridayPurchaseQuantity * fridayPurchaseRate,
        (saturdaySalesQuantity * saturdaySalesRate) - (saturdayPurchaseQuantity * saturdayPurchaseRate),
        (sundaySalesQuantity * sundaySalesRate) - (sundayPurchaseQuantity * sundayPurchaseRate)]
      }
    ]
  };

  const locations = [

    { location: t("karvenagar_location") },
    { location: t("Kondhwa BK") },
    { location: t("hadapsar_location") },
    { location: t("Undri") },   
    { location: t("kharadi_iT_park_location") },
    { location: t("bramhasun_city_location") },
    { location: t("wagholi_location") },
    { location: t("Bhavadi Road") },
    { location: t("magarpatta_location") },
    { location: t("amanora_city_location") },
    { location: t("Green City") }
    
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const cumulativeData = {};


  const marketNames = ['Karve Nagar', 'Godrej Prana','Ambegaon','F Plaza', 'Hadapsar', 'Godrej Horizon','Handewadi', 'Kharadi IT Park','Tingre Nagar', 'Bopodi', 'Bramhasun City', 'More Corner','Bhavadi Road','Baif Road','Grandeur Undri','Neo City','Magarpatta', 'Amanora City', 'Ivy Estate'];

  // Loop through each market and calculate cumulative data
  for (const market of marketNames) {
    const filteredInwardData = InwardDataGraph.filter(data => data.market === market);
    const filteredOutwardData = OutwardDataGraph.filter(data => data.market === market);

    const commoditiesInMarket = [...new Set(filteredInwardData.map(data => data.commodity))];

    const cumulativeDataForMarket = {};

    let totalNetProfit = 0; // initialize total net profit to 0

    for (const commodity of commoditiesInMarket) {
      const filteredInwardDataForCommodity = filteredInwardData.filter(data => data.commodity === commodity);
      const totalPurchaseQuantity = filteredInwardDataForCommodity.reduce((sum, data) => sum + data.purchase_quantity, 0);
      const totalPurchaseRate = filteredInwardDataForCommodity.reduce((sum, data) => sum + data.purchase_rate, 0);

      const filteredOutwardDataForCommodity = filteredOutwardData.filter(data => data.commodity === commodity);
      const totalRemainingSalesCalc = filteredOutwardDataForCommodity.reduce((sum, data) => sum + data.total_sales, 0);
      const totalSalesRate = filteredOutwardDataForCommodity.reduce((sum, data) => sum + data.sales_rate, 0);

      const netProfit = ((totalPurchaseQuantity - totalRemainingSalesCalc) * totalSalesRate) - (totalPurchaseQuantity * totalPurchaseRate);

      cumulativeDataForMarket[commodity] = {
        commodity,
        totalPurchaseQuantity,
        totalPurchaseRate,
        // totalSalesQuantity,
        totalRemainingSalesCalc,
        totalSalesRate,
        netProfit
      };

      totalNetProfit += netProfit; // add net profit of current commodity to total net profit
    }

    cumulativeData[market] = cumulativeDataForMarket;
    cumulativeData[market].totalNetProfit = totalNetProfit; // add total net profit to cumulative data for current market
  }

   

  const options = {

  }

  useEffect(() => {
    // Only run the effect if both location and selectedDate are truthy values
    if (name && selectedDate && searchClicked) {
      console.log("here")
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate); // outputs something like "2023-04-17"

      FarmerService.getInward().then((response) => {


        const res = response.data && response.data.filter((e) => e.market === name && e.time.slice(0, 10) === formattedDate);
        console.log(res);
        setInwardData(res); // Move the setInwardData method inside the then method
      });

      FarmerService.getOutward().then((response) => {
        const res = response.data && response.data.filter((e) => e.market === name && e.time.slice(0, 10) === formattedDate);
        console.log(res);
        setOutwardData(res); // Move the setOutwardData method inside the then method
      });
      setSearchClicked(false)
    }
  }, [name, selectedDate, searchClicked]);

  const handleSearchClick = () => {
    if (name === "") {

      toast.warn('Please Select Market!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    else setSearchClicked(true); // Set searchClicked to true when the search button is clicked
  };

  useEffect(() => {
    FarmerService.getInward().then((res) => {
      setInwardDataGraph(res.data);
    });

    FarmerService.getOutward().then((res) => {
      setOutwardDataGraph(res.data);
      // console.log(res.data)
    });
  }, []);



  function calculateSalesQuantity(i, y) {
    let temp = 0;
    if (OutwardDataGraph) {
      OutwardDataGraph.forEach((e) => {
        if (arr[e.market] === i) {
          temp += e.sales_quantity;
        }
      });
      y(temp);
    }
  }

  function handleDateChange(date) {
    const selectedDate = new Date(date);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate); // outputs "12/4/2023" for April 12th, 2023

    setSelectedDate(selectedDate);
  }


  function calculateSalesRate(i, y) {
    let temp = 0;
    if (OutwardDataGraph) {
      OutwardDataGraph.forEach((e) => {
        if (arr[e.market] === i) {
          temp += e.sales_rate;
        }
      });
      y(temp);
    }
  }

  function calculatePurchaseRate(i, y) {
    let temp = 0;
    if (InwardDataGraph) {
      InwardData.forEach((e) => {
        if (arr[e.market] === i) {
          temp += e.purchase_rate;
        }
      });
      y(temp);
    }
  }

  function calculatePurchaseQuality(i, y) {
    let temp = 0;
    if (InwardDataGraph) {
      InwardDataGraph.forEach((e) => {
        if (arr[e.market] === i) {
          temp += e.purchase_quantity;
        }
      });
      y(temp);
    }
  }


  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        calculateSalesQuantity(0, setSundaySalesQuantity)
      }
      else if (i === 1) {
        calculateSalesQuantity(1, setMondaySalesQuantity)
      }
      else if (i === 2) {
        calculateSalesQuantity(2, setTuesdaySalesQuantity);
      }
      else if (i === 3) {
        calculateSalesQuantity(3, setWednesdaySalesQuantity)
      }
      else if (i === 4) {
        calculateSalesQuantity(4, setThursdaySalesQuantity)
      }
      else if (i === 5) {
        calculateSalesQuantity(5, setFridaySalesQuantity)
      }
      else if (i === 6) {
        calculateSalesQuantity(6, setSaturdaySalesQuantity)
      }
    }
  }, [OutwardDataGraph]);


  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        calculateSalesRate(0, setSundaySalesRate)
      }
      else if (i === 1) {
        calculateSalesRate(1, setMondaySalesRate)
      }
      else if (i === 2) {
        calculateSalesRate(2, setTuesdaySalesRate);
      }
      else if (i === 3) {
        calculateSalesRate(3, setWednesdaySalesRate)
      }
      else if (i === 4) {
        calculateSalesRate(4, setThursdaySalesRate)
      }
      else if (i === 5) {
        calculateSalesRate(5, setFridaySalesRate)
      }
      else if (i === 6) {
        calculateSalesRate(6, setSaturdaySalesRate)
      }
    }
  }, [OutwardDataGraph]);



  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        calculatePurchaseRate(0, setSundayPurchaseRate)
      }
      else if (i === 1) {
        calculatePurchaseRate(1, setMondayPurchaseRate)
      }
      else if (i === 2) {
        calculatePurchaseRate(2, setTuesdayPurchaseRate);
      }
      else if (i === 3) {
        calculatePurchaseRate(3, setWednesdayPurchaseRate)
      }
      else if (i === 4) {
        calculatePurchaseRate(4, setThursdayPurchaseRate)
      }
      else if (i === 5) {
        calculatePurchaseRate(5, setFridayPurchaseRate)
      }
      else if (i === 6) {
        calculatePurchaseRate(6, setSaturdayPurchaseRate)
      }
    }
  }, [InwardDataGraph]);



  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        calculatePurchaseQuality(0, setSundayPurchaseQuantity)
      }
      else if (i === 1) {
        calculatePurchaseQuality(1, setMondayPurchaseQuantity)
      }
      else if (i === 2) {
        calculatePurchaseQuality(2, setTuesdayPurchaseQuantity);
      }
      else if (i === 3) {
        calculatePurchaseQuality(3, setWednesdayPurchaseQuantity)
      }
      else if (i === 4) {
        calculatePurchaseQuality(4, setThursdayPurchaseQuantity)
      }
      else if (i === 5) {
        calculatePurchaseQuality(5, setFridayPurchaseQuantity)
      }
      else if (i === 6) {
        calculatePurchaseQuality(6, setSaturdayPurchaseQuantity)
      }
    }
  }, [InwardDataGraph]);



  useEffect(() => {
    let totalSalesRate = 0;
    if (OutwardDataGraph) {
      OutwardDataGraph.forEach((e) => {
        if (weekdayNumber === arr[e.market]) {
          totalSalesRate += e.sales_rate;
        }
      });
      setSalesRate(totalSalesRate);
    }
  }, [OutwardDataGraph]);




  const handleLocation = (e) => {
    if (!selectedDate) {
      toast.warn('Please Select Date!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    else setlocation(e.target.value);
  };

  useEffect(() => {
    let totalPurchaseRate = 0;
    if (InwardDataGraph) {
      InwardDataGraph.forEach((e) => {
        if (weekdayNumber === arr[e.market]) {
          console.log(e.market)
          totalPurchaseRate += e.purchase_rate;
        }
      });
      setPurchaseRate(totalPurchaseRate);
    }
  }, [InwardDataGraph]);

  function handlePAndL() {
    const profitLossArray = []; // Create an empty array to store profit/loss values
    InwardData.forEach((inwardItem) => {
      const matchingOutwardItem = OutwardData.find(
        (outwardItem) => outwardItem.commodity === inwardItem.commodity
      );

      if (matchingOutwardItem) {
        const purchaseQuantity = inwardItem.purchase_quantity;
        const purchaseRate = inwardItem.purchase_rate;
        const remainingSales = matchingOutwardItem.total_sales;
        const salesRate = matchingOutwardItem.sales_rate;
        
        const profitLoss =
          ((purchaseQuantity - remainingSales) * salesRate) -
          (purchaseQuantity * purchaseRate);

        const existingProfit = profitLossArray.find(
          (item) => item.commodity === inwardItem.commodity
        );

        if (existingProfit) {
          existingProfit.profit += profitLoss;
        } else {
          profitLossArray.push({
            commodity: inwardItem.commodity,
            profit: profitLoss
          });
        }
      }
    });

    return profitLossArray; // Return the array of profit/loss values
  }

  console.log(chartRef);

  useEffect(() => {
    // Initialize the ECharts instance
    const chart = echarts.init(chartRef.current);
console.log(cumulativeData['Hadapsar']['totalNetProfit'])
    // Define the chart options
    const options = {
      xAxis: {
        type: 'category',
        data: [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')],
        axisLabel: {
          show: true,
          interval: 0, // Display all labels
          textStyle: {
            fontSize: 12 // Adjust the font size as needed
          },
          // rotate: -45 
        }
      },
      yAxis: {
        type: 'value'
      },
      dataGroupId: '',
      animationDurationUpdate: 500,
      series: [{
       
        type: 'bar',
         id: 'sales',
         itemStyle: {
          color: 'lightgreen' // Change the color of the bars here
        },
        data: [
          // {
          //   value: 0,
          //   groupId: t('monday')
          // },
          {
            value: chartData[1],
            groupId: t('tuesday')
          },
          { value: cumulativeData['Karve Nagar']['totalNetProfit']+cumulativeData['Godrej Prana']['totalNetProfit']+cumulativeData['Ambegaon']['totalNetProfit']+cumulativeData['F Plaza']['totalNetProfit'],
          groupId: t('tuesday')
          },
          {
            value: cumulativeData['Hadapsar']['totalNetProfit']+cumulativeData['Godrej Horizon']['totalNetProfit']+cumulativeData['Handewadi']['totalNetProfit'],
            groupId: t('wednesday')
          },

          {
            value: cumulativeData['Kharadi IT Park']['totalNetProfit']+cumulativeData['Tingre Nagar']['totalNetProfit']+cumulativeData['Bopodi']['totalNetProfit'],
            groupId: t('thursday')
          },
          {
            value: cumulativeData['Bramhasun City']['totalNetProfit'] + cumulativeData['More Corner']['totalNetProfit'], 
            groupId: t('friday')
          },
          {
            value: cumulativeData['Bhavadi Road']['totalNetProfit']+cumulativeData['Baif Road']['totalNetProfit']+cumulativeData['Grandeur Undri']['totalNetProfit'], 
            groupId: t('saturday')
          },
          {
            value: cumulativeData['Amanora City']['totalNetProfit'] + cumulativeData['Magarpatta']['totalNetProfit']+cumulativeData['Neo City']['totalNetProfit']+cumulativeData['Ivy Estate']['totalNetProfit'],
            groupId: t('sunday')
          }
        ],
        universalTransition: {
          enabled: true,
          divideShape: 'clone'
        }
      }]
    };

    // Set the chart options and render the chart
    chart.setOption(options);
   
    console.log('Cumulative Data for all Markets:', cumulativeData);


    
    // Loop through each market
    for (const market in cumulativeData) {
      console.log(`Market: ${market}`);
      // Loop through each commodity in the current market
      for (const commodity in cumulativeData[market]) {
        const netProfit = cumulativeData[market][commodity].netProfit;
        console.log(`Commodity: ${commodity}, Net Profit: ${netProfit}`);
      }
    }
    const karveNagarData = Object.keys(cumulativeData['Karve Nagar'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Karve Nagar'][commodity]['netProfit']])
    const godrejPranaData = Object.keys(cumulativeData['Kondhwa BK'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Godrej Prana'][commodity]['netProfit']])
    const ambegaonData = Object.keys(cumulativeData['Kondhwa BK'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Ambegaon'][commodity]['netProfit']])
    const fPlazaData = Object.keys(cumulativeData['Kondhwa BK'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['F Plaza'][commodity]['netProfit']])
    const hadapsarData = Object.keys(cumulativeData['Hadapsar'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Hadapsar'][commodity]['netProfit']])
    const kharadiData = Object.keys(cumulativeData['Kharadi IT Park'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Kharadi IT Park'][commodity]['netProfit']])
    const magarpattaData = Object.keys(cumulativeData['Magarpatta'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Magarpatta'][commodity]['netProfit']])
    const amanoraData = Object.keys(cumulativeData['Amanora City'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Amanora City'][commodity]['netProfit']])
    const BramhasuncityData = Object.keys(cumulativeData['Bramhasun City'])
                            .filter(commodity => commodity !== 'totalNetProfit')
                            .map(commodity => [commodity, cumulativeData['Bramhasun City'][commodity]['netProfit']])
    // const wanawadiData = Object.keys(cumulativeData['Wanawadi'])
    //                         .filter(commodity => commodity !== 'totalNetProfit')
    //                         .map(commodity => [commodity, cumulativeData['Wanawadi'][commodity]['netProfit']])
    const WagholiData = Object.keys(cumulativeData['Wagholi'])
                            .filter(commodity => commodity !== 'totalNetProfit')
                            .map(commodity => [commodity, cumulativeData['Wagholi'][commodity]['netProfit']])
    // const adityaNandanvanData = Object.keys(cumulativeData['Aditya Nandanvan'])
    //                         .filter(commodity => commodity !== 'totalNetProfit')
    //                         .map(commodity => [commodity, cumulativeData['Aditya Nandanvan'][commodity]['netProfit']])
    const undriData = Object.keys(cumulativeData['Undri'])
                            .filter(commodity => commodity !== 'totalNetProfit')
                            .map(commodity => [commodity, cumulativeData['Undri'][commodity]['netProfit']])
    const greenCityData = Object.keys(cumulativeData['Green City'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Green City'][commodity]['netProfit']])
    const bhavadiData = Object.keys(cumulativeData['Bhavadi Road'])
                            .filter(commodity => commodity !== 'totalNetProfit') 
                            .map(commodity => [commodity, cumulativeData['Bhavadi Road'][commodity]['netProfit']])

    const drilldownData = [
      {
        dataGroupId: t('tuesday'),
        data: Object.keys(cumulativeData['Karve Nagar'])
          .filter(commodity => commodity !== 'totalNetProfit') 
          .map(commodity => [commodity, cumulativeData['Karve Nagar'][commodity]['netProfit']])
      },
      {
        dataGroupId: t('wednesday'),
        data: Object.keys(cumulativeData['Hadapsar'])
          .filter(commodity => commodity !== 'totalNetProfit') 
          .map(commodity => [commodity, cumulativeData['Hadapsar'][commodity]['netProfit']])
      },

      {
        dataGroupId: t('thursday'),
        data: Object.keys(cumulativeData['Kharadi IT Park'])
          .filter(commodity => commodity !== 'totalNetProfit') 
          .map(commodity => [commodity, cumulativeData['Kharadi IT Park'][commodity]['netProfit']])
      },
      {
        dataGroupId: t('tuesday'),
        data: [
          ...karveNagarData,
          ...kondhwaData
          
        ]
      },
      {
        dataGroupId: t('wednesday'),
        data: [
          ...hadapsarData,
          ...undriData
        ],
      },
      {
        dataGroupId: t('thursday'),
        data: [
          ...kharadiData
        ]
      },

      {
        dataGroupId: t('friday'),
        data: [
          ...BramhasuncityData,
          ...WagholiData
        ],
      },
      {
        dataGroupId: t('saturday'),
        data: [
          ...bhavadiData
        ],
      },
      {
        dataGroupId: t('sunday'),
        data: [
          ...magarpattaData,
          ...amanoraData,
          ...greenCityData
        ]
      }
    ];

    chart.on('click', function (event) {
      if (event.data) {
        var subData = drilldownData.find(function (data) {
          return data.dataGroupId === event.data.groupId;
        });
        if (!subData) {
          return;
        }
        chart.setOption({
          xAxis: {
            data: subData.data.map(function (item) {
              return item[0];
            })
          },
          series: {
            type: 'bar',
            id: 'sales',
            dataGroupId: subData.dataGroupId,
            data: subData.data.map(function (item) {
              return item[1];
            }),
            universalTransition: {
              enabled: true,
              divideShape: 'clone'
            }
          },
          graphic: [
            {
              type: 'text',
              left: 50,
              top: 20,
              style: {
                text: 'Back',
                fontSize: 18
              },
              onclick: function () {
                chart.setOption(options);
              }
            }
          ]
        });
     }
    });
  
    
    // Dispose the chart instance when the component is unmounted
    return () => {
      chart.dispose();
    };
  }, [chartData, InwardDataGraph]);
  const [totalPurchaseQuantity1, setTotalPurchaseQuantity1] = useState(0);
  
  // useEffect(() => {
  //   // Calculate total purchase quantity after InwardData has been updated
  //   let totalRemaining = 0;
  //   OutwardData.forEach((e) => {
  //     totalRemaining += e.total_sales;
  //   });
  //   setTotalRemainingSales(totalRemaining);
  // }, [OutwardData]);

  useEffect(() => {
    // Calculate total purchase quantity after InwardData has been updated
    let totalPurchase = 0;
    OutwardData.forEach((e) => {
      totalPurchase += e.total_sales;
    });
    setTotalPurchaseQuantity1(totalPurchase);
  }, [InwardData]);

  const profitLossArray = handlePAndL()



  useEffect(() => {
    // Calculate and update the total purchase and remaining sales after the inward and outward data have been processed
    const calculateTotals = () => {
      let purchaseTotal = 0;
      let remainingSalesTotal = 0;

      InwardData.forEach((inwardItem) => {
        const matchingOutwardItem = OutwardData.find(
          (outwardItem) => outwardItem.commodity === inwardItem.commodity
        );

        if (matchingOutwardItem) {
          purchaseTotal += inwardItem.purchase_quantity;
          remainingSalesTotal += matchingOutwardItem.total_sales;
        }
      });

      setTotalPurchase(purchaseTotal);
      setTotalRemainingSales(remainingSalesTotal);
    };

    calculateTotals();
  }, [InwardData, OutwardData]);
  return (
    <>


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
      <div className="inOutData">

      </div>

      <div className="farmers_page">
        <div className="backbtndiv">
          <Link className="backbtn green backbtndiv" to="/farmers" >
            {t("back")}
          </Link>
        </div>

        {InwardData && OutwardData && (
          <div className="farmers">
            <div className="farmers_data">
              <Grid className="input-div-holder-new" container spacing={3}>

                <Grid item xs={12} sm={6} className="date-input-farmer-home">
                  <InputLabel className="farmerDataLabel">
                    {t("enter_booking_date")}
                  </InputLabel>
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    value={selectedDate}
                  />
                </Grid>

                <Grid className="select-market-grid" item xs={12} sm={6}>
                  <InputLabel className="farmerDataLabel">
                    {t("select_market")}
                  </InputLabel>
                  <FormControl className="formcontrol" sx={{ width: "100%", fontSize: 14 }}>
                    <InputLabel color="success" className="stall-booking-lable">
                      {t("market_label")}
                    </InputLabel>
                    {console.log(searchClicked)}
                    <Select
                      className="textfield"
                      id="demo-simple-select-autowidth"
                      value={location}
                      color="success"
                      onChange={
                        handleLocation}
                      label="address"
                      name="address"
                      required
                    >
                      {locations.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e.location}>
                            {t(e.location)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>


                <div className="searchButton">
                  <Button
                    onClick={handleSearchClick}
                    className="btn"
                    type="submit"
                    variant="contained"
                    sx={{ m: 2 }}
                  >
                    {t("search")}
                  </Button>
                </div>


              </Grid>

              {InwardData.length !== 0 && (
                <div className="inwardData">
                  <h3 style={{ padding: "1rem 0" }}>{t("inward_data")}</h3>
                  <div className="farmersdata_container">
                    {/* <div className="farmerdata_items">
                      <p>Purchase Rate : {purchaseRate}</p>
                    </div>
                    <div className="farmerdata_items">
                      <p>Purchase Quantity : {purchaseQuantity}</p>
                    </div> */}
                    {InwardData.map((e, i) => {
                      
                    return (
                    <div key={i} className="farmerdata_items">
                      {console.log(e)}
                      <p>{t("commodity")} {e.commodity}</p>
                      <p>{t("market")} {e.market}</p>
                      <p>{t("purchase_rate")} {e.purchase_rate}</p>
                      <p>{t("purchase_quantity")} {e.purchase_quantity}</p>
                    </div>)})}
                  </div>
                </div>

              )}
              {InwardData.length === 0 && (
                <div className="inwardData">
                  <h3 style={{ padding: "1rem 0" }}>{t("inward_data")}</h3>
                  <div className="farmersdata_container">
                    {t("no_inward_data_available")}
                  </div>
                </div>
              )}

              {OutwardData.length !== 0 && (
                <div className="outwardData">
                  {console.log(salesQuantity)}
                  <h3 style={{ padding: "1rem 0" }}>{t("outward_data")}</h3>
                  <div className="farmersdata_container">
                    {OutwardData.map((e, i) => {
                      return (
                        <div key={i} className="farmerdata_items">
                          <p>{t("commodity")} {e.commodity}</p>
                          <p>{t("market")} {e.market}</p>
                          <p>{t("sales_rate")} {e.sales_rate}</p>
                          <p>{t("Remaining_Sales")} : {e.total_sales}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {OutwardData.length === 0 && (
                <div className="outwardData">
                  <h3 style={{ padding: "1rem 0" }}>{t("outward_data")}</h3>
                  <div className="farmersdata_container">
                  {t("no_outward_data_available")}
                  </div>
                </div>

              )}
            </div>

            <div>
              {InwardData.length !== 0 ? (
                <div style={{ display: 'Grid', alignItems: 'Center', justifyContent: 'center', marginTop: '2rem' }}>
                  <h3 style={{ padding: "1rem 0" }}>{t("Cumulative Sales Data")}</h3>
                  <div className="farmersdata_container">
                  <div className="farmerdata_items">
                  <h3>{t("Total Purchase Quantity")}: {totalPurchase}</h3>
                  <h3>
                        {totalPurchase}
                        </h3>
     
            </div>
            <div className="farmerdata_items">
          <h3>{t("Total Remaining Sales")}: {totalRemainingSales}</h3>
           <h3>
                        {totalRemainingSales}
                        </h3>
     
        </div>
        <div className="farmerdata_items">
                      <h3>{t("Total Sales")}: {(totalPurchase - totalRemainingSales)}</h3>
          <h3>
                        {(totalPurchase - totalRemainingSales)}
                        </h3>
    
      </div>
      </div>
    </div>
  ) : (     console.log("no")
   )}
</div> 


            <div>
              {InwardData.length !== 0 && OutwardData.length !== 0 ? (
                <div style={{ display: 'Grid', alignItems: 'Center', justifyContent: 'center', marginTop: '2rem' }}>
                  <h3 style={{ padding: "1rem 0" }}>{t("profit_loss_label")}</h3>
                  <div className="farmersdata_container">
                    <div className="farmerdata_items">
                      
                      <h3>
                        {profitLossArray.map((item, index) => (
                          <div key={index}>
                           {t("commodity")}: {item.commodity}
                            <br />
                            {item.profit > 0 ? (
                              <span>
                                {t("Profit of")} {item.profit}
                                <br />
                              </span>
                            ) : (
                              <span>
                                {t("Loss of")} {Math.abs(item.profit)}
                                <br />
                              </span>
                            )}
                            ---
                          </div>
                        ))}
                      </h3>


                    </div>
                  </div>
                </div>
              ) : (
                console.log("no")
              )}
            </div>



            <h1>{t("market_details")}</h1>

            <div className="second-row">
              <div className="inwardData">
                <h3 style={{ padding: "0 0" }}>{t("market_days")}</h3>
                <div className="farmersdata_container">
                  <div className="farmerdata_items">
                    <p>{t("monday")}    : None</p>
                    <p>{t("tuesday")}   : {t("karvenagar_location")},{t("Kondhwa BK")}</p>
                    <p>{t("wednesday")} : {t("hadapsar_location")}, {t("Undri")}</p>
                    <p>{t("thursday")}  :  {t("kharadi_iT_park_location")}</p>
                    <p>{t("friday")}    : {t("bramhasun_city_location")}, {t("wagholi_location")} </p>
                    <p>{t("saturday")}  : {t("Bhavadi Road")}</p>
                    <p>{t("sunday")}    : {t("magarpatta_location")}, {t("amanora_city_location")}, {t("Green City")}</p>

                  </div>
                </div>
              </div>
              {/* { <Bar className="bar"
                data={data}
                options={options}
              >
                {console.log((sundaySalesQuantity * sundaySalesRate) - (sundayPurchaseQuantity * sundayPurchaseRate))}
              </Bar> } */}

              <div className="graph" ref={chartRef} style={{ width: '85%', height: '350px', alignItems:'center' }}>
  {/* The chart container */}
</div>

            </div>


          </div>


        )}
        {!InwardData && !OutwardData && <Spinner />}


        <div className="pageBottom" ></div>
      </div>
      {/* {mobile?<NavMenu
       />:console.log("desktop")} */}
    </>


  );
};

export default FarmersHome;



{/* <div>
  {InwardData.length !== 0 ? (
    <div style={{ display: 'Grid', alignItems: 'Center', justifyContent: 'center', marginTop: '2rem' }}>
      <h3 style={{ padding: "1rem 0" }}>{t("Cumulative Sales Data")}</h3>
      <div className="farmersdata_container">
        <div className="farmerdata_items">
          <h3>Total Purchase Quantity: {purchaseQuantity}</h3>
          {/* <h3 key={index}>
                          {totalPurchaseQuantity1}
                        </h3>
     */}
//         </div>
//         <div className="farmerdata_items">
//           <h3>Total Remaining Sales: {totalRemainingSales}</h3>
//           {/* <h3 key={index}>
//                           {totalPurchaseQuantity1}
//                         </h3>
//      */}
//         </div>
//         <div className="farmerdata_items">
//           <h3>Total Sales: {purchaseQuantity - totalRemainingSales}</h3>
//           {/* <h3 key={index}>
//                           {totalPurchaseQuantity1}
//                         </h3>
//      */}
//         </div>
//       </div>
//     </div>
//   ) : (
//     console.log("no")
//   )}
// </div> */}