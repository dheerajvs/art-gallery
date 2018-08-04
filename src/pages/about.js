import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Button from '@material/react-button'
import {
  CardActions,
  CardActionButtons,
} from '@material/react-card'

const About = ({ data }) => {
  const { frontmatter, html } = data.allMarkdownRemark.edges[0].node

  return (
    <Layout>
      {frontmatter.name}
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </Layout>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object
  }),
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "about"}}}) {
      edges {
        node {
          frontmatter {
            name
            avatar
            testimonials {
              title
              place
              quote
            }
          }
          html
        }
      }
    }
  }
`
