import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import withRoot from 'withRoot'
import Layout from 'components/layout'

const styles = () => ({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: 1024,
    marginBottom: 24,
  },
  testimonialsTitle: {
    marginBottom: 16,
  },
  testimonialCard: {
    maxWidth: 240,
  },
  quote: {
    lineHeight: 0,
    paddingTop: 16,
  },
  fullHeight: {
    height: '100%',
  },
})

function handleContactClick() {
  navigate('/contact/')
}

const About = ({ classes, data }) => {
  const { fields, frontmatter, html } = data.allMarkdownRemark.edges[0].node
  const avatarFixed = data.file.childImageSharp.fixed;

  return (
    <Layout slug={fields.slug}>
      <Helmet>
        <title>About</title>
        <meta name="description" content="About Sowmya, the artist" />
      </Helmet>

      <Grid container direction="column" wrap="nowrap" alignItems="center">
        <Grid className={classes.container} item>
          <Card>
            <CardContent>
              <Grid container alignItems="center" spacing={16}>
                <Grid item>
                  <Img
                    className={classes.avatar}
                    fixed={avatarFixed} alt={frontmatter.name}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="headline">About the Artist</Typography>
                  <Typography variant="subheading">
                    {frontmatter.name}
                  </Typography>
                </Grid>
              </Grid>
              <Typography dangerouslySetInnerHTML={{ __html: html }}/>
            </CardContent>
            <CardActions>
              <Button
                color="primary" variant="raised" onClick={handleContactClick}
              >
                Contact the Artist
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid className={classes.testimonialsTitle} item>
          <Typography variant="display1">Testimonials</Typography>
        </Grid>
        <Grid
          className={classes.container}
          item container justify="center" spacing={24}
        >{
          frontmatter.testimonials.map(({ quote, title, place }) => (
            <Grid key={title} className={classes.testimonialCard} item>
              <Card className={classes.fullHeight}>
                <CardContent className={classes.fullHeight}>
                  <Grid
                    className={classes.fullHeight}
                    container direction="column" justify="space-between"
                  >
                    <Grid item>
                      <Typography className={classes.quote} variant="display3">
                        &#x201C;
                      </Typography>
                      <Typography
                        align="center" gutterBottom variant="body1"
                        component="blockquote"
                      >
                        {quote}
                      </Typography>
                      <Typography className={classes.quote}
                        align="right" variant="display3"
                      >
                        &#x201D;
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="headline">{title}</Typography>
                      <Typography variant="subheading">{place}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        }</Grid>
        <Grid
          item container component="footer"
          direction="column" alignItems="center" wrap="nowrap" spacing={8}
        >
          <Grid item>
            <Typography variant="caption">
              Website handcrafted with &#x2764;&#xfe0f; by Dheeraj Vepakomma
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              Copyright &copy; 2019, Sowmya B A. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object,
    file: PropTypes.shape({
      childImageSharp: PropTypes.object
    }),
  }),
}

export default withRoot(withStyles(styles)(About))

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
          fields {
            slug
          }
          html
        }
      }
    }

    file(relativePath: {eq: "sowmya.jpg"}){
      childImageSharp {
        fixed(width: 56, height: 56) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
