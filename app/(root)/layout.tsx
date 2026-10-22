import React from 'react'
import layout from '../layout'

const Layout = ({children}: {children:React.ReactNode}) => {
  return (
    <div>
        <p>Navbar</p>
        {children}
    </div>
  )
}

export default Layout