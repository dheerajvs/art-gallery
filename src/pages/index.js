import React from 'react'
import { graphql, push } from 'gatsby'
import PropTypes from 'prop-types'
import Button from '@material/react-button'

import { Carousel, CarouselItem } from '../components/carousel'
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
            <Button onClick={() => push(categoryNode.fields.slug)}>
              {categoryNode.frontmatter.title}
            </Button>
          </header>
          <Carousel>
            {items.filter(({ node: itemNode }) => (
              itemNode.frontmatter.categories.find(({ category }) =>
                category === categoryNode.frontmatter.title
              )
            )).map(({ node: itemNode }) => (
              <CarouselItem
                key={itemNode.fields.slug}
                imageUrl={itemNode.frontmatter.image}
                title={itemNode.frontmatter.title}
                onClick={() => push(itemNode.fields.slug)}
              />
            ))}
          </Carousel>
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
