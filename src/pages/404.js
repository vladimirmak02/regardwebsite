import React from 'react'
import Layout from '../components/layout'
import aboutStyles from '../styles/about.module.scss'
import { Helmet } from 'react-helmet'

export default function About(props) {
  props.pageContext.language = 'cz'
  props.pageContext.slug = '/404'
  return (
    <Layout className={aboutStyles.aboutPage} gridClass={aboutStyles.grid} context={props.pageContext}>
      <Helmet>
        <title itemProp="name">Not Found</title>
      </Helmet>
      <main>
        <div className={aboutStyles.aboutMain}>
          <div className={aboutStyles.aboutWrapper}>
            <h2 className={aboutStyles.h1Title}>Page not Found</h2>
            <h2 className={aboutStyles.h1Title}>Požadovaná stránka nebyla nalezena.</h2>
            <h2 className={aboutStyles.h1Title}>Страница не найдена</h2>
          </div>
        </div>
      </main>
    </Layout>
  )
}
