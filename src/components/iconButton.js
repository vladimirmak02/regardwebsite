import React from "react"
import iconButtonStyles from '../styles/iconButton.module.scss'

export default function IconButton(props) {
  return (
    <button onClick={props.onClick} aria-label={props.ariaLabel} className={props.className + " " + iconButtonStyles.iconButton} id={props.id}>{props.children}</button>
  )
}
