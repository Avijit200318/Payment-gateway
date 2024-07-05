import React, { useState } from 'react'

export default function PayPal() {

  const [loading, setLoading] = useState(false);

    const handlePhonepay = async () => {
      try{
        setLoading(true);
        const res = await fetch("/api/paymentPal/payPal", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: "Book",
            price: 25,
            productId: "578934789"
          })
        });

        const data = await res.json();
        if(data.success === false)
        {
          setLoading(false);
          console.log(data.message);
          return;
        }
        // console.log("data: ", data);
        setLoading(false);
        window.location.href = data;
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }

  return (
    <div>
      <button onClick={handlePhonepay} className="bg-blue-800 text-white rounded-md px-4 py-2 font-semibold">{loading? 'Loading' : 'PayPal'}</button>
    </div>
  )
}
