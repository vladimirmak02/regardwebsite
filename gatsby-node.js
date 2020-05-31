const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {templateKey: {in: ["about", "project", "index", "allprojects"]}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)
  let languages = ['en', 'cz', 'ru']
  createPage({
    path: '/',
    component: path.resolve(
      `src/templates/index.js`
    ),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      slug: '/',
      language: 'cz',
    },
  })
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    languages.forEach((lang) => {
      createPage({
        path: '/' + lang + node.fields.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          language: lang,
        },
      })
    })
  })
}
