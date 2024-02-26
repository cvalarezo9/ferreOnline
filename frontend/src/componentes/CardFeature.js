import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addArticulos,incrementarArticulos } from '../redux/productSlice'

const CardFeature = ({imagen,nombre,precio,categoria, loading, id}) => {
  const dispatch =useDispatch()
  const handleAñadirCarrito = (e)=>{
    
    dispatch(addArticulos({
      _id:id,
      nombre:nombre,
      precio:precio,
      categoria:categoria,
      imagen:imagen
    }))
  }
  return (
    <div className='w-60 h-72 min-w-[200px] max-w-[200px] bg-white hover:shadow-lg hover:scale-105 transition-all drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col items-center '>
        {
            imagen? (<>
            <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})} >
                    <div className='h-28 flex flex-col justify-center items-center'>
            <img src={imagen} className='h-full'/>
        </div>

          <h3 className='font-semibold text-slate-600 text-center capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{nombre}</h3>
            <p className=' text-slate-500 font-medium capitalize'>{categoria}</p>
            <p className=' font-bold'><span className=' text-yellow-500'>$</span><span>{precio}</span></p>
            </Link>
            <button className='bg-yellow-500 py-1 mt-2 rounded h-8  hover:bg-yellow-600 w-full'onClick={handleAñadirCarrito}>Añadir al carrito</button>
            
            </>
            ):(
            <div className='min-h-[150px] flex justify-center items-center h-full'>

                <p>{loading}</p>
            </div>
        )}
        
        
    </div>
  )
}

export default CardFeature