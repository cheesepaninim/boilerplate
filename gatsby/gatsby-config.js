const mongodb = require("./_config/mongodb");

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    /*
     *
     *
     */
    `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     *
     * single collection.
     * collection: `documents`
     * multiple collection.
     * collection: [`documents`, `vehicles`]
     *
     * https://www.gatsbyjs.org/packages/gatsby-source-mongodb/#plugin-options
     *
     */
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `${mongodb.dbName}`,
        collection: `${mongodb.collection}`,
        server: { address: `${mongodb.server.address}`, port: `${mongodb.server.port}` },
        auth: { user: `${mongodb.auth.user}`, password: `${mongodb.auth.password}` },
        map: { documents: { description: `${mongodb.map.documents.description}` } }
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
