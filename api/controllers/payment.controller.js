import Stripe from "stripe";
import dotenv from "dotenv";

import sha256 from "sha256";
import uniqid from "uniqid";
import store from "store";
import axios from "axios";

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

// ______Phonepe___________


export const phonePePayment = async (req, res, next) => {
    try {
        let tx_uuid = uniqid();
        store.set('uuid', { tx: tx_uuid });
    
        let normalPayLoad = {
          "merchantId": "PGTESTPAYUAT86",
          "merchantTransactionId": tx_uuid,
          "merchantUserId": "MUID123",
          "amount": req.body.price * 100,
          "redirectUrl": "http://localhost:5173",
          "redirectMode": "REDIRECT",
          "callbackUrl": "http://localhost:5173",
          "mobileNumber": "9999999999",
          "paymentInstrument": {
            "type": "PAY_PAGE"
          }
        };
    
        let saltKey = '96434309-7796-489d-8924-ab56988a6076';
        let saltIndex = 1;
    
        let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
        let base64String = bufferObj.toString("base64");
    
        let string = base64String + '/pg/v1/pay' + saltKey;
    
        let sha256_val = sha256(string);
        let checksum = sha256_val + '###' + saltIndex;
    
        const response = await axios.post('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
          'request': base64String
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'accept': 'application/json'
          }
        });
    
        // console.log("data: ", response.data);
        return res.status(200).json(response.data);
      } catch (error) {
        console.error('Error during payment:', error);
        res.status(500).json({ error: 'Error during payment' });
      }
};