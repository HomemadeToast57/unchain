import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../css/NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      //set input with id of 'check' to false
      document.getElementById('check').checked = false;
      await logout();
      navigate('/login');
    } catch (error) {
      console.log('error logging out: ', error);
    }
  }

  const jsx = (
    <nav>
      <input type='checkbox' id='check' />
      <label htmlFor='check' className='checkbtn'>
        <i className='fas fa-bars hamburger'></i>
      </label>
      <a className='logoLink' href='/'>
        <label className='logo'>Unchain</label>
      </a>
      <ul>
        {!currentUser && (
          <li>
            <a href='/about'>About</a>
          </li>
        )}
        {currentUser && (
          <li>
            <h1 className='userEmailNav'>{currentUser.email}</h1>
          </li>
        )}
        {currentUser && (
          <li onClick={handleLogout}>
            <a href='#0'>
              <i className='fas fa-sign-out-alt logoutIconNav'></i>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );

  // if (currentUser) {
  //   return authJSX;
  // } else {
  //   return guestJSX;
  // }
  return jsx;
};

export default NavBar;
