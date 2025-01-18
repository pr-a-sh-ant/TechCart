import React from 'react'
import Login from './Login'
import { Drawer } from '@mui/material'
import {gadgets} from '../DATA/homedata'
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <div id ='/' className='mx-[14rem]'>
<Navbar/>
      <div className='flex justify-center  flex-col items-center h-screen  '>
      <div className='text-start  w-full  flex justify-start text-xl pb-3 '>
        <p className='bg-black text-white w-[10rem] h-6  flex justify-center items-center  text-sm font-extralight '>TRENDING NOW</p>
      </div>
      <div className=' h-screen  grid grid-cols-3 w-full '>
       
      {gadgets.map((gadget) => {
      return (
       <div className=' h-[18rem] w-[20rem] rounded-lg shadow-2xl flex flex-col '>

<img src={gadget.image} alt={gadget.name}  className='z-10 h-[20rem] w-[20rem]'/>
<p className='z-20 px-0 absolute top-[24rem] bg-blue-300 h-12 flex items-center pl-3 w-[20rem]'>{gadget.name}:{gadget.description}</p>
       </div>
      );
    })}
    </div>
      </div>
    </div>
  )
}

export default Home
