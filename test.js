'use strict'

const norobots = require('.')

let text = `

User-Agent: *
Allow: /personal/example/ # Bing
Disallow: /personal/

User-agent: Google
User-agent: Yahoo
# comment which should be ignored
Disallow: /personal2/

`

let tests = [
    ['Bingbot', '/personal/example2', false],
    ['Bingbot', '/personal/example/1', true],
    ['Googlebot', '/personal2/example', false],
    ['Yahoobot', '/personal2/example', false],
    ['Bingbot', '/personal2/example', true],
]

let robots = norobots(text)

tests.forEach(function(test) {
  let allow = robots.allow(test[0], test[1])
  let result = allow == test[2] ? 'OK' : 'FAIL'
  console.log(result, test)
})

