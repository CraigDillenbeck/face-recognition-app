import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'

const Logo = () => {
  return (
    <div style={{ width: '50px', display: 'flex', justifyContent: 'flex-start'}} className='ma4 mt0'>
      <Tilt className='br2 shadow-2'>
        <div style={{ height: '50px', backgroundColor: '#405068' }}>
          <img className='' alt='logo' src={brain} />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo