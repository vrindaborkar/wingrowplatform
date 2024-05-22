import React,{useState} from 'react'

const ToggleAddBtn = ({id , handleClick}) => {
    const [addToggleBtn, setaddToggleBtn] = useState(true)
  return (
    <button 
        id={id} 
        onClick={(e)=>{
            handleClick(e);
            setaddToggleBtn(false)
        }} 
        className={addToggleBtn?'add_product':'disable_add_product'}
        >
    {addToggleBtn?"Add to cart":"Added to cart"}
    </button>
  )
}

export default ToggleAddBtn