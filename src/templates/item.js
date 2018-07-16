import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Item = ({ data }) => {
  const { markdownRemark: item } = data

  return (
    <Layout>
      <div>{item.frontmatter.title}</div>
    </Layout>
  )
}

Item.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Item

export const pageQuery = graphql`
  query ItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
  }
`
