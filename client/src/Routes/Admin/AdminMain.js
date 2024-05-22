import React,{useState , useEffect} from 'react'
import { Routes, Route } from "react-router-dom";

import { Outlet } from 'react-router-dom'

const AdminMain = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default AdminMain