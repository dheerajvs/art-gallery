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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
