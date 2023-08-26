const Customer = require('../models/customer')
const bcrypt = require('bcrypt')

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