import React, { useState, useContext } from "react";
import './Footer.css';

function Footer() {

    let currentDate = new Date;

    const [authors, setAuthors] = useState([
        {
            autorName: 'Katarzyna Sęk',
            autorGithubLink: ''
        }
    ])

    return(
        <div className="footer-container">
            <div className="site-info">
                <div className="site-name"></div>
                <div className="site-copyright-year">{currentDate.getFullYear()}</div>
            </div>
            <ul className="site-authors">

                <li className="author">
                    <p className="author-name">Autor 1</p>
                    <a className="author-link" href="#">Link do Github</a>
                </li>

                <li className="author">
                    <p className="author-name">Autor 2</p>
                    <a className="author-link" href="#">Link do Github</a>
                </li>

                <li className="author">
                    <p className="author-name">Autor 3</p>
                    <a className="author-link" href="#">Link do Github</a>
                </li>

                <li className="author">
                    <p className="author-name">Autor 4</p>
                    <a className="author-link" href="#">Link do Github</a>
                </li>

                <li className="author">
                    <p className="author-name">Autor 5</p>
                    <a className="author-link" href="#">Link do Github</a>
                </li>

            </ul>
            <div className="site-logo"></div>
        </div>
    )
}

export default Footer;