import React from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import footerStyles from '../styles/footer.module.scss'
import Address from './address'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { BsPerson } from 'react-icons/bs'

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
            address
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
            <p className={footerStyles.aboutShort}>{aboutFrontMatter.shortDesc[lang]}</p>
            <div className={footerStyles.legalInfo}>
              <span>{aboutFrontMatter.copyrightInfo[lang] + ` 1999-${new Date().getFullYear()}`}<Link to={`/privacypolicy`}>{`Privacy Policy`}</Link></span>
            </div>
          </div>
          <div className={footerStyles.collumn}>
            <h3>{contactFrontMatter.contactText[lang]}</h3>
            <Address location={contactFrontMatter.address}></Address>
            <div className={footerStyles.contactInfo}>
              <div className={footerStyles.nameRole}>
                <h4>{contactFrontMatter.name[lang]}</h4>
                <h5>{contactFrontMatter.role[lang]}</h5>
              </div>
              <BsPerson />
              <a href={`mailto:${contactFrontMatter.email}`}><FaEnvelope />  {contactFrontMatter.email}</a>
              <br />
              <a href={`tel:${contactFrontMatter.phone}`}><FaPhoneAlt />  {contactFrontMatter.phone}</a>
            </div>
          </div>
        </footer>
      )
    }

    } />
  );
}
