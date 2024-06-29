import React from 'react';
import Stripe from '../components/Stripe';
import StripeIndia from '../components/StripeIndia';

export default function Home() {

    return (
        <div className='flex flex-col gap-2'>
            <Stripe />
            <StripeIndia />
        </div>
    );
}
