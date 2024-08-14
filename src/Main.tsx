import React from 'react';
import {Link} from "react-router-dom";
import MainStyles from './Main.module.css';

const Main: React.FC = () => {
    return (
        <div>
            <nav>
                <Link className={MainStyles.navLink} to="/paybutton">Pay Button</Link>
                <Link className={MainStyles.navLink} to="/counter">Counter</Link>
                <Link className={MainStyles.navLink} to="/generate-payment-button">Generate Payment Button</Link>
                <Link className={MainStyles.navLink} to="/environment-selector">Environment Selector</Link>
            </nav>
            <h2>React APP Widget Tester</h2>
            <br />
        </div>
    );
};

export default Main;
