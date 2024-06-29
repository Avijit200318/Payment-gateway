import React from 'react'

export default function Stripe() {

    const stripePayment = async () => {
        try {
            const res = await fetch("/api/payment/stripePay", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "Phone1",
                    amount: 50,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                window.location.href = data.url;   // Redirect to the Stripe checkout page
            } else {
                const data = await res.json();
                console.log(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <button onClick={stripePayment} className="px-4 py-2 bg-blue-400 text-white rounded-md">Stripe pay</button>
        </div>
    )
}
