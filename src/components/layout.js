import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';
import TopAppBar from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'

import './layout.css'

const Container = styled.div`
  margin: 0 auto;
  padding-bottom: 1.5rem;
`

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
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <TopAppBar
          title={title || data.site.siteMetadata.title}
          actionItems={[
            <MaterialIcon key="home" icon="home" />,
            <MaterialIcon key="info" icon="info" />,
            <MaterialIcon key="contact_support" icon="contact_support" />,
          ]}
        />
        <Container
          className="mdc-top-app-bar--fixed-adjust"
        >
          {children}
        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout
