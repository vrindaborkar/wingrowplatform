import React , {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../styles/Farmer.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height:"60%",
  overflow:"auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDelete({handleOpen , handleClose , open , setNumberOfSeats}) {
    const [selected, setselected] = useState("")

    const handleClick = (e) => {
        setselected(e.target.id)
    }

    const handleSubmit = () => {
        const val = parseInt(selected);
        setNumberOfSeats(val);
        handleClose(true)
    }

  return (
    <div style={{textAlign:"center",backgroundColor:"white",marginTop:"10px"}}>
      <Button onClick={handleOpen}>Select Number of Stalls</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='select_modal_component'>
            <h2 className="select_modal_header">How many stalls?</h2>
            <img className='scooter_image' alt='img_scooter' src="https://tse2.mm.bing.net/th?id=OIP.u8q-PAVKylO0ylaQqugiuQHaEo&pid=Api&P=0"/>
            <div className='select_modal_numbers'>
                <span onClick={handleClick} id="1" className={selected === "1" ? "select_modal_numbers_selected":'select_numbers'}>1</span>
                <span onClick={handleClick} id="2" className={selected === "2" ? "select_modal_numbers_selected":'select_numbers'}>2</span>
                <span onClick={handleClick} id="3" className={selected === "3" ? "select_modal_numbers_selected":'select_numbers'}>3</span>
                <span onClick={handleClick} id="4" className={selected === "4" ? "select_modal_numbers_selected":'select_numbers'}>4</span>
                <span onClick={handleClick} id="5" className={selected === "5" ? "select_modal_numbers_selected":'select_numbers'}>5</span>
                <span onClick={handleClick} id="6" className={selected === "6" ? "select_modal_numbers_selected":'select_numbers'}>6</span>
                <span onClick={handleClick} id="7" className={selected === "7" ? "select_modal_numbers_selected":'select_numbers'}>7</span>
                <span onClick={handleClick} id="8" className={selected === "8" ? "select_modal_numbers_selected":'select_numbers'}>8</span>
                <span onClick={handleClick} id="9" className={selected === "9" ? "select_modal_numbers_selected":'select_numbers'}>9</span>
                <span onClick={handleClick} id="10" className={selected === "10" ? "select_modal_numbers_selected":'select_numbers'}>10</span>
            </div>
            <button className='select_modal_button' onClick={handleSubmit}>Select stalls</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
