import React,{useState , useEffect} from 'react'
import axios from "axios";

const EmployeeSheet =  () =>  {
 
   const [data,setData] = useState([])
   const { REACT_APP_API_URL } = process.env;
  //  useEffect(()=>{
  //   async function res(){
  //     await axios.get(REACT_APP_API_URL+ "getEmployee")
  //     .then((res)=>{
  //      if(res){
  //        const {data} = res
  //        setData(data)
  //        console.log(data)
  //      }
  //     })
  //     .catch((err)=>{
  //      console.log(err);
  //     })
  //   }  
  //   res() 
  //  },[])
  
  return (
    <div>
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc18FtVyyCm13pwELkomlzc87HFP715z918RuGlwPNWXegtoQ/viewform?embedded=true" width="640" height="3553" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>    </div>
  )
}

export default EmployeeSheet