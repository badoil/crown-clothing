import React, { useState } from 'react'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { setGoogleSignInStart, setEmailSignInStart } from '../../redux/user/user-actions'

import './sign-in.styles.scss'

const SignIn = ({setEmailSignInStart, setGoogleSignInStart}) => {

    const [ userCredentials, setUserCredentials ] = useState({email:'', password:''})
    const { email, password } = userCredentials;



    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            await setEmailSignInStart(email, password);
        }
        catch(error){
            console.log(error)
        }
        
    }
    const handleChange = (event) => {
        const {name, value} = event.target

        setUserCredentials({...userCredentials, [name]: value})
    }

    
        return(
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your E=MAIL and PASSWORD</span>

                <form onSubmit = {handleSubmit}>
                    <FormInput name ='email' 
                               type='email' 
                               value={email} 
                               handleChange={handleChange} 
                               label='email'
                               required/>

                    <FormInput name ='password' 
                           type='password' 
                           value={password} 
                           handleChange={handleChange}
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


const mapDispatchToProps = dispatch => ({
    setGoogleSignInStart: () => dispatch(setGoogleSignInStart()),
    setEmailSignInStart: (email, password) => dispatch(setEmailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)