import styles from "./Footer.module.css";
import githubIcon from "../assets/github.png";
import linkedimIcon from "../assets/linkedim.png";
import emailIcon from "../assets/email.png";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <div className={styles.container_footer}>
      <div className={styles.icons}>
        <a
          href="https://github.com/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/gabriel-balastrelli-169186123/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedimIcon} alt="GitHub" />
        </a>
        <a
          href="mailto:gbalastrelli@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={emailIcon} alt="GitHub" />
        </a>
      </div>
      <div>
        <p>created by: gabriel_bala$trelli</p>
      </div>
      <div>
      <img src={logo2} alt="$$" />
      </div>
    </div>
  );
};

export default Footer;
