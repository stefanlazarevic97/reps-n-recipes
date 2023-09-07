import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './reset.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';

let store = configureStore({});

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Root />
);
