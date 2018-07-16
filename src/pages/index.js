import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Button from '@material/react-button'
import Card, {
  CardPrimaryContent,
  CardMedia,
} from '@material/react-card'

import Layout from '../components/layout'

import './index.css'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const categories = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'category'
  )
  const items = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'item'
  )

  return (
    <Layout>
      {categories.map(({ node: categoryNode }) => (
        <section key={categoryNode.fields.slug}>
          <header>
            <Button>{categoryNode.frontmatter.title}</Button>
          </header>
          <div>
            {items.filter(({ node: itemNode }) => (
              itemNode.frontmatter.categories.find(({ category }) =>
                category === categoryNode.frontmatter.title
              )
            )).map(({ node: itemNode }) => (
              <Link to={itemNode.fields.slug} key={itemNode.fields.slug}>
                <Card>
                  <CardPrimaryContent>
                    <CardMedia imageUrl={itemNode.frontmatter.image} square />
                    <h2>{itemNode.frontmatter.title}</h2>
                  </CardPrimaryContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
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
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
            image
            categories {
              category
            }
          }
        }
      }
    }
  }
`
