/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-env node */

const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { templateKey: { eq: "item" } }}
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              large_image
              categories {
                category
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const items = result.data.allMarkdownRemark.edges

    items.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/item.js`),
        context: {
          id: node.id
        },
      })
    })

    // Category pages:
    const categoryImages = {}
    // Iterate through each item, putting all found categories into `categories`
    items.forEach(({ node }) => {
      if (_.get(node, `frontmatter.categories`)) {
        node.frontmatter.categories.forEach(({ category }) => {
            categoryImages[category] = categoryImages[category] || []
            categoryImages[category].push(node.frontmatter.large_image.slice(5))
        })
      }
    })

    // Make category pages
    Object.keys(categoryImages).forEach(category => {
      const categoryPath = `/categories/${_.kebabCase(category)}/`
      createPage({
        path: categoryPath,
        component: path.resolve(`src/templates/category.js`),
        context: {
          category,
          images: categoryImages[category]
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(getConfig().context, 'src'), 'node_modules']
    },
  });
}
