import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { navigate } from 'gatsby-link'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import withRoot from 'withRoot'
import Layout from '../components/layout'
import Ribbon from '../components/ribbon'

const styles = () => ({
  ribbonContainer: {
    position: 'relative',
  },
  categoryTitle: {
    marginBottom: 16,
  },
  imageTitle: {
    whiteSpace: 'nowrap',
    width: 118,
  },
})

const Category = props => {
  const { classes, data, pageContext: { category } } = props
  const items = data.allMarkdownRemark.edges
  const images = data.allFile.edges

  return (
    <Layout titlePrefix={category}>
      <Typography
        className={classes.categoryTitle} align="center" variant="title"
        color="primary"
      >
        {category}
      </Typography>
      <Grid container justify="center" spacing={24}>{
        items.map(({ node: itemNode }) => {
          const image = images.filter(({ node: { relativePath } }) =>
            relativePath === itemNode.frontmatter.large_image.substring(5)
          )[0]

          return (
            <Grid key={itemNode.fields.slug} item>
              <div className={classes.ribbonContainer}>
                { itemNode.frontmatter.sold && <Ribbon>Sold Out</Ribbon> }
                <Card>
                  <CardActionArea onClick={() => navigate(itemNode.fields.slug)}>
                    <Img
                      fluid={image.node.childImageSharp.fluid}
                      alt={itemNode.frontmatter.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.imageTitle}
                        align="center" noWrap variant="body1"
                      >
                        {itemNode.frontmatter.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Grid>
          )
        })
      }</Grid>
    </Layout>
  )
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    allFile: PropTypes.object,
  }),
  pageContext: PropTypes.shape({
    category: PropTypes.string,
  }),
}

export default withRoot(withStyles(styles)(Category))

export const pageQuery = graphql`
  query ItemsByCategory($category: String!, $images: [String]) {
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
            large_image
            sold
          }
        }
      }
    }

    allFile(filter: {
      relativePath: { in: $images }
    }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 512) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
