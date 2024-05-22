import React , {useContext} from 'react'
import {itemsData} from './Itemsdata'
import productContext from '../../cartContext/ProductContext';

const CheckoutItems = () => {
    const {cartsData , Counter} = useContext(productContext)
  return (
    <>
    {cartsData && cartsData.length !== 0 && cartsData.map((e)=>{
        const Counterid = Counter[e._id]
        const {img} = itemsData.find(ele => ele.label === e.commodity)
        return(
          <div key={e._id} className='products'>
            <img className='img_products' alt='gift' src={img}/>
            <span className='content_product'>Market : {e.market}</span>
            <span className='content_product'>Commodity : {e.commodity}</span>
            <span className='content_product'>Price : {e.purchase_rate} / kg</span>
            <div className='filter_remove_item_wrapper'>
              <div className='filter_remove_item'>
                <span className='counter_id'>count:{Counterid}</span>
              </div>
            </div>
          </div>
        )
      })}
      </>
  )
}

export default CheckoutItems