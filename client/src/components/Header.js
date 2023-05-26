// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {colors} from '../assets/colors';
import logo from '../assets/Asset1.svg';


const styles = {
    header: {
        display: 'flex',
        padding: '20px',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    homeLink: {
        display: 'flex',
    },
    logo: {
        height: '80px',
    },
    links: {
        textDecoration: 'none',
        display: 'flex',
        listStyleType: 'none',
        width: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    activeLink: {
        borderBottom: '3px rgb(77, 204, 255) solid',
        padding: '30px 0'
    }
}



function Header() {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <div>
            <header style={styles.header}>
                <a src='#' style={styles.homeLink}
                    className='link home-link'>
                    <img style={styles.logo} alt="logo" src={logo} />
                    <h1>Medication Tracker</h1>
                </a>

                {/* *********************need to add the auth login stuff once the back end is set up */}
                {/* {Auth.loggedIn() ? (
            <> */}
            {loggedIn ? (
                                <ul style={styles.links}>
                <a style={styles.eachLink}
                    className='link add-link'>
                    <li>Add Medication</li>
                </a>
                <a style={styles.activeLink}
                    className='link view-all-link'>
                    <li>View all Medication</li>
                </a>
                <a style={styles.eachLink}
                    className='link logout-link' onClick={()=> {setLoggedIn(false)}}>
                    <li>logout</li>
                </a>
                </ul>
            ): (
            <ul style={styles.links}>
              <li style={styles.eachLink}><a className="btn btn-lg btn-primary m-2" onClick={() => {setLoggedIn(true)}}>
                Login
              </a>
              </li>
              <li style={styles.eachLink}><a className="btn btn-lg btn-light m-2" >
                Signup
              </a>
              </li>
              </ul>
              )}
            {/* </>
          )} */}

            </header>

        </div>
    );
}

export default Header;