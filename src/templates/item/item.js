import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
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
  cardContainer: {
    maxWidth: 640
  },
  available: {
    color: 'green',
  },
  image: {
    boxShadow: '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 116px)',
  },
})

const Item = ({ classes, data }) => {
  const { frontmatter: item } = data.markdownRemark

  return (
    <Layout>
      <Grid container justify="center" spacing={32}>
        <Grid item>
          <img
            className={classes.image} src={item.large_image} alt={item.title}
          />
        </Grid>
        <Grid className={classes.cardContainer} item>
          <Card>
            <CardContent>
              <Typography variant="headline">{item.title}</Typography>
              <Typography variant="subheading" paragraph>
                {item.medium}
              </Typography>
              <Typography variant="body1" paragraph>
                {item.description}
              </Typography>
              <Typography variant="body1" paragraph>
                {`${item.width} \xD7 ${item.height} inches`}
                {` (${Math.round(item.width * 2.54)}`}
                {` \xD7 ${Math.round(item.height * 2.54)} cm)`}
              </Typography>
              {item.sold && (
                <Typography variant="body2" component="p">
                  &#x1F3F7;&#xFE0F; {
                    `Sold out ${
                      item.available ? '(available as commissioned work)' : ''
                  }`
                }</Typography>
              ) || (
                <Typography
                  className={classes.available} variant="body2" component="p"
                >
                  Available.
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">Enquire</Button>
              <Button size="small" color="primary">Share</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
  }),
}

export default withRoot(withStyles(styles)(Item))

export const pageQuery = graphql`
  query ItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        medium
        description
        width
        height
        sold
        available
        large_image
      }
    }
  }
`
