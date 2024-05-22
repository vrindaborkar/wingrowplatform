import React, { useContext }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import productContext from '../../cartContext/ProductContext'
import CartItem from './CartItem'
import './Cartpage.css'

const Cartspage = () => {
const {Itemcount , cartsData , Counter , setcartsData} = useContext(productContext);
const navigate = useNavigate();

const handlecheckout = () => {
  if(cartsData.length !== 0) {
    navigate('../checkout')
  }
}
  return (
    <div className='carts_page'>
      <div className='carts_head'>
        {/* <Link className='head_carts' to="../">Items</Link> */}
        <Link className='head_carts' to="../cartspage">Cart {Itemcount}</Link>
      </div>
      <div className='carts_container'>
      { cartsData && cartsData.length!==0 &&
          <CartItem cartsData={cartsData} Counter={Counter} setcartsData={setcartsData}/>
        }
        { cartsData && cartsData.length === 0 &&
          <div className='products_container'>
            Cart is empty!!
          </div>
        }
        { !cartsData &&
          <div className='products_container'>
          Cart is empty!!
        </div>
        }
      </div>
      {cartsData && cartsData.length !==0? <button className='confirm_buying' onClick={handlecheckout}>Proceed to checkout</button>:<></>}
    </div>
  )
}

export default Cartspage