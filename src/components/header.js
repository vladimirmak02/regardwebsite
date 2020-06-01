import React from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import { FaBars } from 'react-icons/fa'
import { Helmet } from "react-helmet"
import { toggleNav } from './navbar'
import headerStyles from '../styles/header.module.scss'
import IconButton from './iconButton'

export default function RegardHeader(props) {
  return (<StaticQuery
    query={graphql`
    {
      markdownRemark(frontmatter: {templateKey: {eq: "about"}}) {
        frontmatter {
          shortDesc {
            ru
            cz
            en
          }
        }
      }
    }
  `}
    render={data => {
      return (
        <header className={headerStyles.regardHeader}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Regard</title>
            <html lang={props.language === 'cz' ? 'cs' : props.language} />
            <link rel="canonical" href={`/${props.language}/`} />
            <meta name="description" content={data.markdownRemark.frontmatter.shortDesc[props.language]} />
          </Helmet>
          <Link to={`/${props.language}`}>REGARD</Link>
          <nav>
            <IconButton className="nav-btn" id="openNav" onClick={toggleNav} ariaLabel="Open navigation menu"  ><FaBars /></IconButton>
          </nav>
        </header>
      )
    }

    } />
  );
}
