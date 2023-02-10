import React, { useState, useContext } from "react";
import './Footer.css';

function Footer() {

    let currentDate = new Date;

    const authors = [
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
            autorGithubLink: 'https://github.com/Mentos2509'
        },
        {
            autorName: 'Gabriel Dąbrowski',
            autorGithubLink: 'https://github.com/Netrunner-44'
        }
    ]

    return(
        <div className="footer-container">
            <div className="site-logo"></div>
            <div className="site-info">
                <div className="site-name">3JMIEJSKIE CRAFTOWE JADŁO</div>
                <div className="site-copyright-year">
                    Ninjas in Pyjamas &#169; {currentDate.getFullYear()}</div>
            </div>
            <ul className="site-authors">
                {authors.map(autor => {
                    return <li className="author">
                    <a className="author-link" href={autor.autorGithubLink}>{autor.autorName}
                    </a>
                </li>

                }) }

            </ul>
        </div>
    )
}

export default Footer;