import React from 'react'

import logo from '../assets/images/icons8-cookie-monster.svg';

const Header = (props) => (
    <header id="header" className="alt">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"/>

        <span className="logo"><img src={logo} alt="" /></span>
        <h1>Andy Tan</h1>
        <p>Software Engineer from San Francisco living in the Pacific Northwest<br /></p>
    </header>
)

export default Header
