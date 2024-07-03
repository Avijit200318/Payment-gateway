import React from 'react'
import axios from "axios";

export default function Phonepay() {
    const handlePhonepay = async () => {
        try {
            const res = await fetch("/api/payment/phonePe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "Avijit",
                    price: 100,
                    number: '9999999999',
                    MID: 'MID' + Date.now(),
                    transactionId: 'transactionId' + Date.now(),
                }),
            });
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            console.log("done phonePe payment");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={handlePhonepay} className="bg-blue-600 text-white rounded-md px-4 py-2">Phone pay</button>
        </div>
    )
}
