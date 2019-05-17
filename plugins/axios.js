export default function ({ $axios, redirect }) {
  // Adds header: `Authorization: 123` to all requests
//   $axios.setHeader('Authorization', '123')
//
//
// // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
//   $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])
//
//   // Adds header: `Authorization: Bearer 123` to only post and delete requests
//   $axios.setToken('123', 'Bearer', ['post', 'delete'])
//
//   // Removes default Authorization header from `common` scope (all requests)
//   $axios.setToken(false)

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
