import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function Footer() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return(
        <div>
            <footer style={{width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.249)', position:'relative', left: '0', bottom: '0', right: '0',}}>
                {Auth.loggedIn() ? (
                    <div style={{display: 'flex', marginTop: '100px', justifyContent: 'center'}}>
                <Link style={{padding: '80px 20px' }}  to='/'>Today's Medication</Link>
                <Link style={{padding: '80px 20px' }} to='/addNew'>Add Medication</Link>
                <Link style={{padding: '80px 20px' }} to='/allMeds'>View All Medication</Link>
                <Link style={{padding: '80px 20px' }} to='/findPharmacy'>Find A Pharmacy</Link>
                <Link style={{padding: '80px 20px' }} to='/login' onClick={logout}>Logout</Link>
                </div>
                ) : (
                    <div style={{display: 'flex', marginTop: '100px', justifyContent: 'center'}}>
                        <Link style={{padding: '80px 20px' }} to='/login'>Login</Link>
                        <Link style={{padding: '80px 20px' }} to='/signup'>SignUp</Link>
                    </div>
                )}
            </footer>
        </div>
    )
}

export default Footer