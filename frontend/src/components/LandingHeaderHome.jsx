
import './LandingHeaderHome.css'
import React, { useState } from 'react';
import { FaUserCircle , FaBars} from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function LandingHeaderHome() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [responsemenuOpen, setresponsemenuOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    const toggleresponsemenuOpen = () => {
        setresponsemenuOpen(!responsemenuOpen);
      };
    return (
      <nav className="navbar-container">
        <div className="brand equal">Play.Ultimate</div>
        <ul className={responsemenuOpen? 'nav-linksr':'nav-linksr translate'}>
          <li className='active'>Home</li>
          <li>About</li>
          <li>Teams</li>
          <li>Events</li>
          <li>Contact</li>
          <i id='cross' className="fa-solid fa-xmark" onClick={toggleresponsemenuOpen}></i>
        </ul>
        <ul className="nav-links equal">
          <li className='active'>Home</li>
          <li>About</li>
          <li>Teams</li>
          <li>Events</li>
          <li>Contact</li>
        </ul>
        <div className="response-menu-btn" onClick={toggleresponsemenuOpen}>
        <FaBars className="menu-icon" />
         </div>
        <div className="user-menu equal" onClick={toggleDropdown}>
          <FaUserCircle className="user-icon" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Settings</li>
                <Link to="/"><li>Logout</li></Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
}
