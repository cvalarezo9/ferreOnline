import React, { useEffect, useRef, useState } from 'react';
import HomeCard from '../componentes/HomeCard';
import { useSelector } from "react-redux";
import CardFeature from '../componentes/CardFeature';
import {GrPrevious, GrNext} from "react-icons/gr"
import Filter from '../componentes/Filter';
import AllProduct from '../componentes/AllProduct';

const Home = () => {

  const productData= useSelector((state)=>state.product.productList)
 
  const homeProductCardList=productData.slice(0,4);
  const homeProductCardListHerramientas =productData.filter(el=>el.categoria === "herramientas", [])
 

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct=()=>{
    slideProductRef.current.scrollLeft +=200
  }
  const preveProduct=()=>{
    slideProductRef.current.scrollLeft -=200
  }

  
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7'/>
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>Todo Lo Que Necesitas <span className='text-yellow-500'> Para Construir</span></h2>
          <p className='py-3 text-bas text-justify'>
¡Bienvenidos a nuestra ferretería online!

En  la Ferretería Cercana, nos enorgullece ofrecer una amplia gama de productos y herramientas de alta calidad para satisfacer todas sus necesidades de construcción, mantenimiento y mejoras para el hogar. Ya sea que sea un profesional experimentado o un entusiasta del bricolaje, estamos aquí para proporcionarle las herramientas adecuadas para cada proyecto</p>
         {/*  <button className='font-bold bg-yellow-500 text-slate-200 px-4 py-2 rounded-md'>Ordenar Ahora</button>*/}
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>

          {
            homeProductCardList[0] ?
             homeProductCardList.map(el =>{
              return(
                <HomeCard
                key={el._id}
                id={el._id}
                imagen={el.imagen}
                nombre={el.nombre}
                precio={el.precio}
                categoria={el.categoria}               
                />
              );
            })
            : loadingArray.map((el,index)=>{
              return(
                <HomeCard
                
                key={index}
                loading={"Cargando..."}
                />
              )
            })
          }
          
        </div>

      </div>

      <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Herramientas         
          </h2> 
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>   
          </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCardListHerramientas[0] ? 
            homeProductCardListHerramientas.map(el=>{
              return(
                <CardFeature
                key={el._id}
                id={el._id} 
                nombre={el.nombre}
                categoria={el.categoria}
                precio={el.precio}
                imagen={el.imagen}
                />
              )
            })
            :
            loadingArrayFeature.map((el,index)=>{
              return(
                <CardFeature
                
                key={index}
                loading={"Cargando..."}
                />
              )
            }) 
          }          
        </div>      

      </div>

        <AllProduct heading="Tus Productos"/>


      

    </div>
  
  )
}

export default Home