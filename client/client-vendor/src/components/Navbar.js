import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import myLogo from '../assets/Wedness_white_transparant.svg'
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as ImIcons from "react-icons/im";
import firebase from "../services/firebase";

function Navbar() {
  const history = useHistory()
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logoutHandler = async () => {
    localStorage.clear()
    await firebase.auth().signOut()
    history.push('/')
  }

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{zIndex: 9999}}>
          <ul className='nav-menu-items' onClick={showSidebar}>
          <img class="bg-auto" src={myLogo} alt="" />
            <li className='navbar-toggle'>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className='nav-text'>
              <Link to='#' onClick={logoutHandler} >
                <ImIcons.ImExit /><span>Logout</span>
              </Link>
            </li>
            </ul>
          <p></p>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;