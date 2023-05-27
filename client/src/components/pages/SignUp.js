import logo from '../../assets/Asset1.svg';

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
        width: '30%',
        display: 'flex',
    },
    form: {
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-around',
        borderRadius: '0%',
        alignItems: 'center', 
        width: '97.6%'
    },
    inputs: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px black solid',
        height: '20px',
        width: '80%',
        outline: 'none',
        background: 'none',
        margin: '15px 0'
    },
    labels: {
        width: '80%',
        textAlign: 'left',
        margin: '15px 0'
    },
    names: {
        display: 'flex'
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
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    }
}

function SignUp() {
    return (
        <div style={styles.centered}>
            <h1>Let's get started</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <h2>Sign Up </h2>
            <div style={styles.login}>
                {/* adds the gradient border */}
                <div style={styles.borderSides}></div>
                <form style={styles.form}>
                    <div style={styles.names}>
                        <div>
                    <label style={styles.labels} for='firstName'>First Name</label>
                    <input type='text' style={styles.inputs} name='firstName' />
                    </div>
                    <div>
                    <label style={styles.labels}  for='lastName'>Last Name</label>
                    <input type='text' style={styles.inputs}  name='lastName' />
                    </div>
                    </div>
                    <label style={styles.labels}  for='email'>Email</label>
                    <input type='text' style={styles.inputs} name='email' />
                    <label style={styles.labels}  for='password'>Password</label>
                    <input type='password' style={styles.inputs}  className='password' />
                    <label style={styles.labels}  for='confirmPw'>Confirm Password</label>
                    <input type='password' style={styles.inputs}  className='confirmPw' />
                    <button style={styles.button} className='signUp'>Sign Up</button>
                </form>
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}
export default SignUp;