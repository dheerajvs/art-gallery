/* eslint-env node */

module.exports = {
  siteMetadata: {
    title: 'Sowmya\u2019s Art Gallery',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    'gatsby-plugin-page-transitions',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sowmya\u2019s Art Gallery`,
        short_name: `Art Gallery`,
        start_url: `/`,
        background_color: `#f3eae3`,
        theme_color: `#8b4513`,
        display: `standalone`,
        icon: `static/img/favicon.png`,
      },
    },
    'gatsby-plugin-offline',
    // 'gatsby-plugin-netlify-cms',
    // 'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
