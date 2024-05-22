import React from 'react'
import { Link, useNavigate,useLocation } from "react-router-dom";
import "../../styles/Admin.css";
import NavMenu from '../../components/NavMenu';
import useWindowDimensions from '../../components/useWindowDimensions';

const CheckListSoln = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {arr1,array1,array2} = state
    console.log(array1)
    const items =[]
    items.push(
        <tr>
                <th className='head'>Stall name</th> 
                <th className='head'>Used</th>
                <th className='head' >Left</th>
            </tr>
    )
    arr1.forEach((e)=>{
        items.push(
            // <div className ="checklist" key={e}>
            <tr>
                <th className='child'>{e}</th> 
                <th className='child'>{array1[e]}</th>
                <th className='child' >{array2[e]-array1[e]}</th>
            </tr>
            
        )
    })
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
    <div className='test'>
    <div className="main_container_stalls">
    <Link className="backbtn green" to="/admin/checkList" sx={{ m: 2 }} style={{ padding: '8px 20px 8px 20px', marginTop: -'570px', marginLeft: '10px' }}>
              Back
    </Link>
        <div className ="checkListSolnMain">
        <table id="table">
            {items}
        </table>
            
        </div>
        
    </div>
    <div className="pageBottom" ></div>
          {mobile?<NavMenu
            />:console.log("desktop")}
    </div>
  )
}

export default CheckListSoln