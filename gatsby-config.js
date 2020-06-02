module.exports = {
  siteMetadata: {
    title: 'Regard',
    siteUrl: 'https://www.regard.cz',
    description:
      'Regard s.r.o.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [`/admin/*`],
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Regard`,
        short_name: `Regard`,
        description: `Regard je developerská společnost založená v roce 1999. Naším záměrem je
        stavět kvalitní a dostupné bydlení v oblasti Prahy.`,
        lang: `cs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0b001a`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `browser`,
        icon: `src/img/icon.png`, // This path is relative to the root of the site.
        localize: [
          {
            start_url: `/en`,
            lang: `en`,
            name: `Regard`,
            short_name: `Regard`,
            description: `Regard is a development company founded in 1999. Our mission is to build
            quality, affordable housing in the Prague area.`,
          },
          {
            start_url: `/ru`,
            lang: `ru`,
            name: `Regard`,
            short_name: `Regard`,
            description: `Regard - это девелоперская компания, основанная в 1999 году. Наша миссия -
            построить качественное и доступное жилье в районе Праги.`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.regard.cz',
        sitemap: 'https://www.regard.cz/sitemap.xml',
        policy: [{ userAgent: '*', disallow: '/admin' }]
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-168261874-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        exclude: ["/admin/**"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 300,
        // Defers execution of google analytics script after page load
        defer: true,
        // Any additional optional fields
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/projects/`,
        name: 'projects',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/components/`,
        name: 'components',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
