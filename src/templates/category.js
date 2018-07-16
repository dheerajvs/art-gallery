import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const Category = ({ data }) => {
  const items = data.allMarkdownRemark.edges

  return (
    <Layout>
      <ul>{items.map(({ node }) =>
        <li key={node.fields.slug}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </li>
      )}</ul>
    </Layout>
  )
}

Category.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Category

export const pageQuery = graphql`
  query ItemsByCategory($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: {
        templateKey: { eq: "item" }
        categories: { elemMatch: { category: { eq: $category }}}
      }}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
