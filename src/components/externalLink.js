import React from "react"
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function ExternalLink(props) {
  if (props.href) {
    let { children } = props
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt style={{ paddingRight: '1em' }} />{children}</a>
    )
  }
  else {
    return "";
  }
}
