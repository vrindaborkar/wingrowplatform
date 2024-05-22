import React ,{useState} from "react";
import "../../styles/Test.css";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  arrowIcon: {
    position: 'relative',
    top: '2rem',
    backgroundColor:'red'
  },
});

const Stall = ({ data, handleClick, bookedStalls, alreadyBooked, date, display,t }) => {
  
  const classes = useStyles();
  const [displayArrow, setDisplayArrow] = useState(true);
  const handleClickArrow = () => {
    // Handle click logic here
    setDisplayArrow(false);
  };
  return (
    <div className={data.length > 18 ? "Stalls_info" : "Stalls_info_xl"}>
    {/* {console.log(data)} */}
      {alreadyBooked &&
        data.map((e, i) => {
          const isBookedarr = alreadyBooked.filter(
            (ele) => ele.stallNo === e.stallNo && ele.bookedAt === date
          );
          const isBooked = isBookedarr.length === 0 ? false : true;
          const { stallName, _id, stallPrice } = e;
          const isSelected = bookedStalls.some((e) => e._id === _id);
          let stallClass;
          if (isBooked) {
            stallClass = "booked";
          } else if (stallPrice === 100) {
            stallClass = "hundred";
          }
            else if (stallPrice === 200) {
            stallClass = "two-hundred";
          } else if (stallPrice === 300) {
            stallClass = "three-hundred";
          }
          else if (stallPrice === 500) {
            stallClass = "five-hundred";
          } else if (stallPrice === 800) {
            stallClass = "eight-hundred";
          } else {
            stallClass = "available";
          }

          if (isSelected && !isBooked) {
            stallClass = "selected";
          }
           var x = stallName 

          return (
            // <div className={stallClass}>
           
            <div style={{ cursor: "pointer",className:'display' }} className="single-stall">
           {console.log(t(stallName))}
              <img
                className="stall-img"
                src="../../../images/stand.png"
                alt="logo"
              />
              <div onClick={handleClick} id={_id} key={i} className={stallClass} style={{fontSize:'15px'}}>
                {/* {i === 2 && displayArrow ? (
                  <ArrowDownwardIcon className={classes.arrowIcon} />
                ) : (
                  console.log(i)
                )} */}
                 {t(stallName)}
              </div>
              {/* <div className={stallClass}> */}
{/* 
              </div> */}
            </div>
          );
        })}
    </div>
  );
};

export default Stall;