import React from 'react';
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { HomePage } from './pages/homepage/HomePage.component'
import ShopPage from './pages/shoppage/shoppage.component'
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import  Header  from './components/header/header.component'
import CheckoutPage from './pages/checkout-page/checkout.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { setCheckUserSession } from './redux/user/user-actions'


class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCheckUserSession } = this.props;
    setCheckUserSession();

    /*this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef =  await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            }
          )
        })
      }
      else{
        setCurrentUser(userAuth)
      }
    })*/
      
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path='/' component = {HomePage} />
            <Route path='/shop' component = {ShopPage} />
            <Route path='/signin' render={()=> this.props.currentUser? (<Redirect to='/' />): (<SignInSignUp />)} />
            <Route exact path='/checkout' component = {CheckoutPage} />
        </Switch>
        
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCheckUserSession: () => dispatch(setCheckUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
