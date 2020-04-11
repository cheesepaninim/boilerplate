const mongodb = require("./_config/mongodb");

module.exports = {
  siteMetadata: {
    title: 'Gatsby MobX starter',
  },
  plugins: [
    'gatsby-plugin-typescript',
    `gatsby-plugin-react-helmet`,
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
  ],
};
