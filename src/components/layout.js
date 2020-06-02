import React from "react"
import RegardHeader from './header'
import RegardFooter from './footer'
import Navbar from "./navbar";

export default function Layout(props) {
  let { children } = props;
  let language = props.context.language
  return (
    <div className={props.className}>
      <div className={props.gridClass}>
        <RegardHeader language={language} />
        {children}

        <RegardFooter language={language} />
      </div>
      <Navbar context={props.context} />
    </div>
  )
}
