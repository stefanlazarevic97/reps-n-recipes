import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DemoUserLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const handleDemoLogin = async () => {
        const demoEmail = 'demo@user.io';
        const demoPassword = 'password';
        await dispatch(login({ email: demoEmail, password: demoPassword }));
        history.push('/nutrition');
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
