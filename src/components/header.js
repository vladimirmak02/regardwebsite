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
          companyImg {
            publicURL
          }
        }
      }
    }
  `}
    render={data => {
      return (
        <header className={headerStyles.regardHeader}>
          <Helmet
            titleTemplate="Regard - %s"
            defaultTitle="Regard">
            <meta charSet="utf-8" />
            <html lang={props.language === 'cz' ? 'cs' : props.language} />
            <meta name="description" content={data.markdownRemark.frontmatter.shortDesc[props.language]} />
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "url": "https://www.regard.cz",
                "logo": "https://www.regard.cz${data.markdownRemark.frontmatter.companyImg.publicURL}"
              }
            `}</script>
          </Helmet>
          <h1><Link to={`/${props.language}`}>REGARD</Link></h1>
          <nav>
            <IconButton className="nav-btn" id="openNav" onClick={toggleNav} ariaLabel="Open navigation menu"  ><FaBars /></IconButton>
          </nav>
        </header>
      )
    }

    } />
  );
}
