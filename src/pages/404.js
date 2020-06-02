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
            <h1 className={aboutStyles.h1Title}>Page Not Found</h1>
            <h1 className={aboutStyles.h1Title}>Požadovaná stránka nebyla nalezena.</h1>
            <h1 className={aboutStyles.h1Title}>Страница не найдена</h1>
          </div>
        </div>
      </main>
    </Layout>
  )
}
