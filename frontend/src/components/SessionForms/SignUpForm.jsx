import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { signup, clearSessionErrors } from '../../store/session';
import { activateHealthForm } from '../../store/ui';

function SignupForm () {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
        dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
            case 'email':
                setState = setEmail;
                break;
            case 'username':
                setState = setUsername;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'password2':
                setState = setPassword2;
                break;
            default:
                throw Error('Unknown field in Signup Form');
        }

        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = {email,username,password};
        await dispatch(signup(user));  
        dispatch(activateHealthForm());
    }

    return (
        <form className="session-form" onSubmit={handleSubmit}>
            <h2 className="session-header">Sign Up</h2>
            <div className="session-errors">{errors?.email}</div>

            <input
                className="session-form-input" 
                type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
            />

            <div className="session-errors">{errors?.username}</div>

            <input 
                className="session-form-input" 
                type="text"
                value={username}
                onChange={update('username')}
                placeholder="Username"
            />

            <div className="session-errors">{errors?.password}</div>

            <input 
                className="session-form-input" 
                type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
            />

            <div className="session-errors">
                {password !== password2 && 'Confirm Password field must match'}
            </div>

            <input 
                className="session-form-input" 
                type="password"
                value={password2}
                onChange={update('password2')}
                placeholder="Confirm Password"
            />

            <input
                className="button"
                type="submit"
                value="Sign Up"
            />
        </form>
    );
}

export default SignupForm;
