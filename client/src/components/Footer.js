import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function Footer() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return(
        <div>
            <footer style={{width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.249)'}}>
                {Auth.loggedIn() ? (
                    <div style={{display: 'flex'}}>
                <Link  to='/'>Today's Medication</Link>
                <Link to='/addNew'>Add Medication</Link>
                <Link to='/allMeds'>View All Medication</Link>
                <Link to='/findPharmacy'>Find A Pharmacy</Link>
                <Link to='/login' onClick={logout}>Logout</Link>
                </div>
                ) : (
                    <div style={{display: 'flex'}}>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>SignUp</Link>
                    </div>
                )}
            </footer>
        </div>
    )
}

export default Footer