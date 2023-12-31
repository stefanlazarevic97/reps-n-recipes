import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { login, clearSessionErrors } from '../../store/session';
import DemoUserLogin from './DemoUserLogin';
import fitVeggies from "../../assets/fit-veggies.webp"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(login({ email, password }));
        if (res) {
            history.push('/nutrition');
        }
    }
    
    return (
        <div className="user-auth-page">
            <img className='food-friends' src={fitVeggies} alt="fit-veggies" />

            <div className="session-form-container">
                <form className="session-form" onSubmit={handleSubmit}>
                    <h2 className="header">Log In</h2>
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

                    <button className="button">Log In</button>
                </form>

                <DemoUserLogin />
            </div>
        </div>
    );
}

export default LoginForm;