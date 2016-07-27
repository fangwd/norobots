# norobots

An attempt to implement the 1997 Internet Draft specification [A Method for Web Robots Control](http://www.robotstxt.org/norobots-rfc.txt).

## Usage
```js
const norobots = require('norobots')
let robots = norobots('User-Agent: *\nDisallow: /cgi-bin/\n')
if (robots.allow('fig-tree', '/example.html')) {
  // Go fetch the url
}

```

