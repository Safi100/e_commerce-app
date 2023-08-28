if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const ProductRoute = require('./routes/product')
const AdvertisementRoute = require('./routes/advertisement')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/customer')
const cartRoute = require('./routes/cart')

const Customer = require('./models/customer')
const Product = require('./models/product')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/Ecommerce', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(res => console.log('Connected to Database successfully'))
.catch(err => console.log(err))

app.use('/product', ProductRoute)
app.use('/advertisement', AdvertisementRoute)
app.use('/category', categoryRoute)
app.use('/user', userRoute)
app.use('/cart', cartRoute)

app.listen(8000, ()=>{
    console.log("app listining on port 8000");
})
