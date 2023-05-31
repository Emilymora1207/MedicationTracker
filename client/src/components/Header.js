// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// import { colors } from '../assets/colors';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

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
        textDecoration: 'none',
        color: 'black'
    },
    logo: {
        height: '80px',
    },
    links: {

        display: 'flex',
        listStyleType: 'none',
        width: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    eachLink: {
        textDecoration: 'none',
        color: 'black'
    },
    activeLink: {
        borderBottom: '3px rgb(77, 204, 255) solid',
        padding: '30px 0',
        textDecoration: 'none',
        color: 'black'
    }
}



function Header() {
    // const [loggedIn, setLoggedIn] = useState(true);
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };
    return (
        <div>
            <header style={styles.header}>
                <Link to='/' style={styles.homeLink}
                    className='link home-link'>
                    <img style={styles.logo} alt="logo" src={logo} />
                    <h1>Medication Tracker</h1>
                </Link>

                {/* *********************need to add the auth login stuff once the back end is set up */}
                {/* {Auth.loggedIn() ? (
            <> */}
                {Auth.loggedIn() ? (
                    <ul style={styles.links}>
                        <Link to='/addNew' style={styles.eachLink}
                            className='link add-link'>
                            <li>Add Medication</li>
                        </Link>
                        <Link to='/allMeds' style={styles.activeLink}
                            className='link view-all-link'>
                            <li>View all Medication</li>
                        </Link>
                        <a style={styles.eachLink}
                            className='link account-link' onClick={logout}>
                            <li>Logout</li>
                        </a>
                    </ul>
                ) : (
                    <ul style={styles.links}>
                        <li style={styles.activeLink}>
                            <Link to='/login' className="btn btn-lg btn-primary m-2">
                                Login
                            </Link>
                        </li>
                        <li style={styles.eachLink}>
                            <Link to='/signup' className="btn btn-lg btn-light m-2" >
                                Signup
                            </Link>
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