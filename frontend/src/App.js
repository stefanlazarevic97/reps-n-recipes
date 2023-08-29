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
// import HealthForm from './components/HealthForm/HealthForm';

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
                {/* <AuthRoute exact path="/" component={HealthForm} /> */}
            <Switch>
                <AuthRoute exact path="/login" component={LoginForm} />
                <AuthRoute exact path="/signup" component={SignupForm} />
                {/* <AuthRoute exact path="/health-form" component={HealthForm} /> */}
                <ProtectedRoute exact path="/profile" component={Profile} />
            </Switch>
        </>
    );
}

export default App;