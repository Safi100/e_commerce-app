const Customer = require('../models/customer')
const PasswordToken = require('../models/passwordToken')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../utils/mail');

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
        const token = jwt.sign({ id: customer._id }, secret_key, {
            expiresIn:'30d'
        })
        res.cookie('c_user', customer._id.toString());
        res.cookie('accessToken', token, { httpOnly: true }).status(200).json({token});
        
    }catch(e){
        res.status(401).json({error: e.message})
        console.log(e);
    }
}
module.exports.Logout = async (req, res, next) => {
    try{
        await res.clearCookie('access_token');
        await res.clearCookie('c_user');
        res.status(200).send({success: true})
    }catch (e) {
        res.status(401).json({error: e.message})
    }
}
module.exports.fetchCurrentUser = async (req, res, next) => {
    try{
        const currentUser = await Customer.findById(req.user.id)
        .select(['-cart', '-password', '-updatedAt', '-createdAt', '-reviews', '-address'])
        res.status(200).json(currentUser)
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}
module.exports.renderProfile = async (req, res) => {
    try{
        const customer = await Customer.findById(req.user.id).populate({path:'reviews', populate:{path: 'product', populate: ['brand', 'category']}})
        if(!customer) throw new Error('Customer not found')
        // Send customer data without password
        const { password, ...CUSTOMER } = customer.toObject();
        res.status(200).json(CUSTOMER)
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}

module.exports.send_reset_mail = async (req, res) => {
    try{
        const email = req.body.email.toLowerCase().trim();
        const customer = await Customer.findOne({email});
        if(!customer) throw new Error('Email not found on system');
        const passwordToken = await PasswordToken.findOne({CustomerId: customer._id});
        // if passwordCode exist delete it
        if(passwordToken) await passwordToken.deleteOne({CustomerId: customer._id});
        // generate a new password token
        const NewPasswordToken = crypto.randomBytes(32).toString("hex");
        // hash the new password token to secure it on database
        const hashedToken = await bcrypt.hash(NewPasswordToken, 10);
        const newPasswordToken = new PasswordToken({
            CustomerId: customer._id,
            token: hashedToken
        })
        await newPasswordToken.save()
        // Send email to customer
        await sendEmail(customer.email, "Reset your password", `<p>Hi ${customer.email}</p>
        <p>Please click on the link below to reset your password</p>
        <a href="http://localhost:3000/reset-password/${customer._id}/${newPasswordToken.token}">Reset Password</a>
        <p>Link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email, and your password will remain unchanged.</p>
        `)
        res.status(200).json({success: true, message: 'Email sent successfully (check spam folder)'})
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}

module.exports.reset_password = async (req, res) => {
    try{
        const {id, token} = req.params;
        const password = req.body.password.trim();
        const confirmPassword = req.body.confirmPassword.trim();
        // check if user and token is valid
        if(!mongoose.Types.ObjectId.isValid(id)) throw new Error(`Invalid link`);
        const customer = await Customer.findById(id);
        if(!customer) throw new Error('Customer not found');
        const passwordResetToken = await PasswordToken.findOne({CustomerId: customer._id});
        if (!passwordResetToken) throw new Error(`Invalid link`);
        const match = (token === passwordResetToken.token);
        if(!match) throw new Error(`Invalid link`);
        if (password.length < 6) throw new Error(`Password must be at least 6 characters.`);
        if (password !== confirmPassword) throw new Error(`Password and confirm password must match.`);
        const hashedPass = await bcrypt.hash(password, 10);
        const updatedUser = await Customer.findByIdAndUpdate({_id: id}, {password: hashedPass})
        if(!updatedUser) throw new Error(`Password didn't update.`);
        await PasswordToken.deleteOne({ CustomerId: id });
        res.send({message: 'Password changed successfully'});
    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e);
    }
}

module.exports.editAddress = async (req, res) => {
    try{
        const customer = await Customer.findByIdAndUpdate(req.user.id)
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
module.exports.editCustomerData = async (req, res) => {
    try{
        const {first_name, last_name} = req.body
        const customer = await Customer.findByIdAndUpdate(req.user.id)
        if(!customer) throw new Error('Customer not found')
        console.log(req.body);
        customer.first_name = first_name.trim()
        customer.last_name = last_name.trim()
        await customer.save()
        res.status(200).json({success: true, message: 'Your data updated successfully'})
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}