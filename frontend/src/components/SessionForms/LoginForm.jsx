import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })); 
    }

    return (
        <form className="session-form" onSubmit={handleSubmit}>
            <h2 className="session-header">Log In</h2>
            <div className="session-errors">{errors?.email}</div>
            
            <input 
                className="session-form-input" 
                type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
            />

            <div className="session-errors">{errors?.password}</div>

            <input
                className="session-form-input" 
                type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
            />

            <input
                className="button"
                type="submit"
                value="Log In"
            />
        </form>
    );
}

export default LoginForm;