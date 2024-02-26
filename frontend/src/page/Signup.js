import React, { useState } from 'react'

import loginSignupImage from "../assest/login-animado.gif"
import {BiHide, BiShow} from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import { ImagenBase64 } from '../utility/imagenBase64'
import { toast } from 'react-hot-toast';

function Signup () {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
          primerNombre: "",
          apellido: "",
          email: "",
          password: "",
          confirmpassword: "",
          imagen: "",
    });

    

    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
    };
    const handleShowConfirmPassword = ()=>{
        setShowConfirmPassword(preve => !preve)
    };

    const handleOnChange = (e) =>{

        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleActualizarImagenPerfil = async(e)=>{
        const data = await ImagenBase64(e.target.files[0])
       

        setData((preve)=>{
            return{
                ...preve,
                imagen : data
            }
        })
    }
console.log(process.env.REACT_APP_SERVER_DOMIN)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {primerNombre,apellido,email,password,confirmpassword,imagen} = data
        if(primerNombre && apellido && email && password && confirmpassword && imagen){
            if(password === confirmpassword){
                const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/singup`,{
                    method : "POST",
                    headers :{
                        "content-type" : "application/json"
                    },

                    body : JSON.stringify(data)
                })

                const dataRes=await fetchData.json()
                

                //alert(dataRes.message);
                toast(dataRes.message)
                if(dataRes.alert){
                    navigate("/login");
                }
                
            }
            else{
                toast("Las contraseñas no coinciden, por favor verifique.")
            }

        }
        else{
            toast("Por favor rellene todos los campos o falta subir una imagen de perfil")
        }
    }

  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
            {/*<h1 className="text-center text-2xl font-bold">Sign up</h1>*/}

            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                <img src={data.imagen ? data.imagen :loginSignupImage} className='w-full h-full'/>
                <label htmlFor='imagenPerfil'>
                <div className='absolute bottom-0 h-1/3 bg-blue-400 bg-opacity-50 w-full text-center cursor-pointer'>
                    <p className='text-sm p-1 text-white'>Subir</p>
                </div>
                <input type={"file"} id="imagenPerfil" accept="image/*" className="hidden" onChange={handleActualizarImagenPerfil}/>
                </label>
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='primerNombre'>Primer nombre</label>
                <input type={"text"} id="primerNombre" name='primerNombre' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-yellow-400' 
                value={data.primerNombre} 
                onChange={handleOnChange}/>

                <label htmlFor='apellido'>Apellido</label>
                <input type={"text"} id="apellido" name='apellido' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-yellow-400'
                value={data.apellido} 
                onChange={handleOnChange}/>

                <label htmlFor='email'>Correo electrónico</label>
                <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-yellow-400'
                value={data.email} 
                onChange={handleOnChange}/>
                
                <label htmlFor='password'>Contraseña</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-yellow-400' >  
                    
                    <input type={showPassword ? "text":"password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none'
                    value={data.password} 
                    onChange={handleOnChange}/>
                    <span className=' flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow/>:<BiHide/>}</span>
                </div>

                <label htmlFor='confirmpassword'>Confirmar Contraseña</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-yellow-400' >  
                    
                    <input type={showConfirmPassword ? "text":"password"} id="confirmpassword" name='confirmpassword' className=' w-full bg-slate-200 border-none outline-none'
                    value={data.confirmpassword} 
                    onChange={handleOnChange}/>
                    <span className=' flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow/>:<BiHide/>}</span>
                </div>
                <button className='w-full max-w-[150px] m-auto bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>  

            </form>
            <p className='text-left text-sm mt-2'> Ya tiene una cuenta ? <Link to={"/login"} className='text-yellow-500 underline'>Login</Link></p>
            
            
        </div>
    </div>
  )
}

export default Signup