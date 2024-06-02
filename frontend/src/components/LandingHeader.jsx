import React from 'react'
import './LandingHeader.css'
import { Link } from 'react-router-dom'
export default function LandingHeader() {
  return (
<nav className="navbar-containerL1">
        <div className="brandL1">Play.Ultimate</div>
        <Link to="/Login">
            <button className='introbtnL1'>Login</button>
          </Link>
      </nav>  
      )
}
