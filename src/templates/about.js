import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import aboutStyles from '../styles/about.module.scss'

export default function About(props) {
  let lang = props.pageContext.language
  let frontmatter = props.data.markdownRemark.frontmatter
  return (
    <Layout className={aboutStyles.aboutPage} gridClass={aboutStyles.grid} context={props.pageContext}>
      <main>
        <div className={aboutStyles.aboutMain}>
          <div className={aboutStyles.aboutWrapper}>
            <h1>{frontmatter.heading[lang]}</h1>
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
