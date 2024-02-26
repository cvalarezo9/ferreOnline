import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import CardFeature from './CardFeature'
import { useSelector } from 'react-redux'

const AllProduct = ({heading}) => {
const productData= useSelector((state)=>state.product.productList)
const categoriaList = [...new Set(productData.map(el=>el.categoria))]
console.log(categoriaList)

    //datos para el filtro
    const [filterby,setFilterBy]= useState("")
    const [dataFilter,setDataFilter] = useState([])
    useEffect(()=>{
      setDataFilter(productData)
    },[productData])
  
    const handleFilterProduct = (categoria)=>{
      setFilterBy(categoria)
      const filter = productData.filter(el =>el.categoria.toLowerCase() === categoria.toLowerCase())
      setDataFilter(filter)
    }

    const loadingArrayFeature = new Array(10).fill(null)
  return (
    <div className='my-5'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            {heading}         
          </h2>
          
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all md:justify-center '>
            {
                categoriaList[0]?
                   categoriaList.map(el=>{
                  return(

                    <Filter categoria={el} key={el} isActive={el === filterby} onClick={()=>handleFilterProduct(el)}/>
                  )
                })
                :
                <div className='min-h-[150px] flex justify-center items-center h-full'>
                <p>Cargando</p>
                </div>
            }
          </div>

          <div className='flex flex-wrap justify-center gap-4 my-3'>
              {
                 dataFilter[0] ?
                  dataFilter.map(el =>{
                  return(

                    <CardFeature
                      key={el._id}
                      id={el._id}
                      imagen={el.imagen}
                      nombre={el.nombre}
                      categoria={el.categoria}
                      precio={el.precio}

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
  )
}

export default AllProduct