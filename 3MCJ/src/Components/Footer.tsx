import React, { useState, useContext } from "react";
import "./Footer.css";

function Footer() {
  let currentDate = new Date();
  const authors = [
    {
      authorName: "Katarzyna Sęk",
      authorGithubLink: "https://github.com/Kasiatko",
    },
    {
      authorName: "Agnieszka Szczepańska",
      authorGithubLink: "https://github.com/agnieszka-szczepanska",
    },
    {
      authorName: "Rafał Konieczny",
      authorGithubLink: "https://github.com/RafalKonieczny",
    },
    {
      authorName: "Patryk Mąkosa",
      authorGithubLink: "https://github.com/Mentos2509",
    },
    {
      authorName: "Gabriel Dąbrowski",
      authorGithubLink: "https://github.com/Netrunner-44",
    },
  ];

  return (
    <div className="footer-container">
      <div className="site-logo"></div>
      <div className="site-info">
        <div className="site-name">3JMIEJSKIE CRAFTOWE JADŁO</div>
        <div className="site-copyright-year">
          Ninjas in Pyjamas &#169; {currentDate.getFullYear()}
        </div>
      </div>
      <ul className="site-authors">
        {authors.map((author) => {
          return (
            <li key={author.authorName} className="author">
              <a
                className="author-link"
                href={author.authorGithubLink}
                target="_blank"
              >
                {author.authorName}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Footer;
