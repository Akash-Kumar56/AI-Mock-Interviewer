import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center pt-40 bg-gradient-to-b from-gray-900 to-black mb-16'>{children}</div>
  )
}

export default AuthLayout;