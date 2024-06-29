import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECTECT);

export const stripePayment = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: req.body.name,
                        },
                        unit_amount: req.body.amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'BR', 'IN']
            },
            success_url: `http://localhost:3000/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`
        });

        // Send session URL as response
        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const stripeIndia = async(req, res, next) => {

}