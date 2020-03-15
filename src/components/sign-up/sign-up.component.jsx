import React, { useState } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { setSignUpStart } from '../../redux/user/user-actions';

import './sign-up.styles.scss';

const SignUp = ( { setSignUpStart }) => {
    
    const [ userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword){
            alert("Check again your password")
            return
        }
        setSignUpStart({displayName, email, password})

      /*  try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, {displayName})
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
         }
         catch(error){
             console.error(error)
         } */
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials, [name]: value})
    }

        return(
            <div className = 'sign-up'>
                <h2 className='title'>I have no account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                   <FormInput
                   type='text'
                   name='displayName'
                   value={displayName}
                   onChange={handleChange}
                   label='Display Name'
                   required
                   />
                   <FormInput
                   type='text'
                   name='email'
                   value={email}
                   onChange={handleChange}
                   label='Email'
                   required
                   />
                   <FormInput
                   type='text'
                   name='password'
                   value={password}
                   onChange={handleChange}
                   label='Password'
                   required
                   />
                   <FormInput
                   type='text'
                   name='confirmPassword'
                   value={confirmPassword}
                   onChange={handleChange}
                   label='Confirm Password'
                   required
                   />
                   <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    setSignUpStart: userCredentials => dispatch(setSignUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);