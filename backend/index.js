const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv= require("dotenv").config()
const Stripe = require("stripe")

const app = express()
app.use(cors())

app.use(express.json({limit: "10mb"}))

const PORT = process.env.PORT || 8080

//base de datos conexion
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Base de datos conectada"))
.catch((err)=>console.log(err))

//schema
const userSchema=mongoose.Schema({
    primerNombre: String,
    apellido: String,
    email: {
        type: String,
        unique : true
    },
    password: String,
    confirmpassword: String,
    imagen: String,
})

//Modelos o tablas
const userModel = mongoose.model("user",userSchema)



//API
app.get("/",(req,res)=>{
    res.send("El servidor esta en marcha")
})


//login


app.post("/login", async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;

  try {
      const user = await userModel.findOne({ email: email });

      if (user) {
          // Verificar la contraseña
          if (user.password === password) {
              const dataSend = {
                  _id: user._id,
                  primerNombre: user.primerNombre,
                  apellido: user.apellido,
                  email: user.email,
                  imagen: user.imagen,
              };
              console.log(dataSend);
              res.send({ message: "El ingreso ha sido satisfactorio.", alert: true, data: dataSend });
          } else {
              // Contraseña incorrecta
              res.send({ message: "Contraseña incorrecta. Por favor, inténtelo de nuevo.", alert: false });
          }
      } else {
          // Usuario no encontrado
          res.send({ message: "El correo no se encuentra registrado. Por favor, cree una cuenta.", alert: false });
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error en el servidor.", alert: false });
  }
});




//sign up
app.post("/singup",async(req,res)=>{
    //console.log(req.body)

    const{email} = req.body
      
    userModel.findOne({email:email})
    
      .then(result =>{
       // console.log(result)
        if(result){
        res.send({message: "El email ya esta registrado.",alert:false})
        }else{
            const data=userModel(req.body)
            const save =data.save()
            res.send({message:"Ingreso satisfactorio",alert:true})
        }

      })
      .catch(err=>{
        console.log(err)
      })

});


//seccion para los productos

const schemaProduct = mongoose.Schema({
      nombre: String,
      categoria: String,
      imagen: String,
      precio: String,
      descripcion: String,
});

const productModel = mongoose.model("product", schemaProduct)

//guardar productos

app.post("/uploadProduct", async(req,res)=>{
  //console.log(req.body)
  const data = await productModel(req.body)
  const datasave =await data.save()
  res.send({message: "Se ha subido satisfactoriamente"})
})

//

app.get("/product",async(req, res)=>{

  const data= await productModel.find({})
  res.send(JSON.stringify(data))
})

/***metodo de pago***/
console.log(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment", async(req, res)=>{
    console.log(req.body)
    try{
        const params = {
            submit_type: 'pay',
            mode : "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [{shipping_rate: "shr_1OntyJHYat7WVotHBMWlxCoB"}],

            line_items: req.body.map((item)=>{
                return{
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.nombre
                            //images: [item.imagen]
                        },
                        unit_amount: item.precio * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.qty
                    
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            
        }
        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
    }catch(err){
        res.status(err.statusCode || 500).json(err.message)
    }
    
})



//Server en marcha
app.listen(PORT,()=>console.log("El server esta en marcha en el puerto: "+ PORT))