import React from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import { FaTimes } from 'react-icons/fa'
import { FiSun, FiMoon } from 'react-icons/fi'
import IconButton from './iconButton'
import navbarStyles from '../styles/navbar.module.scss'
import rusvg from '../img/ru.svg'
import ensvg from '../img/en.svg'
import czsvg from '../img/cz.svg'

var sidebarOpen = false;

export function toggleNav() {
  var sidebar = document.querySelector('.' + navbarStyles.sidebar);
  var documentCover = document.querySelector('.' + navbarStyles.documentCover);
  if (sidebarOpen === false) {
    // open
    documentCover.classList.add(navbarStyles.visible);
    sidebar.style.transform = "translateX(-100%)";
    sidebarOpen = true;
  } else {
    // close
    documentCover.classList.remove(navbarStyles.visible);
    sidebar.style.transform = "translateX(0%)";
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
    let lang = this.props.context.language
    let path = this.props.context.path
    if (path === '/' && lang === 'cz') {
      const storedLang = localStorage.getItem("language");
      const preferredLang = window.navigator.language;
      if (storedLang && storedLang !== lang) {
        document.querySelector(`[for=lang_${storedLang}] a`).click()
      } else if (preferredLang && !storedLang) {
        switch (true) {
          case /en/.test(preferredLang):
            if ('en' !== lang) {
              console.log(lang)
              document.querySelector(`[for=lang_en] a`).click()
            }
            break;
          case /ru/.test(preferredLang):
            if ('ru' !== lang) {
              document.querySelector(`[for=lang_ru] a`).click()
            }
            break;
          default:
            break;
        }
      }
    }

    const toggleSwitch = document.querySelector(
      `.${navbarStyles.themeSwitch} input[type="checkbox"]`
    );

    const preferredTheme = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);

      if (storedTheme === "dark") {
        toggleSwitch.checked = true;
      }
    } else if (preferredTheme) {
      document.documentElement.setAttribute("data-theme", preferredTheme);

      if (preferredTheme === "dark") {
        toggleSwitch.checked = true;
        darkTheme()
      } else {
        lightTheme()
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
        let currentLanguage = props.context.language
        let languages = { 'en': 'English', 'ru': 'Русский', 'cz': 'Čeština' }
        let languageSVGs = [ensvg, rusvg, czsvg]
        return (
          <div>
            <div className={navbarStyles.documentCover} aria-hidden="true" role='navigation' onClick={toggleNav}></div>
            <nav className={navbarStyles.sidebar}>
              <div className={navbarStyles.options}>
                <div className={navbarStyles.themeSwitchWrapper}>
                  <IconButton ariaLabel="Toggle dark mode" onClick={this.toggleDark}><FiSun /></IconButton>
                  <label role="presentation" className={navbarStyles.themeSwitch} htmlFor="checkbox">
                    <span style={{ display: "none" }}>Turn dark mode on or off</span>
                    <input aria-hidden="true" type="checkbox" id="checkbox" />
                    <div aria-hidden="true" className={navbarStyles.slider + ' ' + navbarStyles.round}></div>
                  </label>
                  <IconButton ariaLabel="Toggle light mode" onClick={this.toggleDark}><FiMoon /></IconButton>
                </div>

                <div className={navbarStyles.languages}>
                  {Object.entries(languages).map((lang, i) => {
                    return (
                      <div className={navbarStyles.languageSelect} key={i}>
                        <input type="radio" name="language" value={lang[0]} id={`lang_${lang[0]}`} checked={lang[0] === currentLanguage ? true : false} readOnly />
                        <label htmlFor={`lang_${lang[0]}`}>
                          <Link onClick={() => localStorage.setItem("language", lang[0])} to={`/${lang[0]}${(props.context.slug === '/' ? '' : props.context.slug)}`}>
                            <img src={languageSVGs[i]} alt="" width="32" height="18" />
                            {lang[1]}
                          </Link>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div >
              <IconButton ariaLabel="Close navigation menu" className={navbarStyles.closebtn} onClick={toggleNav}><FaTimes /></IconButton>
              <Link to={`/${currentLanguage}`}>{frontMatter.home[currentLanguage]}</Link>
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
