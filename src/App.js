import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css';

const stripePromise = loadStripe(
  'pk_test_51HRgkqGUDDhTw3nvqdIk2qgCWxjIzzb59d4BbUZzqyyjUjL2LOjqq7YH9npQWJsIVmqJKTvbCKJTmoORQJzEWeUX00sZeE2ulI'
);

const CheckoutForm = () => {
  const stripe = useStripe(),
    elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <img
        src='https://cdn.shopify.com/s/files/1/2981/4874/products/HERO-min_1024x1024.png?v=1548633006'
        alt='anne-pro'
        className='img-fluid'
      />

      <div className='form-group'>
        <CardElement className='form-control' />
      </div>
      <button className='btn btn-success'>Buy</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
