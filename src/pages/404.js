import React from 'react'
import Layout from '../components/layout'
import aboutStyles from '../styles/about.module.scss'
import { Helmet } from 'react-helmet'

export default function About(props) {
  props.pageContext.language = 'cz'
  props.pageContext.slug = '/'
  return (
    <Layout className={aboutStyles.aboutPage} gridClass={aboutStyles.grid} context={props.pageContext}>
      <Helmet>
        <title itemProp="name">Not Found</title>
      </Helmet>
      <main>
        <div className={aboutStyles.aboutMain}>
          <div className={aboutStyles.aboutWrapper}>
            <h1>Page Not Found</h1>
            <h1>Požadovaná stránka nebyla nalezena.</h1>
            <h1>Страница не найдена</h1>
          </div>
        </div>
      </main>
    </Layout>
  )
}
