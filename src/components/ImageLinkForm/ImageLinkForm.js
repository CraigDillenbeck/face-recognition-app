import React from 'react'
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This magic brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 form center'>
          <input 
            className='f4 pa2 w-70 center' 
            type='text' 
            onChange={onInputChange} 
          />
          <button 
            style={{background: '#536989'}} 
            className='w-30 grow f4 link ph3 pv2 dib white'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm