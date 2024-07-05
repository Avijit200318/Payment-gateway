import paypal from "paypal-rest-sdk";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASHKKR-4z1YCUVyINoJpgxvON6M4wUa1Ft3QA7gKr5mcgO2SVoqw9YpWsEVcIXTgSpBkQ67bKjfTAahd',
    'client_secret': 'EPK9RbNl3sKFIJmEb6nuyuBwHsU8yDYk0YzoUtGJPt66UxR7qYFzK4jZOmoneJO4pMAX1Cwg_17jCNf1'
});

export const payPal = async (req, res, next) => {

    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5173/success",
                "cancel_url": "http://localhost:5173/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": req.body.name,
                        "sku": req.body.productId,
                        "price": req.body.price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": req.body.price
                },
                "description": "Hat for the best team ever"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.status(200).json(payment.links[i].href);
                    }
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// export const successPayPal = async (req, res, next) => {
//     try{
//         const payerId = req.body.PayerID;
//         const paymentId = req.body.paymentId;

//         const execute_payment_json = {
//             "payer_id": payerId,
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": "25.00"
//                 }
//             }]
//         };

//         paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//             if (error) {
//                 console.log(error.response);
//                 throw error;
//             } else {
//                 // console.log(JSON.stringify(payment));
//                 res.status(200).json(payment);
//             }
//         });
//     }catch(error){
//         next(error);
//     }
// }