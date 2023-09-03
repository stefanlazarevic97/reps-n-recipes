import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';

const DemoUserLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const handleDemoLogin = () => {
        const demoEmail = 'demo@user.io';
        const demoPassword = 'password';
        dispatch(login({ email: demoEmail, password: demoPassword }));
    };

    return (
        <div className="demo-user-container">
            <button 
                className="button demo-user-button" 
                onClick={handleDemoLogin}
            >
                Log In as Demo User
            </button>
        </div>
    );
}

export default DemoUserLogin;
