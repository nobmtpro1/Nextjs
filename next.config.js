// const path = require( 'path' )
// const withCSS = require( '@zeit/next-css' )

// module.exports = {
//   reactStrictMode: true,
//   env: {
//     API_URL: 'http://localhost/work/elearning/public/api/',
//   },
//   sassOptions: {
//     includePaths: [ path.join( __dirname, 'styles' ) ],
//   },
// }



// module.exports = withCSS()



const withCSS = require( '@zeit/next-css' )
module.exports = withCSS()

const path = require( 'path' )

module.exports = {
  reactStrictMode: false,
  env: {
    BASE_URL: 'http://localhost:3000',
    API_URL: 'http://localhost/work/elearning/laravel/public/api/',
    IMG_URL: 'http://localhost/work/elearning/laravel/public/upload/images/',
  },
  sassOptions: {
    includePaths: [ path.join( __dirname, 'styles' ) ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: false,
  },
}
