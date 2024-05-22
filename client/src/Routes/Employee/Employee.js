import React,{useState , useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import EmployeeLanding from './EmloyeeLandingPage';
import EmployeeMain from './EmployeeMain';
import EmployeeSheet from './EmployeeSheet';
import Work from './Work.js';
import Leave from './Leave';
import MarketSheet from './MarketSheet';
const Employee = () => {
  return (
    <Routes>
      <Route path='/' element={<EmployeeMain/>}>
          <Route index element={<EmployeeLanding/>}/>
          <Route path='work' element={<Work/>}/>  
          <Route path='leave' element={<Leave/>}/>
          <Route path='marketSheet' element={<MarketSheet/>}/>
      </Route>    
      <Route path='/sheet' element={<EmployeeSheet/>}>
      </Route>
      
      
    </Routes>
  )
}

export default Employee;