import React, { useState, useContext } from "react";
import "../Styles/footer.scss"

function Footer() {
  let currentDate = new Date();
  const authors = [
 
    {
      authorName: "Agnieszka Szczepańska",
      authorGithubLink: "https://github.com/agnieszka-szczepanska",
      authorLinkedInLink: "https://www.linkedin.com/in/szczepanska-agnieszka/",
    },
    {
      authorName: "Rafał Konieczny",
      authorGithubLink: "https://github.com/RafalKonieczny",
      authorLinkedInLink: "https://www.linkedin.com/in/rafał-konieczny",
    },
    {
      authorName: "Patryk Mąkosa",
      authorGithubLink: "https://github.com/Mentos2509",
      authorLinkedInLink: "https://www.linkedin.com/in/patryk-mąkosa"
    },
    {
      authorName: "Katarzyna Sęk",
      authorGithubLink: "https://github.com/Kasiatko",
      authorLinkedInLink: "https://www.linkedin.com/in/patryk-mąkosa"
    },
    {
      authorName: "Gabriel Dąbrowski",
      authorGithubLink: "https://github.com/Netrunner-44",
      authorLinkedInLink: "https://www.linkedin.com/in/patryk-mąkosa"
    }
  ];

  return (
    <div className="footer-container">
      <div className="site-logo"></div>
      <div className="site-info">
        <div> <img
          src="src/assets/Logo/TCJLogoFooter.png"
        /></div>
       
        {/* <div className="site-copyright-year">
          Ninjas in Pyjamas &#169; {currentDate.getFullYear()}
        </div> */}
      </div>
      <ul className="site-authors">
        {authors.map((author) => {
          return (
            <li key={author.authorName} className="author">             
              <a
                   className="author-github"
                href={author.authorGithubLink}
                target="_blank"
              >
             <img className="footer-icons" src="src/assets/Logo/GitHubIcon.png" alt="GitHub icon" />
              </a>
              <a
                   className="author-linkedin"
                href={author.authorLinkedInLink}
                target="_blank"
              >
             <img className="footer-icons" src="src/assets/Logo/LinkedInIcon.png" alt="LinkedIn icon" />
              </a>
              {author.authorName}

            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Footer;
