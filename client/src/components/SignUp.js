import logo from '../assets/Asset1.svg';

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        height: '100px',
    },
    login: {
        padding: '0 5px',
        background: 'linear-gradient(rgb(36, 135, 255), rgb(41, 227, 0))',
        width: '30%',
        borderRadius: '2%'
    },
    form: {
        backgroundColor: 'white',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-around',
        borderRadius: '0%',
        alignItems: 'center'
    },
    inputs: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'rgba(136, 163, 173, 0.4)',
        height: '20px',
        borderRadius: '5px',
        width: '80%',
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
    }
}

function SignUp() {
    return (
        <div style={styles.centered}>
            <h1>Let's get started</h1>
            <img  style={{height: '100px'}}  alt="logo" src={logo} />
            <h2>Sign Up </h2>
            <div style={styles.login}>
                <form style={styles.form}>
                    <input type='text' style={styles.inputs} placeholder='First Name' name='firstName' />
                    <input type='text' style={styles.inputs} placeholder='Last Name' name='lastName' />
                    <input type='text' style={styles.inputs} placeholder='Username' name='username' />
                    <input type='password' style={styles.inputs} placeholder='Password' className='password' />
                    <input type='password' style={styles.inputs} placeholder='Confirm Password' className='confirmPw' />
                    <button style={styles.button} className='signUp'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default SignUp;