import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../../cartContext/ProductContext'
import Spinner from '../../components/Spinner'
import './Productspage.css'
import {itemsData} from './Itemsdata';
import ToggleAddBtn from './ToggleAddBtn'

const ProductsPage = () => {
  const {stallsData , Itemcount , handleClick } = useContext(ProductContext)
  return (
    <div className='products_page'>
      {/* <div className='products_head'>
        <Link className='head_products' to={`/customers/customerhome`}>Items</Link>
        <Link className='head_products' to="../cartspage">Cart {Itemcount}</Link>
      </div> */}
      <div className='products_container'>
        { stallsData && stallsData.length!==0 &&
          stallsData.map((e,i)=>{
            const data = itemsData?.find(ele => ele.label === e.commodity);
            const img = data?.img;
            // 'https://tse2.mm.bing.net/th?id=OIP.iwB5ZHEBW7HiLsUfb4BYzwHaHa&pid=Api&P=0'
            return(
              <div key={i} className='products'>
                <img className='img_products' alt='gift' src={img}/>
                <span className='content_product'>Market : {e.market}</span>
                <span className='content_product'>Commodity : {e.commodity}</span>
                <span className='content_product'>Price : {e.purchase_rate} / kg</span>
                {/* <span className='content_product'>Price : 40 / kg</span> */}
                {/* <ToggleAddBtn id={e._id} handleClick={handleClick}/> */}
              </div>
            )
          })
        }
        { stallsData && stallsData.length === 0 &&
          <div className='products_non_container'>
            <h3>No stallsData available</h3>
          </div> 
        }
        { !stallsData &&
          <Spinner/>
        }
      </div>
    </div>
  )
}

export default ProductsPage