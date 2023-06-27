# URL Shortener Microservice

This is my solution to the URL Shortener Microservice project from freeCodeCamp. Instructions for building the project can be found [here](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

> The data is not persistent in this project. I want to keep this simple.

### Findings

```js
// Use the URL constructor to get the details of an endpoint
const siteDetails = new URL('https://www.freecodecamp.org/')

// Redirect the request to a specific url
response.redirect(foundUrl.url)
```
