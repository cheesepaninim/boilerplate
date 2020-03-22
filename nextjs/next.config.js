const config = require('./config')
const assetPrefix = config[process.env.NODE_ENV].assetPrefix
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  distDir: '_next',
  pageExtensions: ['jsx', 'js'],
  assetPrefix: assetPrefix,
  env: {
    ASSET_PREFIX: assetPrefix
  },
})
