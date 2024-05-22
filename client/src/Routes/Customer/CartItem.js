import React, { useContext } from 'react'
import ProductContext from '../../cartContext/ProductContext'
import {itemsData} from './Itemsdata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItem = ({t}) => {
const {cartsData , Counter , setcartsData , setItemcount , setCounter , Itemcount} = useContext(ProductContext)

  const handleRemove = (ev) => {
    const id = ev.target.id; 
    const data = cartsData.filter(e => e._id !== `${id}`)
    setcartsData(data)
    setItemcount(prev => prev - Counter[id])
          setCounter((prev)=>{
            return{
              ...prev,
              [id]: 0
            }
          })
          toast.success('Item removed successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
  }

  const handleInCounter = (ev) => {
    const id = ev.target.id
      setItemcount(prev => prev + 1)
      setCounter((prev)=>{
        return{
          ...prev,
          [id]: prev[id]+1
        }
      })
  }

  const handleDeCounter = (ev) => {
    const id = ev.target.id

    if(Counter[id] === 1){
      const data = cartsData.filter(e => e._id !== `${id}`)
      setItemcount(prev => prev - 1)
      setcartsData(data)
      return;
    }
    if(Counter[id] === 1 && Itemcount === 1){
      const data = cartsData.filter(e => e._id !== `${id}`)
      setItemcount(0)
      setcartsData(data)
      return;
    }
      setItemcount(prev => prev - 1)
      setCounter((prev)=>{
        return{
          ...prev,
          [id]: prev[id]-1
        }
      })
  }

  return(
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
    {cartsData && cartsData.length !== 0 && cartsData.map((e)=>{
        const Counterid = Counter[e._id]
        const {img} = itemsData.find(ele => ele.label === e.commodity)
        return(
          <div key={e._id} className='products'>
            <img className='img_products' alt='gift' src={img}/>
            <span className='content_product'>{t("market")} {e.market}</span>
            <span className='content_product'>Commodity : {e.commodity}</span>
            <span className='content_product'>Price : {e.purchase_rate} / kg</span>
            <div className='filter_remove_item_wrapper'>
              <div className='filter_remove_item'>
                <button className='decrement' id={e._id} onClick={handleDeCounter}>-</button>
                <span className='counter_id'>{Counterid}</span>
                <button className='increment' id={e._id} onClick={handleInCounter}>+</button>
              </div>
              <button className='btn_remove_item' id={e._id} onClick={handleRemove}>Remove Item</button>
            </div>
          </div>
        )
      })}
      </>
  )
}

export default CartItem