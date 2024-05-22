import "../../styles/Admin.css";
import React,{useState , useEffect ,useRef} from 'react'
import { Routes, Route ,Link} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card1 from '../../components/Card1'
import useWindowDimensions from '../../components/useWindowDimensions';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { blue } from "@mui/material/colors";


const Leave =()=>{
  const user = AuthService.getCurrentUser();
  const rate = useRef(0);

  const { REACT_APP_API_URL } = process.env;
  const[reason,setReason]  = useState("")
  const[flag ,setFlag] = useState(0)
  //const[todat,setToday] = useState(dayjs(new Date()).format("DD-MM-YYYY"))
  // const [rate,setRate] = useState(0)
  const[direction,setDirection] = useState("")
  const [error,setError] = useState("")
  const[role,setRole] = useState("")
  const [tags, setTags] = React.useState([]);
  const [tags1, setTags1] = React.useState([]);
  const [date,setDate] = useState(new Date().toISOString().split('T')[0])
  const[date1,setDate1] = useState(new Date().toLocaleDateString())
  const [data,setData] = useState([])
  const[rateD, setRateD] = useState(0)
  var showData =[]
  const handleDelete = (i) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };
useEffect(()=>{
   async function getLeave (){
    await axios.get(REACT_APP_API_URL + "getLeave")
    .then((res)=>{
      var data = res?.data
      var data1 = data.filter((x) => x.user === user.id)
      setData(data1)
      console.log(data1)
    })
    .catch((err)=>{
      console.log(err.message)
    })
   }
   getLeave();
},[])
useEffect(()=>{
  var size1 = tags.length
  var size2 = tags1.length
  if(size1 > 0 && size2 > 0){
    rate.current = size1/size2;

  }else{
    rate.current  = 0
  }
  console.log("hello")
},[tags,tags1])
const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete1 = (i) => {
    const newTags = tags1.slice(0);
    newTags.splice(i, 1);
    setTags1(newTags);
  };

const handleAddition1 = (tag) => {
    setTags1([...tags1, tag]);
  };
const handleSubmit = async (e) =>{
  e.preventDefault();
   if(tags.length === 0 || tags1.length === 0){
    setError("0 entry not allowed for today's work and pending work")
   }else{
      
        let userId = user.id;
       let  employeeID = user.employeeID
        let firstname=user.firstname
        let lastname=user.lastname
        let role=user.role
        let rating = rate
    
      
      await axios.post(REACT_APP_API_URL+"employeeDaily",{userId,employeeID,firstname,lastname,role,tags,tags1,date,rating})
      .then((res)=>{
        if(res){
          console.log("success")
          setTags([])
          setTags1([])
          setRole('')
          // setRate('')
        }
      })
      .catch((err)=>{
        console.log(err);
      })


   }
}
// const card = (
  
// );
const handleSubmit1 = async (e)=>{
  e.preventDefault()
  console.log(date1,reason)
  if(date1 && reason){
    var approve = "none"
    var id = user.id
    await axios.post(REACT_APP_API_URL + "applyLeave" , {id,date1,reason,approve})
    .then((res)=>{
      if(res){
        console.log("success")
        setDate1("")
        setReason("")
      }else{
        console.log("nope")
      }
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
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



    return(
      <div>
      <Link to='/employee/'>
        <ArrowLeftIcon sx={{ color: blue[900], fontSize: 45}}></ArrowLeftIcon>
        </Link>
        <div className="leaveBox">
          <h1 style={{marginBottom: '15px'}}>Apply for leave</h1>
        <form
            className="register_details"
            component="form"
            noValidate

            onSubmit={handleSubmit1}
            sx={{ mt: 3 }}
          >
          <Grid className="input-div-holder" container spacing={2}>
          <Grid item xs={12} sm={6}>
          <DatePicker
        label={'"day"'}
        value={date1}
        renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}
        onChange={(newValue) => {const d = new Date(newValue).toLocaleDateString();setDate1(d);console.log(d)}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  
                  autoComplete="nope"
                  inputProps={{
                    
                    autoComplete: 'off'
                  }}
                  name="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  fullWidth
                  id="Reason"
                  label="Reason for the leave"
                  autoFocus
                  color="success"
                  className="textfield"
                />
              </Grid>
            <Button type="submit"
              fullWidth
                
              className="signup-btn"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 3, mb: 2,}}
              style={{ right: '-58px',
              marginTop: '17px' }}  
                >
              Submit
            </Button>
            </Grid>
          </form>
        
          {data && data.map((d)=>{
            return(
          <Card1 date={d.date} reason ={d.reason} approved={d.approved}></Card1>);
          })}
          
        </div>
        </div>
    )
}

export default Leave;