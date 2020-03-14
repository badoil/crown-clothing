import React from 'react'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { setGoogleSignInStart, setEmailSignInStart } from '../../redux/user/user-actions'

import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password:''
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { setEmailSignInStart } = this.props;
        
        try{
            await setEmailSignInStart(email, password);
        }
        catch(error){
            console.log(error)
        }
        
    }
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({[name]: value})
    }

    render(){
        const { setGoogleSignInStart } = this.props;
        return(
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your E=MAIL and PASSWORD</span>

                <form onSubmit = {this.handleSubmit}>
                    <FormInput name ='email' 
                               type='email' 
                               value={this.state.email} 
                               handleChange={this.handleChange} 
                               label='email'
                               required/>

                    <FormInput name ='password' 
                           type='password' 
                           value={this.state.password} 
                           handleChange={this.handleChange}
                           label='password'
                           required/>
                    <div className = 'buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button'
                        onClick={ setGoogleSignInStart } isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    setGoogleSignInStart: () => dispatch(setGoogleSignInStart()),
    setEmailSignInStart: (email, password) => dispatch(setEmailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)