import React from "react"
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Address(props) {
  if (props.location) {
    let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.location)}`
    return (
      <a style={{ opacity: '0.9' }} href={mapsUrl} target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt />  {props.location}</a>
    )
  }
  else {
    return "";
  }
}
