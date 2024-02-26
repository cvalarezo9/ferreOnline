import React, { useState } from 'react'
import logo from "../assest/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import {FaUserCircle} from "react-icons/fa"
import {FaShoppingCart} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast';

const Header = ({id}) =>{

    const [showMenu, setShowMenu] = useState(false);
    const userData=useSelector((state)=>state.user)
    console.log(userData.email)

    const dispatch=useDispatch()

    const navigate = useNavigate()

    

    const handleShowMenu =()=>{
        setShowMenu(preve=>!preve)
    }
    const handleLogout =()=>{
        dispatch(logoutRedux())
        toast("Sesión cerrada satisfactoriamente.")
        navigate("/login");
    }

    const numeroCarrito = useSelector((state)=>state.product.cartItem)

    

    return(
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
        {/*destktop*/}
        
        <div className="flex items-center h-full justify-between">
            <Link to={""}>
            <div className="h-14">
                <img src={logo} className="h-full"/>
            </div>
            </Link>
            
            <div className="flex items-center gap-4 md:gap-7 ">
                <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                    <Link to={""}>Home</Link>
                    <Link to={"/menu/659f813b3abed6d0d146edce"}>Menú</Link>
                    {/*<Link to={"about"} className='px-2 py-1'>Acerca de</Link>
                        <Link to={"contact"} className='px-2 py-1'>Contacto</Link> */}
                </nav>
                <div className="text-2xl text-yellow-500 relative cursor-pointer">
                 <Link to={"cart"}> <FaShoppingCart />
                    <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                        {numeroCarrito.length}
                    </div>
                    </Link>
                </div>
                <div className="text-yellow-500 " onClick={handleShowMenu}>
                    <div className="text-2xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md pt-1.5" >
                        { userData.imagen ? <img src={userData.imagen} className='h-full w-full'/> : <FaUserCircle />}
                    </div>
                {
                    showMenu && (<div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                    {

                        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"nuevoproducto"} className='whitespace-nowrap cursor-pointer px-2'>Nuevo producto</Link>
                    }
                    
                    {
                        userData.imagen ? <p className='cursor-pointer px-2 text-red-600' onClick={handleLogout}>Logout ({userData.primerNombre})</p>: <Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                    }

                    <nav className="text-base md:text-lg flex flex-col md:hidden">
                        <Link to={""} className='px-2 py-1'>Home</Link>
                        <Link to={"/menu/659f813b3abed6d0d146edce"} className='px-2 py-1'>Menú</Link>
                        {/*<Link to={"about"} className='px-2 py-1'>Acerca de</Link>
                        <Link to={"contact"} className='px-2 py-1'>Contacto</Link> */}
                    </nav>
                    
                    </div> 
                )}    

                </div>

            </div>

        </div>


        {/*mobile*/}    
        </header>
    )
}

export default Header
