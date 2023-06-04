import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Link, useLocation } from 'react-router-dom';

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
        width: '40%',
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
    const location = useLocation();
    console.log(location);
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
                    <h1>Medication Tracker</ h1>
                </Link>
                {/* checks if the upser is logged in and displays the correct links in the header */}
                {Auth.loggedIn() ? (
                    <ul style={styles.links}>
                        <Link
                            to='/addNew'
                            style={location.pathname === 'addNew' ? styles.activeLink : styles.eachLink}
                            className='link add-link'>
                            <li>Add Medication</li>
                        </Link>
                        <Link to='/allMeds' style={location.pathname === 'allMeds' ? styles.activeLink : styles.eachLink}
                            className='link view-all-link'>
                            <li>View all Medication</li>
                        </Link>
                        {/* <Link
                            to='/findPharmacy'
                            style={styles.eachLink}>
                            <li>Find A Pharmacy</li>
                        </Link> */}
                        <Link to='/login' style={styles.eachLink}
                            className='link account-link' onClick={logout}>
                            <li>Logout</li>
                        </Link>
                    </ul>
                ) : (
                    <ul style={styles.links}>
                        <Link style={location.pathname === 'login' ? styles.activeLink : styles.eachLink}
                            //  onClick={() => setLoggedIn(true)}
                            to='/login' className="btn btn-lg btn-primary m-2">
                            <li>
                                Login
                            </li>
                        </Link>
                        <Link
                        style={location.pathname === 'signup' ? styles.activeLink : styles.eachLink}
                        to='/signup' 
                        className="btn btn-lg btn-light m-2" >
                            <li>Signup</li>
                        </Link>

                    </ul>
                )}
                {/* </>
          )} */}

            </header>

        </div>
    );
}

export default Header;