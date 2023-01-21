import React from 'react'
import './header.css';

const Header = () => {
  return (
    <div className="headerContainer">
        <div className="headerLogo">
            <h3>Algo Visualizer</h3>
        </div>
        <div className="header">
            <nav>
                <ul>
                    <li>Sorting Algorithms</li>
                    <li>Path Finding Algorithms</li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Header