const Stripe = require('stripe');
const Customer = require('../models/customer');
const Order = require('../models/order');


const stripe = new Stripe(process.env.STRIPE_KEY); // Initialize the stripe instance here


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

        const line_items = customer.cart.items.map(item => {
            const original_price = Math.round(item.product.price * 100);
            const discounted_price = Math.round(item.product.price * (1 - item.product.discount / 100) * 100);
            let description = " ";
            if (item.product.discount > 0) {
                description += `(Original price: $${(original_price / 100).toFixed(2)}, Discount: %${(item.product.discount)})`;
            }
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.title,
                        images: [item.product.images[0].url],
                        description: description
                    },
                    unit_amount: discounted_price,
                },
                quantity: item.quantity,
            };
        });

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
            success_url: `${process.env.BASE_URL}/success-payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/`,
            client_reference_id: req.user.id
        });

        res.status(200).json({id: session.id});
    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log(e);
    }
};
module.exports.success_payment = async (req, res, next) => {
    try {
        const { session_id } = req.query;
        if (!session_id) return res.status(400).send('No session ID provided');
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const customer = await Customer.findById(session.client_reference_id).populate('cart.items.product').exec();
        if (!customer) return res.status(404).send('Customer not found');

        const items = customer.cart.items.map(item => ({
            product: item.product._id,
            price_when_order: Math.round(item.product.price * (1 - item.product.discount / 100)),
            quantity: item.quantity,
        }));
        // create new order
        const order = new Order({
            customer: customer._id,
            deliveryCost: (customer.cart.total < 300) ? 20 : 0, // delivery cost is free for orders greater than or equal $300.00, otherwise $20.00.
            items: items,
            sessionId: session_id,
            address:{
                    recipient_name: customer.address.recipient_name,
                    street_address: customer.address.street_address,
                    city: customer.address.city,
                    postal_code: customer.address.postal_code,
                    phone_number: customer.address.phone_number
            }
        })
        await order.save();
        // clear the customer's cart
        customer.cart.items = [];
        customer.cart.total = 0;
        await customer.save();
        
        res.json(order);
    } catch (e) {
        res.status(500).send(e.message);
    }
}