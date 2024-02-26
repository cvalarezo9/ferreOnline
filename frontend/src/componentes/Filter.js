import React from 'react'

import {MdHardware} from "react-icons/md"

const Filter = ({ categoria, onClick,isActive }) => {
    return (
      <div className='flex-col items-center flex w-28' onClick={onClick}>
      <div className={`text-3xl p-6 rounded-full w-20 cursor-pointer ${isActive ? "bg-red-500 text-white" : "bg-yellow-500"}`}>
        <MdHardware/>
      </div>

      <p className='text-center font-bold my-2 capitalize'>
        {categoria}
      </p>
    </div>
    );
  };
  

export default Filter