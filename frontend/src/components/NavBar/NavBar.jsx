import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { activateHealthForm } from '../../store/ui';
import HealthForm from '../HealthForm/HealthForm';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            window.location.href = '/nutrition';
            window.scrollTo(0, 0);
        } else {
            window.location.href = '/';
        }
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav-container">
                    <div className="links-nav">

                    <Link to={'/information'}>Learn</Link>

                    {location.pathname === '/profile' ? (
                        <Link to={'/nutrition'}>Nutrition</Link>
                    ) : (
                        <Link to={'/profile'}>Profile</Link>
                    )}

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
                        {/* <Link to={'/'}>Instructions</Link> */}
                        <Link to={'/information'}>Learn</Link>
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
                <div className="logo-link" onClick={handleLogoClick}>
                    <img className="logo" src="../../assets/logo.png" alt="logo"/>
                </div>
            </div>

            <NavLink to='/nutrition' className ='nav-link'>Reps 'N' Recipes</NavLink>
            { getLinks() }
        </div>
    );
}

export default NavBar;