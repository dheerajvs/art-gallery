import React from 'react'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from 'withRoot'

import Layout from 'components/layout'
import Ribbon from 'components/ribbon'

const cardMediaHeight = 180

const styles = theme => ({
  root: {
    marginTop: -16
  },
  button: {
    ...theme.typography.title,
    color: theme.palette.primary.main,
    marginLeft: -16,
    textTransform: 'none'
  },
  carousel: {
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  cardContent: {
    padding: '8px 16px',
    '&:last-child': {
      paddingBottom: 8
    }
  },
  cardMedia: {
    height: cardMediaHeight,
    pointerEvents: 'none',
  },
  ribbonContainer: {
    position: 'relative',
  },
  title: {
    whiteSpace: 'nowrap',
  },
})

const IndexPage = ({ classes, data }) => {
  const images = data.allFile.edges
  const { edges } = data.allMarkdownRemark
  const categories = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'category'
  )
  const items = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'item'
  )
  const home = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'home'
  )[0].node.frontmatter.categories.map(({ category }) =>
    categories.filter(({ node }) => node.frontmatter.title === category)[0]
  )

  return (
    <Layout slug="/">
      <Grid
        className={classes.root}
        container direction="column" wrap="nowrap" spacing={16}
      >
        {home.map(({ node: categoryNode }) => (
          <Grid
            key={categoryNode.fields.slug}
            item xs={12}
            container direction="column" wrap="nowrap" spacing={8}
            component="section"
          >
            <Grid item component="header">
              <Button
                className={classes.button}
                color="primary"
                onClick={() => navigate(categoryNode.fields.slug)}
              >
                {categoryNode.frontmatter.title}
              </Button>
            </Grid>
            <Grid
              className={classes.carousel}
              item container wrap="nowrap" spacing={16}
            >
              {items.filter(({ node: itemNode }) => (
                itemNode.frontmatter.categories.find(({ category }) =>
                  category === categoryNode.frontmatter.title
                )
              )).map(({ node: itemNode }) => {
                const { fixed } = images.filter(({ node: { relativePath } }) =>
                  relativePath === itemNode.frontmatter.large_image.substring(5)
                )[0].node.childImageSharp

                return (
                  <Grid key={itemNode.fields.slug} item>
                    <div className={classes.ribbonContainer}>
                      { itemNode.frontmatter.sold && <Ribbon>Sold Out</Ribbon> }
                      <Card>
                        <CardActionArea
                          onClick={() => navigate(itemNode.fields.slug)}
                        >
                          <Img
                            className={classes.cardMedia}
                            fixed={fixed}
                            alt={itemNode.frontmatter.title}
                          />
                          <CardContent
                            className={classes.cardContent}
                            style={{
                              width: fixed.aspectRatio * cardMediaHeight
                            }}
                          >
                            <Typography
                              className={classes.title}
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
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default withRoot(withStyles(styles)(IndexPage))

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
            large_image
            categories {
              category
            }
            sold
          }
        }
      }
    }

    allFile(filter: {
      extension: { eq: "jpg" }
    }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fixed(height: 180) {
              ...GatsbyImageSharpFixed
              aspectRatio
            }
          }
        }
      }
    }
  }
`
