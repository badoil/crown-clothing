import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {toggleCartHidden} from '../../redux/cart/cart-action'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { selectCartItemCount } from '../../redux/cart/cart.selectors'

import './cart-icon.styles.scss'

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon' onClick = {toggleCartHidden} />
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)