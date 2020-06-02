import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import aboutStyles from '../styles/about.module.scss'
import { Helmet } from 'react-helmet'
import Img from "gatsby-image"

export default function About(props) {
  let lang = props.pageContext.language
  let frontmatter = props.data.markdownRemark.frontmatter
  return (
    <Layout className={aboutStyles.aboutPage} gridClass={aboutStyles.grid} context={props.pageContext}>
      <Helmet>
        <title itemProp="name" lang={lang}>{frontmatter.heading[lang]}</title>
      </Helmet>
      <main>
        <div className={aboutStyles.aboutMain}>
          <div className={aboutStyles.aboutWrapper}>
            <div className={aboutStyles.title}>
              <h1 className={aboutStyles.h1Title}>{frontmatter.heading[lang]}</h1>
              <div className={aboutStyles.logo}>
                <Img fluid={frontmatter.companyImg.childImageSharp.fluid} alt="Regard Logo" />
              </div>
            </div>
            <p>{frontmatter.longDesc[lang]}</p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
{
  markdownRemark(frontmatter: {templateKey: {eq: "about"}}) {
    frontmatter {
      heading {
        en
        cz
        ru
      }
      companyImg {
        childImageSharp {
          fluid {
          ...GatsbyImageSharpFluid
          }
        }
      }
      longDesc {
        cz
        ru
        en
      }
      copyrightInfo {
        cz
        ru
        en
      }
    }
  }
}
`
