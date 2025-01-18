import React from 'react'
import CredentialSignIn from '../components/sign-up'
import Navbar from '../components/Navbar'
const Login = () => {
  return (
    <div id = "login" className=''>
        <Navbar/>
      <CredentialSignIn />
    </div>
  )
}

export default Login
