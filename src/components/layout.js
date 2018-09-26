import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, navigate } from 'gatsby'
import 'typeface-roboto'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  container: {
    padding: '24px 16px'
  }
})

const Layout = ({ children, classes, slug }) => {

  const tabs = ['/', '/about/', '/contact/']

  const onTabChange = (event, index) => {
    if (index !== getTabValue()) {
      navigate(tabs[index])
    }
  }

  const getTabValue = () => tabs.indexOf(slug)

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
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            defaultTitle={data.site.siteMetadata.title}
          >
            <html lang="en" />
            <meta name="description" content="Sowmya\u2019s Art Gallery" />
            <meta name="keywords" content="Sowmya B A, art, gallery, oil paintings, portraits, tanjore paintings, paintings" />
          </Helmet>
          <AppBar position="static">
            <Tabs value={Math.max(0, getTabValue())} onChange={onTabChange}>
              <Tab label="Gallery"/>
              <Tab label="About"/>
              <Tab label="Contact"/>
            </Tabs>
          </AppBar>
          <div className={classes.container}>
            {children}
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  slug: PropTypes.string,
}

export default withStyles(styles)(Layout)
