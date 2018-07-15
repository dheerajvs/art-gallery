import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const { edges: items } = data.allMarkdownRemark

  return (
    <Layout>
      <Link to="/">Gallery</Link>
      <Link to="/about/">About</Link>
      <Link to="/contact/">Contact</Link>
      {items.map(({ node: item }) => (
        <div>
          <div>{item.frontmatter.title}</div>
          <div>{item.fields.slug}</div>
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
            templateKey
            title
          }
        }
      }
    }
  }
`
