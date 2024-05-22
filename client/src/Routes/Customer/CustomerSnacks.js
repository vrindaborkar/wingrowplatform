import React from 'react'
import CardsComponent from './CardsComponent'
import {snacks} from './snaksitems'


const CustomerSnacks = () => {
  return (
    <div className='snacks_wrapper'>
        <h2 className='snacks_header'>
            Wingrow Snacks
        </h2>
        <div className='snacks_main_component'>
            {
              snacks.map((e,i)=>{
                return(
                  <CardsComponent
                      key={i}
                      title={e.snacksName}
                      price={e.snacksPrice}
                      description={e.snacksIngredients}
                      image={e.snakcsImage}/>
                )
              })
            }
        </div>
    </div>
  )
}

export default CustomerSnacks