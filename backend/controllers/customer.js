const Customer = require('../models/customer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.CreateAccount = async (req, res) => {
    try{
        const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
        const first_name = capitalize(req.body.first_name.trim())
        const last_name = capitalize(req.body.last_name.trim())
        const email = req.body.email.toLowerCase().trim()
        const password = req.body.password.trim()
        const confirmPassword = req.body.confirmPassword.trim()
        // Validation:
        if(password !== confirmPassword){
            throw new Error('Password does not match');
        }
        if(password.length < 6 && confirmPassword.length < 6){
            throw new Error('Password too short');
        }
        const emailUsedBefore  = await Customer.findOne({ email })
        if(emailUsedBefore ){
            throw new Error('Email already used');
        }
        // Hash password :
        const saltRounds = 10
        const hashedPass = await bcrypt.hash(password, saltRounds)
        // Create new user: 
        const newCustomer = new Customer({
            first_name,
            last_name,
            email,
            password: hashedPass
        })
        await newCustomer.save()
        res.status(200).json({ message: 'User registered successfully.' })
    }catch(e){
        res.status(500).json({error: e.message})
    }
}
module.exports.Login = async (req, res) => {
    const secret_key = process.env.SECRET_KEY
    const email = req.body.email.toLowerCase().trim()
    const password = req.body.password.trim()
    try{
        const customer = await Customer.findOne({email})
        // Validation:
        if(password.length < 6){
            throw new Error('Password at least 6 character')
        }
        if(!customer){
            throw new Error('Email or password incorrect')
        }
        const match = await bcrypt.compare(password, customer.password)
        if(!match){
            throw new Error('Email or password incorrect')
        }
        // Create token
        const token = jwt.sign({ customer_id: customer._id }, secret_key, {
            expiresIn:'30d'
        })
        res.cookie('accessToken', token, {
            httpOnly: true
        }).status(200).json({
            id: customer._id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            token
        })
        
    }catch(e){
        res.status(401).json({error: e.message})
        console.log(e);
    }
}
module.exports.renderProfile = async (req, res) => {
    try{
        const customer = await Customer.findById(req.user.customer_id).populate('reviews')
        if(!customer) throw new Error('Customer not found')
        // Send customer data without password
        const { password, ...CUSTOMER } = customer.toObject();
        res.status(200).json(CUSTOMER)
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}
module.exports.editAddress = async (req, res) => {
    try{
        const customer = await Customer.findByIdAndUpdate(req.user.customer_id)
        if(!customer) throw new Error('Customer not found')
        // Update the address fields
        customer.address = {
            phone_number: req.body.phone_number.trim(),
            street_address: req.body.street_address.trim(),
            city: req.body.city.trim(),
            postal_code: req.body.postal_code.trim(),
            recipient_name: req.body.recipient_name.trim(),
        }
        await customer.save()
        res.status(200).json({success: true, message: 'Your Address updated successfully'})
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }   
}