import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'

// const Container = styled.div`
//   margin: 0 auto;
//   padding-bottom: 1.5rem;
// `

const Layout = ({ title, children }) => (
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
        <AppBar>
          <Toolbar>
            <Tabs value={0}>
              <Tab label="Gallery" />
              <Tab label="About" />
              <Tab label="Contact" href="#" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </>
    )}
  />
)
        // <TopAppBar
        //   title={title || data.site.siteMetadata.title}
        //   actionItems={[
        //     <MaterialIcon key="home" icon="home" />,
        //     <MaterialIcon key="info" icon="info" />,
        //     <MaterialIcon key="contact_support" icon="contact_support" />,
        //   ]}
        // />
        // <Container
        //   className="mdc-top-app-bar--fixed-adjust"
        // >
        //   {children}
        // </Container>

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout
