---
published: false
---

---
layout: post
title: Experimenting with Amazon Route 53 for DNS Routing and Failover
summary: 
published: false
---

For a playground project of mine I'm currently experimenting how to setup a globally distributed web site. My goal is to lower latency by bring data closer to the users. CDN servics like [fastly](http://fastly.com) are great but for a playground project their minimum pricing of US$50 seems too high for me. So I got myself two cheap virtual servers and started experimenting. 
 
One issue I encountered was how to direct a user to the best suitable server and how to fail over to another server in case things go wrong. I was looking for a DNS provider which met the following criteria:
	
 * Quick failover in case on server is not responding
 * Route users to the server with the lowest latency 
 * Fast domain lookups
 * Cheap ;-)

### Amazon Route 53

After some research I found [Amazons Route 53](http://aws.amazon.com/route53/) to be a good match. 

#### Failover
pretty quick failover with health checks, the quicker the more expensive 

#### Latency 
A great feature of Route 53 is [latency based routing](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html). 

#### Speed 
Compared to other DNS providers Route 53 unfortunately doesn't seem not too quick.

#### Pricing

For pricing it is currently hard to find anything comparable.


