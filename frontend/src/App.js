import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm';
import SignUpForm from './components/SessionForms/SignUpForm';
import Profile from './components/Profile/Profile';
import HomePage from './components/HomePage/HomePage'
import SplashPage from './components/SplashPage/SplashPage';
import { getCurrentUser } from './store/session';
import WorkoutPage from './components/Workouts/WorkoutPage';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCurrentUser()).then(() => setLoaded(true));
    }, [dispatch]);

    return loaded && (
        <div className="app-container">
            <NavBar />
            
            <Switch>
                <AuthRoute exact path="/" component={SplashPage} />
                <AuthRoute exact path="/login" component={LoginForm} />
                <AuthRoute exact path="/signup" component={SignUpForm} />
                <ProtectedRoute exact path="/nutrition" component={HomePage} />
                <ProtectedRoute exact path="/workout" component={WorkoutPage} />
                <ProtectedRoute exact path="/profile" component={Profile} />
            </Switch>

            <footer className="footer">
                Copyright &copy; 2023 Reps 'N' Recipes
            </footer>
        </div>
    );
}

export default App;
