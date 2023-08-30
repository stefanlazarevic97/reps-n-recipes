import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import HomePage from './components/HomePage/HomePage'
import { getCurrentUser } from './store/session';
import WorkoutPage from './components/Workouts/WorkoutPage';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCurrentUser()).then(() => setLoaded(true));
    }, [dispatch]);

    return loaded && (
        <>
            <NavBar />
                <AuthRoute exact path="/" component={HomePage} />
            <Switch>
                <AuthRoute exact path="/" component={HomePage} /> 
                {/* why is this not rendering??? */}
                <AuthRoute exact path="/login" component={LoginForm} />
                <AuthRoute exact path="/signup" component={SignupForm} />
                <AuthRoute exact path="/workout" component={WorkoutPage} />
                <ProtectedRoute exact path="/profile" component={Profile} />
            </Switch>
        </>
    );
}

export default App;
