import React, { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import '../../styles/Auth/Auth.css'

const Auth = ({updateToken}) => {


    return (
        <div className="auth-container" style={{marginTop: '2em'}}>
          {/* <div> */}
            <Signup updateToken={updateToken} />
          {/* </div> */}

          <Login updateToken={updateToken} />  

        </div>
    )
}

export default Auth
