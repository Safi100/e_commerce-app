const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const ProductRoute = require('./routes/product')
const AdvertisementRoute = require('./routes/advertisement')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


mongoose.connect('mongodb://localhost:27017/Ecommerce', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(res => console.log('Connected to Database successfully'))
.catch(err => console.log(err))

app.use('/product', ProductRoute)
app.use('/advertisement', AdvertisementRoute)

app.listen(8000, ()=>{
    console.log("app listining on port 3000");
})
