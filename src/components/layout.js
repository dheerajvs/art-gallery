import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import 'typeface-roboto'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  container: {
    padding: '24px 16px'
  }
})

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      tabValue: 0,
    }
  }

  onTabChange(event, tabValue) {
    this.setState({ tabValue }, () => {
      navigate(['/', '/about', '/contact'][tabValue])
    })
  }

  render() {
    const { children, classes } = this.props
    const { tabValue } = this.state

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <CssBaseline />
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            />
            <AppBar position="static">
              <Toolbar>
                <Tabs value={tabValue} onChange={this.onTabChange.bind(this)}>
                  <Tab label="Gallery"/>
                  <Tab label="About"/>
                  <Tab label="Contact"/>
                </Tabs>
              </Toolbar>
            </AppBar>
            <div className={classes.container}>
              {children}
            </div>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
