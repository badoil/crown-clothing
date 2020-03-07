import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripeCheckout-button/stripeCheckout-button.component'

import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selectors'

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page' >
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
            </div>
            {
                cartItems.map(cartItem => (
                    <CheckoutItem key={cartItem.id} cartItem = {cartItem} />
                ))
            }
            <div className='total'>
                <span>Total: ${total}</span>
        </div>
        <StripeCheckoutButton price={total} />
        <div className='test-warning'>
            Please use the following test credit card for credit card
            <br />
            4242 4242 4242 4242 - Exp : 01/20 - CVV: 123
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage);