import React from 'react'
import Layout from '../components/layout'
import ExternalLink from '../components/externalLink'
import Img from "gatsby-image"
import { FaChevronRight, FaChevronLeft, FaArrowCircleLeft } from 'react-icons/fa';
import { Link, graphql } from 'gatsby'
import projectStyles from '../styles/project.module.scss'
import glideCoreStyles from '../styles/glide.core.min.module.css'
import glideThemeStyles from '../styles/glide.theme.min.module.css'
import DateRange from '../components/daterange'
import Address from '../components/address'
import Glide from '@glidejs/glide'

class Slideshow extends React.Component {
  componentDidMount() {
    const config = {
      type: 'slider',
      focusAt: 'center',
      gap: 20,
      dragThreshold: 80,
      swipeThreshold: 40,
    }
    var glide = new Glide(`.${glideCoreStyles.glide}`, config)
    glide.mount();
  }

  render() {
    let glideStyles = { ...glideCoreStyles, ...glideThemeStyles }
    let frontMatter = this.props.frontmatter
    let buttons = []
    for (let i = 0; i <= (frontMatter.video ? frontMatter.images.length + 1 : frontMatter.images.length); i++) {
      buttons.push((<button className={glideStyles.glide__bullet} data-glide-dir={`=${i}`} key={i} ></button >))
    }
    return (
      <div className={glideStyles.glide + ' ' + projectStyles.carousel}>
        <div className={glideStyles.glide__track} data-glide-el="track">
          <ul className={glideStyles.glide__slides}>
            {frontMatter.video ? (<li className={glideStyles.glide__slide}><div><iframe width="560" height="349" src={frontMatter.video + '?rel=0'} title="Building Video" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div></li>) : null}
            <li className={glideStyles.glide__slide}><Img imgStyle={{ objectFit: 'contain' }} fluid={frontMatter.mainImage.childImageSharp.fluid} alt="Main Image" /></li>
            {frontMatter.images.map((image, i) => {
              return (
                <li className={glideStyles.glide__slide} key={i}><Img imgStyle={{ objectFit: 'contain' }} fluid={image.childImageSharp.fluid} alt={`Image Slide ${i}`} /></li>
              )
            })}
          </ul>
        </div>
        <div className={glideStyles.glide__arrows} data-glide-el="controls">
          <button className={glideStyles.glide__arrow + ' ' + glideStyles.glide__arrow__left} data-glide-dir="<"><FaChevronLeft /></button>
          <button className={glideStyles.glide__arrow + ' ' + glideStyles.glide__arrow__right} data-glide-dir=">"><FaChevronRight /></button>
        </div>
        <div className={glideStyles.glide__bullets} data-glide-el="controls[nav]">
          {buttons}
        </div>
      </div >
    )
  }
}

export default function Project(props) {
  let lang = props.pageContext.language
  let frontMatter = props.data.markdownRemark.frontmatter
  return (
    <Layout className={projectStyles.projectPage} gridClass={projectStyles.grid} context={props.pageContext}>
      <main>
        <div className={projectStyles.building + ' ' + projectStyles.currentBuilding} >
          <h1>{frontMatter.titleTranslated[lang]}</h1>
          <Address location={frontMatter.address} />
          <p>{frontMatter.longDesc[lang]}</p>
          <br />
          <DateRange start={frontMatter.dateStart} end={frontMatter.dateEnd} language={lang} />
          {frontMatter.website ? <ExternalLink href={frontMatter.website}>{frontMatter.website}</ExternalLink> : null}
          <br />
          <Link to={`/${lang}/allprojects`}><button><FaArrowCircleLeft style={{ paddingRight: '0.3em' }} />{props.data.file.childMarkdownRemark.frontmatter.allProjectsBtn[lang]}</button></Link>
        </div>
      </main>
      <aside>
        <div className={projectStyles.carouselWrapper}>
          <Slideshow frontmatter={frontMatter} />
        </div>
      </aside>
    </Layout >
  )
}

export const query = graphql`
  query($slug: String!) {
    file(childMarkdownRemark: {frontmatter: {templateKey: {eq: "index"}}}) {
      childMarkdownRemark {
        frontmatter {
          allProjectsBtn {
            en
            ru
            cz
          }
        }
      }
    }
            markdownRemark(fields: {slug: {eq: $slug } }) {
            frontmatter {
            titleTranslated {
            en
          ru
          cz
        }
        website
        video
        longDesc {
            cz
          ru
          en
        }
        dateStart
        dateEnd
        address
        area
        mainImage {
            childImageSharp {
            fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
          }
        }
        logo {
            childImageSharp {
            fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
          }
        }
        images {
            childImageSharp {
            fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
          }
        }
      }
    }
  }
`
