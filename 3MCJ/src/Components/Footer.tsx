import "../Styles/footer.scss";
import TCJLogoFooter from "../assets/Logo/TCJLogoFooter.png";
import LinkedInIcon from "../assets/Logo/LinkedInIcon.png";
import GitHubIcon from "../assets/Logo/GitHubIcon.png";

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
      authorLinkedInLink: "https://www.linkedin.com/in/patryk-mąkosa",
    },
    {
      authorName: "Katarzyna Sęk",
      authorGithubLink: "https://github.com/Kasiatko",
      authorLinkedInLink: "https://www.linkedin.com/in/katarzyna-sęk",
    },
    {
      authorName: "Gabriel Dąbrowski",
      authorGithubLink: "https://github.com/Netrunner-44",
      authorLinkedInLink: "https://www.linkedin.com/school/infoshare-academy/",
    },
  ];

  return (
    <div className="footer-container">
      <div className="site-logo"></div>
      <div className="site-info">
        <div>
          {" "}
          <img src={TCJLogoFooter} />
        </div>
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
                <img
                  className="footer-icons"
                  src={GitHubIcon}
                  alt="GitHub icon"
                />
              </a>
              <a
                className="author-linkedin"
                href={author.authorLinkedInLink}
                target="_blank"
              >
                <img
                  className="footer-icons"
                  src={LinkedInIcon}
                  alt="LinkedIn icon"
                />
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
