import React from 'react';
import Stripe from '../components/Stripe';
import Phonepay from '../components/Phonepay';

export default function Home() {

    return (
        <div className='flex flex-col gap-2'>
            <Stripe />
            <Phonepay />
        </div>
    );
}
