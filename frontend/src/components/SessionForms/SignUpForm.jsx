import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { signup, clearSessionErrors } from '../../store/session';
import { activateHealthForm } from '../../store/ui';
import DemoUserLogin from './DemoUserLogin';
import fitVeggies from "../../assets/fit-veggies.webp"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SignupForm () {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();
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
        const res = await dispatch(signup(user));  
        if (res) {
            history.push('/nutrition');
        }
        await dispatch(activateHealthForm());
    }

    return (
        <div className="user-auth-page">
            <img className='food-friends' src={fitVeggies} alt="fit veggies" />

            <div className="session-form-container">
                <form className="session-form" onSubmit={handleSubmit}>
                    <h2 className="header">Sign Up</h2>
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
        
                    <button className="button">Sign Up</button>
                </form>
        
                <DemoUserLogin />
            </div>
        </div>
    );
}

export default SignupForm;
