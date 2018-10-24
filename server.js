// Required modules
// e.g. https://nodejs.org/api/url.html

const http = require('http');
const url = require('url');
var fs   = require('fs');

var docPath = "./html";

const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  let page = "";

  // Parse request - which page?
  page = router(req.url);

  // if no page set to error 
  if (page == "") {
    res.statusCode = 404;
    page = `${docPath}/error.html`;
  }
  // Otherwise OK
  else {
    res.statusCode = 200;
  }

  // Retrieve page from file system and send response
  fs.readFile(page, function(err, data) {
    res.end(data);
  });

  // log
  console.log(`Requested page: ${req.url.toString()}, Response: ${res.statusCode.toString()}`);

});

// Mach request to rescource (html pages)
function router(reqURL) {
    var page = "";
    if (reqURL == "/" || reqURL == "/index.html") {
        page = `${docPath}/index.html`
    }
    else if (reqURL == "/about.html") {
        page = `${docPath}/about.html`
    }
    return page;
}

// Start the HTTP server and listen for requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
