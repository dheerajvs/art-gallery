import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { graphql, navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import HelpIcon from '@material-ui/icons/Help'
import ShareIcon from '@material-ui/icons/Share'
import EmailIcon from '@material-ui/icons/Email'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import withRoot from 'withRoot'
import Layout from 'components/layout'

const styles = theme => ({
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
    pointerEvents: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  facebook: {
    color: '#3b5998'
  },
  twitter: {
    color: '#55acee'
  },
  whatsapp: {
    color: '#25d366'
  },
  email: {
    color: '#777'
  },
})

function handleEnquireClick() {
  navigate('/contact/')
}

class Item extends React.Component {

  state = {
    anchorEl: null
  }

  handleShareMenuClose = app => {
    const { title } = this.props.data.markdownRemark.frontmatter
    const text = `Take a look at ${title} from Sowmya\u2019s Art Gallery`

    this.setState({ anchorEl: null })

    switch (app) {
      case 'facebook':
        window.open(
          `https://facebook.com/sharer/sharer.php?u=${location.href}&t=${text}`
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet/?text=${text}&url=${location.href}`
        )
        break
      case 'whatsapp':
        window.open(`whatsapp://send?text=${text}%20${location.href}`)
        break
      case 'email':
        window.open(`mailto:?subject=${text}&body=${location.href}`)
        break
      default:
          break
    }
  }

  handleShareClick = event => {
    if (navigator.share) {
      const { title } = this.props.data.markdownRemark.frontmatter

      navigator.share({
        title: 'Sowmya\u2019s Art Gallery',
        text: `Take a look at ${title} from Sowmya\u2019s Art Gallery`,
        url: location.href,
      })
        .catch(() => {});
    }
    else {
      this.setState({ anchorEl: event.currentTarget })
    }
  }

  isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  render() {
    const { classes, data } = this.props
    const { frontmatter: item } = data.markdownRemark
    const { anchorEl } = this.state

    return (
      <Layout>
        <Helmet>
          <title>{item.title}</title>
          <meta name="description" content={item.title} />
        </Helmet>
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
                <Button
                  size="small" color="primary" onClick={handleEnquireClick}
                >
                  <HelpIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Enquire
                </Button>
                <Button
                  size="small" color="primary"
                  onClick={this.handleShareClick}
                  aria-owns={anchorEl ? 'share-menu' : null}
                  aria-haspopup="true"
                >
                  <ShareIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Menu
          id="share-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleShareMenuClose()}
        >
          <MenuItem onClick={() => this.handleShareMenuClose('facebook')}>
            <ListItemIcon
              className={classNames(classes.iconSmall, classes.facebook)}
            >
              <FontAwesomeIcon icon={faFacebook} />
            </ListItemIcon>
            Facebook
          </MenuItem>
          <MenuItem onClick={() => this.handleShareMenuClose('twitter')}>
            <ListItemIcon
              className={classNames(classes.iconSmall, classes.twitter)}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </ListItemIcon>
            Twitter
          </MenuItem>
          { this.isMobile && (
            <MenuItem onClick={() => this.handleShareMenuClose('whatsapp')}>
              <ListItemIcon
                className={classNames(classes.iconSmall, classes.whatsapp)}
              >
                <FontAwesomeIcon icon={faWhatsapp} color="green" />
              </ListItemIcon>
              WhatsApp
            </MenuItem>
          )}
          <MenuItem onClick={() => this.handleShareMenuClose('email')}>
            <ListItemIcon
              className={classNames(classes.iconSmall, classes.email)}
            >
              <EmailIcon />
            </ListItemIcon>
            Email
          </MenuItem>
        </Menu>
      </Layout>
    )
  }
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
