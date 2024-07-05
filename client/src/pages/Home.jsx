import React from 'react';
import Stripe from '../components/Stripe';
import Phonepay from '../components/Phonepay';
import PayPal from '../components/PayPal';

export default function Home() {

    return (
        <div className='flex flex-col gap-2 px-4'>
            <Stripe />
            <Phonepay />
            <PayPal />
        </div>
    );
}
