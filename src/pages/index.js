import React from 'react'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from 'withRoot'

import Layout from 'components/layout'
import Ribbon from 'components/ribbon'

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
    height: 150
  },
  ribbonContainer: {
    position: 'relative',
  },
  title: {
    whiteSpace: 'nowrap',
    width: 118
  },
})

const IndexPage = ({ classes, data }) => {
  const { edges } = data.allMarkdownRemark
  const categories = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'category'
  )
  const items = edges.filter(
    ({ node }) => node.frontmatter.templateKey === 'item'
  )

  return (
    <Layout slug="/">
      <Grid
        className={classes.root}
        container direction="column" wrap="nowrap" spacing={16}
      >
        {categories.map(({ node: categoryNode }) => (
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
              )).map(({ node: itemNode }) => (
                <Grid key={itemNode.fields.slug} item>
                  <div className={classes.ribbonContainer}>
                    { itemNode.frontmatter.sold && <Ribbon>Sold Out</Ribbon> }
                    <Card>
                      <CardActionArea onClick={() => navigate(itemNode.fields.slug)}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={itemNode.frontmatter.image}
                          title={itemNode.frontmatter.title}
                        />
                        <CardContent className={classes.cardContent}>
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
              ))}
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
            image
            categories {
              category
            }
            sold
          }
        }
      }
    }
  }
`
