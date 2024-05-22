import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";
import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";

const AdminMarket = () => {
  const { REACT_APP_API_URL } = process.env;

    const [marketName,setMarketName] = useState("")
    const[direction,setDirection] = useState("")
  const [offers, setOffers] = useState("")
    const [tags, setTags] = React.useState([]);
    const [date,setDate] = useState(new Date().toISOString().split('T')[0])
    const [data,setData] = useState([])
    var showData =[]
    
    useEffect(()=>{


      async function getData(){
        await axios.get("https://wingrowmarket.com:8443/"+"getMarket")
        .then((res)=>{
         if(res){
          const {data} = res
          setData(data)
          
         }
        })
        .catch((err)=>{
           console.log(err.message)
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
    data  && data.forEach((d)=>{
      showData.push(
        <div className = "box">
            <p>MarketName : {d.marketName}</p>
            <p>Direction :{d.direction}</p>
            {d.offers && d.offers.forEach(e => <p>{e}</p>)}
         </div>
      )
    })
    const handleDelete = (i) => {
        const newTags = tags.slice(0);
        newTags.splice(i, 1);
        setTags(newTags);
      };
    
    const handleAddition = (tag) => {
        setTags([...tags, tag]);
      };
    const handleSubmit = async (e) =>{
       e.preventDefault();
       data.push({marketName:marketName,direction:direction,tags:tags,date:date})
       await axios.post("https://wingrowmarket.com:8443/"+"addMarket",{marketName,direction,tags,date})
       .then((res)=>{
        if(res){
          console.log("success")
          setDirection("")
          setTags([])
          setMarketName("")

        }
       })
       .catch((err)=>{
        console.log(err);
       })
    }
  return (
    <div>
    <form
            className="register_details"
            component="form"
            noValidate

            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            

            <Grid className="input-div-holder" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  // autoComplete="given-name"
                  autoComplete="nope"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  name="marketName"
                  value={marketName}
                  onChange={(e) => setMarketName(e.target.value)}
                  required
                  fullWidth
                  id="firstName"
                  label="Market Name"
                  autoFocus
                  color="success"
                  className="textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Direction"
                  name="Direction"
                  value={direction}
                  onChange={(e) =>setDirection(e.target.value)}
                  autoComplete="nope"
                  color="success"
                  className="textfield registerLabel"
                />
              </Grid>
        
                <Grid item xs={12}>
                  <ReactTags
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    fullWidth
                    tags={tags}
                    
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    placeholder="Add offers"
                    allowNew={true}
                    autofocus={false}
                    minQueryLength={1}
                    className="textfield"
                    color="success"
                    classNames={{
                      suggestions: 'tag-suggestions'
                    }}
                  />

                </Grid>


            
            </Grid>
            


            <Button item xs={12}
              type="submit"
              fullWidth

              className="signup-btn"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              <span className="heading">Add</span>
            </Button>


           
          </form>
          
          {/* <div className='places_wrapper'>
          {showData}
        </div> */}
        <div className="pageBottom" style={{height: '100px'}}></div>
      {mobile?<NavMenu
      />:console.log("desktop")}
    </div>
  )
}

export default AdminMarket