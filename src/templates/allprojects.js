import React from 'react'
import Layout from '../components/layout'
import ExternalLink from '../components/externalLink'
import Img from "gatsby-image"
import { Link, graphql } from 'gatsby'
import allProjectsStyles from '../styles/allprojects.module.scss'
import DateRange from '../components/daterange'

export default function AllProjects(props) {
  let lang = props.pageContext.language
  let allProjectsFrontmatter = props.data.allMarkdownRemark.nodes
  let allProjectsFields = props.data.allMarkdownRemark.edges
  return (
    <Layout className={allProjectsStyles.allProjectsPage} gridClass={allProjectsStyles.grid} context={props.pageContext}>
      <main>
        <div className={allProjectsStyles.buildings}>
          {allProjectsFrontmatter.map((node, i) => {
            return (
              <div className={allProjectsStyles.building} key={i}>
                <Link className={allProjectsStyles.buildingImg} to={`/${lang}${allProjectsFields[i].node.fields.slug}`}>
                  <Img imgStyle={{ objectFit: 'contain' }} fluid={node.frontmatter.mainImage.childImageSharp.fluid} alt={node.frontmatter.titleTranslated[lang]} />
                </Link>
                <article>
                  <Link className={allProjectsStyles.buildingInfo} to={`/${lang}${allProjectsFields[i].node.fields.slug}`}>
                    <h3>{node.frontmatter.titleTranslated[lang]}</h3>
                    <p>{node.frontmatter.shortDesc[lang]}</p>
                    <br />
                    <DateRange start={node.frontmatter.dateStart} end={node.frontmatter.dateEnd} language={lang} />
                  </Link>
                  <br />
                  {node.frontmatter.website ? (<ExternalLink href={node.frontmatter.website}>{node.frontmatter.website}</ExternalLink>) : null}
                </article>
              </div>
            )
          })}

        </div>
      </main>
    </Layout >
  )
}

export const query = graphql`
{
  allMarkdownRemark(sort: {fields: frontmatter___dateStart, order: DESC}, filter: {frontmatter: {templateKey: {eq: "project"}}}) {
    nodes {
      frontmatter {
        website
        titleTranslated {
          en
          ru
          cz
        }
        mainImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
            }
          }
        }
        shortDesc {
          en
          ru
          cz
        }
        dateStart
        dateEnd
      }
    }
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
`
