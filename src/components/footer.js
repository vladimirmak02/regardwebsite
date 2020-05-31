import React from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import footerStyles from '../styles/footer.module.scss'
import Address from './address'
import { FaPhoneAlt, FaEnvelope, FaIdBadge } from 'react-icons/fa'

export default function RegardHeader(props) {
  return (<StaticQuery
    query={graphql`
    {
      file(relativePath: {eq: "contact.md"}) {
        childMarkdownRemark {
          frontmatter {
            contactText {
              ru
              en
              cz
            }
            name {
              ru
              en
              cz
            }
            role {
              ru
              en
              cz
            }
            email
            phone
          }
        }
      }
      markdownRemark(frontmatter: {templateKey: {eq: "about"}}) {
        frontmatter {
          shortDesc {
            ru
            cz
            en
          }
          heading {
            cz
            en
            ru
          }
          copyrightInfo {
            ru
            en
            cz
          }
        }
      }
    }
  `}
    render={data => {
      let aboutFrontMatter = data.markdownRemark.frontmatter
      let contactFrontMatter = data.file.childMarkdownRemark.frontmatter
      let lang = props.language
      return (
        <footer className={footerStyles.regardFooter}>
          <div className={footerStyles.collumn}>
            <h3><Link to={`/${lang}/about`}>{aboutFrontMatter.heading[lang]}</Link></h3>
            <p>{aboutFrontMatter.shortDesc[lang]}</p>
          </div>
          <div className={footerStyles.collumn}>
            <h3>{contactFrontMatter.contactText[lang]}</h3>
            <Address location="Na Dolnici 2674, Praha"></Address>
            <div>
              <h4>{contactFrontMatter.name[lang]}</h4>
              <p><FaIdBadge />  {contactFrontMatter.role[lang]}</p>
              <p><FaEnvelope />  {contactFrontMatter.email}</p>
              <p><FaPhoneAlt />  {contactFrontMatter.phone}</p>
            </div>
          </div>
        </footer>
      )
    }

    } />
  );
}
