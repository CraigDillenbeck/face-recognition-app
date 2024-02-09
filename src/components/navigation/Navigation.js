import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='mb3' style={{display: 'flex', justifyContent: 'flex-end'} }>
        <p onClick={() => onRouteChange('signout')} className='mh2 f3 link dim gray underline pa1 pointer'>Sign Out</p>
      </nav>
    )
  } else {
    return (
      <>
        <nav className='mb3' style={{display: 'flex', justifyContent: 'flex-end'} }>
          <p onClick={() => onRouteChange('signin')} className='f3 mh2 link dim gray underline pa1 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 mh2 link dim gray underline pa1 pointer'>Register</p>
        </nav>
      </>
    )
  }
}

export default Navigation