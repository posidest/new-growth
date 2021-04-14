import React from 'react';
import hardiness from '../../images/hardiness.jpg'
import  './Auth.css'

const HardinessZone = () => {
   return (
      <div className='hardiness'>
         <p>Hardiness Zones are regions defined to include a specific range of climate conditions pertinent to plant growth.</p>
         <p>Use this map to find yours! Knowing your zone will help you determine how to best care for your plants.</p>
         <img src={hardiness} style={{width: '600px'}} alt='hardiness' />
      </div>
   )
}

export default HardinessZone