import React from 'react'
import Layout from '../components/layout'
import Img from "gatsby-image"
import ExternalLink from '../components/externalLink'
import indexStyles from '../styles/index.module.scss'
import { Link, graphql } from 'gatsby'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet'

class SvgBlob extends React.Component {
  constructor(props) {
    super(props)
    this.lastScrollTop = 0;
    this.ticking = false;
    this.up = false;
    this.down = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.animateBlob = this.animateBlob.bind(this);

  }
  componentDidMount() {
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    document.addEventListener("scroll", this.handleScroll, false);

    document.querySelector('aside').addEventListener('mouseenter', () => document.getElementById("expand").beginElement());

    document.querySelector('aside').addEventListener('mouseleave', () => document.getElementById("backToStd").beginElement());
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
    this.handleScroll = false;
  }

  animateBlob(st) {
    if (st >= this.lastScrollTop && this.down === false && this.handleScroll) {

      // downscroll code
      this.down = true;
      this.up = false;
      setTimeout(() => {
        document.getElementById("scrollDown").beginElement();
      }, 25);
    } else if (st < this.lastScrollTop && this.up === false && this.handleScroll) {
      // upscroll code
      this.down = false;
      this.up = true;
      setTimeout(() => {
        document.getElementById("scrollUp").beginElement();
      }, 100);
    }
    else if (!this.handleScroll) {
      return
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  handleScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (!this.ticking && this.handleScroll) {
      window.requestAnimationFrame(function () {
        this.animateBlob(st);
        this.ticking = false;
      }.bind(this));

      this.ticking = true;
    }


  }


  render() {
    return (
      <div className={indexStyles.blob}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 382">
          <path d="M401 85c39 61 49 169 5 229-31 42-107 69-189 68-100 0-150-40-172-68-52-62-58-174-13-237C72 23 134 0 208 0c85 0 152 22 193 85z">
            <animate id="scrollUp" attributeName="d" restart="whenNotActive" fill="freeze" to="M392 90c39 61 47 185 7 241-31 42-100 52-182 51-100 0-153-38-175-66-42-55-54-168-9-231C73 31 152 0 208 0c62 0 143 27 184 90z" begin="indefinite" dur="0.3s" />
            <animate id="scrollDown" attributeName="d" restart="whenNotActive" fill="freeze" to="M399 75c43 63 45 152 8 226-36 57-132 81-190 81-62 0-147-42-184-99-38-58-44-151 0-207C75 23 107 0 208 0c104 0 148 13 191 75z" begin="indefinite" dur="0.3s" />
            <animate id="expand" attributeName="d" restart="whenNotActive" fill="freeze" to="M402 80c39 61 54 171 10 231-31 42-113 72-195 71-100 0-152-40-174-68-49-56-58-178-13-241C70 19 134 0 208 0c85 0 153 17 194 80z" begin="indefinite" dur="0.15s" />
            <animate id="backToStd" attributeName="d" restart="whenNotActive" fill="freeze" to="M401 85c39 61 49 169 5 229-31 42-107 69-189 68-100 0-150-40-172-68-52-62-58-174-13-237C72 23 134 0 208 0c85 0 152 22 193 85z" begin="scrollUp.end+0.1s;scrollDown.end+0.1s;" dur="0.4s" />
          </path>
        </svg>
      </div>
    )
  }
}

export default function Home(props) {
  let lang = props.pageContext.language
  let indexFrontMatter = props.data.markdownRemark.frontmatter
  let lastBuildingFrontMatter = props.data.allMarkdownRemark.nodes[0].frontmatter

  return (
    <Layout className={indexStyles.indexPage} gridClass={indexStyles.grid} context={props.pageContext}>
      {lang === 'cz' ? (<Helmet><link rel="canonical" href={`/${props.language}`} /></Helmet>) : null}
      <Helmet>
        <title itemProp="name" lang={lang}>Home</title>
      </Helmet>
      <main>
        <h2>{indexFrontMatter.slogan[lang]}</h2>
        <Link to={`/${lang}/allprojects`}><button>{indexFrontMatter.allProjectsBtn[lang]}<FaArrowCircleRight style={{ paddingLeft: '0.7em' }} /></button></Link>
      </main>

      <aside>
        <SvgBlob />
        <div className={indexStyles.lastBuilding}>
          <Link to={`/${lang}${props.data.allMarkdownRemark.edges[0].node.fields.slug}`}>
            <h2>{indexFrontMatter.latestProjectText[lang]}</h2>
          </Link>
          <Link to={`/${lang}${props.data.allMarkdownRemark.edges[0].node.fields.slug}`}>
            <Img imgStyle={{ objectFit: 'contain' }} fluid={lastBuildingFrontMatter.mainImage.childImageSharp.fluid} alt="Main image for latest project" />
            <h3>{lastBuildingFrontMatter.titleTranslated[lang]}</h3>
            <p>{lastBuildingFrontMatter.shortDesc[lang]}</p>
          </Link>
          {lastBuildingFrontMatter.website ? <ExternalLink href={lastBuildingFrontMatter.website}>{lastBuildingFrontMatter.website}</ExternalLink> : ""}
        </div>
      </aside>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark(fields: {slug: {eq: "/"}}) {
      frontmatter {
        slogan {
          en
          ru
          cz
        }
        allProjectsBtn {
          en
          ru
          cz
        }
        latestProjectText {
          en
          ru
          cz
        }
      }
    }
    allMarkdownRemark(limit: 1, sort: {fields: frontmatter___dateStart, order: DESC}, filter: {frontmatter: {templateKey: {eq: "project"}}}) {
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
              fluid {
              ...GatsbyImageSharpFluid
              }
            }
          }
          shortDesc {
            en
            ru
            cz
          }
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
