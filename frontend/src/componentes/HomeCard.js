import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({nombre,imagen,categoria,precio, loading, id}) => {
  return (
    <div className=' bg-white shadow-md p-2 rounded w-50 h-80 min-w-[150px]'>
        {nombre ? (
        <>
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})} >
            <div className='w-40 min-h-[220px]'>
                <img src={imagen} className='h-full w-full'/>
            </div>
            <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{nombre}</h3>
            <p className='text-center text-slate-500 font-medium capitalize'>{categoria}</p>
            <p className='text-center font-bold'><span className=' text-yellow-500'>$</span><span>{precio}</span></p> 
            </Link>
        </>
        
        )
        :

        <div className='flex justify-center items-center h-full'>
             <p>{loading}</p>
        
        </div>
       
    }
    </div>
  )
}

export default HomeCard