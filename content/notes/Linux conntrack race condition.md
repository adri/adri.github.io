The Linux kernel has a race condition that happens when multiple processes try to access the same IP/port combination using souce network address translation (SNAT). In some cases SNAT allocated the same port which lead to one of the packages being dropped.

### What is SNAT?
SNAT means that an intermediate party in a connection changes network packages ports and IPs because the source is not directly reachable from the destination.

### Why SNAT?
SNAT is done with Docker because each container has it's own virtual network interface (veth). Connections from containers to other containers on the same host can talk directly without an intermediate party. 

However connections to external IPs need to go through the Linux bridge on the host (cni0, docker0) and the actual main interface (eth0). Because external IPs can't reply to the container direclty, SNAT needs to happen. 

### How does SNAT work?
SNAT is done by choosing a port on the host that is used to "proxy" the connection to the container and replacing the IP address in the package. The external IPs reply goes to the host, which translates the package to the container based on the port. For the external IP it looks like the connection comes from the host. 

![](https://miro.medium.com/max/1104/1*8gfknIaQ2nbtAF597Tk7QQ.png)

Iptables is a tool to do SNAT and is part of the Linux kernel netfilter package. Iptables is instructed by the Kubernetes CNI to route packges from a container to an external IP over the host. Conntrack, which is also part of the netfilter package, keeps track of all the ports and connections. For every new connection from a container to an external IP, a port is allocated and written into the conntrack table.

### What is the race conditon?
To allocate a new port, by default the last allocated port number is incremented. Because the increment is not atomic, concurrent connection attempts can allocate the same port. This is the race condition. When writing the new connection to conntrack, the second package is dropped because the entry already exists. The statistics `conntrack -S` has the fields “insert_failed” and "drops" which show that inserts fail and packages are dropped.

Iptables supports other ways to allocate ports, controlled with the option `--random` and `--random-fully`. The latter doesn't have the race condition. The Kubernetes CNI is responsible to set the iptables options and should use this option to avoid the race condition.

### What else can be done?
Avoid SNAT in internal networks. Often containers connect to "external IPs" which are still within the same internal VPC, for example Redis/Memcached/MySQL. 

In AWS EKS each pod has their own IP address and network interface, which means that there is no need to do SNAT to central services like RDS/Memcached/Redis.

### Sources
- [A reason for unexplained connection timeouts on Kubernetes/Docker](https://www.instapaper.com/read/1294450950)
- [A Kubernetes crime story](https://www.instapaper.com/read/1315686950)

#published #kubernetes #performance #network #linux
