
import './CSS/LandingHeaderHome.css'
import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle , FaBars} from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function LandingHeaderHome({active}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
      setDropdownOpen(prevState => !prevState);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const [responsemenuOpen, setresponsemenuOpen] = useState(false);
    const toggleresponsemenuOpen = () => {
        setresponsemenuOpen(!responsemenuOpen);
      };
    return (
      <nav className="navbar-container">
        <div className="brand equal">Play.Ultimate</div>
        <ul className={responsemenuOpen? 'nav-linksr':'nav-linksr translate'}>
          <Link to="/home"><li className={active==='home'?'active':''} onClick={toggleresponsemenuOpen}>Home</li></Link>
          <li>About</li>
          <Link to="/tournaments"><li className={active==='tournaments'?'active':''} onClick={toggleresponsemenuOpen}>Tournaments</li></Link>
          <li>Teams</li>
          <li>Contact</li>
          <i id='cross' className="fa-solid fa-xmark" onClick={toggleresponsemenuOpen}></i>
        </ul>
        <ul className="nav-links equal">
          <Link to="/home"><li className={active==='home'?'active':''}>Home</li></Link>
          <li>About</li>
          <Link to="/tournaments"><li className={active==='tournaments'?'active':''}>Tournaments</li></Link>
          <li>Teams</li>
          <li>Contact</li>
        </ul>
        <div className="response-menu-btn" onClick={toggleresponsemenuOpen} ref={dropdownRef}>
        <FaBars className="menu-icon" />
         </div>
        <div className="user-menu equal" onClick={toggleDropdown}>
          <FaUserCircle className="user-icon" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <Link to="/myprofile"><li>My Profile</li></Link>
                <Link to="/"><li>Logout</li></Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
}
