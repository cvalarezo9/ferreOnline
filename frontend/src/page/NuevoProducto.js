import React, { useState } from 'react'

import {BsCloudUpload} from "react-icons/bs"
import { ImagenBase64 } from '../utility/imagenBase64'
import { toast } from 'react-hot-toast';

const NuevoProducto = () => {

  const [data,setData]= useState({

      nombre: "",
      categoria: "",
      imagen: "",
      precio: "",
      descripcion: "",
  })

  const handleSubmit =async(e)=>{
    e.preventDefault()
    console.log(data)

    const {nombre,imagen,categoria,precio}=data

    if(nombre && imagen && categoria && precio){

      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return {

          nombre: "",
          categoria: "",
          imagen: "",
          precio: "",
          descripcion: "",
      }
      })

    }else{
      toast("Por favor rellene los campos") 
    }

  }

  const handleOnChange =(e)=>{
     const {name,value}= e.target
     setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
     })
  }

  const uploadImage = async(e)=>{
    
      const data = await ImagenBase64(e.target.files[0])
      //console.log(data)

      setData((preve)=>{
        return{
          ...preve,
          imagen : data
        }
      })
  }
  
  return (
    <div className='m-4'>
        <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
            <label htmlFor='nombre'>Nombre</label>
            <input type={"text"}  name="nombre" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.nombre}/>

            <label htmlFor='categoria'>Categoria</label>
            <select className='bg-slate-200 p-1 my-1' id='categoria' name='categoria' onChange={handleOnChange} value={data.categoria}>
                <option value={"otros"}>Seleccione una categoria</option>
                <option value={"herramientas"}>Herramientas</option>
                <option value={"electricidad"}>Electricidad</option>
                <option value={"construccion"}>Construcción</option>
                <option value={"cerrajeria"}>Cerrajería</option>
                <option value={"pinturas"}>Pinturas</option>
            </select>

            <label htmlFor="imagen">Imagen
            <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer '>
                {
                  data.imagen ? <img src={data.imagen} className='h-full'/> : <span className='text-5xl'><BsCloudUpload/></span>
                }
                
                
                <input type={"file"} accept="image/*" id="imagen" onChange={uploadImage} className='hidden'/>
            </div>
            </label>

            <label htmlFor='precio' className='my-1'>Precio</label>
            <input type={"text"} className='bg-slate-200 p-1 my-1' name='precio' onChange={handleOnChange} value={data.precio}/>

            <label htmlFor='descripcion'>Descripción</label>
            <textarea rows={2} value={data.descripcion} className='bg-slate-200 p-1 my-1 resize-none' name='descripcion' onChange={handleOnChange}></textarea>
            <button className=' bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-medium my-2 drop-shadow'>Guardar</button>
        </form>
    </div>
  )
}

export default NuevoProducto