import React from 'react';
import './footer.scss';

const Footer = () => {
    return (
        <footer>
            <span>Made by</span>
            <span style={{ cursor: "pointer", color: "#009e66" }} onClick={() => { window.open("https://github.com/sarpremziaksu") }}>sarpremziaksu</span>
        </footer>
    )
}

export default Footer;