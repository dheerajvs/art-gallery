import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import TopAppBar from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'

import './layout.css'

const Layout = ({ children }) => (
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
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <TopAppBar
          title={data.site.siteMetadata.title}
          actionItems={[
            <MaterialIcon key="home" icon="home" />,
            <MaterialIcon key="info" icon="info" />,
            <MaterialIcon key="contact_support" icon="contact_support" />,
          ]}
        />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            paddingLeft: '1.0875rem',
            paddingRight: '1.0875rem',
            paddingBottom: ' 1.45rem',
          }}
          className="mdc-top-app-bar--fixed-adjust"
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
