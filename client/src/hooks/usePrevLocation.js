import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

//THIS IS THE CUSTOM HOOK

function usePrevLocation(location){

const prevLocRef = useRef(location)
console.log(prevLocRef)
useEffect(()=>{
prevLocRef.current = location
},)

return prevLocRef.current

};


export default usePrevLocation