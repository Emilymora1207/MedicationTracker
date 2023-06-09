import React, { useState } from 'react';
import logo from '../assets/Asset1.svg';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },

    login: {
        // padding: '0 5px',
        // background: 'linear-gradient(rgb(36, 135, 255), rgb(41, 227, 0))',
        width: '30%',
        display: 'flex',
    },
    form: {
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-around',
        borderRadius: '0%',
        alignItems: 'center',
        width: '96%'
    },
    inputs: {
        border: 'none',
        backgroundColor: 'rgba(136, 163, 173, 0.4)',
        height: '20px',
        borderRadius: '5px',
        width: '80%',
        outline: 'none',
    },
    inputs2: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px black solid',
        height: '20px',
        width: '80%',
        outline: 'none',
        background: 'none'
    },
    labels: {
        width: '80%',
        textAlign: 'left',
    },
    button: {
        cursor: 'pointer',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        height: '38px',
        padding: '8px 24px',
        borderRadius: '50px',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255),rgb(150, 239, 116))',
        border: 'none',
        boxShadow: '0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
        transition: 'all .2s ease-out',
        ':hover': {
            boxShadow: '0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%)',
        }
    },
    borderSides: {
        width: '2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    },

}

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <div style={styles.centered}>
            <h1>Welcome to the Medication Tracker</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <h2>Login </h2>
            <div style={styles.login}>
                <div style={styles.borderSides}></div>
                {data ? (
                    <p>You are now logged in!</p>
                ) : (
                    <form onSubmit={handleFormSubmit} style={styles.form}>
                        <label
                            style={styles.labels} for='email'>Username
                        </label>
                        <input
                            type='text'
                            style={styles.inputs2} placeholder=''
                            name='username'
                            value={formState.username}
                            onChange={handleChange}
                        />
                        <label
                            style={styles.labels} for='password'>Password
                        </label>
                        <input
                            type='password'
                            style={styles.inputs2} placeholder=''
                            name='password'
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <button 
                        style={styles.button}
                        type="submit" 
                        className='login'>Submit</button>
                        <p>Don't have an account? <Link to='/signup'>Create Account</Link></p>
                    </form>
                )}


                {/* <form style={styles.form}>
                    <input type='text' style={styles.inputs}placeholder='Username' name='username' />
                    <input type='password' style={styles.inputs}placeholder='Password' name='password' />
                    <button style={styles.button} className='login'>Submit</button>
                    <p>Don't have an account. <a href='#signUp'>Create Account</a></p>
                </form> */}
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}
export default Login;