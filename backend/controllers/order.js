const Stripe = require('stripe');
const Customer = require('../models/customer');
const { model } = require('mongoose');

module.exports.create_checkout_session = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.user.id).populate('cart.items.product').exec();
        
        if (customer.cart.items.length < 1) {
            throw new Error('Cart is empty');
        }
        // delivery cost is free for orders greater than or equal $300.00, otherwise $20.00.
        let DeliveryCost = 0;
        if(customer.cart.total < 300) {
            DeliveryCost = 20;
        } 
        const totalAmount = (customer.cart.total + DeliveryCost);

        const stripe = new Stripe(process.env.STRIPE_KEY);

        const line_items = customer.cart.items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product.title,
                    images: [item.product.images[0].url],
                },
                unit_amount: Math.round(item.product.price * (1 - item.product.discount / 100) * 100),
            },
            quantity: item.quantity,
        }));

        if (DeliveryCost > 0) {
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Delivery",
                    },
                    unit_amount: DeliveryCost * 100,
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success-payment`,
            cancel_url: `${process.env.BASE_URL}/`,
        });

        res.status(200).json({id: session.id});
    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log(e);
    }
};