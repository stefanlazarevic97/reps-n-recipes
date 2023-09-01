import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { activateHealthForm } from '../../store/ui';
import HealthForm from '../HealthForm/HealthForm';

function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav-container">
                    <div className="links-nav">
                        <Link to={'/profile'}>Profile</Link>

                        <button 
                            className="links-nav-button"
                            onClick={()=>dispatch(activateHealthForm())}
                        >
                            Health Form
                        </button>

                        <button 
                            className="links-nav-button"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                        <HealthForm/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="links-auth-container">
                    <div className="links-auth">
                        <Link to={'/signup'}>Signup</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='navBar'>
            <div className="logo-container">
                <Link className="logo-link" to='/'>
                    <img className="logo" src="../../assets/logo.png" alt="logo"/>
                </Link>
            </div>

            <NavLink to='/' className ='nav-link'>Reps 'N' Recipes</NavLink>
            { getLinks() }
        </div>
    );
}

export default NavBar;