import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { activateHealthForm } from '../../store/ui';
import HealthForm from '../HealthForm/HealthForm';
import WorkoutForm from '../WorkoutForm/WorkoutForm';

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
        <div className="links-nav">
          <Link to={'/profile'}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
          <button onClick={()=>dispatch(activateHealthForm())}>Health Form</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
    <HealthForm/>
    <WorkoutForm/>
      <h1>Reps 'N' Recipes</h1>
      { getLinks() }
    </>
  );
}

export default NavBar;