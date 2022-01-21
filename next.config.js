const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org', 'mainfacts.com'],
  },
}
