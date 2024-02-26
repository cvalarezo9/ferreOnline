import React from 'react'
import { useSelector } from 'react-redux'
import ProductCart from '../componentes/ProductCart'
import cartA from "../assest/cart.gif"
import toast from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const productCartItem = useSelector((state) => state.product.cartItem)
    const user = useSelector((state => state.user));
    const navigate = useNavigate();


    const precioTotal = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalPro = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)



    const handlePayment = async () => {

        if (user.email) {

            const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            const stripe = await stripePromise;
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/checkout-payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(productCartItem)
            })

            if (res.statusCode === 500) return;

            const data = await res.json()
            console.log(data)
            toast("Dirigiendo al metodo de pago...!")
            stripe.redirectToCheckout({ sessionId: data })
        }else{
            toast("Necesita iniciar sesión")

            setTimeout(()=>{
                navigate("/login")
            },1000)
        }

    }
    return (
        <>

            <div className='p-2 md:p-4'>
                <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Tus articulos agregados</h2>

                {productCartItem[0] ?
                    <div className='my-4 md:flex gap-4'>
                        <div className='w-full max-w-3xl'>
                            {
                                productCartItem.map(el => {
                                    return (<ProductCart
                                        key={el._id}
                                        id={el._id}
                                        nombre={el.nombre}
                                        imagen={el.imagen}
                                        categoria={el.categoria}
                                        precio={el.precio}
                                        qty={el.qty}
                                        total={el.total}
                                    />)

                                })
                            }
                        </div>
                        <div className=' w-full max-w-m ml-auto'>
                            <h2 className='bg-blue-500 text-white p-2 text-lg'>Suma Total</h2>
                            <div className='flex w-full py-2 text-lg border-b'>
                                <p>Cantidad Productos :</p>
                                <p className='ml-auto w-32 font-bold'>{totalPro}</p>
                            </div>
                            <div className='flex w-full py-2 text-lg border-b'>
                                <p>Total Price</p>
                                <p className='ml-auto w-32 font-bold'><span className=' text-yellow-500'>$</span>{precioTotal}</p>

                            </div>
                            <button className='bg-yellow-400 w-full text-lg font-bold py-2 text-white' onClick={handlePayment}>
                                Pago</button>
                        </div>
                    </div>
                    :
                    <>
                        <div className='flex w-full justify-center items-center flex-col'>
                            <img src={cartA} className='w-full max-w-sm' />
                            <p className='text-slate-500 text-3xl font-semibold capitalize'> carrito vacio</p>
                        </div>

                    </>
                }
            </div>

        </>
    )
}

export default Cart