import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {

    return (
        <>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                </li>
            </ul>
        </>
    )
}

export default Sidebar