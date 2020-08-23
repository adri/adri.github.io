Without a webserver like nginx or Apache, a tool called `cgi-fcgi` can be used to query a PHP-FPM process.

### Install cgi-fcgi
To send a POST request directly to PHP-FPM a fcgi tool is needed:
* On macOS `brew install fcgi`
* On Debian install `apt-get install libfcgi0ldbl`

### Send a POST request

```
echo '{"query": "{allCities { edges {node {id}}} }"}' | \
SCRIPT_NAME=/var/www/app/public/index.php \
SCRIPT_FILENAME=/var/www/app/public/index.php \
DOCUMENT_ROOT=/var/www/app/public \
REMOTE_ADDR=127.0.0.1 \
HTTP_HOST=api.ticketswap.com \
HTTPS=true \
REQUEST_URI=/graphql/public \
REQUEST_METHOD=POST \
CONTENT_TYPE=application/json \
CONTENT_LENGTH=47 \
cgi-fcgi -bind -connect 127.0.0.1:8080
```

#published 