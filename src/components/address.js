import React from "react"
import { FaMapMarkerAlt } from 'react-icons/fa'
import linkStyles from '../styles/link.module.scss'

export default function Address(props) {
  if (props.location) {
    let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.location)}`
    return (
      <div>
        <a href={mapsUrl} className={linkStyles.link} target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt />  {props.location}</a>
      </div>
    )
  }
  else {
    return "";
  }
}
