import React from "react";

// import  {ReactNode} from 'react'


const AuthLayout = ({ children}: {children: React.ReactNode  }) => {
  return (
    <div className="auth-layout">{React.Children.only(children)}</div>
  )
}

export default AuthLayout