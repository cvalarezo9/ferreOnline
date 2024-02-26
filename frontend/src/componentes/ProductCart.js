import React from 'react'
import {TbPlus, TbMinus} from "react-icons/tb"
import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { deleteArticulos,incrementarArticulos,decrementarArticulos } from '../redux/productSlice'

const ProductCart = ({id,nombre,imagen,categoria,qty,total,precio}) => {
  const dispatch = useDispatch()


  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-yellow-300'>
      <div className='p-3 bg-white rounded overflow-hidden'>
          <img src={imagen} className='h-28 w-40 object-cover'/>
      </div>

      <div className='flex flex-col gap-1 w-full'>

            <div className='flex justify-between'>
              <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>{nombre}</h3>
              <div className='cursor-pointer text-slate-700 hover:text-red-500 ' onClick={()=>dispatch(deleteArticulos(id))}>
                <AiFillDelete/>
              </div>
            </div>

            <p className='text-slate-500 font-medium capitalize '>{categoria}</p>
            <p className='font-bold text-base'><span className=' text-yellow-500'>$</span><span>{precio}</span></p> 

            <div className='flex justify-between'> 

            <div className='flex gap-3 items-center'>
              <button onClick={()=>dispatch(incrementarArticulos(id))} className='bg-yellow-500 py-1 mt-2 rounded  hover:bg-green-500 p-1'><TbPlus/></button> 
              <p className='font-semibold p-1'>{qty}</p>
              <button onClick={()=>dispatch(decrementarArticulos(id))} className='bg-yellow-500 py-1 mt-2 rounded hover:bg-red-500 p-1'><TbMinus/></button> 
            </div>
            <div className='flex items-center gap-2 font-bold text-slate-700'>
                <p>Total U</p>
                <p><span className=' text-yellow-500'>$</span>{total}</p>
            </div>

            </div>
            
        </div>

    </div>
  )
}

export default ProductCart