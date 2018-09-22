/* eslint-env node */

module.exports = {
  siteMetadata: {
    title: 'Sowmya’s Art Gallery',
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sowmya Art Gallery`,
        short_name: `Art Gallery`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#8b4513`,
        display: `standalone`,
        icon: `static/img/favicon.png`,
      },
    },
    // 'gatsby-plugin-netlify-cms',
    // 'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
