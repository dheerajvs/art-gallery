import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const { edges: items } = data.allMarkdownRemark

  return (
    <Layout>
      {items.map(({ node: item }) => (
        <div key={item.fields.slug}>
          <Link to={item.fields.slug}>{item.frontmatter.title}</Link>
        </div>
      ))}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "item" } }}
    ) {
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
