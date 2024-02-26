import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../componentes/AllProduct'
import { addArticulos } from '../redux/productSlice'


const Menu = () =>{
  const {filterby} =useParams()

  const navigate = useNavigate()
  const productData = useSelector(state=>state.product.productList)
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  

  const dispatch =useDispatch()
  const handleAñadirCarrito = (e)=>{
    
    dispatch(addArticulos(productDisplay))
  }

  const handleBuy =()=>{
    dispatch(addArticulos(productDisplay))
    navigate("/cart")
  }


  
  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white'>
        <div className='max-w-sm overflow-hidden w-full p-5'>
          <img src={productDisplay.imagen} className='h-[300px] w-[300px] hover:scale-105 transition-all'/>
        </div>
        <div className='flex flex-col gap-1'>
            <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>{productDisplay.nombre}</h3>
            <p className='text-slate-500 font-medium capitalize text-xl'>{productDisplay.categoria}</p>
            <p className='font-bold md:text-2xl'><span className=' text-yellow-500'>$</span><span>{productDisplay.precio}</span></p> 
            <div className='flex gap-3'>
            <button onClick={handleBuy} className='bg-yellow-500 py-1 mt-2 rounded h-8 w-32 hover:bg-yellow-600 min-w-[100px]'>Comprar</button> 
            <button onClick={handleAñadirCarrito} className='bg-yellow-500 py-1 mt-2 rounded h-8 w-32 hover:bg-yellow-600 min-w-[100px]'>Añadir al carrito</button> 
            </div>
            <div>
              <p className='text-slate-600 font-medium'> Descripción :</p>
              <p>{productDisplay.descripcion}</p>
            </div>
        </div>
      </div>

        <AllProduct heading={"Productos Relacionados"}/>
    </div>
  )
}

export default Menu