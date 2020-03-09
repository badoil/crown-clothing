import React from 'react'
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils'
import { createStructuredSelector } from 'reselect';

import {ReactComponent as Logo} from '../../assets/crown.svg'
import { LinkContainer, HeaderContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LinkContainer to='/'>
            <Logo className = 'logo' />
        </LinkContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser?
                (<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>)
                :(<OptionLink to='/signin'>SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
        hidden? null : <CartDropdown />
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header) 