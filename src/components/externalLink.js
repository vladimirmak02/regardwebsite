import React from "react"
import { FaExternalLinkAlt } from 'react-icons/fa'
import linkStyles from '../styles/link.module.scss'

export default function ExternalLink(props) {
  if (props.href) {
    let { children } = props
    return (
      <div>
        <a href={props.href} className={linkStyles.link} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt style={{ paddingRight: '1em' }} />{children}</a>
      </div>
    )
  }
  else {
    return "";
  }
}
