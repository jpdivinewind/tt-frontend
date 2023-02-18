import {createRoot} from 'react-dom/client';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
    );
} else {
    console.error('Oops.. where is "root"?..');
}
