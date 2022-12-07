// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')(['@fullcalendar']);

module.exports = withTM({
  webpack5: false,
  basePath: '/admin',
  publicRuntimeConfig: {
    // Will be available on both server and client
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    INTERCOM_SECRET: process.env.INTERCOM_SECRET,
    CLOUD_FRONT_URL: process.env.CLOUD_FRONT_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
});
