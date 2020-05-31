import React from "react"
import { BsArrow90DegDown } from 'react-icons/bs'
import { FcCalendar } from 'react-icons/fc'
import dateRangeStyles from '../styles/daterange.module.scss'

export default function DateRange(props) {
  let start = props.start
  let end = props.end
  let lang = props.language
  let locale = ''
  if (lang === 'cz') {
    locale = 'cs'
  } else {
    locale = lang
  }
  start = new Date(start).toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  end = new Date(end).toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  if (locale === 'ru') {
    start = start.slice(0, -3);
    end = end.slice(0, -3);
  }
  return (
    <div className={dateRangeStyles.dateRange}>
      <p><FcCalendar /><span>{start}</span></p>
      <p><BsArrow90DegDown /><span>{end}</span></p>
    </div>
  )
}
