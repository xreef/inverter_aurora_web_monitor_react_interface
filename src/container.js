import React from 'react';
import {
    BrowserRouter,
    Link,
} from 'react-router-dom';

// https://github.com/supasate/connected-react-router

import Routes from './Routes';

import reactLogo from './resources/images/react-icon.png';

/**
 * this container is defined as class so we can modify state
 * @return {Component} react base component
 */
const Container = () => (
    <BrowserRouter>
        <main className="container">
            <div>
                <h1>hello world! <img className="container__image" alt="react logo" width={50} src={reactLogo} /></h1>

                <p>If you see this everything is working!</p>
            </div>
            <ul className="left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/grid_showcase">Grid showcase</Link></li>
            </ul>
            <div style={{ minHeight: "300px", height:"100%"}}>
                <Routes />
            </div>
            <div>
                <p>bottom!</p>
            </div>
        </main>
    </BrowserRouter>
);

export default Container;