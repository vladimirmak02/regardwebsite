import React from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import { FaTimes } from 'react-icons/fa'
import { FiSun, FiMoon } from 'react-icons/fi'
import IconButton from './iconButton'
import navbarStyles from '../styles/navbar.module.scss'

var sidebarOpen = false;

export function toggleNav() {
  var sidebar = document.querySelector('.' + navbarStyles.sidebar);
  var documentCover = document.querySelector('.' + navbarStyles.documentCover);
  if (sidebarOpen === false) {
    // open
    documentCover.classList.add(navbarStyles.visible);
    sidebar.style.right = "0";
    sidebarOpen = true;
  } else {
    // close
    documentCover.classList.remove(navbarStyles.visible);
    if (window.matchMedia("(min-width: 1024px)").matches) {
      sidebar.style.right = "-25%";
    } else {
      sidebar.style.right = "-50%";
    }
    sidebarOpen = false;
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDark = this.toggleDark.bind(this);
  }

  toggleDark() {
    document.getElementById('checkbox').click()
  }

  componentDidMount() {
    const toggleSwitch = document.querySelector(
      `.${navbarStyles.themeSwitch} input[type="checkbox"]`
    );

    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        toggleSwitch.checked = true;
      }
    }

    function darkTheme() {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    function lightTheme() {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }

    function switchTheme(e) {
      if (e.target.checked) {
        darkTheme();
      } else {
        lightTheme();
      }
    }
    toggleSwitch.addEventListener("change", switchTheme, false);

    sidebarOpen = false;
  }

  render() {
    return (<StaticQuery
      query={graphql`
    {
      file(relativePath: {eq: "navbar.md"}) {
        childMarkdownRemark {
          frontmatter {
            home {
              en
              cz
              ru
            }
            projects {
              cz
              en
              ru
            }
            about {
              cz
              en
              ru
            }
          }
        }
      }
    }
    `}
      render={data => {
        let frontMatter = data.file.childMarkdownRemark.frontmatter
        let props = this.props
        let currentLanguage = props.language
        let languages = { 'en': 'English', 'ru': 'Русский', 'cz': 'Čeština' }
        return (
          <div>
            <div className={navbarStyles.documentCover} aria-hidden="true" role='navigation' onClick={toggleNav}></div>
            <nav className={navbarStyles.sidebar}>
              <div className={navbarStyles.options}>
                <div className={navbarStyles.themeSwitchWrapper}>
                  <IconButton ariaLabel="Toggle dark mode" onClick={this.toggleDark}><FiSun /></IconButton>
                  <label className={navbarStyles.themeSwitch} htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div className={navbarStyles.slider + ' ' + navbarStyles.round}></div>
                  </label>
                  <IconButton ariaLabel="Toggle light mode" onClick={this.toggleDark}><FiMoon /></IconButton>
                </div>

                <div className={navbarStyles.languages}>
                  {Object.entries(languages).map((lang, i) => {
                    return (
                      <div className={navbarStyles.languageSelect} key={i}>
                        <input type="radio" name="language" value={lang[0]} id={`lang_${lang[0]}`} checked={lang[0] === currentLanguage ? true : false} readOnly />
                        <label htmlFor={`lang_${lang[0]}`}>
                          <Link to={`/${lang[0]}${props.slug}`}>
                            <img src={`../../img/${lang[0]}.svg`} alt="" width="32" height="18" />
                            {lang[1]}
                          </Link>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div >
              <IconButton ariaLabel="Close navigation menu" className={navbarStyles.closebtn} onClick={toggleNav}><FaTimes /></IconButton>
              <Link to={`/${currentLanguage}/`}>{frontMatter.home[currentLanguage]}</Link>
              <Link to={`/${currentLanguage}/allprojects`}>{frontMatter.projects[currentLanguage]}</Link>
              <Link to={`/${currentLanguage}/about`}>{frontMatter.about[currentLanguage]}</Link>
            </nav >
          </div>
        )
      }

      } />
    )
  }
}

export default Navbar
