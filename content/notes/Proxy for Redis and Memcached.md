Because PHP doesn't have connection pools and needs to create new connections for every request.

### Twemproxy

QUote

> The deployment of twemproxy was a great success. We eliminated all timeout and connection errors that were left (without buying new hardware).

[Learn Redis the hard way blog post](https://tech.trivago.com/2017/01/25/learn-redis-the-hard-way-in-production/)

> With Twemproxy we haven’t seen any timeouts

[Moving millions of user sessions from MySQL to Redis](https://medium.com/hootsuite-engineering/moving-millions-of-user-sessions-from-mysql-to-redis-ce709a4e93e9)

> Unfortunately, our options for connection pooling and more efficient use of connections were limited in PHP, so we had little recourse than to suffer with a high connection load and fluctuating connections against our Memcached servers

[Optimizing caching Twemproxy and memcached at Flickr](https://code.flickr.net/2015/07/10/optimizing-caching-twemproxy-and-memcached-at-flickr/)

Working example [Wikipedia](https://grafana.wikimedia.org/d/000000216/nutcracker?orgId=1&var-cluster=All&var-pool=All&var-datasource=eqiad%20prometheus%2Fops)

#published 