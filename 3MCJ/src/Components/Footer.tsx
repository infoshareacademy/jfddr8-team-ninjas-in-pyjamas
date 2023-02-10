import React, { useState, useContext } from "react";
import './Footer.css';

function Footer() {

    let currentDate = new Date;

    const [authors, setAuthors] = useState([
        {
            autorName: 'Katarzyna Sęk',
            autorGithubLink: 'https://github.com/Kasiatko'
        },
        {
            autorName: 'Agnieszka Szczepańska',
            autorGithubLink: 'https://github.com/agnieszka-szczepanska'
        },
        {
            autorName: 'Rafał Konieczny',
            autorGithubLink: 'https://github.com/RafalKonieczny'
        },
        {
            autorName: 'Patryk Mąkosa',
            autorGithublink: 'https://github.com/Mentos2509'
        },
        {
            autorName: 'Gabriel Dąbrowski',
            autorGithublink: 'https://github.com/Netrunner-44'
        }
    ])

    return(
        <div className="footer-container">
            <div className="site-logo"></div>
            <div className="site-info">
                <div className="site-name">3miejskie jadło</div>
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
        </div>
    )
}

export default Footer;