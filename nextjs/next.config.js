const config = require('./config')
const assetPrefix = process.env.NODE_ENV === `production` ? config.prod.assetPrefix : config.dev.assetPrefix
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  distDir: '_next',
  pageExtensions: ['jsx', 'js'],
  assetPrefix: assetPrefix,
  env: {
    ASSET_PREFIX: assetPrefix
  },
})
