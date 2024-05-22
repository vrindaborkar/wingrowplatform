import React, { useContext }  from 'react';
import ProductContext from '../../cartContext/ProductContext';
import Spinner from '../../components/Spinner';
import './CustomerHome.css';
import Dropdownplaces from './DropdownPlaces';
import ProductsPage from './ProductsPage';
import { Select } from '@mui/material';

const CustomersHome = () => {  
  const {places} = useContext(ProductContext)
  return (
    <>
    {places && places.length !== 0 && <div className='customerhome_component'>
        <img alt="Lifestyle Exhibition" className="img-responsive" src="../images/slidestall2.webp" width="80%"/>
        <div className='select_items'>
        <label for="cars" className='places_head' >Select State </label>

        <select name="cars" id="cars">
          <option >Maharashtra</option>
          <option>Gujarat</option>
          <option>Kerala</option>
          <option>Karnataka</option>
        </select>
        </div>

        <div className='select'>
        <label for="cars" className='places_head' >Select District</label>

        <select  id="cars">
          <option >Ahmednagar</option>
          <option>Beed</option>
          <option>Pune</option>
          <option>Nagpur</option>
        </select>
        </div>

        <h2 className='places_header'>Select market in pune!</h2>
        <Dropdownplaces/>
        <ProductsPage/>
    </div>}
    {!places && <Spinner/>}
    </>
  )
}

export default CustomersHome