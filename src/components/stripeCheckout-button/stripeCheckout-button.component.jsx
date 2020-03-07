import React from 'react';

import  StripeCheckout  from 'react-stripe-checkout'


const StripeCheckoutButton = ({ price }) => {
    const priceForPrice = price * 100;
    const publishableKey = 'pk_test_E1p8tzlQrRUNME4DSJdWBYRB0077hZxXsg';

    const onToken = token => {
        console.log(token);
        alert(token)
    }

    return(
        <StripeCheckout 
          label='Pay Now'
          name='CROWN CLOTHING'
          billingAddress
          shippingAddress
          image='https://sendeyo.com/up/d/f3eb2117da'
          description={`Total amout is $${price}`}
          amount={priceForPrice}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;